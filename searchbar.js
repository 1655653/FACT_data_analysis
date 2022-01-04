function buildSearchBar(){
    w = getDimFloat("rightside","width")
    sb = d3.select("#rightside").append('textarea').attr("id","search_bar_FO").style("width",w+"px")
    //sb.html("porcodio")
    sb
    .on("keydown",function(d){ 
        if(d3.event.keyCode==13 && !d3.event.shiftKey) {
            d3.event.preventDefault();
            return false
        }
    })
    .on("keyup",function(d){ 
        var v = d3.select(this).property("value")
        if(v.slice(-1)==".")
            v = v.slice(0, -1) + '_EXTENSION_';
        if(v == "") {
            drawDanger()
            d3.select("#summa_sus_div").style("display","block")
            d3.select("#summa_critical_div").style("display","block")
        }
        else{
            removeNotMatched("c",v)
            removeNotMatched("s",v)
            removeNotMatched("n",v)
            d3.select("#summa_sus_div").style("display","none")
            d3.select("#summa_critical_div").style("display","none")
        }
    })
}
function removeNotMatched(t,v){
    removeNotMatchedFrom("#FO_name_div_"+t,v)
    removeNotMatchedFrom("#FO_score_div_"+t,v)
    removeNotMatchedFrom("#FO_squares_div_"+t,v,"square")
    
}
function removeNotMatchedFrom(div,v,e){
    var tag = v.slice(0,4)
    if(tag == "UID:") {
        v = ALL_REST_RESPONSE[v.substring(4)]
    }
    el = "text"
    if(e == "square") el = "svg"
    var all = d3.select(div).selectAll(el).filter(function() {
        return d3.select(this).attr("class") != "no_search" 
    })
    
    rem = d3.select(div).selectAll(el).filter(function() {
        if (e == "square") {
            id = ALL_REST_RESPONSE[d3.select(this).attr("id")].hid
            v = v.replace("_EXTENSION_",".")
            return !id.startsWith(v);
        }
        else{
            if(tag != "UID:")   v = v.replace(/[/.]/g,"_")
            return d3.select(this).attr("class") != "no_search" && !d3.select(this).attr("id").startsWith(v);  // Use a filter to select all other bars for the transition.

        }
    })
    rem.transition().duration(1500).style("opacity","0").remove()
} 