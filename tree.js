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
                    if(! ListMimes.includes(response.data.file_object.analysis.file_type.mime)) ListMimes.push(response.data.file_object.analysis.file_type.mime)


                    var node = {}
                    response.data.file_object.meta_data.virtual_file_path.forEach(path => {
                        //console.log(path)
                        node = {}
                        node["uid"] = response.data.request.uid
                        node["hid"] = path.substring(path.indexOf("|")).split("|").filter(d => d != "").at(-1) //uso path per avere gli alias
                        node["mime"] = response.data.file_object.analysis.file_type.mime
                        node["bytes"] = response.data.file_object.meta_data.size //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                        node["contacome"]=1 //? servono al sunburst per calcolare l'ampiezza della circonferenza di ogni nodo
                        node["size"] = response.data.file_object.meta_data.size
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
                    await BuildTree(response.data.file_object.meta_data.included_files, node);
                    
                    
                };
                
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





