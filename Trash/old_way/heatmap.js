function DrawHeatmap(data){
    // set the dimensions and margins of the graph
    var margin = {top: 0, right: 0, bottom: 40, left: 180},
      width_heatmap = 500 - margin.left - margin.right,
      height_heatmap = 330 - margin.top - margin.bottom; //470
    
    // append the svg object to the body of the page
    d3.select("#violin_div").selectAll("*").remove()
    d3.select("#violin_div").style("border-style","ridge")

    
    d3.select("#violin_div").append("div").attr("id","div_score")
    d3.select("#div_score").append("button").text("exploitability_score").attr("id","btn_es").on("click",function(d){changeScore(d3.select(this).text())})
    d3.select("#div_score").append("button").text("impact_score").attr("id","btn_is").on("click",function(d){changeScore(d3.select(this).text())})
    d3.select("#div_score").append("button").text("base_score").attr("id","btn_bs").on("click",function(d){changeScore(d3.select(this).text())})

    var svg_heatmap = d3.select("#violin_div").style("display","flex")
    .append("svg").attr("id","svg_heat")
      .attr("width", width_heatmap + margin.left + margin.right)
      .attr("height", height_heatmap + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
   
   var oi_num_scale = d3.map(data, function(d){return d[SCORE_TYPE];}).keys()
    var cpe_names = d3.map(data, function(d){return d.cpe_name;}).keys() //
        //console.log(cpe_names)
      // Build X scales and axis:
      var x_heatmap = d3.scaleBand()
        .range([ 0, width_heatmap ])
        .domain(oi_num_scale)
        .padding(0.05);
      svg_heatmap.append("g")
        .style("font-size", 17)
        .attr("transform", "translate(0," + height_heatmap + ")")
        .call(d3.axisBottom(x_heatmap).tickSize(0))
        .select(".domain").remove()
    
      // Build Y scales and axis:
      var y_heatmap = d3.scaleBand()
        .range([ height_heatmap, 0 ])
        .domain(cpe_names)
        .padding(0.05)
        
    var si = d3.scaleLinear().domain([0,20]).range([18,8]) //scala per il font size della y
      svg_heatmap.append("g")
        .attr("id", "axisG")
        .style("font-size", si(cpe_names.length))
        .call(d3.axisLeft(y_heatmap).tickSize(0))
        .select(".domain").remove()

      d3.select("#axisG").selectAll("text")
      .text(function(d){
            const regex = new RegExp('[0-9*]', 'g');
            var version = d.split(" ").filter((href) => href.match(regex));
            var sp = d.split(" ")
            var name = sp[0]
            if(sp.at(-1)=="(CRITICAL)") version =version+"??????"
            return name+ " " + version
        }).on("click",function(d){heatRemove(d)})
        // .attr("y", function(t){
        //     console.log(d3.select(this))
        //     return parseFloat(d3.select(this).attr("y"))-25
        // })//.call(wrap, 20);
      
      // Build color scale
      var max = 1
      data.forEach(element => {
          max<cve_count(element,SCORE_TYPE).length? max = cve_count(element,SCORE_TYPE).length: max = max
      });
      var color_heatmap = d3.scaleLinear()
            .range(["white", "#880000"])
            .domain([0,max])
    
      // create a tooltip
      var tooltip_heatmap = d3.select("#violin_div")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
    
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        tooltip_heatmap
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        tooltip_heatmap
            .html(cve_count(d,SCORE_TYPE).length+" total CVEs with score:<br>"+ SCORE_TYPE)
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY + 10) + 'px')
      }
      var mouseleave = function(d) {
        tooltip_heatmap
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }
     function accroccanomi(d){
       var a = d.cpe_name.split(" ")
       return a[0]+a[1].replace(/[. ]/g,"_")+"__"+d[SCORE_TYPE]
     }
      // add the squares
      svg_heatmap.selectAll()
        .data(data, function(d){return d[SCORE_TYPE]+':'+d.cpe_name;})
        .enter()
        .append("g").attr("id",function(d) { return "G_"+accroccanomi(d)})
        .append("rect").attr("id",function(d) { return accroccanomi(d)}).attr("class",".rect_heat")
        .style("fill", function(d) { return color_heatmap(cve_count(d,SCORE_TYPE).length)} )
        .attr("rx", 4) //smoothness del rettangolo
        .attr("ry", 4)
        .attr("width", x_heatmap.bandwidth() )
        .attr("height", y_heatmap.bandwidth() )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click",function(d){clickSquare(d)})

        .transition()
            .duration(1500)
        .attr("x", function(d) { return x_heatmap(d[SCORE_TYPE])})
        .attr("y", function(d) { return y_heatmap(d.cpe_name) })
        
        
    svg_heatmap.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "begin")
            .attr("x", width_heatmap/2.5)
            .attr("y", height_heatmap+30)
            .text(SCORE_TYPE);

    
    function cve_count(d,type){
        switch (type) {
            case "base_score":
                return d.all_cve_objects_bs
            case "exploitability_score":
                return d.all_cve_objects_es
            case "impact_score":
                return d.all_cve_objects_is
        }
    }
function clickSquare(d){


      var rect_selected = d3.select("#"+accroccanomi(d))
    //   var group_selected = d3.select("#G_"+accroccanomi(d))
      var w_old = parseFloat(rect_selected.attr("width"))
      var h_old = parseFloat(rect_selected.attr("height"))
      var str=parseFloat(rect_selected.style("stroke-width"))
      var x_rect = parseFloat(rect_selected.attr("x"))
      var y_rect = parseFloat(rect_selected.attr("y"))
      var w = w_old*10 +10+4 //+ 9*str - 8
      var h = (h_old+str-1)*(cpe_names.length+0.9)
      
//*generate the rect with all CVEs
    cve_container = d3.select("#violin_div").append("div").attr("id", "cve_container").style("background",rect_selected.style("fill"))
    cve_container
        .style("width","0px").style("height","0px")
        .style("left",parseFloat(d3.select("#svg_heat").attr("width"))-(10-d[SCORE_TYPE])*w_old+"px")
        .style("top",document.getElementById(accroccanomi(d)).getBoundingClientRect().top+"px")
        .on("dblclick",function(g){reduceSquare(d,rect_selected,x_rect,y_rect,w_old,h_old)})
        .transition()
        .duration(1500)
        .style("top",document.getElementById("btn_bs").getBoundingClientRect().top+"px")
        .style("left",d3.select("#svg_heat").attr("width")-1+13-w+"px")
        .style("width",w+"px").style("height",h+"px")
    
        
    //*generate cve name
    cve_container.selectAll(".text_cv")
        .data(cve_count(d,SCORE_TYPE).sort(function(a, b){
            a = parseInt(a.cve_code.split("-")[1])
            b = parseInt(b.cve_code.split("-")[1])
            if(a < b) { return 1; }
            if(a > b) { return -1; }
            return 0;
        })).enter()
        .append("text").text(function(u){return u.cve_code}).attr("id","text_cve_").style("width","fit-content")
        .on("click",function(u){
            console.log(u)
            console.log(d)
            CVEdetails(u,d,w,h)
        })
    function CVEdetails(u,d,w){
        d3.select("#cve_details").remove()
        cve_details = d3.select("#violin_div").append("div").attr("id", "cve_details")
        cve_dtls_left = d3.select("#svg_heat").attr("width") - w/1.8

        var tail = "<br> "
        if(u.attackComplexity)tail+="attack complexity: "+u.attackComplexity + "<br>"
        if(u.attackVector)tail+="attack vector: "+u.attackVector+ "<br>"
        if(u.baseSeverity)tail+="base severity: "+u.baseSeverity+ "<br>"
        cve_details
            .html("cve_code:"+u.cve_code+ "<br>score:" + d[SCORE_TYPE] + tail+ "<br>description:"+u.description)
            .style('left', cve_dtls_left+"px") 
            .style("top",document.getElementById("btn_bs").getBoundingClientRect().top+"px")
            .style("width",w/2+"px")
            .style("height", h-9+"px")
            .on("dblclick",function(g){reduceSquare(d,rect_selected,x_rect,y_rect,w_old,h_old)})
            .append("button").text("MORE DETAILS").attr("id","cve_btn_link_nist")
                .on("click", function(h){
                    var ur = "https://nvd.nist.gov/vuln/detail/"+u.cve_code
                    window.open(ur, '_blank').focus();
                })
        

        
    }
    
    
      //*append the uids
      d3.select("#uid_list_hp").remove()
      d3.select("#violin_div").append("div").attr("id","uid_list_hp").style("width","100px")
      
      d.uid_affected.forEach(uid => {
        var r = all_REST_response[uid]
        var hiddd = r.hid
        
        d3.select("#uid_list_hp").append("text").style("margin-left","15px")
            .text(hiddd)
            .on("click",function(d){details_I_II(uid)})


      });


    }



    function reduceSquare(d,rect,old_x,old_y,old_w,old_h){
        d3.select("#cve_details").remove()
        d3.selectAll(".tooltip").style("visibility", "hidden")
        tooltip_heatmap.style("visibility", "visible")
      d3.select("#uid_list_hp").remove()
      d3.select("#cve_container")
        .transition()
        .duration(1500)
        .style("height","0px")
        .style("width","0px")
        .style("left",parseFloat(d3.select("#svg_heat").attr("width"))-(10-d[SCORE_TYPE])*old_w+"px")
        .style("top",document.getElementById(accroccanomi(d)).getBoundingClientRect().top+"px")
        .remove()
      rect
        .on("click",function(o){clickSquare(o)})
        .on("mouseleave",mouseleave)
        .transition()
        .duration(1500)
        .attr("width",old_w)
        .attr("height",old_h)
        .attr("x", old_x)
        .attr("y", old_y)
    }
}

function changeScore(text){
    SCORE_TYPE = text
    sw_comp_cve = JSON.parse(JSON.stringify(BackupHeatMap))
    DrawHeatmap(sw_comp_cve)
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
  
function heatRemove(n){
    sw_comp_cve = sw_comp_cve.filter(function( obj ) {
        return obj.cpe_name !== n;
    });
    DrawHeatmap(sw_comp_cve)
}

//* building the dataset for the heatmap
async function buildHeatmapData(cve_lookup){
    
    sw_comp_cve=[]
    heatmap_dom=[]
    var checklist = [] //segna quali cpe ha correttamente trovato
    
    //*** build the checklist 
    for (const key in cve_lookup.summary) {
        if (Object.hasOwnProperty.call(cve_lookup.summary, key)) {
            var uidd_list = cve_lookup.summary[key]
            var hidd_list=[]
            //console.log(all_REST_response[uidd_list])
            for (const i of uidd_list) {
                hidd_list.push(all_REST_response[i].hid)
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
                sw_comp_cve.push(el)
                
            }
        }
    }
    //***once i get the checklist i ask nist to get the CVEs. if i have a cpe i get the batch, otherwise i have to check one at time
    for (const obj of checklist) {
        if(obj.cpe){ //?<--------------GET BATCH OF CVE
            //console.log(obj.cpe_name)
            try {
                var all_cves_of_single_cpe = await make_CVE_nist_call(obj,sw_comp_cve)
                
            } catch (error) {
                console.log("can not call" +obj.cpe_name)

            }
            
        }
        else{ //?<--------------FOR EACH OBJECT MANUALLY SEARCH THE CVE
            
            console.log("not found, brutally manual search of cve of "+obj.cpe_name)
            var cve_results = all_REST_response[uidd_list[0]].cve_results
            for (const key_sw_name in cve_results) {
                if (Object.hasOwnProperty.call(cve_results, key_sw_name)) {
                    const all_cves = cve_results[key_sw_name]; //
                    for (const key_CVE in all_cves) {
                        if (Object.hasOwnProperty.call(all_cves, key_CVE)) {
                            const single_cve_obj = all_cves[key_CVE];
                            try{
                                await make_CVE_nist_call(single_cve_obj,sw_comp_cve,key_CVE)

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
    //console.log(JSON.stringify(heatmap_data, null, 2))
    //console.log(heatmap_data)


    
    
    //console.log("-------------------HEATMAP DATASET BUILT")
}
//*utility to wrap axis y text
function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 0.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        var h = 25  
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y-h).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                h-=12
            }
        }
    });
  }
// esempio
// [
    //     {
        //       "cpe_name": "BusyBox 1.19.2",
        //       "cve_count": 0,
        //       "base_score": 1,
        //       "exploitability_score": 1,
        //       "impact_score": 1,
        //       "all_cve_objects": [],
        //       "uid_affected": [
            //         "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360"
            //       ],
            //       "hid_affected": [
                //         "/bin/busybox"
                //       ]
                //     },
                //     {
