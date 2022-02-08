function BuildIconDs(esentati){
    // console.log(SW_COMP_CVE.length)
    d3.selectAll(".sw_div_icon").transition().duration(400).style("opacity","0").remove()
    cpe_coll = []
    //*sc_google search icons
    //take the code
    for (let indec = 0; indec < SW_COMP_CVE.length; indec+=10) {
        const key = SW_COMP_CVE[indec];
        // console.log(key)
        el = {
            "has_cpe23":true,
            "key":key,
            "cpe_name":key.cpe_name
        }
        cpe_coll.push(el)
    };
    //the ones without code still will search something
    ALL_SWC.forEach(all_item => {
        var already_exists = false
        cpe_coll.forEach(cpe_coll_item => {
            if(all_item==cpe_coll_item.cpe_name) already_exists = true
        });
        if(!already_exists){
            el = {
                "has_cpe23":false,
                "key":null,
                "cpe_name":all_item
            }
            cpe_coll.push(el)
        }
    });
    //actual search
    cpe_coll.forEach(key => {
        txt_elem = d3.selectAll('text').filter(function(){
            if(d3.select(this).attr('id'))
                return d3.select(this).attr('id') == "text_of_"+key.cpe_name
        });
        try {
            txt_elem = txt_elem.node().getBoundingClientRect()
            pivot = d3.select("#sc_menu").node().getBoundingClientRect()
            d3el = d3.select("#sc_menu").append("div")
                .attr("class","sw_div_icon")
            d3el.append("i")
                .attr("class","fas fa-external-link-alt")
                .attr("margin-right","2px")
            
            d3el.style("left",parseFloat(txt_elem.left-25)+"px")
            d3el.style("transform","scale(0.6)")
            d3el.style("top",parseFloat(txt_elem.top-pivot.top)+"px")
            d3el.on("click",function(d){
                var search = key.has_cpe23? key.key.cpe_code:key.cpe_name
                window.open('http://google.com/search?q='+search);
            })
        } 
        catch (error) {
            // console.log(key+" text_of not found")
        }
        
    });

    //*hid icons
    console.log(ALL_SWC)
    for (const k in sw_components_fw) {
        if (Object.hasOwnProperty.call(sw_components_fw, k)) {
            const Fos = sw_components_fw[k];
            var key = k
            ALL_SWC.forEach(swc_all_item => {
                // console.log(swc_all_item)
                // console.log(key)
                if(swc_all_item.includes(key)) key = swc_all_item
            });
            if(SW_COMP_HIDE.filter(e => e.includes(key)).length == 0) {
                
                //key BusyBox 1.13.0 (CRITICAL)
                //fos array of fo
                txt_elem = d3.selectAll('text').filter(function(){
                    if(d3.select(this).attr('id'))
                        return d3.select(this).attr('id') == "text_of_"+key
                });
                // if(key.includes("OpenSSL")) {
                //     console.log(txt_elem)
                //     console.log(key)
                //     console.log(Fos)
                // }
                try {
                    txt_elem = txt_elem.node().getBoundingClientRect()
                    // console.log(txt_elem)
                    // console.log(key)
                    pivot = d3.select("#sc_menu").node().getBoundingClientRect()
                    // console.log(pivot)
                    d3el = d3.select("#sc_menu").append("div")
                            .attr("class","sw_div_icon")
                    var limit = 0
                    var bound = 3
                    // console.log(key)
                    Fos.forEach((fo,i) => {
                        //check if fo is in critical  or in sus 
                        if(i<=2 || (esentati.length>0 && esentati.includes(key))){
                            CRITICAL_FO.system.forEach(crit_el => {
                                if(fo == crit_el.uid && limit <bound){
                                    d3el.append("i")
                                        .attr("class","danger_icon fas fa-exclamation-circle")
                                        .attr("margin-right","2px")
                                        .on("click",function(d){console.log(crit_el)})
                                    limit++
                                }
                            });
                            SUS_FO.system.forEach(crit_el => {
                                if(fo == crit_el.uid && limit <bound){
                                    d3el.append("i")
                                        .attr("class","sus_icon fas fa-exclamation-circle")
                                        .attr("margin-right","2px")
                                        .on("click",function(d){console.log(crit_el)})
                                    limit++
                                }
                            });
                            NEUTRAL_FO.system.forEach(crit_el => {
                                if(fo == crit_el.uid && limit <bound){
                                    d3el.append("i")
                                        .attr("class","neutral_icon fas fa-exclamation-circle")
                                        .attr("margin-right","2px")
                                        .on("click",function(d){console.log(crit_el)})
                                    limit++
                                }
                            });
                        }
                    });
                    
                    if(Fos.length>2){
                        var clss = (esentati.length>0 && esentati.includes(key))? "plus_icon fas fa-minus":"plus_icon fas fa-plus"
                        d3el.append("i")
                            .attr("class",clss)
                            .attr("margin-right","2px")
                            .on("click",function(d){
                                is_plus = d3.select(this).attr("class") == "plus_icon fas fa-plus"? true:false
                                if(is_plus){
                                    d3.select(this).attr("class","plus_icon fas fa-minus")
                                    esentati.push(key)
                                    BuildIconDs(esentati)
                                    
                                }
                                else{
                                    d3.select(this).attr("class","plus_icon fas fa-plus")
                                }
                            })
                    }
                        

                    // console.log("pivot.top "+pivot.top)
                    // console.log("txt_elem.top "+txt_elem.top)
                    d3el.style("left",parseFloat(txt_elem.left+txt_elem.width)+"px")
                    d3el.style("top",parseFloat(txt_elem.top-pivot.top)+"px")
                    // console.log(parseFloat(txt_elem.top-pivot.top))
                } catch (error) {
                    // console.log(key+" text_of not found")
                }
                
            }
            
        }
    }

    



}
