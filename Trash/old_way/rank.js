

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
    
    console.log(red_danger_fo)
    console.log(yellow_danger_fo)
    // d3.select("#suspects_fo").append("text").text("since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi")
    // d3.select("#critical_fo").append("text").text("orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wi")
    d3.select("#suspects_fo").selectAll("text.suspect").data(red_danger_fo).enter()
        .append("text")
        .style("cursor","pointer")
        .text(function(d){return all_REST_response[d].hid}).style("width","fit-content")
        .on("click",function(d){
            details_I_II(d)
        })
    d3.select("#critical_fo").selectAll("text.critical").data(yellow_danger_fo).enter()
        .append("text")
        .style("cursor","pointer")
        .text(function(d){return all_REST_response[d].hid}).style("width","fit-content")
        .on("click",function(d){
            details_I_II(d)
        })
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
    d3.select("#fo_details").append("div").attr("id", "details_I").append("text").html(detailsI).style("overflow-x","auto")
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
    
    // //
    // var EX_MITIG = el.ex_mitig
    // for (const key in exploit_data) {
    //     if (Object.hasOwnProperty.call(exploit_data, key)) {
    //         const element = exploit_data[key];
    //         d3.select("#"+key.replace(/[^A-Z]+/g, "")).transition().duration(1500).style("border-color","black")
    //     }
    // }
    // if(EX_MITIG.length>0){
    //     EX_MITIG.forEach(method => {
    //         d3.select("#"+method.replace(/[^A-Z]+/g, "")).transition().duration(1500).style("border-color","#da9393")
    //     });
    // }

    //
    var FILE_TYPE = "<div> File type: <button type='button'  id='btn_ft_dtls' ><i class='fas fa-caret-down' ></i> </div> "
    d3.select("#details_III").append("div").attr("id", "details_ft").append("text").html(FILE_TYPE)
    d3.select("#btn_ft_dtls").on("click",function(d){
        var is_down = d3.select("#btn_ft_dtls").select("i").attr("class") == "fas fa-caret-down"? true:false
        if(is_down) {
            d3.select("#details_ft").append("div").attr("id","ft_dtls").append("text").text(el.file_type)
            d3.select("#btn_ft_dtls").select("i").attr("class","fas fa-caret-up")
        }
        else{
            d3.select("#ft_dtls").remove()
            d3.select("#btn_ft_dtls").select("i").attr("class","fas fa-caret-down")
        }
    })

    // if(el.danger.length>0){
    //     var d =  d3.select("#fo_details").append("div").style("word-break","break-word")
    //     var DANGER = "Weaknesses:" 
    //     d.html(DANGER)
    //     d.selectAll("text.weak").data(el.danger).enter()
    //         .append("text")
    //         .text(function(d){return decodeWeakness(d)+"    "})
    //         .on("click",function(d){
    //             weakClickBehaviour(el,d)
    //         })
    // }
    if(el.danger.length>0){
        var DANGER = "<div> Weaknesses: <button type='button'  id='btn_weak_dtls' ><i class='fas fa-caret-down' ></i> </div> "
        d3.select("#details_III").append("div").attr("id", "details_weak").append("text").html(DANGER)
        d3.select("#btn_weak_dtls").on("click",function(d){
            var is_down = d3.select("#btn_weak_dtls").select("i").attr("class") == "fas fa-caret-down"? true:false
            if(is_down) {
                d3.select("#details_weak").append("table").attr("id","table_weak").style("border","1px solid black").style("border-radius","5px").style("margin-left","25%")
                                            .append("tbody").style("border","1px solid black").style("border-radius","5px")
                d3.select("#table_weak").selectAll("text.weak").data(el.danger).enter().append("tr").style("border","1px solid black").style("border-radius","5px")
                    .append("td").style("border","1px solid black")
                    .text(function(d){return decodeWeakness(d,"t")+"    "})
                    .on("click",function(d){
                        weakClickBehaviour(el,d)
                    })
                    .style("border","1px solid black").style("border-radius","5px")
                    .style("background-color",function(d){
                        return decodeWeakness(d,"c")
                    })
                d3.select("#btn_weak_dtls").select("i").attr("class","fas fa-caret-up")
            }
            else{
                d3.select("#table_weak").remove()
                d3.select("#btn_weak_dtls").select("i").attr("class","fas fa-caret-down")
            }
        })
        d3.select("#btn_weak_dtls").dispatch("click")
        
    }


    //download
    d3.select("#fo_details").append("div").append("button").text("download")
            .on("click",function(d){
                if (confirm('Are you sure you want to download the file?')) 
                        // Save it!
                        download(uid,el.mime)
            })
    //objdump
    d3.select("#fo_details").append("div").attr("id","objdump").append("button").text("objdump")
            .on("click",function(d){
                var url = "http://127.0.0.1:5000/api/fo?hid="+el.hid.split("/").at(-1)+"&uid="+uid
                axios.get(url)
                    .then((response) => {
                        d3.select("#objdump").append("text").html("response:"+br+response.data)
                        console.log(response.data);
                        console.log(response.status);
                        console.log(response.statusText);
                        console.log(response.headers);
                        console.log(response.config);
                    });
            })
}


function weakClickBehaviour(el,d){
    switch (d) {
        case "crypto":
            return "crypto material exposed"
        case "uap":
            return "plain credential"
        case "explo":
            for (const key in exploit_data) {
                if (Object.hasOwnProperty.call(exploit_data, key)) {
                    const element = exploit_data[key];
                    d3.select("#"+key.replace(/[^A-Z]+/g, "")).transition().duration(1500).style("border-color","black")
                }
            }
            el.ex_mitig.forEach(method => {
                d3.select("#"+method.replace(/[^A-Z]+/g, "")).transition().duration(1500).style("border-color","#da9393")
            });
            return 
        case "cve_is_crit true":
            d3.select("#violin_div").transition().duration(1500).style("border-color","#da9393").transition().duration(1500).style("border-color","white")
            return
        case "cve_is_crit false":
            d3.select("#violin_div").transition().duration(1500).style("border-color","#da9393").transition().duration(1500).style("border-color","white")
            return

    }
}


function decodeWeakness(d,sel){
    switch (d) {
        case "crypto":
            if(sel=="c") return "#88000078"
            return "crypto material exposed"
        case "uap":
            if(sel=="c") return "#88000078"
            return "plain credentials"
        case "explo":
            if(sel=="c") return "#eada4e99"
            return "mitigation disabled"
        case "cve_is_crit true":
            if(sel=="c") return "#88000078"
            return "critical cve found"
        case "cve_is_crit false":
            if(sel=="c") return "#eada4e99"
            return "cve found"
    }
}

    