var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var unpack_blacklist = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//*
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true
document.getElementById("byteCBOX").checked=true

var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri

//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
list_packed=[]
list_packed_hid=[]

ListMimes = ["undefined"]
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

var Tree = {}
//* starts analysis on a selected FW
function callFW() {
    console.log("STARTED")
    var selectBox = document.getElementById("allFW");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //console.log(selectedValue)
    if(selectedValue != "---"){
        url = endpoint+"firmware/"+selectedValue+"?summary=true"
        d3.json(url, function(data) { //?<----- chiamata alle api
            document.getElementById("reportOf").innerHTML = "</br>Report of "+ data.firmware.meta_data.hid + "  MIME: "+data.firmware.analysis.file_type.mime 
            if (document.getElementById("unpackerCKBOX").checked){
                //console.log(data)
                document.getElementById("reportOf").innerHTML += "</br>"+ "Total " + data.firmware.meta_data.total_files_in_firmware +" files "
                Tree["uid"] = data.request.uid
                Tree["hid"] = data.firmware.meta_data.hid
                Tree["mime"] = data.firmware.analysis.file_type.mime
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
                    DrawSunburst()
                    
                    BuildMimeFilterUI(ListMimes)//checkboxes to filter the mime
                    //document.getElementById("mime_filter_start").onclick = FilterMIME//? <---- chiamata quando premi bottone, FILTRO TIPO 1
                    document.getElementById("mime_filter_start").onclick = FilterMIME//? <---- chiamata quando premi bottone, FILTRO TIPO 2

                    
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
//* filter mime 

function LabelMimeFOFromTree(fatherNode,mime_filtered){
    //console.log("lenght before "+fatherNode.children.length)
    l = [] //? riempio la lista con le posizioni degli elementi da eliminare
    for (let i = 0; i < fatherNode.children.length; i++) {
        const child = fatherNode.children[i];
        if(child.uid!="folder"){ //?se non è foglia, inserisco la posizione dell'elemento
            mime_filtered.forEach(element => {
                if(child.mime == element) {
                    // console.log("child")
                    // console.log(child)
                    l.push(i)
                }
            });
        }
    }
    //console.log(l)
    //? ciclo sulla lista di index, labello l'elemento dal children e aggiorno la lista di index (perchè l'elemento successivo ha  index -1)
    if(l.length>0){
        for (let i = 0; i < l.length; i++) {
            const pos = l[i];
            //console.log(fatherNode.children[pos])
            fatherNode.children[pos]["filtered"] = true
        }
        
    }
    //console.log("lenght after "+fatherNode.children.length)
    // console.log("this is the tree DURING the filter")
    // console.log(Tree)
    //? chiamata ricorsiva
    fatherNode.children.forEach(child => {
        //console.log("calling--> " + child.hid)
        LabelMimeFOFromTree(child,mime_filtered)
    });

    var filtchild= 0
    fatherNode.children.forEach(child => {
        if(child.filtered) filtchild++
    });
    if(filtchild == fatherNode.children.length && filtchild>0) fatherNode["filtered"] = true
  
    

}

function RemoveMimeFOFromTree(fatherNode,mime_filtered){
    fatherNode["leaves"]=0
    delete fatherNode["mime_types"]
    //console.log("lenght before "+fatherNode.children.length)
    l = [] //? riempio la lista con le posizioni degli elementi da eliminare
    for (let i = 0; i < fatherNode.children.length; i++) {
        const child = fatherNode.children[i];
        if(child.uid!="folder"){ //?se non è foglia, inserisco la posizione dell'elemento
            mime_filtered.forEach(element => {
                if(child.mime == element) {
                    // console.log("child")
                    // console.log(child)
                    l.push(i)
                }
            });
        }
    }
    //console.log(l)
    //? ciclo sulla lista di index, elimino l'elemento dal children e aggiorno la lista di index (perchè l'elemento successivo ha index -1)
    if(l.length>0){
        for (let i = 0; i < l.length; i++) {
            const pos = l[i];
            //console.log(fatherNode.children[pos])
            fatherNode.children.splice(pos,1)
            for (let j = 0; j < l.length; j++) {
                l[j]--
            }
        }
        
    }
    //console.log("lenght after "+fatherNode.children.length)
    // console.log("this is the tree DURING the filter")
    // console.log(Tree)
    //? chiamata ricorsiva
    fatherNode.children.forEach(child => {
        //console.log("calling--> " + child.hid)
        RemoveMimeFOFromTree(child,mime_filtered)
    });

}

function FilterMIME(){
    mime_filtered = []
    ListMimes.forEach(element => {
        //console.log(element.replace(/[/.]/g,"_")) 
        if(d3.select('#'+element.replace(/[/.]/g,"_")).property('checked')) mime_filtered.push(element)
    });
    // //console.log(mime_filtered)
    if(d3.select('#filterType').property('checked')){ //? checked è remove, unchecked è opacize
        RemoveMimeFOFromTree(Tree,mime_filtered)
        calculateLeaves(Tree)
        calculateMimes(Tree)
    }
    else{
        LabelMimeFOFromTree(Tree,mime_filtered)
    }
    // //console.log("this is the tree after the filter")
    // PruneTree(Tree)
    // //calculateFOlderSize(Tree)
    console.log(Tree)
    DrawSunburst()
    // // console.log("this is the tree after the filter and prune")
    // // console.log(Tree)
    
}

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

//*interface to filter mimes
function BuildMimeFilterUI(list_m){
    list_m.forEach(element => {
        d3.select("#reportOf").append('input').attr('type','checkbox').attr("id",element.replace(/[/.]/g,"_")) //mi salvo l'id con il replace perchè al dom non piace lo slash
        d3.select("#reportOf").append("text").text(element+"  ");
    });
    d3.select("#reportOf").append('input').attr('type','checkbox').attr("id","filterType")
    d3.select("#reportOf").append("text").text("Label filter   ").attr("id","filtername");
    
    d3.select('#filterType').on('click', function(){d3.select('#filterType').property('checked')? d3.select('#filtername').text("Remove filter   "): d3.select('#filtername').text("Label filter   ")})

    d3.select("#reportOf").append("button").text("filter").attr("id","mime_filter_start")
}
