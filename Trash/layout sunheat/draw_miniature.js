
//*--------------------SUNBURST VARS
// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 10, left: 0},
  widthmini = 200 - margin.left - margin.right,
  heightmini = 200 - margin.top - margin.bottom;
var radiusmini = Math.min(widthmini, heightmini) / 2;



var svgmini = d3.select("#filter_menu_type")
    .append("svg")
        .attr("id","minisun")
        .attr("width", widthmini + margin.left + margin.right)
        .attr("height", heightmini + margin.top + margin.bottom)
var gmini = svgmini.append("g")
        .attr('transform', 'translate(' + widthmini / 2 + ',' + heightmini / 2 + ')');

// Data strucure
var partitionmini = d3.partition()
        

//* --------------------SUNBURST VARS
function DrawMiniSunburst(){
    var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);
    
    var y = d3.scaleSqrt()
    .range([0, radiusmini]);
    //reset old draw
    d3.select("#filter_menu_type").select("#minisun").remove();
    svgmini = d3.select("#filter_menu_type")
    .append("svg")
    .attr("id","minisun")
    .attr("width", widthmini + margin.left + margin.right)
    .attr("height", heightmini + margin.top + margin.bottom)
    gmini = svgmini.append("g")
    .attr('transform', 'translate(' + widthmini / 2 + ',' + heightmini / 2 + ')');
    


    var root = d3.hierarchy(Tree).sum(function (d) { 
        var leafnum = d.contacome
        if(d.leaves==0) leafnum = 2
        return document.getElementById("byteCBOX").checked ? d.bytes : leafnum
    }); 

    partitionmini(root);
    var arcmini = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });
    //     // Put it all together
    
    
    //* draw each node

    gmini.selectAll('g')  // <-- 1
        .data(root.descendants())
        .enter().append('g').attr("class", "node").attr("id",function(d){return "mini_"+d.data.hid})  // <-- 2
        .append('path')
            .attr("id",function(d){return "path_mini_"+d.data.hid})// <-- 2
        .attr("display", function (d) { return d.depth  })
        .attr("d", arcmini)
        .style('stroke', '#4f545c')
        .style("fill", "black")
        .style("fill", function (d) { return d.parent? "black":"green"; })
        .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.8})
    

    
}

function colorMiniSunburst(n){
    gmini.selectAll('path')
        .style("fill", function(d){
            return d.data.vi == n.data.vi? "green": "black" 
        })
        .style("stroke",function(d){
            return d.data.vi == n.data.vi? "white": "#4f545c" 
        })
        .style("opacity",function(d){
            return d.data.vi == n.data.vi? "1": "0.8" 
        })
}