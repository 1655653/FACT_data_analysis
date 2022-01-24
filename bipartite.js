var exm_to_see = ["C","S"]
function buildBipartiteGraph(exm_data){
	//*clean
	d3.select("#svg_bipartite").select("g").remove()
	d3.select("#svg_legenda").selectAll("*").remove()

	//*legenda
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
		.on("mouseover",mouseover_legenda)
		.on("mouseout",mouseout_legenda)
	legenda_div.append("text")
		.text(d=>d)
		.attr("y", function(d,i){return 40 + i*20})
		.attr("x", 22)
		.on("mouseover",mouseover_legenda)
		.on("mouseout",mouseout_legenda)
	// console.log(exm_data)
	exm_data_filtered = filterExmData(exm_data,exm_to_see)
	//*Bipartite
	var bP = viz.biPartite()
		.data(exm_data_filtered)
		.orient("horizontal")
		.height(300)
		.barSize(20)
		.pad(1)
		.min(2)
		.fill(function(d){
			return color_scale(d.primary)
		})
		
	var bPg = d3.select("#svg_bipartite").append("g").attr("id","g_bipartite").style("opacity","0").call(bP)
	d3.select("#g_bipartite").transition().duration(1000).style("opacity","1")
	bPg.selectAll(".viz-biPartite-mainBar")
		.on("mouseover",mouseover)
		.on("mouseout",mouseout)
		
	//* end, resize 
	w = parseFloat(d3.select("#g_bipartite").node().getBoundingClientRect().width.toFixed(2)) + 10
	d3.select("#svg_bipartite").style("width", w+"px")
	d3.select("#ex_miti_svg_container").style("border","solid")
	//*resize buttons
	svgl = d3.select("#svg_legenda").node().getBoundingClientRect()
	d3.select(".ex_miti_btn_container").style("left",svgl.left+"px")
	hovermngmt("C",exm_to_see)
	hovermngmt("S",exm_to_see)
	hovermngmt("O",exm_to_see)
	d3.select(".ex_miti_btn_container").style("display","block").style("opacity","0")
		.transition().duration(1000).style("opacity","1")



	//*mouseovering
	function mouseover(d){
		bP.mouseover(d)
		// console.log(d)
		d3.select(".viz-biPartite").selectAll("g").each(function(e, i){
			if(e.key == d.key){
				d3.select(this)
					.append("text")
					.attr("class","perc")
					.text(function(d){ return (d.key) })
					.style("text-anchor","end")
					.style("transform",function(t){
						if(e.part == "primary") return "translate(0px,-15px)"
						if(e.part == "secondary") return "translate(0px,25px)"
					})
					.transition()
					.duration(400)
					.style("opacity",1)
				this_bc = d3.select(this).node().getBoundingClientRect()
				cont_bc = d3.select("#svg_bipartite").node().getBoundingClientRect()
				if(this_bc.x < cont_bc.x)
					d3.select(this).select("text").style("text-anchor","start")
			}
		})	
	}
	function mouseout(d){
		bP.mouseout(d)
		bPg.selectAll(".viz-biPartite-mainBar")
			.selectAll(".perc")
			.transition()
			.duration(400)
			.style("opacity",0)
			.remove()
	}
	
	function mouseover_legenda(d){
		d3.select(".viz-biPartite").selectAll("g").each(function(e, i){
			if(e.part=="primary"&& e.key==d) {
				bP.mouseover(e)
			}
		})	
	}
	function mouseout_legenda(d){
		d3.select(".viz-biPartite").selectAll("g").each(function(e, i){
			if(e.part=="primary"&& e.key==d) {
				bP.mouseout(e)
			}
		})	
	}
}


function filterExmData(exm_data,to_see){
	exm_data_filtered=[]

	if(to_see.includes("C")){
		CRITICAL_FO.system.forEach(critical_fo => {
			exm_data.forEach(tupla => {
				if(tupla[1]==critical_fo.hid) exm_data_filtered.push(tupla)
			});
		});
	}
	if(to_see.includes("S")){
		SUS_FO.system.forEach(critical_fo => {
			exm_data.forEach(tupla => {
				if(tupla[1]==critical_fo.hid) exm_data_filtered.push(tupla)
			});
		});
	}
	if(to_see.includes("O")){
		NEUTRAL_FO.system.forEach(critical_fo => {
			exm_data.forEach(tupla => {
				if(tupla[1]==critical_fo.hid) exm_data_filtered.push(tupla)
			});
		});
	}
	// console.log(exm_data_filtered)
	return exm_data_filtered
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

function hovermngmt(id,exm_to_see){
	d3.select("#"+id+"_btn_exm")
		.style("background-color", function(d){
			if(exm_to_see.includes(id)) return "#aeb3bb" //da premere
			return "#6e747e" //btn colorato (premuto)
		})
		.on("click",function(d){
			if(exm_to_see.includes(id)){
				exm_to_see.splice(exm_to_see.indexOf(id),1)
				d3.select(this).style("background-color","#6e747e")//btn NON premuto
			}
			else{
				exm_to_see.push(id)
				d3.select(this).style("background-color","#aeb3bb")//btn colorato (premuto)
			}
			// console.log(exm_to_see)
			buildBipartiteGraph(exm_data)

		})
		.on("mouseover",function(d){
			d3.select("#"+id+"_btn_exm").style("background-color", function(d){
				if(exm_to_see.includes(id)) return "#6e747e" //da premere
				return "#aeb3bb" //btn colorato (premuto)
			})
		})
		.on("mouseout",function(d){
			d3.select("#"+id+"_btn_exm").style("background-color", function(d){
				if(exm_to_see.includes(id)) return "#aeb3bb" //da premere
				return "#6e747e" //btn colorato (premuto)
			})
		})
}