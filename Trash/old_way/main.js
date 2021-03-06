var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var UNPACK_BLACKLISTED = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//*
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true
document.getElementById("byteCBOX").checked=true

var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri
var all_REST_response={}//? collazione di tutte le chiamate api, ordinate con chiave l'UID
var all_NIST_REST_response={}//? collazione di tutte le chiamate api del nist , ordinate con chiave la cve

var Tree = {}
var BackupTree = {}

var margin = {top: 10, right: 10, bottom: 10, left: 100},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

//*small multiples
var exploit_data
//* heatmap
var SCORE_TYPE = "base_score"
var heatmap_data;
var heatmap_dom;
//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
var list_packed=[]
var list_packed_hid=[]
var list_packed_uid = []

ListMimes = [] //? lista con i subtypes
ListSuperMimes = []//?lista con solo i types
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true

//* call all firmwares
d3.json(url, function(data) {
    select=document.getElementById("allFW")
    var ljs = data.uids
    ljs.unshift("---") //? <----- riempio la lista con gli uid dei firmware (per ora ho solo quelli)
    ljs.forEach(function (item) {
        let op = document.createElement('option');
        op.setAttribute("value", item)
        select.appendChild(op);
        op.innerHTML += item;
    });
    
})

document.getElementById("start").onclick = callFW//? <---- chiamata quando premi bottone
//* starts analysis on a selected FW
function callFW() {
    console.log("STARTED")
    var selectBox = document.getElementById("allFW");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //console.log(selectedValue)
    if(selectedValue != "---"){
        url = endpoint+"firmware/"+selectedValue+"?summary=true"
        d3.json(url, function(data) { //?<----- chiamata alle api
            
            //*exploit mitigation*/
            exploit_data = BuildExploitData(data.firmware.analysis.exploit_mitigations.summary)
            //console.log(exploit_data)
            //?----- cpu_architecture string
            var cpu_info =  []
            for (const key in data.firmware.analysis.cpu_architecture.summary) {
                if (Object.hasOwnProperty.call(data.firmware.analysis.cpu_architecture.summary, key)) {
                    const element = data.firmware.analysis.cpu_architecture.summary[key];
                    cpu_info.push(key)
                }
            }
            var plu = "  cpu architecture"
            cpu_info.length > 1 ? plu += "s: " : plu+= ": "
            d3.select("#reportOf").html("</br>Report of "+ data.firmware.meta_data.hid + "<tspan>  MIME: "+data.firmware.analysis.file_type.mime +"</tspan>" + plu +cpu_info)
            d3.select("#downloadFW").style("visibility", "visible").on("click",function(){console.log("download started");download( data.request.uid ,data.firmware.analysis.file_type.mime )})
            if (document.getElementById("unpackerCKBOX").checked){
                //console.log(data)
                //***build root of Tree
                document.getElementById("reportOf").innerHTML += "</br>"+ "Over " + data.firmware.meta_data.total_files_in_firmware +" files "
                list_packed = data.firmware.analysis.unpacker.summary.packed //? usato per tagggare i FO packed
                Tree["uid"] = data.request.uid
                Tree["hid"] = data.firmware.meta_data.hid
                Tree["mime"] = data.firmware.analysis.file_type.mime
                ListMimes.push(data.firmware.analysis.file_type.mime)
                ListSuperMimes.push(data.firmware.analysis.file_type.mime.split("/")[0])
                Tree["bytes"] = 0 //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                Tree["contacome"]=1//? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                Tree["size"] = data.firmware.meta_data.size
                Tree["leaves"] = 0
                Tree["children"] = [];
                if(data.firmware.meta_data.included_files.length==0) {
                    document.getElementById("reportOf").innerHTML+= "NOT ENOUGH INFO TO GIVE A VISUALIZATION"
                    return
                }
                (async () => {
                    INCLUDED_FILES= data.firmware.meta_data.included_files
                    
                    

                    // //***building tree
                    console.log("BUILDING TREE")
                    await BuildTree(data.firmware.meta_data.included_files, Tree, data.firmware)
                    calculateLeaves(Tree) 
                    // //calculateFOlderSize(Tree)//?per ora me ne sbatto della grandezza delle folder
                    calculateMimes(Tree) 
                    BackupTree = JSON.parse(JSON.stringify(Tree))
                    console.log("TREE BUILT")
                    console.log(Tree)
                    //console.log(JSON.stringify(Tree, null, 2))
                    
                    // //***building directory
                    console.log("BUILDING DIRECTORY")
                    BuildMimeFilterUI(ListMimes)//checkboxes to filter the mime
                    DrawDirectory()
                    // document.getElementById("mime_filter_start").onclick = FilterMIME//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    document.getElementById("mime_filter_reset").onclick = resetTree//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    d3.select("#reportOf").select("tspan").style("color",colormimeSupertype(data.firmware.analysis.file_type.mime.split("/")[0]))
                    console.log("DIRECTORY BUILT")


                    // // //***building heatmap
                    // console.log("BUILDING HEATMAP")
                    // await buildHeatmapData(data.firmware.analysis.cve_lookup)
                    // DrawHeatmap(heatmap_data)
                    // BackupHeatMap = JSON.parse(JSON.stringify(heatmap_data))
                    // console.log("HEATMAP BUILT")
                    // console.log(all_REST_response)


                    // //***building peckedUI
                    console.log("BUILDING PACKED UI")
                    packedUI(data.firmware.analysis.unpacker.number_of_unpacked_files)
                    console.log("PACKED UI BUILT")
                    
                    // //***building small multiples
                    console.log("BUILDING SMALL MULTIPLES")
                    drawMultipleHisto()
                    console.log("SMALL MULTIPLES BUILT")
                    
                    
                    // //***building rank
                    console.log("BUILDING RANK")
                    DrawRank()
                    
                    console.log("RANK BUILT")





                })();
            } 
        })
    }
  
    //? pulisco le var

    list_response_cpu_archi=[]
    list_response_unpacker=[]
    list_packed=[]
    list_packed_hid=[]
  
}
function BuildExploitData(summ){
    var d = {}
    for (const key in summ) {
        if (Object.hasOwnProperty.call(summ, key)) {
            const element = summ[key];
            var method = key.trim().replace(/[^A-Z]+/g, "");
            var enordi = key.trim().replace(/[^a-z]+/g, " ");
            if(!(method in d)){
                d[method] = []
            }
            var entry = {
                "eod":enordi,
                "Value":element.length,
                "UIDs":element
                }
            d[method].push(entry)
            
            //rankdanger
            element.forEach(e => {
                if(enordi == "disabled" && !red_danger_fo.includes(e) && !yellow_danger_fo.includes(e))
                    yellow_danger_fo.push(e)
            });
        }
    }
    //console.log(JSON.stringify(d, null, 2))
    return d
}

function download(uid,contentType){
    var urldw = endpoint+"binary/"+uid
    d3.json(urldw, function(data) {
        //alert("download started");
        var b64 = data.binary
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


//!unused
function PruneTree(fatherNode){
    // fatherNode["mime_types"]=buildMimelist(ListMimes)
    // fatherNode["leaves"] = 0
    //! il problema ?? che devo andare fino a fondo per poter sapere e la folder ?? vuota oppure no, qui controllo solo se il children ?? == 0 ma puo essere 1 che ha un children ==00 etc-...
    l = [] //? riempio la lista con le posizioni degli elementi da eliminare
    for (let i = 0; i < fatherNode.children.length; i++) {
        const child = fatherNode.children[i];
        //console.log("child")
        //console.log(child)
        if(child.children.length==0){ //?se ?? un nodo con 0 figli, lo devo eliminare
            l.push(i)
        }
    }
    //console.log(l)
    //? ciclo sulla lista di index, elimino l'elemento dal children e aggiorno la lista di index (perch?? l'elemento successivo ha  index -1)
    if(l.length>0){
        for (let i = 0; i < l.length; i++) {
            const pos = l[i];
            fatherNode.children.splice(pos,1)
            for (let j = 0; j < l.length; j++) {
                l[j]--
            }
        }
        
    }
    //console.log("lenght after "+fatherNode.children.length)
    //? chiamata ricorsiva
    fatherNode.children.forEach(child => {
        //console.log("calling--> " + child.hid)
        PruneTree(child)
    });

}

