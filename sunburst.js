

var margin_sb = {top: 0, right: 0, bottom: 0, left: 0}
// width_sb = 330 - margin_sb.left - margin_sb.right,
// height_sb = 330 - margin_sb.top - margin_sb.bottom;
// var radius = Math.min(width_sb, height_sb) / 2;

var sun_mode_child = true

function DrawSunburst(){
    d3.select("#toggle_sun_div").style("visibility","visible")
        .on("change",function(d){
            sun_mode_child = !sun_mode_child
            var text = sun_mode_child ? "Leaves":"Size"
            d3.select(this).select("text").text(text)
            DrawSunburst()
        })
        .on("mouseover",function(d){
            d3.select(this).transition().duration(500).style("opacity","1")
        })
        .on("mouseout",function(d){
            d3.select(this).transition().duration(500).style("opacity","0.5")
        })
    d3.select("#bigsun").remove()
    d3.selectAll(".tooltip_sb").remove()

    var width_sb = d3.select("#leftside").node().getBoundingClientRect().width.toFixed(2)
    var height_sb = width_sb
    var radius = Math.min(width_sb, height_sb) / 2;

    var svg_sb = d3.select("#sb_container")
      .append("svg")
          .attr("id","bigsun")
          .attr("width", width_sb + margin_sb.left + margin_sb.right)
          .attr("height", height_sb + margin_sb.top + margin_sb.bottom)
    // d3.select("#container").attr("height", height_sb + margin.top + margin.bottom)
    var g_sb = svg_sb.append("g")
        .attr('transform', 'translate(' + width_sb / 2 + ',' + height_sb / 2 + ')');
    //* create a tooltip
    var Tooltip = d3.select("#sb_container")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip_sb")

    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1)
            .style("visibility", "visible")
        d3.select(this).style("opacity", 1)
        connectWithRd(d.data.hid,"mouseover")
        connectWithSc(d.data.hid,"mouseover")
        connectWithBp(d.data.hid,"mouseover")
    }

    var mousemove = function(d) {
        var m =""
        var b = "<br>size(bytes):"+d.data.size
        if(d.data.uid != "folder") m = "<br>mime type: "+d.data.mime
        if(d.data.size==0){
            b = ""
        }
        var f = d.data.uid != "folder"? "":d.data.uid + ": "
        var rank = d.data.uid=="folder"? "": "<br><span>Ranked as: "+d.data.rank+"</span>"
        if(d.data.rank == undefined) rank =""
        var dtls = ""
        if(d.data.rank=="Other") dtls = "<br>uid:"+d.data.uid+b+m
        Tooltip
            // .html("hid:" + d.data.hid + "<br>uid:"+d.data.uid+b+m)
            .html(f+d.data.hid+rank+dtls)
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY + 10) + 'px')
        Tooltip.select("span").style("color", function(){
            if(d.data.rank =="Critical") return "red"
            if(d.data.rank =="Suspicious") return "yellow"
            return 
        })
    }
    var mouseleave = function(d) {
        connectWithRd(d.data.hid,"mouseleave")
        connectWithSc(d.data.hid,"mouseleave")
        connectWithBp(d.data.hid,"mouseout")
        Tooltip
            .style("opacity", 0)
            .style("visibility", "hidden")

        d3.select(this)
            .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.8})
    }
    //*----tooltip
    // Data strucure
    var partition = d3.partition()
            
    var x_sb = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

    var y_sb = d3.scaleSqrt()
    .range([0, radius]);

    var root = d3.hierarchy(Tree).sum(function (d) { 
        //console.log(d);
        //return d.bytes
        var leafnum = d.contacome
        if(d.leaves==0) leafnum = 2
        //console.log(d)
        return sun_mode_child ? leafnum :  d.bytes 
        // return (d.children ? 0 : d.bytes)
        // return leafnum
    }); 

    partition(root);

    //* arc management
    var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x_sb(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x_sb(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y_sb(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y_sb(d.y1)); });

    //* draw each node
    g_sb.selectAll('g')  
    .data(root.descendants())
        .enter().append('g').attr("class", "node").attr("id",function(d){return "sb_"+d.data.hid.replace(/[/.]/g,"_").replace(/\s/g, '')})  // <-- 2
        .append('path')
            .attr("class", function(d){return d.data.mime? "sb_path"+d.data.mime.split("/")[0]: "folder"}) //?mime supertype
            .attr("id",function(d){return d.data.mime? "sb_path"+d.data.mime.replace(/[/.]/g,"_"): "folder"})//? mime subtype// <-- 2
            .attr("display", function (d) { return d.depth  })
            .attr("d", arc)
            .style('stroke', '#4f545c')
            .style("opacity", function(d) {return d.data.filtered? 0.2 : 0.8})
            .style("fill",function(d){//devi vedere come colorare le folder
                //return colormimeSupertype(d.data.mime)
                if(d.data.mime){
                    try {
                        if(d3.select("#"+d.data.mime.split("/")[0]+"_checkbox").node().checked){
                            if(moreThanOne(d.data.mime))
                            return colormimeSubtype(d.data.mime)
                        }
                        return colormimeSupertype(d.data.mime.split("/")[0])  
                        
                    } catch (error) {
                        return colormimeSupertype(d.data.mime.split("/")[0]) 
                    }
                }
                else{ //se sono mixed folder do un colore standrd, senno quello del figlio
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
                        checkbox = d3.select("#"+mime.split("/")[0]+"_checkbox").node()
                        if(checkbox != null)
                            if(checkbox.checked)
                                if(moreThanOne(mime))
                                    return colormimeSubtype(mime)
                        return colormimeSupertype(mime.split("/")[0])
                        
                    }
                    else return "#7da19d" //folder yellow
                }
            })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .on("click", click)
    
    d3.select("#bigsun").style("opacity","0").transition().duration(400).style("opacity","1")
    bs_w = parseFloat(d3.select("#bigsun").style("width").replace("px"))
    // d3.select("#toggle_sun_div").style("left",bs_w/2-20+"px")
    // d3.select("#toggle_sun_div").style("top",bs_w/2+20+"px")
    d3.select("#toggle_sun_div").style("top","49%")
    d3.select("#toggle_sun_div").style("width","fit-content")
    d3.select("#toggle_sun_div").style("left","40%")

    
    
    function click(d) {
        // colorMiniSunburst(d)
        var viz = d.depth==0? viz = "visible":"hidden"
        d3.select("#toggle_sun_div").style("visibility",viz)
        svg_sb.transition()
            .duration(750)
            .tween("scale", function() {
            var xd = d3.interpolate(x_sb.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y_sb.domain(), [d.y0, 1]),
                yr = d3.interpolate(y_sb.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) { x_sb.domain(xd(t)); y_sb.domain(yd(t)).range(yr(t)); };
            })
        .selectAll("path")
            .attrTween("d", function(d) { return function() { return arc(d); }; });
        clickRd(d.data.hid)


        // if(d.height == 0){
        //     d3.select("#treemap_div").append("button").attr("id","dwnl_leaf").text("download").style("height","fit-content").style("align-self","center")
        //     .on("click",function(f){download(d.data.uid,d.data.mime)})
        //     .append("br")
        // }
        // else{
        //     d3.select("#dwnl_leaf").remove()
        // }
    }
}