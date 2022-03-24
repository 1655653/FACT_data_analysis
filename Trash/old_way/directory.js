
mime_filtered = []

var margin_dir = {top: 30, right: 20, bottom: 30, left: 20},
widthdir = 500,
barHeight = 20,
barWidth = (widthdir - margin_dir.left - margin_dir.right) * 0.8;

var i = 0,
duration = 400,
root;

var diagonal = d3.linkHorizontal()
    .x(function(d) { return d.y; })
    .y(function(d) { return d.x; });

var svg_dir
var clicked = []
function DrawDirectory(){
    //console.log(clicked)
    d3.select("#treemap_div").select("#directory").remove();
    svg_dir = d3.select("#treemap_div").append("svg")
        .attr("width", widthdir) // + margin.left + margin.right)
        .attr("id","directory")
        .append("g")
        .attr("transform", "translate(" + margin_dir.left + "," + margin_dir.top + ")");

    root = d3.hierarchy(Tree).sort(function(a, b) { 
        if(a.data.uid=="folder" && b.data.uid!="folder") return -1
        if(b.data.uid=="folder" && a.data.uid!="folder") return 1
        else{
            return d3.ascending(a.data.hid, b.data.hid)
        }
    })
    //root.each(function(d) { if(d.data.children.length>max_child) max_child = d.data.children.length});
    //console.log(max_child)
    //PRINT ROOOT
    // console.log(
    //     root.children.map(
    //         d => ["hid", d.data.hid])
    // );
    root.x0 = 0;
    root.y0 = 0;
    function hideChildren(node) {
        if(node.children) {
            node._children = node.children;
            var cesta = false
            clicked.forEach((element,i) => {
                if(element.data.vi==node.data.vi) cesta = true
            });
            if(!cesta){
                node.children = null;
            }
            node._children.forEach(hideChildren);
        }
    }
    hideChildren(root);
    update(root);

    
}


function update(source) {
    
    // Compute the flattened node list.
    var nodes = root.descendants();

    var height = Math.max(500, nodes.length * barHeight + margin_dir.top + margin_dir.bottom);

    d3.select("#directory").transition()
    .duration(duration)
    .attr("height", height);

    d3.select(self.frameElement).transition()
    .duration(duration)
    .style("height", height + "px");

    // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
    var index = -1;
    root.eachBefore(function(n) {
    n.x = ++index * barHeight;
    n.y = n.depth * 20;
    });

    // Update the nodes…
    var node_dir = svg_dir.selectAll(".node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); })
    .style("fill", function(d) { return fillnode(d)});


    var nodeEnter = node_dir.enter().append("g").attr("class", "node").attr("id",function(d){return d.data.hid.replace(/[/.]/g,"_").replace(/\s/g, '')})  // <-- 2
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
    .style("opacity", 0)


    // Enter any new nodes at the parent's previous position.
    nodeEnter.append("rect")
    .attr("class", function(d){return d.data.mime? "path"+d.data.mime.split("/")[0]: "folder_"+d.data.vi}) //?mime supertype
    .attr("id",function(d){return d.data.mime? "path"+d.data.mime.replace(/[/.]/g,"_"): "folder_"+d.data.vi})//? mime subtype// <-- 2
    .attr("y", -barHeight / 2)
    .attr("height", barHeight)
    .attr("width", barWidth)
    .style("fill", function(d) { return fillnode(d)})
    .on("click", click);

    nodeEnter.append("text")
    .style("fill", "black")
    .attr("dy", 3.5)
    .attr("dx", 5.5)
    .text(function(d) { return d.data.hid; });

    // Transition nodes to their new position.
    nodeEnter.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    .style("opacity", function(d) {return d.data.filtered? 0.2 : 1})


    node_dir.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    .style("opacity", function(d) {return d.data.filtered? 0.2 : 1})
    .select("rect")
    .style("fill", function(d) { return fillnode(d)});

    // Transition exiting nodes to the parent's new position.
    node_dir.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
    .style("opacity", 0)
    .remove();

    // Update the links…
    var link_dir = svg_dir.selectAll(".link_dir")
    .data(root.links(), function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    //var si = d3.scaleLinear().domain([0,max_child]).range(["red","green"]) //scala per il font size della y

    link_dir.enter().insert("path", "g")
    .attr("class", "link_dir")
    // .style("stroke",function(d){return si(d.target.data.children.length)}) 
    .style("stroke",function(d){
        try {
            r = d.target.data.children.length!=0 ? d3.select("#folder_"+d.target.data.vi).style("fill"): "white"
        } catch (error) {
            console.log("style error")
            r = "white"
        }
    }) 
    .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
    })
    .transition()
    .duration(duration)
    .attr("d", diagonal);

    // Transition links to their new position.
    link_dir.transition()
    .duration(duration)
    .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link_dir.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
    })
    .remove();

    // Stash the old positions for transition.
    root.each(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
    });
    }


// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
        var index = -1
        clicked.forEach((e,i) => {
            if(e.data.vi == d.data.vi) index = i
        });
        if (index !== -1) {
            clicked.splice(index, 1);
        }
        
    } else {
        d.children = d._children;
        d._children = null;

        var index = -1
        if(d.data.children.length!=0){
            clicked.forEach((e,i) => {
                if(e.data.vi == d.data.vi) index = i
            });
            if (index == -1) {
                    clicked.push(d)
            }
            else{
                clicked.splice(index, 1);
            }
        }
        
    }
    if(d.data.children.length==0){
        details_I_II(d.data.uid)
    }
    //console.log(clicked)
    update(d);
}


function FilterMIME(){
    
    ListMimes.forEach(element => {
        if(!mime_filtered.includes(element) && d3.select('#'+element.split("/")[0]).property('checked')) mime_filtered.push(element)
        if(!mime_filtered.includes(element) && d3.select('#'+element.replace(/[/.]/g,"_")).property('checked')) mime_filtered.push(element)
        if(!d3.select('#'+element.split("/")[0]).property('checked') && !d3.select('#'+element.replace(/[/.]/g,"_")).property('checked')){
            mime_filtered = mime_filtered.filter(e => e != element)
            Tree = JSON.parse(JSON.stringify(BackupTree))
            LabelMimeFOFromTree(Tree,mime_filtered)
        }
    });
    if(mode != "mode = highligths"){ //? checked è remove, unchecked è opacize
        RemoveMimeFOFromTree(Tree,mime_filtered)
        console.log(Tree)
        calculateLeaves(Tree)
        calculateMimes(Tree)
    }
    else{
        LabelMimeFOFromTree(Tree,mime_filtered)
    }
    
    //console.log(mime_filtered)

    DrawDirectory()
    
}

function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }

function fillnode(d){
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
}

function showsubType(type){
    d3.select("#filter_menu_subtype").style("display","block")
    var color = colormimeSupertype(type)
    var opacity = 1
    not_checked = 0
    ListMimes.forEach(subtype => {
        var op = "hidden"
        if(type == subtype.split("/")[0]){
            if(d3.select('#details'+type).property('checked')){
                op = "visible"
                color = "#8e9297"
                opacity = 0.3
            }
            d3.select("#"+subtype.replace(/[/.]/g,"_")).style("visibility", function(){return op})
            d3.select("#text"+subtype.replace(/[/.]/g,"_")).style("visibility", op)
        }
        if(!d3.select('#details'+subtype.split("/")[0]).property('checked')) not_checked++

    });
    if(not_checked==ListMimes.length) d3.select("#filter_menu_subtype").style("display","none")
    d3.select("#text"+type).style("color",color).style("opacity", opacity)
    DrawDirectory()

    if(type == d3.select("#mime_tspan").text().split("/")[0]){
        var span_color  = d3.select('#details'+type.split("/")[0]).property('checked')? colormimeSubtype(d3.select("#mime_tspan").text()) : colormimeSupertype(type)
        
        d3.select("#mime_tspan").transition().delay(600).style("color",span_color)
    }

}
