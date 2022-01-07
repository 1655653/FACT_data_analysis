
//* building the dataset for sw coponent with cve 
async function buildSWComponentWithCVE(cve_lookup){
    
    
    var checklist = [] //segna quali cpe ha correttamente trovato
    
    //*** build the checklist 
    for (const key in cve_lookup.summary) {
        if (Object.hasOwnProperty.call(cve_lookup.summary, key)) {
            var uidd_list = cve_lookup.summary[key]
            var hidd_list=[]
            //console.log(all_REST_response[uidd_list])
            for (const i of uidd_list) {
                hidd_list.push(ALL_REST_RESPONSE[i].hid)
            }
            
            var elem = {"cpe_name":key}
            elem["hid_affected"]= hidd_list
            elem["uid_affected"]= uidd_list
            elem["cpe"]= await make_CPE_nist_call(key) //?<-----------? API call to nist in order to get a cpe
            //console.log(elem)
            checklist.push(elem)
            //console.log(elem)
            //build the 0,10 entries for each cpe sw
            for (let i = 1; i <= 10; i++) {
                var el = {
                    "cpe_name":key,
                    "cve_count":0,
                    "base_score":i,
                    "exploitability_score":i,
                    "impact_score":i,
                    "all_cve_objects_bs":[], //here are put the cve with that score
                    "all_cve_objects_es":[],
                    "all_cve_objects_is":[],
                    "uid_affected":uidd_list,
                    "hid_affected":hidd_list
                }
                SW_COMP_CVE.push(el)
                
            }
        }
    }
    //***once i get the checklist i ask nist to get the CVEs. if i have a cpe i get the batch, otherwise i have to check one at time
    for (const obj of checklist) {
        if(obj.cpe){ //?<--------------GET BATCH OF CVE
            //console.log(obj.cpe_name)
            try {
                var all_cves_of_single_cpe = await make_CVE_nist_call(obj,SW_COMP_CVE)
                
            } catch (error) {
                console.log("can not call" +obj.cpe_name)

            }
            
        }
        else{ //?<--------------FOR EACH OBJECT MANUALLY SEARCH THE CVE
            
            console.log("not found, brutally manual search of cve of "+obj.cpe_name)
            var cve_results = ALL_REST_RESPONSE[uidd_list[0]].cve_results
            for (const key_sw_name in cve_results) {
                if (Object.hasOwnProperty.call(cve_results, key_sw_name)) {
                    const all_cves = cve_results[key_sw_name]; //
                    for (const key_CVE in all_cves) {
                        if (Object.hasOwnProperty.call(all_cves, key_CVE)) {
                            const single_cve_obj = all_cves[key_CVE];
                            try{
                                await make_CVE_nist_call(single_cve_obj,SW_COMP_CVE,key_CVE)

                            }
                            catch(error){
                                console.log("can not call" +key_CVE)
                            }
                            
                        }
                    }
                }
            }
        }
    }
    //*scraping the component with no CVE
    sc_empty = []

    for (let i = 0; i < SW_COMP_CVE.length; i+=10) {
        const element = SW_COMP_CVE[i];
        var name = element.cpe_name
        var empty = 0
        SW_COMP_CVE.forEach(element_it => {
            var name_it = element_it.cpe_name
            if(name_it==name){
                if(element_it.all_cve_objects_bs.length == 0 && element_it.all_cve_objects_es.length == 0 && element_it.all_cve_objects_is.length ==0){
                    empty++
                }
            }
        });
        if(empty==10) sc_empty.push(name)
    }
    console.log(sc_empty)

    sc_empty.forEach(sc_empty_name => {
        SW_COMP_CVE = SW_COMP_CVE.filter(function(d){
            return d.cpe_name!= sc_empty_name
        })
    });
    //console.log(JSON.stringify(SW_COMP_CVE, null, 2))
    //console.log(heatmap_data)


    
    
    //console.log("-------------------HEATMAP DATASET BUILT")
}


//* call nist to get CVEs
async function make_CVE_nist_call(obj,heatmap_data,key_CVE){
    var nist_url
    if(key_CVE) nist_url = "https://services.nvd.nist.gov/rest/json/cve/1.0/"+key_CVE
    else{
        var cpe = obj.cpe
        nist_url= "https://services.nvd.nist.gov/rest/json/cves/1.0/?cpeMatchString="+cpe+"&resultsPerPage=2000"
    }
    var cves_list = []
    var nist_resp = await Promise.resolve(axios.get(nist_url))
    nist_resp.data.result.CVE_Items.forEach(cve_item => {
        var cve_obj = {}
        cve_obj["cve_code"]= cve_item.cve.CVE_data_meta.ID

        var baseMetric = cve_item.impact.baseMetricV3? cve_item.impact.baseMetricV3: cve_item.impact.baseMetricV2
        var cvssV = baseMetric.cvssV3? baseMetric.cvssV3: baseMetric.cvssV2
        cve_obj["base_score"]= ""+cvssV.baseScore
        cve_obj["impact_score"]= ""+baseMetric.impactScore
        cve_obj["exploitability_score"]= ""+baseMetric.exploitabilityScore

        cve_obj["attackVector"]= cvssV.attackVector
        cve_obj["baseSeverity"]= cvssV.baseSeverity
        cve_obj["attackComplexity"]= cvssV.attackComplexity
        cve_obj["version"]=cve_item.cve.data_version

        var d = cve_item.cve.description.description_data[0].value
        if(d) cve_obj["description"] = d 
        for (const entry of heatmap_data) {
            if(entry.cpe_name==obj.cpe_name){
                if(cve_obj.exploitability_score.split(".")[0]==entry.exploitability_score)
                    entry.all_cve_objects_es.push(cve_obj)
                if(cve_obj.impact_score.split(".")[0]==entry.impact_score)
                    entry.all_cve_objects_is.push(cve_obj)
                if(cve_obj.base_score.split(".")[0]==entry.base_score)
                    entry.all_cve_objects_bs.push(cve_obj)
            }
        }

        cves_list.push(cve_obj)
    });

    return cves_list
}

//* call nist to fill checklist
async function make_CPE_nist_call(name){
    //?<------------- manage the strings to get a correct cpe
    var product = name.split(" ")[0].toLowerCase();
    var ass = name.split(" ")
    ass = ass.slice(0,ass.length-3)
    ass.forEach((word,i) => {
        if(i>0){
            if (word[0] === word[0].toUpperCase()){
                if(i>0) product+="_"
                product+=word.toLowerCase()
            }
        }
        
    });
    const regex = new RegExp('[0-9*]', 'g');
    const version = name.split(" ").filter((href) => href.match(regex));
    part = ['a','o','h']
    var pu
    var retry = false
    for (let i = 0; i < part.length; i++) {
        const letter = part[i];
        var ve = version[0]? version[0]: ""
        var nist_url 
        if(!retry) nist_url = "https://services.nvd.nist.gov/rest/json/cpes/1.0/?cpeMatchString=cpe:2.3:"+letter+":*:"+product+":"+ve
        else nist_url ="https://services.nvd.nist.gov/rest/json/cpes/1.0/?cpeMatchString=cpe:2.3:"+letter+":"+product+":*:"+ve

        //var nist_url ="https://services.nvd.nist.gov/rest/json/cpes/1.0/?cpeMatchString=cpe:2.3:a:*:dnsmasq:2.52"
        //console.log("calling "+nist_url)
        
        var nist_resp = await Promise.resolve(axios.get(nist_url))
        if(nist_resp.data.totalResults != 0) {
            pu = nist_resp.data.result.cpes[0].cpe23Uri.split(":").slice(0,6).join(":")
            //console.log(pu)
            return pu
        }
        //console.log(nist_resp)
        if(i == 2 && !retry) {
            retry = true
            i = -1
        }
    }
    return undefined
        
}
  