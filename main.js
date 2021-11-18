var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var UNPACK_BLACKLISTED = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//*
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true
document.getElementById("byteCBOX").checked=true

var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri
var all_REST_response={}//? collazione di tutte le chiamate api, ordinate con chiave l'UID

var Tree = {}
var BackupTree = {}

var violin_data;
var violin_dom;
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

            document.getElementById("reportOf").innerHTML = "</br>Report of "+ data.firmware.meta_data.hid + "  MIME: "+data.firmware.analysis.file_type.mime + plu +cpu_info
            d3.select("#downloadFW").style("visibility", "visible").on("click",function(){console.log("download started");download( data.request.uid ,data.firmware.analysis.file_type.mime )})
            if (document.getElementById("unpackerCKBOX").checked){
                //console.log(data)
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
                    await BuildTree(data.firmware.meta_data.included_files, Tree)
                    
                    calculateLeaves(Tree) 
                    //calculateFOlderSize(Tree)//!per ora me ne sbatto della grandezza delle folder
                    calculateMimes(Tree) 
                    
                    console.log("TREE BUILT")
                    console.log(Tree)
                    BackupTree = JSON.parse(JSON.stringify(Tree))
                    
                    BuildMimeFilterUI(ListMimes)//checkboxes to filter the mime
                    
                    document.getElementById("mime_filter_start").onclick = FilterMIME//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    document.getElementById("mime_filter_reset").onclick = resetTree//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    packedUI(data.firmware.analysis.unpacker.number_of_unpacked_files)


                    DrawSunburst()
                    
                    buildViolinData(data.firmware.analysis.cve_lookup)

                    DrawViolin()
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

function packedUI(unpack_list_size){
    var txt =""
    if(list_packed && unpack_list_size>0){//? se ci sono packed allora li mette
        txt ="FACT has not been able to unpack "+ list_packed.length + " elements  " 
        d3.select("#reportOf").append("text").text(txt)
            .append("button").text("expand").attr("id","packed_tree_expand_btn")
                .on("click",expandpackedTree)
            .append('br')
        d3.select("#reportOf").append("div").attr("id","packed_tree_expand").style("display","none")
        
        
    }
    else if(unpack_list_size == 0){
        txt ="FACT unpacked 0 elements " 
        d3.select("#reportOf").append("text").text(txt)
    }
    else {
        txt = "FACT has been able to unpack every elements  "
        d3.select("#reportOf").append("text").text(txt)
    }
    d3.select("#reportOf").append("br")
    d3.select("#reportOf").append("text").attr("id","log_packed_FO")
}

function talkAboutPackedFO(FOuid){
    var selectedFO = all_REST_response[FOuid].data.file_object
    console.log(selectedFO)
    console.log(FOuid)
    var tail = " ( MIME: "+selectedFO.analysis.file_type.mime+")"
    var mime_check = "The file type of " + selectedFO.meta_data.hid + " is not blacklisted, so it should have been unpacked" +tail
    if(selectedFO.analysis.unpacker["0_ERROR_genericFS"]) mime_check = "During the unpacking process of " + selectedFO.meta_data.hid + ", a genericFS error arisen"+tail
    if(UNPACK_BLACKLISTED.includes(selectedFO.analysis.file_type.mime))  mime_check= "Unpacking of " + selectedFO.meta_data.hid + " skipped due to blacklisted file type"+tail
    d3.select("#log_packed_FO").text(mime_check+"      ")
        .append("button").text("download").attr("id","dwld")
            .on("click",function(){download( FOuid ,selectedFO.analysis.file_type.mime)})
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
    //! il problema è che devo andare fino a fondo per poter sapere e la folder è vuota oppure no, qui controllo solo se il children è == 0 ma puo essere 1 che ha un children ==00 etc-...
    l = [] //? riempio la lista con le posizioni degli elementi da eliminare
    for (let i = 0; i < fatherNode.children.length; i++) {
        const child = fatherNode.children[i];
        //console.log("child")
        //console.log(child)
        if(child.children.length==0){ //?se è un nodo con 0 figli, lo devo eliminare
            l.push(i)
        }
    }
    //console.log(l)
    //? ciclo sulla lista di index, elimino l'elemento dal children e aggiorno la lista di index (perchè l'elemento successivo ha  index -1)
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

