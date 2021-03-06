var exm_to_see = ["C","S"]
var mitigations_to_hide = []
var sort_lock = false
function buildBipartiteGraph(exm_data){
	exm_data_filtered = filterExmData(exm_data,exm_to_see,mitigations_to_hide)
	mitigations_filtered = []
	exm_data_filtered.forEach(element => {
		if(!mitigations_filtered.includes(element[0])) mitigations_filtered.push(element[0])
	});
	//ordino in base alle mitigatons presenti
	if(! sort_lock){
		mitigations.sort(function(a,b){
			if (mitigations_filtered.includes(a) && mitigations_filtered.includes(b)) return a>b
			if (mitigations_filtered.includes(a) && !mitigations_filtered.includes(b)) return -1
			if (!mitigations_filtered.includes(a) && mitigations_filtered.includes(b)) return 1
			return 0
		})
	}
	//*clean
	d3.select("#svg_bipartite").select("g").remove()
	d3.select("#svg_legenda").selectAll("*").remove()

	// m = mitigations.filter(e=>!mitigations_to_hide.includes(e))
	//*legenda
    var legenda =d3.select("#svg_legenda")
		.selectAll(".firstrow")
		.data(mitigations).enter()
    
    legenda_div = legenda.append("svg")
	legenda_div.append("rect")
		.attr("y", function(d,i){return 10 + i*20})
		.attr("x", 10)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", function(d){return color_scale(d) })
		.on("mouseover",mouseover_legenda)
		.on("mouseout",mouseout_legenda)
	legenda_div.append("text")
		.text(d=>{
			var i = 0
			exm_data_filtered.forEach(tupla => {
				if(tupla[0]==d) i++
			});
			j = 0
			exm_data.forEach(tupla => {
				if(tupla[0]==d) j++
			});
			return d+" ("+i+")"+" ("+j+")"
		})
		.attr("y", function(d,i){return 20 + i*20})
		.attr("x", 22)
		.attr("font-size","12px")
		.attr("fill", function(d){return mitigations_filtered.includes(d)? "black": "#adadad57" })
		.on("mouseover",mouseover_legenda)
		.on("mouseout",mouseout_legenda)
		.on("click",mouseclick_legenda)
	// console.log(exm_data)
	// console.log(exm_data_filtered)
	//*Bipartite
	var bP = viz.biPartite()
		.data(exm_data_filtered)
		.orient("vertical")
		// .height(600)
		.width(320)
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
		.on("click",clicks)
		
	//* end, resize 
	h = parseFloat(d3.select("#g_bipartite").node().getBoundingClientRect().height.toFixed(2)) + 10
	w = parseFloat(d3.select("#g_bipartite").node().getBoundingClientRect().width.toFixed(2)) + 10
	d3.select("#svg_bipartite").style("width", w+"px")
	d3.select("#svg_bipartite").style("height", h+"px")
	d3.select("#svg_legenda").style("height", h-50+"px")
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
					.text(function(d){ return ALL_REST_RESPONSE[d.key]!=undefined? (ALL_REST_RESPONSE[d.key].hid):""})
					.style("text-anchor","end")
					.style("transform",function(t){
						return "translate(-15px,1px)"
						// if(e.part == "primary") return "translate(0px,-15px)"
						// if(e.part == "secondary") return "translate(0px,25px)"
					})
					.transition()
					.duration(400)
					.style("opacity",1)
				if(ALL_REST_RESPONSE[d.key]!=undefined){
					h = ALL_REST_RESPONSE[d.key].hid
					connectWithRd(h,"mouseover")
					connectWithSc(h,"mouseover")
					connectWithSun(d.key,"mouseover")
				}
				// this_bc = d3.select(this).node().getBoundingClientRect()
				// cont_bc = d3.select("#svg_bipartite").node().getBoundingClientRect()
				// if(this_bc.x < cont_bc.x)
				// 	d3.select(this).select("text").style("text-anchor","start")
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
		d3.select(".viz-biPartite").selectAll("g").each(function(e, i){
			if(e.key == d.key){
				if(ALL_REST_RESPONSE[d.key]!=undefined){
					h = ALL_REST_RESPONSE[d.key].hid
					connectWithRd(h,"mouseleave")
					connectWithSc(h,"mouseleave")
					connectWithSun(d.key,"mouseout")
				}
			}
		})
	}
	function clicks(d){
		d3.select(".viz-biPartite").selectAll("g").each(function(e, i){
			if(e.key == d.key){
				if(ALL_REST_RESPONSE[d.key]!=undefined){
					h = ALL_REST_RESPONSE[d.key].hid
					clickRd(h)
				}
			}
		})
		
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
	function mouseclick_legenda(d){
		sort_lock=true
		if(!mitigations_to_hide.includes(d)) mitigations_to_hide.push(d)
		buildBipartiteGraph(exm_data)
		if(d3.selectAll("#reset_bp").nodes().length == 0){
			d3.select(".ex_miti_btn_container").append("br").attr("class","reset_miti_decorations")
			d3.select(".ex_miti_btn_container").append("button").style("visibility","hidden").attr("class","reset_miti_decorations").text("PADDING")
			d3.select(".ex_miti_btn_container").append("button").attr("id","reset_bp").attr("class","reset_miti_decorations")
				.text("Reset")
				.on("click",function(){
					sort_lock=false
					mitigations_to_hide=[]
					buildBipartiteGraph(exm_data)
					d3.selectAll(".reset_miti_decorations").transition().duration(200).style("opacity","0").remove()
				})
		}
	}
}


function filterExmData(exm_data,to_see,mitigations_to_hide){
	exm_data_filtered=[]

	if(to_see.includes("C")){
		CRITICAL_FO.system.forEach(critical_fo => {
			exm_data.forEach(tupla => {
				if(tupla[1]==critical_fo.uid && !mitigations_to_hide.includes(tupla[0])) 
					exm_data_filtered.push(tupla)
			});
		});
	}
	if(to_see.includes("S")){
		SUS_FO.system.forEach(critical_fo => {
			exm_data.forEach(tupla => {
				if(tupla[1]==critical_fo.uid && !mitigations_to_hide.includes(tupla[0])) 
					exm_data_filtered.push(tupla)
			});
		});
	}
	if(to_see.includes("O")){
		NEUTRAL_FO.system.forEach(critical_fo => {
			exm_data.forEach(tupla => {
				if(tupla[1]==critical_fo.uid && !mitigations_to_hide.includes(tupla[0])) 
					exm_data_filtered.push(tupla)
			});
		});
	}
	console.log(exm_data_filtered)

	
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
            
            var enordi = key.split(" ").at(-1);
			if(!mitigations.includes(miti)) mitigations.push(miti)
            if(enordi == "enabled" || enordi== "present") {
                uid_array.forEach(uid => {
                    bpart_data.push([miti,uid,1])
                });
            }

		}
	}
	// console.log(mitigations)
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