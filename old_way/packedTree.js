function buildpackedTree(list_packed_uid){
    //root
    var packedTree={
        "name":"Unpacker log",
        "children":[]
    }
    //nodes
    list_unpack_errors=[]
    list_packed_uid.forEach(element => {
        var selectedFO = all_REST_response[element]
        var errtype = selectedFO.unpacker.info
        if(errtype == undefined) errtype = "undefined error"
        if(selectedFO.unpacker["0_ERROR_genericFS"]) errtype = "genericFSerror"
        if(UNPACK_BLACKLISTED.includes(selectedFO.mime)) errtype = "blacklisted file type"
        if(! list_unpack_errors.includes(errtype)) 
        {
            list_unpack_errors.push(errtype)
            var errobj = {"name": errtype,"children":[]}
            packedTree.children.push(errobj)
        }
    });
    //leaves
    packedTree.children.forEach(err => {
        list_packed_uid.forEach(  (fo ,index)=> {
            var selectedFO = all_REST_response[fo]
            var errtype = selectedFO.unpacker.info
            if(errtype == undefined) errtype = "undefined error"
            if(selectedFO.unpacker["0_ERROR_genericFS"]) errtype = "genericFSerror"
            if(UNPACK_BLACKLISTED.includes(selectedFO.mime)) errtype = "blacklisted file type"
            var el ={"name": list_packed_hid[index], "leaf" : true, "uid": fo} 
            if(err.name==errtype) err.children.push(el)
        });
    });
    return packedTree
}

function expandpackedTree(){
    var expandbtn = document.getElementById("packed_tree_expand");
    if (expandbtn.style.display === "none") {
        d3.select("#packed_tree_expand_btn").text("collapse")
        d3.select("#log_packed_FO").style("visibility","visible")
        expandbtn.style.display = "block";
        //!------------
        var treeData = buildpackedTree(list_packed_uid)
        console.log(treeData)
        var heightbc = height/5
        var marginbc = {top: 10, right: 90, bottom: 30, left: 150}
        var svg_bc_pckd = d3.select("#packed_tree_expand")
            .append("svg")
                .attr("width", "100%")
                .attr("height", heightbc + marginbc.top + marginbc.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + marginbc.left + "," + marginbc.top + ")");
        
        var i = 0,
        duration = 750,
        root;   
        var treemap = d3.tree().size([heightbc, width]);
        // Assigns parent, children, height, depth
        root = d3.hierarchy(treeData, function(d) { return d.children; });
        root.x0 = height / 2;
        root.y0 = 0;
        // Collapse after the second level
        root.children.forEach(collapse);

        update(root);
        // Collapse the node and all it's children
        function collapse(d) {
            if(d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
            }
        }
        
        function update(source) {

            // Assigns the x and y position for the nodes
            var treeData = treemap(root);

            // Compute the new tree layout.
            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);

            // Normalize for fixed-depth.
            nodes.forEach(function(d){ d.y = d.depth * 180});

            // ****************** Nodes section ***************************

            // Update the nodes...
            var node = svg_bc_pckd.selectAll('g.node')
                .data(nodes, function(d) {return d.id || (d.id = ++i); });

            // Enter any new modes at the parent's previous position.
            var nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', clickPackedFO);

            // Add Circle for the nodes
            nodeEnter.append('circle')
                .attr('class', 'node')
                .attr('r', 1e-6)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            // Add labels for the nodes
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", function(d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) { return d.data.name; });

            // UPDATE
            var nodeUpdate = nodeEnter.merge(node);

            // Transition to the proper position for the node
            nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) { 
                return "translate(" + d.y + "," + d.x + ")";
            });

            // Update the node attributes and style
            nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


            // Remove any exiting nodes
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            // On exit reduce the node circles size to 0
            nodeExit.select('circle')
            .attr('r', 1e-6);

            // On exit reduce the opacity of text labels
            nodeExit.select('text')
            .style('fill-opacity', 1e-6);

            // ****************** links section ***************************

            // Update the links...
            var link_pckd = svg_bc_pckd.selectAll('path.link_pckd')
                .data(links, function(d) { return d.id; });

            // Enter any new links at the parent's previous position.
            var linkEnter = link_pckd.enter().insert('path', "g")
                .attr("class", "link_pckd")
                .attr('d', function(d){
                var o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
                });

            // UPDATE
            var linkUpdate = linkEnter.merge(link_pckd);

            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', function(d){ return diagonal(d, d.parent) });

            // Remove any exiting links
            var linkExit = link_pckd.exit().transition()
                .duration(duration)
                .attr('d', function(d) {
                var o = {x: source.x, y: source.y}
                return diagonal(o, o)
                })
                .remove();

            // Store the old positions for transition.
            nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
            });

            // Creates a curved (diagonal) path from parent to the child nodes
            function diagonal(s, d) {

                var path_tree = `M ${s.y} ${s.x}
                        C ${(s.y + d.y) / 2} ${s.x},
                            ${(s.y + d.y) / 2} ${d.x},
                            ${d.y} ${d.x}`

                return path_tree
            }

            // Toggle children on click.
            function clickPackedFO(d) {
                console.log(d)
                if(d.data.leaf) {
                    talkAboutPackedFO(d.data.uid)
                    details_I_II(d.data.uid)
                }
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                    } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
                
            }
        }
    } else {
        d3.select("#packed_tree_expand_btn").text("expand")
        d3.select("#packed_tree_expand").selectAll("*").remove();
        expandbtn.style.display = "none";
        d3.select("#log_packed_FO").style("visibility","hidden")
  }
}


function packedUI(unpack_list_size){
    var txt =""
    if(list_packed && unpack_list_size>0){//? se ci sono packed allora li mette
        txt ="FACT has not been able to unpack "+ list_packed.length + " elements  " 
        d3.select("#reportOf").append("text").text(txt)
            .append("button").text("expand").attr("id","packed_tree_expand_btn")
                .on("click",expandpackedTree)
        d3.select("#reportOf").append("div").attr("id","packed_tree_expand").style("display","none")
        
        
    }
    else if(unpack_list_size == 0){
        txt ="FACT unpacked 0 elements " 
        d3.select("#reportOf").append("text").text(txt)
    }
    else {
        txt = "FACT has been able to unpack every elements  "
        d3.select("#reportOf").append("text").text(txt)
    }
    d3.select("#reportOf").append("text").attr("id","log_packed_FO")
}

function talkAboutPackedFO(FOuid){
    var selectedFO = all_REST_response[FOuid]
    console.log(selectedFO)
    console.log(FOuid)
    var tail = " ( MIME: "+selectedFO.mime+")  "
    var mime_check = "The file type of " + selectedFO.hid + " is not blacklisted, so it should have been unpacked" 
    if(selectedFO.unpacker["0_ERROR_genericFS"]) mime_check = "During the unpacking process of " + selectedFO.hid + ", a genericFS error arisen"
    if(UNPACK_BLACKLISTED.includes(selectedFO.mime))  mime_check= "Unpacking of " + selectedFO.hid + " skipped due to blacklisted file type"
    var descr = d3.select("#log_packed_FO").text(mime_check+"      ")
        descr.append('tspan').text(tail).style("color",colormimeSupertype(selectedFO.mime.split("/")[0]))
        descr.append("button").text("download").attr("id","dwld")
            .on("click",function(){download( FOuid ,selectedFO.mime)})
}


function zoomOnPackedFO(FOuid){
    var selectedFO = all_REST_response[FOuid]
    var hid = selectedFO.hid
    //g.selectAll('.node#'+hid.replace(/[/.]/g,"_")).select("path").dispatch('click')

}