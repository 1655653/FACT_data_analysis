function BuildIconSC(esentati){
    //*external link icon
    d3.select("#sw_comp_svg_container").selectAll(".tick")
        .each(function(e,i){
            if(! Number.isInteger(e)){ //rimuovo i tick dei num 1-10
                d3.select(this).append("svg:image")
                    .attr('x', -27)
                    .attr('y', -33)
                    .attr('width', 24)
                    .attr('height', 24)
                    // .attr("xlink:href", "https://img.icons8.com/windows/32/000000/external-link.png")
                    .attr("xlink:href", "icons/external-link.png")
                    .attr("transform","scale(0.6)").raise()
                    .on("click",function(d){
                        // console.log(e)
                        // console.log(sw_components_fw)
                        for (const sc in sw_components_fw) {
                            if (Object.hasOwnProperty.call(sw_components_fw, sc)) {
                                if(e.includes(sc)){
                                    const uids = sw_components_fw[sc];
                                    var scheda_sc = ALL_REST_RESPONSE[uids[0]].sw_comp_dtls
                                    for (const key in scheda_sc) {
                                        if (Object.hasOwnProperty.call(scheda_sc, key)) {
                                            const element = scheda_sc[key];
                                            try {
                                                var ws= element.meta.website
                                                window.open(element.meta.website);
                                            } catch (error) {
                                                
                                            }
                                        }
                                    }

                                }
                            }
                        }
                        
                    })
            }
            
        })
    //*icon spawning
    d3.select("#sw_comp_svg_container").selectAll(".tick")
        .each(function(e){
            if(! Number.isInteger(e)){ //rimuovo i tick dei num 1-10
                for (const sc in sw_components_fw) {
                    if (Object.hasOwnProperty.call(sw_components_fw, sc)) {
                        if(e.includes(sc)){
                            const uids = sw_components_fw[sc];
                            var i = 0
                            uids.forEach(uid => {
                                CRITICAL_FO.system.forEach(crit_fo => {
                                    if(crit_fo.uid == uid){ //devo inserire l'icona
                                        txt_elem = d3.select(this).select("text").node().getBoundingClientRect()
                                        i++
                                        d3.select(this).append("svg:image")
                                            .attr('x', txt_elem.width+(i*20))
                                            .attr('y', -20)
                                            .attr('width', 20)
                                            .attr('height', 20)
                                            .attr("xlink:href", "icons/alert_red.png")
                                            .on("click",function(f){
                                                console.log(ALL_REST_RESPONSE[uid].hid)
                                            })
                                    }
                                });
                                SUS_FO.system.forEach(crit_fo => {
                                    if(crit_fo.uid == uid){ //devo inserire l'icona
                                        txt_elem = d3.select(this).select("text").node().getBoundingClientRect()
                                        i++
                                        d3.select(this).append("svg:image")
                                            .attr('x', txt_elem.width+(i*20))
                                            .attr('y', -20)
                                            .attr('width', 20)
                                            .attr('height', 20)
                                            .attr("xlink:href", "icons/alert_yell.png")
                                            .on("click",function(f){
                                                console.log(ALL_REST_RESPONSE[uid].hid)
                                            })
                                    }
                                });
                                NEUTRAL_FO.system.forEach(crit_fo => {
                                    if(crit_fo.uid == uid){ //devo inserire l'icona
                                        txt_elem = d3.select(this).select("text").node().getBoundingClientRect()
                                        i++
                                        d3.select(this).append("svg:image")
                                            .attr('x', txt_elem.width+(i*20))
                                            .attr('y', -20)
                                            .attr('width', 20)
                                            .attr('height', 20)
                                            .attr("xlink:href", "icons/alert_grey.png")
                                            .on("click",function(f){
                                                console.log(ALL_REST_RESPONSE[uid].hid)
                                            })
                                    }
                                });
                                
                            });
                            

                        }
                    }
                }
               
            }
        })

}

