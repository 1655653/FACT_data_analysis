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
    // var UNPACK = "<div> Unpacker: <tspan id = 'unpack_tspan'>"+el.unpacker.summary[0]+"</tspan> <button type='button'  id='btn_unpck_dtls' ><i class='fas fa-caret-down' ></i> </div> "
    // d3.select("#fo_details").append("div").attr("id", "details_II").append("text").html(UNPACK)
    // d3.select("#fo_details").select("#unpack_tspan").style("color","green")
    // d3.select("#btn_unpck_dtls").on("click",function(d){
        //     var is_down = d3.select("#btn_unpck_dtls").select("i").attr("class") == "fas fa-caret-down"? true:false
        //     var UNPCK_DTLS = "OUTPUT: "+  el.unpacker.output + br + "PLUGIN USED: " + el.unpacker.plugin_used +br+ "PLUGIN VERSION: "+el.unpacker.plugin_version
        //     if(is_down) {
            //         d3.select("#details_II").append("div").attr("id","unpck_dtls").append("text").html(UNPCK_DTLS)
            //         d3.select("#btn_unpck_dtls").select("i").attr("class","fas fa-caret-up")
            //     }
            //     else{
                //         d3.select("#unpck_dtls").remove()
                //         d3.select("#btn_unpck_dtls").select("i").attr("class","fas fa-caret-down")
                //     }
                // })
    //*NAME
    details_width = 300

    d3.select("#FO_name_div_"+t).style("max-width","180px")
    var FO_name_div = d3.select("#FO_name_div_"+t).node();

    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)
        .style("width",details_width+"px")
        .style("min-height","85px")
    //layout cools
    div.select("#uid_tspan").style("font-size","14px")
    div.select("#hid_tspan").style("font-size",function(d){return el.hid.length>35? "12px": "17px"})
    //append layout
    div.append("div").attr("id", "details_I").append("text").html(detailsI)
        .style("overflow-x","auto")
        .style("opacity","0")
        .transition().duration(400).style("opacity","1")
    //close the div X
    div.append("i").attr("class","fas fa-times-circle").attr("aria-hidden","true")
        .on("click",function(){
            console.log(fo)
            d3.selectAll("."+selector_name).transition().duration(400).style("opacity","0").remove()
        })

    FO_name_div.insertBefore(div.node(), FO_name_div.childNodes[index+1]);
    
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
    original_h = d3.select("#FO_name_div_"+t).select("#fo_details").node().getBoundingClientRect().height -10
    div = d3.create("div").attr("id","fo_details").attr("class",selector_name)
            .style("height",original_h+"px")//for the squares
            .style("padding-bottom","5px")//for the squares
            .style("visibility","hidden")
            .style("min-height","85px")
    div.append("div").attr("id", "details_I").append("text").html(detailsI).style("overflow-x","auto")
        
    var FO_square_div = d3.select("#FO_squares_div_"+t).node();
    FO_square_div.insertBefore(div.node(), FO_square_div.childNodes[index]);



}