function buildSearchBar(){
    sb = d3.select("#search_bar_FO")
    sb.on("keydown",function(d){ 
        if(d3.event.keyCode==13 && !d3.event.shiftKey) {
            d3.event.preventDefault();
            return false
        }
    })
    .on("keyup",function(d){ //objective--> retrieve the id element
        d3.selectAll("#fo_details").remove()
        var string = d3.select(this).property("value")
        if(string == "") {
            drawDanger()
            //perchè quando cerco li setto a none e tolgo opacity
            d3.select("#critical_div").transition().duration(1500).style("opacity","1")
            d3.select("#sus_div").transition().duration(1500).style("opacity","1")
            d3.select("#summa_sus_div").style("display","block")
            d3.select("#summa_critical_div").style("display","block")
            
            d3.select("#others_expand").dispatch("click")
            d3.select("#others_expand").dispatch("click")

        }
        else{
            d3.select("#summa_sus_div").style("display","none")
            d3.select("#summa_critical_div").style("display","none")
            var oknotok = 0
            //*SAFE OR DANGER
            if("safe".startsWith(string) ||"danger".startsWith(string)){
                oknotok= "safe".startsWith(string)?  true:false
            }
            if(oknotok==true || oknotok==false){
                removeOkItem("critical_div","span",oknotok)
                removeOkItem("critical_div","text",oknotok)
                removeOkItem("sus_div","span",oknotok)
                removeOkItem("sus_div","text",oknotok)
                removeOkItem("neutral_div","text",oknotok)
                
                d3.select("#FO_squares_div_c").selectAll("svg").filter(function(){
                    var id = d3.select(this).attr("id")//uid
                    hid = ALL_REST_RESPONSE[id].hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_")
                    if(Object.keys(approved_or_not).includes(hid))
                        if(approved_or_not[hid] == oknotok)
                            return false
                    return true
                }).transition().duration(400).style("opacity","0").remove()
                d3.select("#FO_squares_div_s").selectAll("svg").filter(function(){
                    var id = d3.select(this).attr("id")//uid
                    hid = ALL_REST_RESPONSE[id].hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_")
                    if(Object.keys(approved_or_not).includes(hid))
                        if(approved_or_not[hid] == oknotok)
                            return false
                    return true
                }).transition().duration(400).style("opacity","0").remove()
            }
            //*classic search (by hid)
            else{
                //*remove not matched
                valid_s = string.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_")
                //filtro quelli che non matchano
                removeItem("critical_div","span")
                removeItem("critical_div","text")
                removeItem("sus_div","span")
                removeItem("sus_div","text")
                removeItem("neutral_div","text")
                
                d3.select("#FO_squares_div_c").selectAll("svg").filter(function(){
                    var id = d3.select(this).attr("id")
                    return !ALL_REST_RESPONSE[id].hid.startsWith(string)
                }).transition().duration(400).style("opacity","0").remove()
                d3.select("#FO_squares_div_s").selectAll("svg").filter(function(){
                    var id = d3.select(this).attr("id")
                    return !ALL_REST_RESPONSE[id].hid.startsWith(string)
                }).transition().duration(1500).style("opacity","0").remove()

            }

        }
        
    })
}

function removeOkItem(div,element,oknotok){
    var rem= d3.select("#"+div).selectAll(element).filter(function(){
        var el_idd = d3.select(this).attr("id")
        if(el_idd == null) return false //titoli
        if(Object.keys(approved_or_not).includes(el_idd)){//se c'è una chiave dentro approval che è come lil current id
            if(approved_or_not[el_idd]==oknotok)
                return false
        } 
        return true
    })
    rem.transition().duration(400).style("opacity","0")

    if(d3.select("#"+div).selectAll("span").nodes().length==2)//critical+placeholder ...
        d3.select("#"+div).transition().duration(400).style("opacity","0")
    // //una volta calcolato i rimuovo
    rem.remove()

}

function removeItem(div,element){
    
    var rem= d3.select("#"+div).selectAll(element).filter(function(){
        var id = d3.select(this).attr("id")
        if(id == null) return false
        else return ! id.startsWith(valid_s)
    })
    rem.transition().duration(400).style("opacity","0")

    if(d3.select("#"+div).selectAll("span").nodes().length==2)//critical+placeholder ...
        d3.select("#"+div).transition().duration(400).style("opacity","0")
    //una volta calcolato i rimuovo
    rem.remove()
}