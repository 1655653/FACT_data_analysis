function DrawSWComponents(){
    d3.select("#sw_comp_svg_container").selectAll("*").transition().duration(400).style("opacity","0").remove()
    d3.select("#leftside").transition().duration(400).style("border","none")
    //*text above
    d3.select("#sw_comp_expand").style("visibility","visible")
    d3.select("#leftside").transition().delay(400).duration(400).style("border","solid")
    d3.select("#sw_comp_expand_txt").style("visibility","visible")
    d3.select("#sw_comp_expand_btn").style("visibility","visible")
    d3.select("#sw_comp_expand_btn").on("click",function(d){
        var is_down = d3.select("#sw_comp_expand_btn").select("i").attr("class") == "fas fa-caret-down"? true:false
        if(is_down){
            SWC_ARRAY = ALL_SWC
            d3.select("#sw_comp_expand_btn").select("i").attr("class","fas fa-caret-up")
            d3.select("#sw_comp_expand_txt").text("See only vulnerable Software Components")
            DrawSWComponents()
        }
        else{
            SWC_ARRAY = SW_COMP_CVE_LIGHT
            d3.select("#sw_comp_expand_btn").select("i").attr("class","fas fa-caret-down")
            d3.select("#sw_comp_expand_txt").text("See all Software Components")
            DrawSWComponents()
        }
    })
    //*start drawing svg
    var violin_data = convertSWCtoVolin()
    // set the dimensions and margins of the graph
    var margin_violin = {top: 30, right: 40, bottom: 30, left: 40},
    width_violin = getDimFloat("sw_comp_svg_container","width") - margin_violin.left - margin_violin.right,
    height_violin = (SWC_ARRAY.length*100) - margin_violin.top - margin_violin.bottom;
    //console.log(getDimFloat("leftside","width"))
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
    .domain([ 1,10 ])          // Note that here the Y_viol scale is set manually
    .range([0,width_violin])        

    // Build and Show the Y scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x_viol.bandwidth
    var y_viol = d3.scaleBand()
    .range([ 0, height_violin ])
    .domain(SWC_ARRAY)
    .padding(0.05) // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
    console.log(y_viol.domain())
    svg_violin.append("g").call( d3.axisLeft(y_viol) )

    var si = d3.scaleLinear().domain([4,20]).range([16,9]) //scala per il font size
    svg_violin
        .selectAll("text").text(function(d){
            return d })
        .attr("transform", "translate(0,-10)")
        .style("text-anchor", "start")
        .style("font-size", "17px")
        // .style("font-size", (function(d){
        //     return si(d.length) }))

    svg_violin.append("g")
        .attr("transform", "translate(0," + height_violin + ")")
        .call(d3.axisBottom(x_viol))

    // Features of the histogram
    var histogram = d3.histogram()
        .domain(x_viol.domain())
        .thresholds(x_viol.ticks(10))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
        .value(d => d)
    
        // Compute the binning for each group of the dataset
    var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
        .key(function(d) { 
            return d.cpe_name})
        .rollup(function(d) {   // For each key..
            input = d.map(function(g) { return parseInt(g.score);})    // Keep the variable called Sepal_Length
            bins = histogram(input)   // And compute the binning on it.
            return(bins)
        })
        .entries(violin_data)
    // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
    var maxNum = 0
    for ( i in sumstat ){
      allBins = sumstat[i].value
      lengths = allBins.map(function(a){return a.length;})
      longuest = d3.max(lengths)
      if (longuest > maxNum) { maxNum = longuest }
    }
    

    // The maximum width of a violin must be x_viol.bandwidth = the width dedicated to a group
    var yNum = d3.scaleLinear()
      .range([0, y_viol.bandwidth()])
      .domain([-maxNum,maxNum])
    //console.log(sumstat)
    svg_violin
        .selectAll("myViolin")
        .data(sumstat)
        .enter()        // So now we are working group per group
        .append("g").attr("id",function(d){
            return d.key})
            .attr("transform", function(d){return("translate(0 ," + y_viol(d.key) +"0)") } ) // Translation on the right to be at the group position
        .append("path")
            .attr("class","viol_hist")
            .datum(function(d){return(d.value)})     // So now we are working bin per bin
            .style("stroke", "black")
            .style("fill","red")
            .style("opacity","0")
            .attr("d", d3.area()
                .y0( yNum(0) )
                .y1(function(d){return(yNum(d.length)) } )
                .x(function(d){return(x_viol(d.x0)) } )
                .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
            )
    d3.selectAll(".viol_hist").transition()
            .duration(4000)
            .style("opacity","1")
}

function convertSWCtoVolin(){
    new_dataset = []
    SW_COMP_CVE.forEach(element => {
        all_cve_objs = cve_count(element,SCORE_TYPE)
        element.uid_affected.forEach(uid => {
            all_cve_objs.forEach(cve => {
                var el = {
                    "uid":uid,
                    "hid": ALL_REST_RESPONSE[uid].hid,
                    "score": cve[SCORE_TYPE],
                    "cve_name":cve.cve_code,
                    "cpe_name":element.cpe_name.replace("(CRITICAL)","").trim()
                }
                new_dataset.push(el)
            });
        });

    });
    //console.log(new_dataset)
    return new_dataset
}