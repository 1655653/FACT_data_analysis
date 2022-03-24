var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var UNPACK_BLACKLISTED = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//*
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true
document.getElementById("byteCBOX").checked=true

var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri
var all_REST_response={}//? collazione di tutte le chiamate api, ordinate con chiave l'UID
var all_NIST_REST_response={}//? collazione di tutte le chiamate api del nist , ordinate con chiave la cve

var Tree = {}
var BackupTree = {}

var violin_data;
var violin_dom;
var heatmap_data;
var heatmap_dom;
//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
var list_packed=[]
var list_packed_hid=[]
var list_packed_uid = []

ListMimes = [] //? lista con i subtypes
ListSuperMimes = []//?lista con solo i types
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true

//* call all firmwares
d3.json(url, function(data) {
    select=document.getElementById("allFW")
    var ljs = data.uids
    ljs.unshift("---") //? <----- riempio la lista con gli uid dei firmware (per ora ho solo quelli)
    ljs.forEach(function (item) {
        let op = document.createElement('option');
        op.setAttribute("value", item)
        select.appendChild(op);
        op.innerHTML += item;
    });
    
})

document.getElementById("start").onclick = callFW//? <---- chiamata quando premi bottone
//* starts analysis on a selected FW
function callFW() {
    console.log("STARTED")
    var selectBox = document.getElementById("allFW");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //console.log(selectedValue)
    if(selectedValue != "---"){
        url = endpoint+"firmware/"+selectedValue+"?summary=true"
        d3.json(url, function(data) { //?<----- chiamata alle api
            
            //?----- cpu_architecture string
            var cpu_info =  []
            for (const key in data.firmware.analysis.cpu_architecture.summary) {
                if (Object.hasOwnProperty.call(data.firmware.analysis.cpu_architecture.summary, key)) {
                    const element = data.firmware.analysis.cpu_architecture.summary[key];
                    cpu_info.push(key)
                }
            }
            var plu = "  cpu architecture"
            cpu_info.length > 1 ? plu += "s: " : plu+= ": "

            document.getElementById("reportOf").innerHTML = "</br>Report of "+ data.firmware.meta_data.hid + "  MIME: "+data.firmware.analysis.file_type.mime + plu +cpu_info
            d3.select("#downloadFW").style("visibility", "visible").on("click",function(){console.log("download started");download( data.request.uid ,data.firmware.analysis.file_type.mime )})
            if (document.getElementById("unpackerCKBOX").checked){
                //console.log(data)
                document.getElementById("reportOf").innerHTML += "</br>"+ "Over " + data.firmware.meta_data.total_files_in_firmware +" files "
                list_packed = data.firmware.analysis.unpacker.summary.packed //? usato per tagggare i FO packed
                Tree["uid"] = data.request.uid
                Tree["hid"] = data.firmware.meta_data.hid
                Tree["mime"] = data.firmware.analysis.file_type.mime
                ListMimes.push(data.firmware.analysis.file_type.mime)
                ListSuperMimes.push(data.firmware.analysis.file_type.mime.split("/")[0])
                Tree["bytes"] = 0 //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                Tree["contacome"]=1//? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                Tree["size"] = data.firmware.meta_data.size
                Tree["leaves"] = 0
                Tree["children"] = [];
                if(data.firmware.meta_data.included_files.length==0) {
                    document.getElementById("reportOf").innerHTML+= "NOT ENOUGH INFO TO GIVE A VISUALIZATION"
                    return
                }
                (async () => {
                    INCLUDED_FILES= data.firmware.meta_data.included_files
                    await BuildTree(data.firmware.meta_data.included_files, Tree)
                    
                    calculateLeaves(Tree) 
                    //calculateFOlderSize(Tree)//!per ora me ne sbatto della grandezza delle folder
                    calculateMimes(Tree) 
                    
                    console.log("TREE BUILT")
                    console.log(Tree)
                    BackupTree = JSON.parse(JSON.stringify(Tree))
                    
                    BuildMimeFilterUI(ListMimes)//checkboxes to filter the mime
                    
                    document.getElementById("mime_filter_start").onclick = FilterMIME//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    document.getElementById("mime_filter_reset").onclick = resetTree//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    packedUI(data.firmware.analysis.unpacker.number_of_unpacked_files)


                    DrawSunburst()
                   
                    
                    
                    buildViolinData(data.firmware.analysis.cve_lookup)
                    buildHeatmapData(data.firmware.analysis.cve_lookup)
                    DrawViolin()
                })();
            } 
        })
    }
  
    //? pulisco le var

    list_response_cpu_archi=[]
    list_response_unpacker=[]
    list_packed=[]
    list_packed_hid=[]
  
}
async function buildHeatmapData(cve_lookup){
    startTime = new Date();
    heatmap_data=[]
    heatmap_dom=[]
    for (const key in cve_lookup.summary) {
        if (Object.hasOwnProperty.call(cve_lookup.summary, key)) {
            const soft_name_list = cve_lookup.summary[key];
            for (const element of soft_name_list) {
                
                var cve_results = all_REST_response[element].data.file_object.analysis.cve_lookup.cve_results
                var hidd = all_REST_response[element].data.file_object.meta_data.hid
                
                for (const key_sw_name in cve_results) {
                    if (Object.hasOwnProperty.call(cve_results, key_sw_name)) {
                        var nist_resp = await make_nist_call(key_sw_name)


                        //build the 0,10 entries for each cpe sw
                        for (let i = 1; i <= 10; i++) {
                            var el = {
                                "cpe_name":key_sw_name,
                                "cve_count":0,
                                "base_score":i,
                                "exploitability_score":i,
                                "impact_score":i,
                                "all_cve_objects":[],
                                "uid_affected":[element],
                                "hid_affected":[hidd]
                            }
                            var cesta = false
                            heatmap_data.forEach(hobj => {
                                if(hobj.cpe_name == key_sw_name && hobj.base_score==i){
                                    hobj.uid_affected.push(element)
                                    hobj.hid_affected.push(hidd)
                                    cesta=true
                                }
                            });
                            if(!cesta) heatmap_data.push(el)
                            
                        }
                        const all_cves = cve_results[key_sw_name]; //
                        for (const key_CVE in all_cves) {
                            if (Object.hasOwnProperty.call(all_cves, key_CVE)) {
                                const single_cve_obj = all_cves[key_CVE];
                                var right_score;
                                single_cve_obj.score3=="N/A"? right_score= single_cve_obj.score2: right_score= single_cve_obj.score3
                                single_cve_obj["cve_code"] = key_CVE
                                
                                //**apicall to NIST
                                //https://services.nvd.nist.gov/rest/json/cve/1.0/CVE-2021-28831
                                var nist_url = "https://services.nvd.nist.gov/rest/json/cve/1.0/"+key_CVE
                                //console.log("chiamo "+key_CVE);
                                //!---------------HERE------------------
                                // d3.json(nist_url, function(nist_resp) {
                                    //     single_cve_obj["description"]= nist_resp.result.CVE_Items[0].cve.description.description_data[0].value
                                    //     console.log(single_cve_obj["description"])
                                    // })
                                    
                                    
                                    
                                // try{
                                //     var nist_resp = await make_nist_call(nist_url)
                                //     console.log(nist_resp)
                                //     all_NIST_REST_response[key_CVE] = nist_resp

                                //     var descr = nist_resp.data.result.CVE_Items[0].cve.description.description_data[0].value
                                //     var baseMetric = nist_resp.data.result.CVE_Items[0].impact.baseMetricV3? nist_resp.data.result.CVE_Items[0].impact.baseMetricV3: nist_resp.data.result.CVE_Items[0].impact.baseMetricV2
                                //     if(descr) single_cve_obj["description"] = descr
                                //     console.log(baseMetric)
                                // }
                                // catch (error) {
                                //     console.log("errore")
                                //     console.log(error)
                                // }
                                // finally{
                                   // console.log("chiamato "+key_CVE);
                            
                            
                                    right_score = right_score.split(".")[0]
                                    for (const entry of heatmap_data) {
                                        if(entry.cpe_name==key_sw_name && entry.base_score==right_score){
                                            var cista = false
                                            for (const ao of entry.all_cve_objects) {
                                                if(single_cve_obj.cve_code==ao.cve_code) cista = true
                                            };
                                            if(!cista)
                                            {
                                                entry.cve_count++
                                                entry.all_cve_objects.push(single_cve_obj)
                                            }
                                            
                                        }
                                    };
                                    //console.log(right_score.split(".")[0])
                                //}
                                            
                                            
                            }
                        }
                    }
                }
                
            };
            
        }
    }
    //console.log(JSON.stringify(heatmap_data, null, 2))
    endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  console.log(seconds + " seconds");
    console.log("-------------------ENDED")
}

//TODO intrighi e tradimenti
async function make_nist_call(name){
    
    var nist_url ="https://services.nvd.nist.gov/rest/json/cpes/1.0/?cpeMatchString=cpe:2.3:a:*:dnsmasq:2.52"
    const res_File_objects = await Promise.resolve(axios.get(nist_url))
    return res_File_objects
        
}
  
function packedUI(unpack_list_size){
    var txt =""
    if(list_packed && unpack_list_size>0){//? se ci sono packed allora li mette
        txt ="FACT has not been able to unpack "+ list_packed.length + " elements  " 
        d3.select("#reportOf").append("text").text(txt)
            .append("button").text("expand").attr("id","packed_tree_expand_btn")
                .on("click",expandpackedTree)
            .append('br')
        d3.select("#reportOf").append("div").attr("id","packed_tree_expand").style("display","none")
        
        
    }
    else if(unpack_list_size == 0){
        txt ="FACT unpacked 0 elements " 
        d3.select("#reportOf").append("text").text(txt)
    }
    else {
        txt = "FACT has been able to unpack every elements  "
        d3.select("#reportOf").append("text").text(txt)
    }
    d3.select("#reportOf").append("br")
    d3.select("#reportOf").append("text").attr("id","log_packed_FO")
}

function talkAboutPackedFO(FOuid){
    var selectedFO = all_REST_response[FOuid].data.file_object
    console.log(selectedFO)
    console.log(FOuid)
    var tail = " ( MIME: "+selectedFO.analysis.file_type.mime+")"
    var mime_check = "The file type of " + selectedFO.meta_data.hid + " is not blacklisted, so it should have been unpacked" +tail
    if(selectedFO.analysis.unpacker["0_ERROR_genericFS"]) mime_check = "During the unpacking process of " + selectedFO.meta_data.hid + ", a genericFS error arisen"+tail
    if(UNPACK_BLACKLISTED.includes(selectedFO.analysis.file_type.mime))  mime_check= "Unpacking of " + selectedFO.meta_data.hid + " skipped due to blacklisted file type"+tail
    d3.select("#log_packed_FO").text(mime_check+"      ")
        .append("button").text("download").attr("id","dwld")
            .on("click",function(){download( FOuid ,selectedFO.analysis.file_type.mime)})
}

function download(uid,contentType){
    var urldw = endpoint+"binary/"+uid
    d3.json(urldw, function(data) {
        //alert("download started");
        var b64 = data.binary
        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
        }
        const blob = b64toBlob(b64, contentType);
        const blobUrl = URL.createObjectURL(blob);
    
        //window.location = blobUrl;
        // // Construct the <a> element
        var link = document.createElement("a");
        link.download = data.file_name
        link.href = blobUrl;
    
        document.body.appendChild(link);
        link.click();
    })
}


//!unused
function PruneTree(fatherNode){
    // fatherNode["mime_types"]=buildMimelist(ListMimes)
    // fatherNode["leaves"] = 0
    //! il problema è che devo andare fino a fondo per poter sapere e la folder è vuota oppure no, qui controllo solo se il children è == 0 ma puo essere 1 che ha un children ==00 etc-...
    l = [] //? riempio la lista con le posizioni degli elementi da eliminare
    for (let i = 0; i < fatherNode.children.length; i++) {
        const child = fatherNode.children[i];
        //console.log("child")
        //console.log(child)
        if(child.children.length==0){ //?se è un nodo con 0 figli, lo devo eliminare
            l.push(i)
        }
    }
    //console.log(l)
    //? ciclo sulla lista di index, elimino l'elemento dal children e aggiorno la lista di index (perchè l'elemento successivo ha  index -1)
    if(l.length>0){
        for (let i = 0; i < l.length; i++) {
            const pos = l[i];
            fatherNode.children.splice(pos,1)
            for (let j = 0; j < l.length; j++) {
                l[j]--
            }
        }
        
    }
    //console.log("lenght after "+fatherNode.children.length)
    //? chiamata ricorsiva
    fatherNode.children.forEach(child => {
        //console.log("calling--> " + child.hid)
        PruneTree(child)
    });

}

