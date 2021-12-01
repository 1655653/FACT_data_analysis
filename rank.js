

var fattest = fattest_fo.sort(e => e.size)

function DrawRank(){
    d3.select("#rank_div").style("display","inline-table")
    d3.select("#bar_fo_search")
    .on("keydown",function(d){ 
        if(d3.event.keyCode==13 && !d3.event.shiftKey) {
            d3.event.preventDefault();
            return false
        }
    })
    .on("keyup",function(d){ 
        var v = d3.select(this).property("value")
        var tag = v.slice(0,4)
        if(tag == "UID:") {
            try {
                details_I_II(v.substring(4))
            } catch (error) {
                d3.select("#fo_details").append("text").text("File object not found")
            }

        }

            
    })

    fattest.forEach(element => {
        var h = all_REST_response[element.uid].hid
        d3.select("#biggest_fo").append("option").text(h).style("font-size",function(d){return h.length>25? "12px": "17px"})
    });

    d3.select("#biggest_fo").on("click",function(d){
        var selectBox = document.getElementById("biggest_fo");
        details_I_II(fattest[selectBox.selectedIndex].uid)
    })
    
    d3.select("#suspects_fo").append("text").text("since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi")
    d3.select("#critical_fo").append("text").text("orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi")
}
function details_I_II(uid){
    d3.select("#fo_details").selectAll("*").remove()
    d3.select("#fo_details").style("opacity","0")
    d3.select("#fo_details").transition().duration(1500).style("opacity","1")
    el = all_REST_response[uid]
    console.log(el)
    br = "</br>"
    var UID = "UID:  <tspan id = 'uid_tspan'>"+ uid +"</tspan>"
    var MIME = "Mime:  <tspan id = 'mime_tspan'>"+ el.mime +"</tspan>"
    var HID = "HID:  <tspan id = 'hid_tspan'>"+ el.hid +"</tspan>"
    detailsI = HID + br + UID + br +"Size: "+ el.size+" bytes"+br+ MIME
    d3.select("#fo_details").append("div").attr("id", "details_I").append("text").html(detailsI)
    d3.select("#fo_details").select("#uid_tspan").style("font-size","14px")
    d3.select("#fo_details").select("#hid_tspan").style("font-size",function(d){return el.hid.length>35? "12px": "17px"})
    d3.select("#fo_details").select("#mime_tspan").style("color",function (d){
        if(d3.select("#details"+el.mime.split("/")[0]).property("checked")  ) return colormimeSubtype(el.mime)
        return colormimeSupertype(el.mime.split("/")[0])
    })

    //
    var UNPACK = "<div> Unpacker: <tspan id = 'unpack_tspan'>"+el.unpacker.summary[0]+"</tspan> <button type='button'  id='btn_unpck_dtls' ><i class='fas fa-caret-down' ></i> </div> "
    d3.select("#fo_details").append("div").attr("id", "details_II").append("text").html(UNPACK)
    d3.select("#fo_details").select("#unpack_tspan").style("color","green")
    d3.select("#btn_unpck_dtls").on("click",function(d){
        var is_down = d3.select("#btn_unpck_dtls").select("i").attr("class") == "fas fa-caret-down"? true:false
        var UNPCK_DTLS = "OUTPUT: "+  el.unpacker.output + br + "PLUGIN USED: " + el.unpacker.plugin_used +br+ "PLUGIN VERSION: "+el.unpacker.plugin_version
        if(is_down) {
            d3.select("#details_II").append("div").attr("id","unpck_dtls").append("text").html(UNPCK_DTLS)
            d3.select("#btn_unpck_dtls").select("i").attr("class","fas fa-caret-up")
        }
        else{
            d3.select("#unpck_dtls").remove()
            d3.select("#btn_unpck_dtls").select("i").attr("class","fas fa-caret-down")
        }
    })

    //
    var SW_COMP = el.sw_comp
    d3.select("#fo_details").append("div").attr("id", "details_III")
    if(SW_COMP.length>0)d3.select("#details_III").append("text").html("Software components: "+SW_COMP)
    
    //
    var EX_MITIG = el.ex_mitig
    for (const key in exploit_data) {
        if (Object.hasOwnProperty.call(exploit_data, key)) {
            const element = exploit_data[key];
            d3.select("#"+key.replace(/[^A-Z]+/g, "")).transition().duration(1500).style("border-color","black")
        }
    }
    if(EX_MITIG.length>0){
        EX_MITIG.forEach(method => {
            d3.select("#"+method.replace(/[^A-Z]+/g, "")).transition().duration(1500).style("border-color","#da9393")
        });
    }

    //
    var FILE_TYPE = "<div> File type: <button type='button'  id='btn_ft_dtls' ><i class='fas fa-caret-down' ></i> </div> "
    d3.select("#details_III").append("div").attr("id", "details_ft").append("text").html(FILE_TYPE)
    d3.select("#btn_ft_dtls").on("click",function(d){
        var is_down = d3.select("#btn_ft_dtls").select("i").attr("class") == "fas fa-caret-down"? true:false
        if(is_down) {
            d3.select("#details_III").append("div").attr("id","ft_dtls").append("text").text(el.file_type)
            d3.select("#btn_ft_dtls").select("i").attr("class","fas fa-caret-up")
        }
        else{
            d3.select("#ft_dtls").remove()
            d3.select("#btn_ft_dtls").select("i").attr("class","fas fa-caret-down")
        }
    })



    //download
    d3.select("#fo_details").append("div").append("button").text("download")
            .on("click",function(d){
                if (confirm('Are you sure you want to download the file?')) 
                        // Save it!
                        download(uid,el.mime)
            })
}



