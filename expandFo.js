function createDetailsdiv(fo,t,index){
    
    //*prepara il div
    el = ALL_REST_RESPONSE[fo.uid]
    // console.log(el)
    var selector_name = "ao"+fo.uid

    br = "</br>"
    var UID = "UID:  <tspan id = 'uid_tspan'>"+ fo.uid +"</tspan>"
    var HID = "HID:  <tspan id = 'hid_tspan'>"+ el.hid +"</tspan>"
    var MIME = "Mime:  <tspan id = 'mime_tspan'>"+ el.mime +"</tspan>"
    detailsI = HID + br + UID + br +"Size: "+ el.size+" bytes"+br+ MIME
    // //
    
    //*NAME
    details_width = 265
    // d3.select("#FO_name_div_"+t).style("max-width","180px")
    var FO_name_div = d3.select("#FO_name_div_"+t).node();
    if(FO_name_div.childNodes[index+1].id=="fo_details") {
        return
    }

    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)
        .style("width",details_width+"px")
        .style("min-height","85px")
    
    //*layout cools
    div.select("#uid_tspan").style("font-size","14px")
    div.select("#hid_tspan").style("font-size",function(d){return el.hid.length>35? "12px": "17px"})
    
    //?append layout
    div.append("div").attr("id", "details_I_II").append("div").attr("id", "details_I").append("text").html(detailsI)
        .style("overflow-x","auto")
        .style("opacity","0")
        .transition().duration(400).style("opacity","1")

    var UNPACK = "<div> Unpacker: <tspan id = 'unpack_tspan'>"+el.unpacker.summary[0]+"</tspan> <i id='btn_unpck_dtls' class='fas fa-caret-down'></i> </div> "
    div.select("#details_I_II").append("div").attr("id", "details_II").append("text").html(UNPACK)
    div.select("#unpack_tspan").style("color","green")
    //TODO COMPLETARE LA SCHEDA DEL FO
    div.select("#btn_unpck_dtls").on("click",function(e){
        console.log(d3.select(this).attr("class"))
        console.log(d3.select(this))
    })
    //*ok not ok
    var oknotok = div.select("#details_I_II").append("div").attr("id", "oknotok")
    oknotok.append("i").attr("class","fas fa-check-circle").style("color","#06e103").style("margin-right","30px") //appendi alla scheda
        .on("click",function(){ //appendi al testo
            id_ell = FO_name_div.childNodes[index].id
            d3.select("#"+id_ell).selectAll("i").remove()
            d3.select("#"+id_ell)
                .style("display","flex").style("flex-direction","row")
                .append("i").attr("class","fas fa-check-circle")
                    .style("color","#06e103")
                    .style("transform","scale(0.6)")
        })
    oknotok.append("i").attr("class","fas fa-minus-circle").style("color","#dd0909")
        .on("click",function(){
            id_ell = FO_name_div.childNodes[index].id
            d3.select("#"+id_ell).selectAll("i").remove()
            d3.select("#"+id_ell)
                .style("display","flex").style("flex-direction","row")
                .append("i").attr("class","fas fa-minus-circle")
                    .style("color","#dd0909")
                    .style("transform","scale(0.6)")
        })
    //close the div X;
    div.append("i").attr("class","fas fa-times-circle").attr("aria-hidden","true")
        .on("click",function(){
            d3.selectAll("."+selector_name).remove()
            // d3.selectAll("."+selector_name).transition().duration(400).style("opacity","0").remove()
        })

    FO_name_div.insertBefore(div.node(), FO_name_div.childNodes[index+1]);
    
    if(t =="n"){ //neutral
        a = d3.select("#critical_div").node().getBoundingClientRect().width
        b = d3.select("#sus_div").node().getBoundingClientRect().width
        d3.select("#neutral_div").style("width",Math.max(a,b)+"px")
        
        d3.select("#FO_name_div_"+t).style("overflow-x","hidden")
        return
    }
    //*SCORE
    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)//for the score
        .style("visibility","hidden")
        .style("width","10px")
        .style("min-height","85px")
    div.append("div").attr("id", "details_I").append("text").html(detailsI).style("overflow-x","auto")

    var FO_score_div = d3.select("#FO_score_div_"+t).node();
    FO_score_div.insertBefore(div.node(), FO_score_div.childNodes[index+1]);

    //*SQUARES
    //prendo l altezza dell'originale e la salvo
    original_h = d3.select("#FO_name_div_"+t).select("#fo_details").node().getBoundingClientRect().height -20
    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)
            .style("height",original_h+"px")//for the squares
            .style("padding-bottom","5px")//for the squares
            .style("visibility","hidden")
            .style("min-height","85px")
    div.append("div").attr("id", "details_I").append("text").html(detailsI).style("overflow-x","auto")
        
    var FO_square_div = d3.select("#FO_squares_div_"+t).node();
    FO_square_div.insertBefore(div.node(), FO_square_div.childNodes[index]);


}
