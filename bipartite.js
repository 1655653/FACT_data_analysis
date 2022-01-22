function buildBipartiteGraph(exm_data){

    var legenda =d3.select("#svg_legenda")
		.selectAll(".firstrow")
		.data(mitigations).enter()
    
    legenda_div = legenda.append("svg")
	legenda_div.append("rect")
		.attr("y", function(d,i){return 30 + i*20})
		.attr("x", 10)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", function(d){return color_scale(d) })
	legenda_div.append("text")
		.text(d=>d)
		.attr("y", function(d,i){return 40 + i*20})
		.attr("x", 22)

	console.log(exm_data)
	var bP = viz.biPartite()
		.data(exm_data)
		.orient("horizontal")
		.height(300)
		.barSize(20)
		.pad(1)
		.min(2)
		.fill(function(d){
			return color_scale(d.primary)
		})
		
	var bPg = d3.select("#svg_bipartite").append("g").attr("id","g_bipartite")
	.call(bP)
	bPg.selectAll(".viz-biPartite-mainBar")
		.on("mouseover",mouseover)
		.on("mouseout",mouseout)

	function mouseover(d){
		bP.mouseover(d)
		// console.log(d)
		d3.select(".viz-biPartite").selectAll("g").each(function(e, i){
			if(e.key == d.key){
				d3.select(this)
					.append("text")
					.attr("class","perc")
					.text(function(d){ return (d.key) })
					.style("transform",function(t){
						if(e.part == "primary") return "translate(0px,-15px)"
						if(e.part == "secondary") return "translate(0px,25px)"
					})
					.transition()
					.duration(400)
					.style("opacity",1)
			}
		})	
	}
	function mouseout(d){
		// bP.mouseout(d)
		// bPg.selectAll(".viz-biPartite-mainBar")
		// 	.selectAll(".perc")
		// 	.transition()
		// 	.duration(400)
		// 	.style("opacity",0)
		// 	.remove()
	}
	w = d3.select("#g_bipartite").node().getBoundingClientRect().width.toFixed(2)
	d3.select("#svg_bipartite").style("width", w+"px")
	d3.select("#ex_miti_svg_container").style("border","solid")
}










function buildExploitData(exp_miti){
    bpart_data = []
    for (const key in exp_miti) {
		if (Object.hasOwnProperty.call(exp_miti, key)) {
			//key --> CANARY disabled
			//element array of uid
			const uid_array = exp_miti[key];
			miti = ""
			key.split(" ").forEach(k => {
				if(k==k.toUpperCase()) miti+=k+" "
			});
			miti=miti.trim()
			if(!mitigations.includes(miti)) mitigations.push(miti)
            
            var enordi = key.split(" ").at(-1);
            if(enordi == "enabled" || enordi== "present") {
                uid_array.forEach(uid => {
                    bpart_data.push([miti,ALL_REST_RESPONSE[uid].hid,1])
                });
            }

		}
	}
	console.log(mitigations)
	// console.log(JSON.stringify(bpart_data))

	color_scale= d3.scaleOrdinal().domain(mitigations).range(d3.schemeCategory20)
	return bpart_data
}
