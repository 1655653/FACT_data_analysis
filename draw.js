
//*--------------------SUNBURST VARS
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

var svg = d3.select("#treemap_div")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
// Data strucure
var partition = d3.partition()
    .size([2 * Math.PI, radius]);
//* --------------------SUNBURST VARS
function DrawSunburst(){
    //reset old draw
    d3.select("#treemap_div").selectAll("*").remove();
    svg = d3.select("#treemap_div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    g = svg.append("g")
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    
    // create a tooltip
    var Tooltip = d3.select("#treemap_div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")
    
    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("opacity", 1)
    }
    var mousemove = function(d) {
        var m =""
        var b = "<br>size(bytes):"+d.data.size
        if(d.data.uid != "folder") m = "<br>mime type: "+d.data.mime
        if(d.data.size==0){
            b = ""
        }
        Tooltip
            .html("hid:" + d.data.hid + "<br>uid:"+d.data.uid+b+m)
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY + 10) + 'px')
    }
    var mouseleave = function(d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.9})
    }

    var root = d3.hierarchy(Tree).sum(function (d) { 
        //console.log(d);
        //return d.bytes
        var leafnum = d.contacome
        if(d.leaves==0) leafnum = 2
        //console.log(d)
        return document.getElementById("byteCBOX").checked ? d.bytes : leafnum
        // return (d.children ? 0 : d.bytes)
    }); 
    //console.log(root)
    partition(root);
    var arc = d3.arc()
        .startAngle(function (d) {return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });
        // Put it all together
    



    //* draw each node
    
    g.selectAll('g')  // <-- 1
        .data(root.descendants())
        .enter().append('g').attr("class", "node").attr("id",function(d){return d.data.hid})  // <-- 2
        .append('path')  // <-- 2
        .attr("display", function (d) { return d.depth  })
        .attr("d", arc)
        .style('stroke', 'white')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.hid); })
        //.style("fill", getColorByValue)
        .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.9})
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    
}

