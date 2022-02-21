var COLOR_NODE = "#2e3035"
function packedUI(unpacker){
    var txt =""
    var packed
    
    if(unpacker.summary.packed && unpacker.summary.packed.length>0) packed = unpacker.summary.packed.length
    else if(unpacker.summary.unpacked.length==0) packed = -1
    else {
        packed=0
    }
    if(packed>0){//? se ci sono packed allora li mette
        LIST_PACKED_UID = unpacker.summary.packed //global
        txt ="FACT has not been able to unpack "+ packed + " elements  " 
        d3.select("#reportOf").append("br")
        
        d3.select("#reportOf").append("text").text(txt)
            .append("i").attr("id","packed_tree_expand_btn").attr("class","fas fa-caret-down")
                .on("click",function(){
                    expandpackedTree(unpacker.output)
                })
                .style("margin-right","5px")
        d3.select("#reportOf").append("i").attr("id","output_unpack").attr("class","fa-brands fa-readme").style("opacity","1")
                .on("click",function(){
                    output_unpack(unpacker.output)
                })
                // <i class="fas fa-expand-arrows-alt"></i>
        // d3.select("#reportOf").append("text").text(txt)
        //     .append("button").text("expand").attr("id","packed_tree_expand_btn")
        //         .on("click",expandpackedTree)
        d3.select("#reportOf").append("div").attr("id","packed_tree_expand").style("display","none")
    }
    
    else if(packed==-1){
        txt ="FACT unpacked 0 elements " 
        d3.select("#reportOf").append("br")
        
        d3.select("#reportOf").append("text").text(txt)
    }
    else{
        txt ="FACT has been able to unpack all elements  " 
        d3.select("#reportOf").append("br")
        
        d3.select("#reportOf").append("text").text(txt)
        .append("i").attr("id","output_unpack").attr("class","fa-brands fa-readme").style("opacity","1")
        .on("click",function(){
            output_unpack(unpacker.output)
        })
    }
    d3.select("#reportOf").append("text").attr("id","log_packed_FO")
}
function output_unpack(out){
    var expand = d3.select("#output_unpack").style("opacity")
    if (expand=="1"){ //clicco che è verso il basso quinid  chiusa e quindi devo aprire tutto
        // d3.select("#toggle_sun_div").style("visibility","hidden")
        d3.select("#output_unpack").transition().duration(400).style("opacity","0.2")
        d3.select("#log_packed_FO").style("visibility","visible")
        .append("div").attr("id","uap_dtls").style("max-width","70%").append("text").text(out)
    }
    else{
        // d3.select("#toggle_sun_div").style("visibility","visible")
        d3.select("#output_unpack").transition().duration(400).style("opacity","1")
        d3.select("#output_unpack").selectAll("*").remove();
        d3.select("#log_packed_FO").style("visibility","hidden")
        d3.select("#log_packed_FO").text("")
    }

}
function expandpackedTree(){
    var expand = d3.select("#packed_tree_expand_btn").attr("class")
    // console.log(expand)
    if (expand=="fas fa-caret-down") {
        // d3.select("#toggle_sun_div").style("visibility","hidden")
        d3.select("#packed_tree_expand_btn").attr("class","fas fa-caret-up")
        d3.select("#log_packed_FO").style("visibility","visible")
        document.getElementById("packed_tree_expand").style.display = "block";
        //!------------
        var treeData = buildpackedTree(LIST_PACKED_UID)
        // console.log(treeData)
        var heightbc = height/5
        var marginbc = {top: 10, right: 90, bottom: 0, left: 150}
        var svg_bc_pckd = d3.select("#packed_tree_expand")
            .append("svg")
                .attr("width", "100%")
                .style("height", heightbc + marginbc.top + marginbc.bottom)
            .append("g")
                .attr("transform","translate(120,0)");
                    // "translate(" + marginbc.left + "," + marginbc.top + ")");
        
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
                    return d._children ? COLOR_NODE : "#fff";
                });

            // Add labels for the nodes
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .style("font-size","16px")
                .attr("x", function(d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) { 
                    return d.data.name; });

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
                return d._children ? COLOR_NODE : "#fff";
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
                // console.log(d)
                if(d.data.leaf) {
                    talkAboutPackedFO(d.data.uid)
                    // details_I_II(d.data.uid)
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
        // d3.select("#toggle_sun_div").style("visibility","visible")
        d3.select("#packed_tree_expand_btn").attr("class","fas fa-caret-down")
        d3.select("#packed_tree_expand").selectAll("*").remove();
        d3.select("#log_packed_FO").style("visibility","hidden")
        d3.select("#log_packed_FO").text("")
  }
}

function buildpackedTree(list_packed_uid){
    //root
    var packedTree={
        "name":"Unpacker log",
        "children":[]
    }
    //nodes
    list_unpack_errors=[]
    list_packed_uid.forEach(element => {
        var selectedFO = ALL_REST_RESPONSE[element]
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
            var selectedFO = ALL_REST_RESPONSE[fo]
            var hid = selectedFO.hid
            var errtype = selectedFO.unpacker.info
            if(errtype == undefined) errtype = "undefined error"
            if(selectedFO.unpacker["0_ERROR_genericFS"]) errtype = "genericFSerror"
            if(UNPACK_BLACKLISTED.includes(selectedFO.mime)) errtype = "blacklisted file type"
            var el ={"name": hid, "leaf" : true, "uid": fo} 
            if(err.name==errtype) err.children.push(el)
        });
    });
    return packedTree
}

function talkAboutPackedFO(FOuid){
    var selectedFO = ALL_REST_RESPONSE[FOuid]
    // console.log(selectedFO)
    // console.log(FOuid)
    var mime_check = "The file type of " + selectedFO.hid + " is not blacklisted, so it should have been unpacked" 
    if(selectedFO.unpacker["0_ERROR_genericFS"]) mime_check = "During the unpacking process of " + selectedFO.hid + ", a genericFS error arisen"
    if(UNPACK_BLACKLISTED.includes(selectedFO.mime))  mime_check= "Unpacking of " + selectedFO.hid + " skipped due to blacklisted file type"
    d3.select("#log_packed_FO").text(mime_check)
    d3.select("#log_packed_FO").style("opacity","0").transition().duration(400).style("opacity","1")

}