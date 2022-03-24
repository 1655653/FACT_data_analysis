function DrawViolin(){
    // set the dimensions and margins of the graph
    var margin_violin = {top: 30, right: 0, bottom: 30, left: 40},
    width_violin = 600 - margin_violin.left - margin_violin.right,
    height_violin = 700 - margin_violin.top - margin_violin.bottom;

    // create a tooltip
    var tooltip_violin = d3.select("#violin_div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    var mouseover = function(d) {
        tooltip_violin
            .style("opacity", 1)
            .style("visibility", "visible")
        d3.select(this).raise().attr("stroke","black");
    }
    var mousemove = function(d) {
        tooltip_violin
            .html("hid:"+d.hid+ "<br>uid:" + d.uid + "<br>cve_name:"+d.cpe_name+ "<br>score:"+d.score2)
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY + 10) + 'px')
    }
    var mouseleave = function(d) {
        tooltip_violin
            .style("opacity", 0)
            .style("visibility", "hidden")
        d3.select(this).attr("stroke","white");

    }
    // append the svg_violin object to the body of the page
    var svg_violin = d3.select("#violin_div")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height_violin + margin_violin.top + margin_violin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin_violin.left + "," + margin_violin.top + ")");
    // Build and Show the Y_viol scale
    var x_viol = d3.scaleLinear()
    .domain([ 0,10 ])          // Note that here the Y_viol scale is set manually
    .range([0,width_violin])

    // Build and Show the Y scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x_viol.bandwidth
    var y_viol = d3.scaleBand()
    .range([ 0, width_violin ])
    .domain(violin_dom)
    .padding(0.05)     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
    
    svg_violin.append("g").call( d3.axisLeft(y_viol) )
    
    var si = d3.scaleLinear().domain([4,20]).range([16,9]) //scala per il font size
    svg_violin.selectAll("text").text(function(d){
        var sp = d.split(" ")
        var name = sp[0]
        if(sp.at(-1)=="(CRITICAL)") name+="⚠️"
        return name
    })
    .attr("transform", "translate(-25,10)rotate(-75)")
    .style("text-anchor", "start")
    .style("font-size", si(violin_dom.length))

    svg_violin.append("g")
      .attr("transform", "translate(0," + width_violin + ")")
      .call(d3.axisBottom(x_viol))
      
    // Features of the histogram
    var histogram = d3.histogram()
    .domain(x_viol.domain())
    .thresholds(x_viol.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
    .value(d => d)
    // Compute the binning for each group of the dataset
    var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
        .key(function(d) { 
            //console.log(d)
            return d.cpe;})
        .rollup(function(d) {   // For each key..
            input = d.map(function(g) { return g.score2;})    // Keep the variable called Sepal_Length
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

    var dotColor = d3.scaleOrdinal().domain(violin_dom).range(d3.schemeAccent)

    // Add the shape to this svg_violin!
    
    svg_violin
      .selectAll("myViolin")
      .data(sumstat)
      .enter()        // So now we are working group per group
      .append("g").attr("id",function(d){return d.key})
        .attr("transform", function(d){return("translate(0 ," + y_viol(d.key) +"0)") } ) // Translation on the right to be at the group position
        
      .append("path")
          .attr("class","viol_hist")
          .datum(function(d){return(d.value)})     // So now we are working bin per bin
          .style("stroke", "black")
          .style("fill","grey")
          .style("opacity","0")
          .attr("d", d3.area()
            .y0( yNum(0) )
            .y1(function(d){return(yNum(d.length)) } )
            .x(function(d){return(x_viol(d.x0)) } )
            .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
          )



        // Add individual points with jitter
        var jitterWidth = 15
        var rnd_offset = Math.random()
        svg_violin
            .selectAll("indPoints")
            .data(violin_data)
            .enter()
            .append("circle")
            .on("click",function(d){zoomOnPackedFO(d.uid)})
            .on("mouseover",mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .on("dblclick",DownloadFO)

            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(1500)
            .attr("cy", function(d){ 
                return (y_viol(d.cpe) + y_viol.bandwidth()/2 - Math.random()*jitterWidth)
            })
            .attr("cx", function(d){return(x_viol(d.score2))})
            .attr("r", 5)
            .style("fill", function(d){ return(dotColor(d.uid))})
            .attr("stroke", "white")

        d3.selectAll(".viol_hist").transition()
          .duration(4000)
          .style("opacity","1")
}
var DownloadFO = function(d) {
    console.log("download started"); download( d.uid ,all_REST_response[d.uid].data.file_object.analysis.file_type.mime )
}

//* create the datastructure for the violin chart
function buildViolinData(cve_lookup){
    violin_data = []
    violin_dom = []
    for (const cve_key in cve_lookup.summary) {
        if (Object.hasOwnProperty.call(cve_lookup.summary, cve_key)) {
            const cve = cve_lookup.summary[cve_key];
            violin_dom.push(cve_key)
            cve.forEach(element => {
                var cve_res = all_REST_response[element].cve_results
                var hidd = all_REST_response[element].hid
                for (const key in cve_res) {
                    if (Object.hasOwnProperty.call(cve_res, key)) {
                        const fo = cve_res[key];
                        for (const key in fo) {
                            if (Object.hasOwnProperty.call(fo, key)) {
                                const fo_cve = fo[key];
                                var el = {
                                        "uid":element,
                                        "hid":hidd,
                                        "score2":fo_cve.score2,
                                        "score3":fo_cve.score3,
                                        "cpe":cve_key,
                                        "cpe_name":key,
                                        "cpe_version":fo_cve.cpe_version

                                    }
                                violin_data.push(el)
                            }
                        }
                        
                    }
                }
            });
        }
    }
    
    
}
//? esempio
// {
//     "fo_name": "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368",
//     "score2": "5.0",
//     "cve": "BusyBox 1.7.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368",
//     "score2": "7.2",
//     "cve": "BusyBox 1.7.2 (CRITICAL)"
//   },