function createDetailsdiv(fo,t,index){
    var m_height = 139
    //*prepara il div
    el = ALL_REST_RESPONSE[fo.uid]
    // console.log(el)
    var selector_name = "ao"+fo.uid

    //refuso per i plaeholder
    br = "</br>"
    var UID = "UID:  <tspan id = 'uid_tspan'>"+ fo.uid +"</tspan>"
    var HID = "HID:  <tspan id = 'hid_tspan'>"+ el.hid +"</tspan>"
    var MIME = "Mime:  <tspan id = 'mime_tspan'>"+ el.mime +"</tspan>"
    detailsI = HID + br + UID + br +"Size: "+ el.size+" bytes"+br+ MIME
   
    // //
    
    //*NAME
    details_width = 285
    // d3.select("#FO_name_div_"+t).style("max-width","180px")
    var FO_name_div = d3.select("#FO_name_div_"+t).node();
    if(FO_name_div.childNodes[index+1] != undefined &&FO_name_div.childNodes[index+1].id=="fo_details") {
        return
    }

    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)
        .style("width",details_width+"px")
        .style("min-height",m_height+"px")
    
    //***********LAYOUT SCHEDA FO
    div.select("#uid_tspan").style("font-size","14px")
    div.select("#hid_tspan").style("font-size",function(d){return el.hid.length>35? "12px": "17px"})
    
    //?append layout
    dettI= div.append("div").attr("id", "details_I_II").append("div").attr("id", "details_I")
    dettI.style("overflow-x","auto")
        .style("display","flex")
        .style("flex-direction","column")
        .style("font-size","14px")
        .style("opacity","0")
        .transition().duration(400).style("opacity","1")
    var hid = dettI.append("div").style("display","flex")
    hid.append("div").text("HID: ")
    hid.append("div").text(el.hid).style("padding-left","5px")
    
    var uid = dettI.append("div").style("display","flex")
    uid.append("div").text("UID: ").style("word-break","normal")
    uid.append("div").text(fo.uid.substring(0, 15)+"...").style("font-size","11px").style("padding-top","3px").style("padding-left","5px")
    uid.append("i").attr("class",'fas fa-clipboard').style("padding-top", "2px")
        .on("click",function(){
            navigator.clipboard.writeText(fo.uid);
            d3.select(this).style("opacity",0.5).transition().duration(400).style("opacity",1)
            uid.append("div").text("copied").style("padding-left","5px").transition().duration(1000).style("opacity",0).remove()
        })
        .on("mouseover",function(){
            d3.select(this).transition().duration(400).style("opacity",0.5)
        })
        .on("mouseleave",function(){
            d3.select(this).transition().duration(400).style("opacity",1)
        })

    var size = dettI.append("div").style("display","flex")
    size.append("div").text("Size:")
    size.append("div").text(el.size+"  bytes").style("padding-left","5px")

    var mime = dettI.append("div").style("display","flex")
    mime.append("div").text("MIME:")
    mime.append("div").text(el.mime).style("padding-left","5px")
    mime.append("i").attr("class",'fas fa-caret-down')
        .on("click",function(){
            var is_down = d3.select(this).attr("class") == "fas fa-caret-down"? true:false
            if(is_down) {
                var n = d3.create("div").attr("id","ft_dtls")
                    n.append("text").text(el.file_type)
                d3.select(this).attr("class","fas fa-caret-up")
                dettI.node().insertBefore(n.node(), dettI.select("#unpacker").node());//inserisci prima di unpacker
            }
            else{
                dettI.select("#ft_dtls").remove()
                d3.select(this).attr("class","fas fa-caret-down")
            }
        })
        .style("margin-top","3px")
        .style("margin-left","5px")

    var unpacker = dettI.append("div").style("display","flex").attr("id","unpacker") //l'id serve per il insertbefore di mime
    unpacker.append("div").text("Unpacker:")
    unpacker.append("div").text(el.unpacker.summary[0]).style("padding-left","5px")
        .style("color",function(){
            return el.unpacker.summary[0]=="packed"? "red": "green"
        })
    unpacker.append("i").attr("class",'fas fa-caret-down')
        .on("click",function(){
            var is_down = d3.select(this).attr("class") == "fas fa-caret-down"? true:false
            if(is_down) {
                var n = d3.create("div").attr("id","unpacker_dtls")
                    n.append("text").text(el.unpacker.output)
                d3.select(this).attr("class","fas fa-caret-up")
                dettI.node().insertBefore(n.node(), dettI.select("#buttons").node());//inserisci prima di unpacker
            }
            else{
                dettI.select("#unpacker_dtls").remove()
                d3.select(this).attr("class","fas fa-caret-down")
            }
        })
        .style("margin-top","3px")
        .style("margin-left","5px")
    var buttons = dettI.append("div").style("display","flex").attr("id","buttons") //l'id serve per il insertbefore di mime
    buttons.append("div").text("Download:")
    buttons.append("i").attr("class",'fas fa-download')
        .on("click",function(d){
            if (confirm('Are you sure you want to download the file?')) 
                    // Save it!
                    download(fo.uid,el.mime)
        })
        .style("margin-top","1px")
        .style("margin-left","5px")
        .style("transform","scale(0.9)")


    
    //*********FINE LAYOUT SCHEDA FO */
    //*ok not ok
    var oknotok = div.select("#details_I_II").append("div").attr("id", "oknotok")
    oknotok.append("i").attr("class","fas fa-check-circle").style("color","#06e103").style("margin-right","30px") //appendi alla scheda
        .on("click",function(){ //appendi al testo approved
            id_ell = FO_name_div.childNodes[index].id
            d3.select("#"+id_ell).selectAll("i").remove()
            d3.select("#"+id_ell)
                .style("display","flex").style("flex-direction","row")
                .append("i").attr("class","fas fa-check-circle")
                    .style("color","#06e103")
                    .style("transform","scale(0.6)")
                    .style("margin-top","3px")
            approved_or_not[id_ell]=true //global to retrieve
            console.log(approved_or_not)

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
                    .style("margin-top","3px")
            
            approved_or_not[id_ell]=false //global to retrieve
        })
    //close the div X;
    div.append("i").attr("class","fas fa-times-circle").attr("aria-hidden","true")
        .on("click",function(){
            d3.selectAll("."+selector_name).remove()
            // d3.selectAll("."+selector_name).transition().duration(400).style("opacity","0").remove()
        })

    FO_name_div.insertBefore(div.node(), FO_name_div.childNodes[index+1]);
    
    if(t =="n"){ //neutral
        // a = d3.select("#critical_div").node().getBoundingClientRect().width
        // b = d3.select("#sus_div").node().getBoundingClientRect().width
        // d3.select("#neutral_div").style("width",Math.max(a,b)+"px")
        
        d3.select("#FO_name_div_"+t).style("overflow-x","hidden")
        return
    }
    //*SCORE
    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)//for the score
        .style("visibility","hidden")
        .style("width","10px")
        .style("min-height",m_height+"px")
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
            .style("min-height",m_height+"px")
    div.append("div").attr("id", "details_I").append("text").html(detailsI).style("overflow-x","auto")
        
    var FO_square_div = d3.select("#FO_squares_div_"+t).node();
    FO_square_div.insertBefore(div.node(), FO_square_div.childNodes[index]);


}



function rememberOknotook(){
    for (const id in approved_or_not) {
        if (Object.hasOwnProperty.call(approved_or_not, id)) {
            const tof = approved_or_not[id];
            d3.select("#"+id).selectAll("i").remove()
            elem = d3.select("#"+id)
                .style("display","flex").style("flex-direction","row")
                .append("i").style("transform","scale(0.6)").style("margin-top","3px")
            if(tof){
                elem.attr("class","fas fa-check-circle")
                    .style("color","#06e103")
            }
            else{
                elem.attr("class","fas fa-minus-circle")
                .style("color","#dd0909")
            }
            
        }
    }
    
    
}