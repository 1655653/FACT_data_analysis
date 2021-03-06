//*utils 


function connectWithSc(hid,event){
    var cpe = ""
    op = event == "mouseover" ? "0.2":"1"
    bord_co = event == "mouseover" ? "#d56f717a":"#ffffff94"
    
    try {
        id = "icon_scw_of"+hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_").replace("~","_TILDE")
        x_icon=parseFloat(d3.select("#"+id).style("y").replace("px",""))
        position = event == "mouseover" ? x_icon+8:x_icon-8
        p = event == "mouseover" ? 8:0
        f = event == "mouseover" ? "black":"white"
        d3.select("#"+id)
        .transition().duration(50).style("transform","translate(0px,"+p+"px)")
        var id = d3.select("#"+id).node().parentNode.getElementsByTagName("text")
        cpe = id[0].innerHTML
        d3.select("#leftside").transition().duration(400).style("border-color",bord_co)
    } catch (e) {
        //console.log(e)
    }
    // d3.select("#leftside").transition().duration(400).style("border-color",bord_co)
    // .transition().duration(50).style("y",position+"px")
    // .transition().duration(50).style("y",position+"px")
    d3.select("#sw_comp_svg_container").selectAll(".tick").each(function(e,i){
        if(! Number.isInteger(e)){ //rimuovo i tick dei num 1-10
            if(d3.select(this).select("text").text() == cpe){
                // d3.select(this).select("text").transition().duration(100).style("fill",f)
            }
            else{
                d3.select(this).select("text").transition().duration(100).style("opacity",op)
            }
        }
    })

    
}

function connectWithBp(hid,event){
    a = d3.select("#g_bipartite").selectAll(".viz-biPartite-mainBar").each(function(e, i){
        try {
            if(ALL_REST_RESPONSE[e.key].hid == hid) {
                d3.select(this).dispatch(event)
            }
        } catch (n) {
            
        }
    })
}
function connectWithSun(uid,event,vi){
    if(n_fos>1000) return 
    a = d3.select("#bigsun").selectAll(".node").each(function(e, i){
        
        op1= event=="mouseover"? "0.2": "1" //sbagliati
        op2 = "1" //giusti
        try {
            if(e.data.uid != uid && uid!= "folder"){ //NON ?? il fo
                d3.select(this).transition().duration(1000).style("opacity",op1)
            }
            else if(uid == "folder"){
                if(e.data.vi == vi){ //?? la folder giusta
                    d3.select(this).transition().duration(1000).style("opacity",op2)
                }
                else{ //non ?? la fodler giusta
                    d3.select(this).transition().duration(1000).style("opacity",op1)
                }
            }
            else{//?? il fo giusto
                d3.select(this).transition().duration(1000).style("opacity",op2)
            }
        } catch (n) {
        }
    })
}

function connectWithRd(hid,event){
    
    bkg = event=="mouseover"? "black": "white"
    op = event == "mouseover" ? "0.2":"1"
    

    try {
        id = hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_").replace("~","_TILDE")
        var found = false
        //vedi se lo trovi
        d3.select("#rightside").selectAll("span, text").each(function(e,i){
            if(d3.select(this).attr("id")==id){
                found = true
            }
        })

        if(!found){ //se non lo trovi 
            NEUTRAL_FO.system.forEach(element => {
                if(element.hid == hid) found = true
            });
            if(!found){ //?? un link
                var uid 
                a = d3.select("#bigsun").selectAll(".node").each(function(e, i){
                    if(hid == e.data.hid){
                        // console.log(e.data)
                        uid = e.data.uid
                    }
                })
                // console.log(uid)
                // console.log(ALL_REST_RESPONSE[uid].hid)//l'hid cambia
                id = ALL_REST_RESPONSE[uid].hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_").replace("~","_TILDE")
                // console.log(id)
            }
        }

        d3.select("#rightside").selectAll("span, text").each(function(e,i){
            if(d3.select(this).attr("id")==id){
                // d3.select(this).transition().duration(400).style("color",bkg)
            }
            else{
                d3.select(this).transition().duration(400).style("opacity",op)
            }
        })
        
    } catch (error) {
        // console.log(error)
    }
}

function clickRd(hid){
    id = hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_").replace("~","_TILDE")
    d3.select("#rightside").select("#"+id).dispatch("click")
}

function tToIndex(t){
    // //? serve a creare un selettore per metric_occurrences ={
    //     "CRY":0,...
    // }
    // metric_occurrences_list[tToIndex(t)] = metric_occurrences
    switch (t) {
        case "c":
            return 0
        case "s":
            return 1
        case "n":
            return 2
    
      
    }
}

function rotateLabel(s,e,d){
    var startTranslateState = 'rotate('+s+'deg)';
    var endTranslateState = 'rotate('+e+'deg)';
    var translateInterpolator = d3.interpolateString(startTranslateState, endTranslateState);
    d3.select("#param_label")
        .transition()
        .duration(d)
        .styleTween('transform', function (d) {
            return translateInterpolator;
        });
}
function cve_count(d,type){
    switch (type) {
        case "base_score":
            return d.all_cve_objects_bs
        case "exploitability_score":
            return d.all_cve_objects_es
        case "impact_score":
            return d.all_cve_objects_is
    }
}

function getDimFloat(id,dim){
    var r 
    try {
        r = parseFloat(d3.select("#"+id).style(dim).split("px")[0])
        if(!Number.isNaN(r))return r
        throw new Error('getDimFloat error, NAN in '+id + " "+dim)
    
    } catch (error) {
        throw error
    }
}

function download(uid,contentType){
    var urldw = endpoint+"binary/"+uid
    d3.json(urldw, function(data) {
        //alert("download started");
        var b64 = data.binary //! se da errore, devi attivre MOSIF su chrome
        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
        }
        const blob = b64toBlob(b64, contentType);
        const blobUrl = URL.createObjectURL(blob);
    
        //window.location = blobUrl;
        // // Construct the <a> element
        var link = document.createElement("a");
        link.download = data.file_name
        link.href = blobUrl;
    
        document.body.appendChild(link);
        link.click();
    })
}
//* if only one mime i use the same color of supertype
function moreThanOne(element){
    var howmany=0
    ListMimes.forEach(i => {
        if(element.split("/")[0]==i.split("/")[0]) howmany++ 
    });
    return howmany>1? true: false
}

function downloadReport(uid){
    var e = "http://192.168.30.177:5000/pdf-download/"
    var urldw = e+uid
    window.open(urldw);
}

function ShowLoader(bool){
    d3.select(".loader").transition().duration(300).style("opacity","0").remove()
    if(bool){
        h = screen.height/2 -120 -90
        w = screen.width/2 -120
        d3.select("body").append("div").attr("class","loader")
            .style("left",w+"px")
            .style("top",h+"px")
        d3.select("body").append("text").attr("class","loader_text")
            .style("left",w+38+"px")
            .style("top",h+90-22+"px")
            .text("LOADING")
    }
    else{
        d3.select(".loader").transition().duration(300).style("opacity","0").remove()
        d3.select(".loader_text").transition().duration(300).style("opacity","0").remove()
    }
    bool = ! bool
}
