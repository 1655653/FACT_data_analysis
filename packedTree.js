function buildpackedTree(list_packed_uid){
    //root
    var packedTree={
        "name":"Unpacker log",
        "children":[]
    }
    //nodes
    list_unpack_errors=[]
    list_packed_uid.forEach(element => {
        var selectedFO = all_REST_response[element].data.file_object
        var errtype = selectedFO.analysis.unpacker.info
        if(errtype == undefined) errtype = "undefined error"
        if(selectedFO.analysis.unpacker["0_ERROR_genericFS"]) errtype = "genericFSerror"
        if(UNPACK_BLACKLISTED.includes(selectedFO.analysis.file_type.mime)) errtype = "blacklisted file type"
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
            var selectedFO = all_REST_response[fo].data.file_object
            var errtype = selectedFO.analysis.unpacker.info
            if(errtype == undefined) errtype = "undefined error"
            if(selectedFO.analysis.unpacker["0_ERROR_genericFS"]) errtype = "genericFSerror"
            if(UNPACK_BLACKLISTED.includes(selectedFO.analysis.file_type.mime)) errtype = "blacklisted file type"
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
                .attr("width", width + marginbc.left + marginbc.right)
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
            var link = svg_bc_pckd.selectAll('path.link')
                .data(links, function(d) { return d.id; });

            // Enter any new links at the parent's previous position.
            var linkEnter = link.enter().insert('path', "g")
                .attr("class", "link")
                .attr('d', function(d){
                var o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
                });

            // UPDATE
            var linkUpdate = linkEnter.merge(link);

            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', function(d){ return diagonal(d, d.parent) });

            // Remove any exiting links
            var linkExit = link.exit().transition()
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
                    zoomOnPackedFO(d.data.uid)
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

function zoomOnPackedFO(FOuid){
    var selectedFO = all_REST_response[FOuid].data.file_object
    var hid = selectedFO.meta_data.hid
    g.selectAll('.node#'+hid.replace(/[/.]/g,"_")).select("path").dispatch('click')

}