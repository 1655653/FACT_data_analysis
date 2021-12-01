//* rank
var BOUND_FATTEST = 5
var fattest_fo = []
//* builds the tree calling all packed/unpacked FO

async function BuildTree(included_files, fatherNode){ //input is list of included files of the father node
            if( included_files.length > 0){
                promises = [];
                included_files.forEach(function(item) {
                    url = endpoint+"file_object/"+item+"?summary=true";
                    promises.push(axios.get(url));
                });
                const res_File_objects = await Promise.all(promises)
                for(let response of res_File_objects){
                    //all_REST_response[response.data.request.uid] = response
                    var ioi_response = {}
                    ioi_response["hid"]= response.data.file_object.meta_data.hid
                    ioi_response["unpacker"]= response.data.file_object.analysis.unpacker
                    ioi_response["cve_results"]= response.data.file_object.analysis.cve_lookup.cve_results
                    ioi_response["mime"]= response.data.file_object.analysis.file_type.mime
                    ioi_response["size"]= response.data.file_object.meta_data.size
                    ioi_response["sw_comp"]= response.data.file_object.analysis.software_components.summary
                    ioi_response["file_type"]= response.data.file_object.analysis.file_type.full
                    ioi_response["ex_mitig"] = []
                    response.data.file_object.analysis.exploit_mitigations.summary.forEach(e => {
                        t = e.split(" ")
                        t.pop()
                        ioi_response["ex_mitig"].push(t.join(" "))
                    });

                    all_REST_response[response.data.request.uid] = ioi_response
                    
                    var m = response.data.file_object.analysis.file_type.mime
                    if(! ListMimes.includes(m)) ListMimes.push(m)
                    if(!ListSuperMimes.includes(m.split("/")[0]))ListSuperMimes.push(m.split("/")[0])

                    var node = {}
                    response.data.file_object.meta_data.virtual_file_path.forEach(path => {
                        //console.log(path)
                        node = {}
                        node["uid"] = response.data.request.uid
                        node["vi"] = path[0].split('').sort(function(){return 0.5-Math.random()}).join('')+ Math.random().toString(36).substr(2).replace(/[^\w\s]/g, '_')
                        node["vi"] = node["vi"].replace(/[^\w\s]/g, '')
                        if(list_packed && list_packed.includes(response.data.request.uid)) node["packed"] = true
                        node["hid"] = path.substring(path.indexOf("|")).split("|").filter(d => d != "").at(-1) //uso path per avere gli alias
                        node["mime"] = response.data.file_object.analysis.file_type.mime
                        node["bytes"] = response.data.file_object.meta_data.size //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                        node["contacome"]=1 //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                        node["size"] = response.data.file_object.meta_data.size
                        rankfattest(response.data.request.uid, response.data.file_object.meta_data.size)
                        node["leaves"]=0
                        node["children"] = []
                        path = path.substring(path.indexOf("/")).split("/").filter(d => d != "") //uso path per avere il singolo path
                        path.pop();
                        if(path.length>0)
                            managePath(fatherNode.children,path,node)
                        else{
                            fatherNode.children.push(node)
                        }
                            
                        //console.log(Tree)
                    });
                    node["hid"] = response.data.file_object.meta_data.hid
                    if(list_packed){
                        list_packed.forEach(element => {
                            if(node["uid"]==element) {
                                list_packed_hid.push(node["hid"])
                                list_packed_uid.push(node["uid"])
                            }
                        });
                    }
                    await BuildTree(response.data.file_object.meta_data.included_files, node);
                    
                    
                };
                
            }
}
function rankfattest(uid,size){
    var el = {"uid":uid, "size": size}
    if(fattest_fo.length<BOUND_FATTEST) fattest_fo.push(el)
    else{
        fattest_fo.forEach(item => {
            if(el.size>item.size){
                if (!fattest_fo.filter(e => e.uid === el.uid).length > 0) {
                    /* vendors does not contains the element we're looking for */
                    item.size = el.size
                    item.uid = el.uid
                    return 
                  }
            }
        });
    }
}
function managePath(fatherNode,path,node){
    
    //console.log(path)
    //devo andare in fondo fin quando trovo una folder esistente
    var found = false //true se trovo una folder esistente
    fatherNode.forEach(element => {
        if(element["hid"]==path[0]){ //se la cartella esiste
            found = true
            if(path.length> 0) managePath(element["children"],path.slice(1),node) //se posso continuo
            else { //appendere il nodo
                element["children"].push(node)
            }
        }
            
    });
    if(!found ){ //non ho trovato alcuna cartella, la devo creare
        if(path.length>0) {
            var folder = {}
            folder["uid"] = "folder"
            folder["vi"] = path[0].split('').sort(function(){return 0.5-Math.random()}).join('')+ Math.random().toString(36).substr(2).replace(/[^\w\s]/g, '_')
            folder["vi"] = folder["vi"].replace(/[^\w\s]/g, '')
            folder["hid"] = path[0]
            folder["bytes"] = 0 //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
            folder["contacome"]=1 //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
            folder["size"] = 0
            folder["leaves"] = 0
            folder["children"] = []
            fatherNode.push(folder) //appendo la cartella
            managePath(folder["children"],path.slice(1),node) //vado giu fino a quando non ho piu path
        }
        else{
            fatherNode.push(node)
        }
    }
    

}
function buildMimelist(listmime){
    var r = {}
    listmime.forEach(element => {
        r[element] = 0
    });
    return r
}
function calculateMimes(fatherNode){
    
    if(fatherNode.children.length==0) {
        //console.log("foglia  "+fatherNode.hid+"  mime  "+fatherNode.mime)
        return fatherNode.mime
    }
    else{
        
        fatherNode.children.forEach(child => {
            
            //console.log("chiamata su child   "+child.hid+"  da parte del father  "+fatherNode.hid)
            var r = calculateMimes(child)
            if(child.uid!="folder" && child.children==0)
                fatherNode.mime_types[r]++
            else{
                for (const key in child.mime_types) {
                    // console.log("key "+key)
                    // console.log("child:")
                    // console.log(child)
                    // console.log("fatherNode:")
                    // console.log(fatherNode)
                    if (Object.hasOwnProperty.call(child.mime_types, key)) {
                        //console.log(fatherNode.uid)
                        fatherNode.mime_types[key] += child.mime_types[key];
                    }
                    //console.log("so entrato qua")
                }
            }
        });
            //console.log("adesso "+fatherNode.hid+ "  dovrebbe avere un "+r+" in più "+fatherNode.mime_types[r])

       //console.log("cosa cazzo serve questo?"+fatherNode.hid)
    }
    

}

function calculateLeaves(fatherNode){
    if (fatherNode["children"].length == 0){ //foglia
        //console.log("leaf"+fatherNode.hid)
        return 1
    }
    else{ //non foglia, costruisco MIME
        fatherNode["mime_types"]=buildMimelist(ListMimes)
    }
    fatherNode["children"].forEach(child => {
        //console.log("non-leaf child"+child.hid)
        fatherNode["leaves"] += calculateLeaves(child)
    });
    // console.log("return fathernode with leaves "+fatherNode["leaves"])
    // console.log(fatherNode)
    // console.log("return fathernode with leaves "+fatherNode["leaves"])

    return  fatherNode["leaves"]
  
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

    //? rimuovo le folder vuote
    l = [] //? riempio la lista con le posizioni degli elementi da eliminare
    for (let i = 0; i < fatherNode.children.length; i++) {
        const child = fatherNode.children[i];
        if(child.uid=="folder" && child.children.length==0){ //?se non è foglia, inserisco la posizione dell'elemento
            l.push(i)
        }
    }
    //? ciclo sulla lista di index, elimino l'elemento dal children e aggiorno la lista di index (perchè l'elemento successivo ha index -1)
    if(l.length>0){
        for (let i = 0; i < l.length; i++) {
            const pos = l[i];
            fatherNode.children.splice(pos,1)
            for (let j = 0; j < l.length; j++) {
                l[j]--
            }
        }
    }
    console.log(fatherNode)

}
function LabelPackedFOFromTree(Tree,list_packed){
    Tree.children.forEach(child => {
        list_packed.forEach(element => {
            if(element==child.uid) child["filtered"] = true
        });
        LabelPackedFOFromTree(child,list_packed) 
    });
}

function resetTree(){
    Tree = JSON.parse(JSON.stringify(BackupTree))
    mime_filtered = []
    ListMimes.forEach(e => {
        document.getElementById(e.replace(/[/.]/g,"_")).checked = false
        document.getElementById(e.split("/")[0]).checked = false
    });
    DrawDirectory()
    heatmap_data = JSON.parse(JSON.stringify(BackupHeatMap))
    
    for (const key in exploit_data) {
        if (Object.hasOwnProperty.call(exploit_data, key)) {
            const element = exploit_data[key];
            d3.select("#"+key.replace(/[^A-Z]+/g, "")).transition().duration(800).style("border-color","black")
        }
    }
}

//! non funziona!!!
function calculateFOlderSize(fatherNode){ //! non funziona!!! devo inserire questa info dentro ["size"] e non ["bytes"] perchè senno draw s'incazza, 
    //!per ora me ne sbatto della grandezza delle folder

    fatherNode.children.forEach(child => { //se entra qua ha almeno un figlio e quindi non è foglia
                    
        if(fatherNode.uid == "folder"){
            fatherNode.size+=calculateFOlderSize(child)
        }
        else{
            calculateFOlderSize(child)
        }
        
    });
    console.log("outfromloop: "+fatherNode.hid+" with size:"+fatherNode.size)
    return fatherNode.size
  
}