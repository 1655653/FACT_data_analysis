var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var unpack_blacklist = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//*
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true
document.getElementById("byteCBOX").checked=true

var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri
var all_REST_response={}//? collazione di tutte le chiamate api, ordinate con chiave l'UID
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

var Tree = {}
var BackupTree = {}
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
                    DrawSunburst()
                    
                    
                    document.getElementById("mime_filter_start").onclick = FilterMIME//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    document.getElementById("mime_filter_reset").onclick = resetTree//? <---- chiamata quando premi bottone, FILTRO TIPO 2
                    packedUI(data.firmware.analysis.unpacker.number_of_unpacked_files)
                    
                    
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
        select = document.createElement('select');
        select.setAttribute("id", "packed_select")

        select.onchange = selectedPackedFO //? lista dei FO packed

        opt = document.createElement('option');
        opt.innerHTML += "----"
        select.appendChild(opt)
        list_packed_hid.forEach(element => {
            var op = document.createElement('option')
            op.innerHTML += element
            select.appendChild(op)
        });
        document.getElementById("reportOf").append(select);
        d3.select("#reportOf").append('br');
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
    d3.select("#reportOf").append("br")
}
function resetTree(){
    Tree = JSON.parse(JSON.stringify(BackupTree))
    mime_filtered = []
    ListMimes.forEach(e => {
        document.getElementById(e.replace(/[/.]/g,"_")).checked = false
        document.getElementById(e.split("/")[0]).checked = false
    });
    DrawSunburst()
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

mime_filtered = []
function FilterMIME(){
    
    ListMimes.forEach(element => {
        if(!mime_filtered.includes(element) && d3.select('#'+element.split("/")[0]).property('checked')) mime_filtered.push(element)
        if(!mime_filtered.includes(element) && d3.select('#'+element.replace(/[/.]/g,"_")).property('checked')) mime_filtered.push(element)
    });
    if(mode != "mode = highligths"){ //? checked è remove, unchecked è opacize
        RemoveMimeFOFromTree(Tree,mime_filtered)
        calculateLeaves(Tree)
        calculateMimes(Tree)
    }
    else{
        LabelMimeFOFromTree(Tree,mime_filtered)
        
    }
    
    console.log(Tree)
    DrawSunburst()
    
    
}
function LabelPackedFOFromTree(Tree,list_packed){
    Tree.children.forEach(child => {
        list_packed.forEach(element => {
            if(element==child.uid) child["filtered"] = true
        });
        LabelPackedFOFromTree(child,list_packed) 
    });
}

function selectedPackedFO(){
    var selectBox = document.getElementById("packed_select");
    if(selectBox.selectedIndex==0) return //case "---"
    var FO = list_packed_uid[selectBox.selectedIndex-1]
    var selectedFO = all_REST_response[FO].data.file_object
    console.log(selectedFO)
    var mime_check = "The file type is not blacklisted, so it should have been unpacked ( MIME: "+selectedFO.analysis.file_type.mime+")"
    if(selectedFO.analysis.unpacker["0_ERROR_genericFS"]) mime_check = "During the unpacking process, a genericFS error arisen  ( MIME: "+selectedFO.analysis.file_type.mime+")"
    if(unpack_blacklist.includes(selectedFO.analysis.file_type.mime))  mime_check= "Unpacking skipped due to blacklisted file type ( MIME: "+selectedFO.analysis.file_type.mime+")"
    d3.select("#log_packed_FO").text(mime_check)
    //LabelPackedFOFromTree(Tree,list_packed)


    
}
var colormimeSupertype = d3.scaleOrdinal().domain(ListSuperMimes).range(d3.schemeCategory20)
var colormimeSubtype = d3.scaleOrdinal().domain(ListMimes).range(d3.schemeCategory10)
var mode = "mode = highligths"
//*interface to filter mimes
function BuildMimeFilterUI(list_m){
    d3.select("#container").append("div").attr("id","filter_menu_type").style("flex-grow","1").style("line-height", "3.3")//?div side to side
    d3.select("#container").append("div").attr("id","filter_menu_subtype").style("flex-grow","1").style("line-height", "3.3")
    
    d3.select("#filter_menu_type").append('text').text("mixed folder").style("color","#7da19d")
    d3.select("#filter_menu_type").append('br');
    
    list_m.sort()
    list_m.forEach(element => { 
        if (! document.getElementById(element.split("/")[0])) { //? metto i macro tipi
            d3.select("#filter_menu_type").append('input').attr('type','checkbox').attr("id",element.split("/")[0]).on("click", setCheckbox)
            d3.select("#filter_menu_type").append("text").text(element.split("/")[0]).attr("id","text"+element.split("/")[0])
                .style("color", colormimeSupertype(element.split("/")[0]))
                .on("mouseover", function() {highligthTheseMime(element,"super")})
                .on("mouseleave", function() {DehighligthTheseMime(element,"super")});
            d3.select("#filter_menu_type").append('input').attr('type','checkbox').attr("id","details"+element.split("/")[0]).on("click", function(){showsubType(element.split("/")[0])})
            d3.select("#filter_menu_type").append('br');
        }
        if(element!="undefined"){ //? metto i subtypes
            d3.select("#filter_menu_subtype").append('input').attr('type','checkbox').attr("id",element.replace(/[/.]/g,"_")).style("visibility", "hidden").on("click", setSubCheckbox) //mi salvo l'id con il replace perchè al dom non piace lo slash
            d3.select("#filter_menu_subtype").append("text").text(element).attr("id","text"+element.replace(/[/.]/g,"_"))
                .style("color", function(){ //? se ci sono almeno due sottotipi uso colori diversi, senno uso quello del supertipo
                    if(moreThanOne(element))return colormimeSubtype(element)
                    return colormimeSupertype(element.split("/")[0])
                })
                .style("visibility", "hidden")
                .on("mouseover", function() {highligthTheseMime(element,"sub")})
                .on("mouseleave", function() {DehighligthTheseMime(element,"sub")});
            d3.select("#filter_menu_subtype").append('br');
        }
    });
    
    //? tipo di filtro
    d3.select("#filter_menu_type").append("button").text(mode).attr("id","filtername")
    d3.select("#filter_menu_type").append('br');
    
    d3.select('#filtername').on('click', function(){
        mode == "mode = highligths"? mode = "mode = remove": mode = "mode = highligths"
        d3.select('#filtername').text(mode)
    })
    
    
    d3.select("#filter_menu_type").append("button").text("filter").attr("id","mime_filter_start")
    d3.select("#filter_menu_type").append("button").text("reset").attr("id","mime_filter_reset")
    
    
}
function moreThanOne(element){
    var howmany=0
    ListMimes.forEach(i => {
        if(element.split("/")[0]==i.split("/")[0]) howmany++ 
    });
    return howmany>1? true: false
}
function highligthTheseMime(type,suosub){
    var name = "#path"+type.replace(/[/.]/g,"_")
    if(suosub=="super"){
        name = '.path'+type.split("/")[0]
    }
    d3.selectAll(name)
        .style("opacity", function(d) {return 1})
    }
    
    
function DehighligthTheseMime(type,suosub) {
    var name = "#path"+type.replace(/[/.]/g,"_")
    if(suosub=="super"){
        name = '.path'+type.split("/")[0]
    }
    d3.selectAll(name)
        .style("opacity", function(d) {return 0.8})
    }

function showsubType(type){
    var color = colormimeSupertype(type)
    var opacity = 1
    ListMimes.forEach(subtype => {
        var op = "hidden"
        if(type == subtype.split("/")[0]){
            if(d3.select('#details'+type).property('checked')){
                op = "visible"
                color = "black"
                opacity = 0.3
            }
            d3.select("#"+subtype.replace(/[/.]/g,"_")).style("visibility", function(){console.log(op);return op})
            d3.select("#text"+subtype.replace(/[/.]/g,"_")).style("visibility", op)
        }

    });
    d3.select("#text"+type).style("color",color).style("opacity", opacity)
    DrawSunburst()
}
//?coerenza ra i due div quando metto il check o lo tolgo  
var setSubCheckbox = function() {
    ListMimes.forEach(e => {
        if(! d3.select("#"+e.replace(/[/.]/g,"_")).property('checked')) {
            document.getElementById(e.split("/")[0]).checked = false;  
        }
    });
}
var setCheckbox = function() {
    ListMimes.forEach(e => {
        if(d3.select('#'+e.split("/")[0]).property('checked')){
            d3.select("#"+e.replace(/[/.]/g,"_")).property('checked',"true")
        }
        else{
            document.getElementById(e.replace(/[/.]/g,"_")).checked = false;  
        }
    });
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