var HISTO_RES = 20
function DrawSWComponents(){
    d3.select("#sw_comp_svg_container").selectAll("*").transition().duration(400).style("opacity","0").remove()
    d3.select("#leftside").style("overflow-x","hidden").style("overflow-y","hidden")
    //*text above
    menuSWCOMP()
    //*start drawing svg
    var violin_data = convertSWCtoVolin()
    // set the dimensions and margins of the graph
    var margin_violin = {top: 5, right: 40, bottom: 30, left: 40},
    width_violin = getDimFloat("sw_comp_svg_container","width") - margin_violin.left - margin_violin.right,
    height_violin = (SWC_ARRAY.length*100) - margin_violin.top - margin_violin.bottom;
    
    // append the svg_violin object to the body of the page
    var svg_violin = d3.select("#sw_comp_svg_container")
        .append("svg")
        .attr("width",getDimFloat("sw_comp_svg_container","width")+"px")
        .attr("height", height_violin + margin_violin.top + margin_violin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin_violin.left + "," + margin_violin.top + ")")
        .style("opacity","0");
    svg_violin.transition().delay(400).duration(400)
            .style("opacity","1")

    // Build and Show the Y_viol scale
    var x_viol = d3.scaleLinear()
    .domain([ 0.0,10.0 ])          // Note that here the Y_viol scale is set manually
    .range([0,width_violin])        

    // Build and Show the Y scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x_viol.bandwidth
    var y_viol = d3.scaleBand()
    .range([ 0, height_violin ])
    .domain(SWC_ARRAY)
    .padding(0.05) // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
    //console.log(y_viol.domain())
    svg_violin.append("g").call( d3.axisLeft(y_viol) )

    //var si = d3.scaleLinear().domain([4,20]).range([16,9]) //scala per il font size
    svg_violin
        .selectAll("text").text(function(d){
            h = ""
            SW_COMP_CVE.forEach(element => {
                if( element.cpe_name.includes(d) && element.cpe_name.includes("(CRITICAL)")){
                    h =  " ⚠️"
                }
            });
            return d+h })
        .attr("transform", "translate(10,-12)")
        .style("text-anchor", "start")
        .style("font-size", "17px")
        .on("click",function(d){
            to_hide = d3.select(this).text().replace(" ⚠️","")
            SWC_ARRAY = SWC_ARRAY.filter(e => e !== to_hide)
            SW_COMP_HIDE.push(to_hide)
            d3.select("#reset_sc").style("display","block").style("opacity","0").transition().duration(1000).style("opacity","1")
            DrawSWComponents()
        })

    svg_violin.append("g")
        .attr("transform", "translate(0," + 0 + ")")
        .call(d3.axisBottom(x_viol))

    // Features of the histogram
    var histogram = d3.histogram()
        .domain(x_viol.domain())
        .thresholds(x_viol.ticks(HISTO_RES))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
        .value(d => d)
    
        // Compute the binning for each group of the dataset
    var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
        .key(function(d) { 
            return d.cpe_name})
        .rollup(function(d) {   // For each key..
            input = d.map(function(g) { return parseFloat(g.score);})    // Keep the variable called Sepal_Length
            bins = histogram(input)   // And compute the binning on it.
            return(bins)
        })
        .entries(violin_data)
    // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
    var maxNum = 0
    var local_max = [] //? salva tutti i massimi per ogni sc
    var local_i = 0 //? iteratorore su local max che viene cambiato ogni 11 it
    var it = 0 //? dopo 11 fa cambiare local_i

    for ( i in sumstat ){
        allBins = sumstat[i].value
        //console.log(allBins)
        lengths = allBins.map(function(a){return a.length;})
        longuest = d3.max(lengths)
        local_max.push(longuest)
        if (longuest > maxNum) { maxNum = longuest }
    }
    // The maximum width of a violin must be x_viol.bandwidth = the width dedicated to a group
    var yNum = d3.scaleLinear()
      .range([0, y_viol.bandwidth()])
      .domain([-maxNum,maxNum])

    svg_violin
        .selectAll("myViolin")
        .data(sumstat)
        .enter()        // So now we are working group per group
        .append("g").attr("id",function(d){
            return "g_of_"+d.key})
            .attr("transform", function(d){return("translate(0 ," + y_viol(d.key) +"0)") } ) // Translation on the right to be at the group position
        .append("path")
            .attr("id",function(d){
                return "path_of_"+d.key})
            .attr("class","viol_hist")
            .datum(function(d){return(d.value)})     // So now we are working bin per bin
            .style("stroke", "black")
            .style("fill","red")
            .style("opacity","0")
            .attr("d", d3.area()
                .y0( yNum(0) )
                .y1(function(d){
                    if(GLOBAL) return(yNum(d.length))
                    else{
                        if(it == HISTO_RES+1) { //related to the resolution of the vuioln (ticks)
                            local_i++
                            it = 0
                        }
                        max = local_max[local_i]
                        var yNum_local = d3.scaleLinear()
                            .range([0, y_viol.bandwidth()])
                            .domain([-max,max])
                        it++
                        return(yNum_local(d.length))
                    }
                } )
                .x(function(d){return(x_viol(d.x0)) } )
                .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                //.curve(d3.curveStep)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
            )
            .on("mouseover", function(e){
                d3.selectAll(".tooltip_sw_comp").remove()
                // retrieve the cve the user wants
                var path_wid=d3.select(this).node().getBoundingClientRect()
                var slice = path_wid.width/10
                curr_x = (d3.event.clientX-path_wid.left)/slice
                console.log(curr_x.toFixed(1))
                cpe_name_selected= d3.select(this).attr("id").replace("path_of_","").trim()
                var precision = 0.2
                var cves_list = []
                violin_data.forEach(element => {
                    if(element.cpe_name==cpe_name_selected && element.score > (curr_x-precision) && element.score<(curr_x+precision))
                        cves_list.push(element)
                });
                vis = cves_list.length>0? "visible":"hidden"
                tooltip_rect = d3.select("#sw_comp_svg_container")
                    .append("div")
                    .style("visibility", vis)
                    .attr("class", "tooltip_sw_comp")
                    .style('left', (d3.event.pageX + 1) + 'px')
                    .style('top', (d3.event.pageY + 1) + 'px')
                    // .html(cves_list.map(e => e.cve_name+"<br>Score: "+e.score+"<br>"))
                    cves_list.forEach(e => {
                        d3.select(".tooltip_sw_comp").append("text").text(e.cve_name+" score: "+e.score)
                        d3.select(".tooltip_sw_comp").append("br")
                    });
                  

            })
            .on("mousemove",function(d){
                // retrieve the cve the user wants
                var path_wid=d3.select(this).node().getBoundingClientRect()
                var slice = path_wid.width/10
                curr_x = (d3.event.clientX-path_wid.left)/slice
                console.log(curr_x.toFixed(1))
                cpe_name_selected= d3.select(this).attr("id").replace("path_of_","").trim()
                var precision = 0.1
                var cves_list = []
                violin_data.forEach(element => {
                    if(element.cpe_name==cpe_name_selected && element.score > (curr_x-precision) && element.score<(curr_x+precision))
                        cves_list.push(element)
                });
                console.log(cves_list)
                vis = cves_list.length>0? "visible":"hidden"

                d3.select(".tooltip_sw_comp")
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY) + 'px')
                    .style("visibility", vis)
                    .lower()
                cves_list.forEach(e => {
                    d3.select(".tooltip_sw_comp").append("text").text(e.cve_name+" score: "+e.score)
                        .on("click", function(h){
                            var ur = "https://nvd.nist.gov/vuln/detail/"+e.cve_name
                            window.open(ur, '_blank').focus();
                    })
                    d3.select(".tooltip_sw_comp").append("br")
                });
                    
                //.html(cves_list.map(e => e.cve_name+"<br>Score: "+e.score+"<br>"))

                //if(cves_list.length==0) d3.selectAll(".tooltip_sw_comp").remove()
            })
            .on("click",function(d){
                d3.selectAll(".tooltip_sw_comp").remove()
            })
    d3.selectAll(".viol_hist").transition()
            .duration(4000)
            .style("opacity","1")
    if(height_violin > getDimFloat("leftside","max-height") ) d3.select("#leftside").style("overflow-y","auto")
    d3.selectAll(".tick").each(function(d, i) {
        if(d=="0") d3.select(this).style("opacity","0") //fai sparire il tick zero 0
    })
}



var lock_width = false
var original_width
window.addEventListener("resize", function(event) {
    lock_width = false
    d3.select("#sw_comp_expand_btn").select("i").attr("class","fas fa-ellipsis-h")
    d3.select("#sw_comp_expand_btn").dispatch('click')
})
function menuSWCOMP(){
    //*appearance
    d3.select("#leftside").transition().delay(400).duration(400).style("border","solid")
    d3.select("#sw_comp_expand_btn").style("visibility","visible")
    d3.select("#sc_menu").select("text").style("visibility","visible")
    d3.select("#sw_comp_expand_btn").on("click",function(d){
        var is_vertical = d3.select("#sw_comp_expand_btn").select("i").attr("class") == "fas fa-ellipsis-v"? true:false
        if(is_vertical){
            //apri tutto
            ls_bound = document.getElementById("leftside").getBoundingClientRect();
            set_left = ls_bound.width + ls_bound.left
            //container
            d3.select("#sc_settings_container")
                .style("left",set_left+"px")
            if(!lock_width)
                original_width = getDimFloat("sc_settings_container","width")
            
            
            //radio-button
            if(!lock_width){
                var score_cont = d3.select("#sc_settings_container").append("div").attr("class","radio_toolbar_sc")
                buildBtns(score_cont,"base","score_sc_btn","radioFruit2")
                buildBtns(score_cont,"impact","score_sc_btn","radioFruit2")
                buildBtns(score_cont,"exploitability","score_sc_btn","radioFruit2")
                
            }
            d3.select("#sc_settings_container").select(".radio-toolbar").selectAll("*").style("visibility","visible")
            //ancora container
            lock_width = true
            //console.log(original_width)
            d3.select("#sc_settings_container")
                .style("visibility","visible")
                .style("width","0px")
                .transition().duration(400)
                .style("width",original_width+"px")
            d3.select("#sc_settings_container").selectAll("*")
                .style("visibility","visible")
                .style("opacity","0")
                .transition().duration(400)
                .style("opacity","1")
                
            
            d3.select("#sw_comp_expand_btn").select("i").attr("class","fas fa-ellipsis-h")
        }
        else{
            //chiudi tutto
            d3.select("#sc_settings_container")
                .transition().duration(400)
                .style("width","0px")
                .style("visibility","hidden")

            d3.select("#sc_settings_container").selectAll("*")
                .style("opacity","1")
                .transition().duration(400)
                .style("opacity","0")
                .style("visibility","hidden")

            d3.select("#sw_comp_expand_btn").select("i").attr("class","fas fa-ellipsis-v")
        }
    })

    //*logic
    d3.select("#toggle_global_div").style("visibility","visible").on("change",function(d){
        GLOBAL = !GLOBAL
        d3.select(this).select("text").text(function(d){
            return GLOBAL? "Global max":"Local max" 
        })
        DrawSWComponents()
    })

    d3.select("#reset_sc").on("click",function(d){
        SW_COMP_HIDE = []
        SWC_ARRAY = ALL_SWC
        d3.select(this).transition().duration(1000).style("opacity","0").style("display","none")
        DrawSWComponents()
    })

    d3.select("#toggle_all_sc_div").style("visibility","visible").on("change",function(d){
        var text = "All"
        if(SWC_ARRAY == ALL_SWC){
            SWC_ARRAY = SW_COMP_CVE_LIGHT
            text = "Only vulnerable"
        }
        else{
            SWC_ARRAY = ALL_SWC
        }
        d3.select(this).select("text").text(text)
        DrawSWComponents()
    })
}


