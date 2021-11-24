
//*--------------------SUNBURST VARS
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 100},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;
var radius = Math.min(width, height) / 2;



var svg = d3.select("#treemap_div")
    .append("svg")
        .attr("id","bigsun")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
d3.select("#container").attr("height", height + margin.top + margin.bottom)
//d3.select("#treemap_div").attr("width", "60%").attr("flex-grow","1")
var g = svg.append("g")
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
// Data strucure
var partition = d3.partition()
        
var x = d3.scaleLinear()
.range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
.range([0, radius]);

//* --------------------SUNBURST VARS
function DrawSunburst(){
    //reset old draw
    d3.select("#treemap_div").select("#bigsun").remove();
    d3.select("#treemap_div").select(".tooltip").remove();
    svg = d3.select("#treemap_div").style("border-style","ridge")
    .append("svg")
    .attr("id","bigsun")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    g = svg.append("g")
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    
    // create a tooltip
    var Tooltip = d3.select("#treemap_div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    // .style("background-color", "#4f545c")
    // .style("border", "solid")
    // .style("border-width", "2px")
    // .style("border-radius", "5px")
    // .style("padding", "5px")
    // .style("position", "absolute")
    
    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1)
            .style("visibility", "visible")
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
            .style("visibility", "hidden")

        d3.select(this)
            .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.8})
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

    //* arc management
    var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });
    //     // Put it all together
    
    



    //* draw each node


    //console.log(Tree)
    g.selectAll('g')  // <-- 1
        .data(root.descendants())
        .enter().append('g').attr("class", "node").attr("id",function(d){return d.data.hid.replace(/[/.]/g,"_").replace(/\s/g, '')})  // <-- 2
        .append('path')
            .attr("class", function(d){return d.data.mime? "path"+d.data.mime.split("/")[0]: "folder"}) //?mime supertype
            .attr("id",function(d){return d.data.mime? "path"+d.data.mime.replace(/[/.]/g,"_"): "folder"})//? mime subtype// <-- 2
        .attr("display", function (d) { return d.depth  })
        .attr("d", arc)
        .style('stroke', '#4f545c')
        //.style("fill", function (d) { return color(d.data.mime? d.data.mime :d.parent.hid); })
        .style("fill", function (d) {
            var expandbtn = document.getElementById("packed_tree_expand");
            //if(d.data.packed && expandbtn.style.display !== "none") return "black" 
            if(d.data.mime){
                if(d3.select('#details'+d.data.mime.split("/")[0]).property('checked')){
                    if(moreThanOne(d.data.mime))
                        return colormimeSubtype(d.data.mime)
                }
                return colormimeSupertype(d.data.mime.split("/")[0])  
            } 
            else{
                var only = 0
                var mime
                for (const key in d.data.mime_types) {
                    if (Object.hasOwnProperty.call(d.data.mime_types, key)) {
                        const element = d.data.mime_types[key];
                        if(element!=0){
                            only++
                            mime = key
                        }
                        
                    }
                }
                if(only == 1) {//? il nodo non foglia ha solo 1 tipo di figlio
                    if(d3.select('#details'+mime.split("/")[0]).property('checked'))
                        if(moreThanOne(mime))
                            return colormimeSubtype(mime)
                    return colormimeSupertype(mime.split("/")[0])
                }
                else return "#7da19d" //folder yellow
                
                
            }
            
        })
        .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.8})
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", click)

        function click(d) {
            colorMiniSunburst(d)
            //console.log(d)
            svg.transition()
                .duration(750)
                .tween("scale", function() {
                  var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                      yd = d3.interpolate(y.domain(), [d.y0, 1]),
                      yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                  return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
                })
              .selectAll("path")
                .attrTween("d", function(d) { return function() { return arc(d); }; });
          }
    
}

