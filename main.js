var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var UNPACK_BLACKLISTED = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//* global data structures
var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri
var ALL_REST_RESPONSE={}//? collazione di tutte le chiamate api, ordinate con chiave l'UID
var Tree = {} //? a differenza di ALL_REST_RESPONSE, questa contriene i figli e le folder!
var BackupTree = {}

var SW_COMP_CVE=[] //? collezione di tutte le cve
//* danger algoritm vars
W_CRYPTO = 30.0
W_CVE_CRIT = 0.2
W_CVE_N_CRIT = 0.1
W_USR_N_PWD = 30.0
W_EXPLOIT = 1.5
W_KNOWN_VULN = 5.0
var DANGER={"system":[],"user":[]} //?e.g system.uid=score --->system.464665=10
var CRITICAL_FO={"system":[],"user":[]}
var SUS_FO={"system":[],"user":[]}
var SCORE_TYPE = "base_score"



var margin = {top: 10, right: 10, bottom: 10, left: 100},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

//*small multiples
var exploit_data
//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
var list_packed=[]
var list_packed_hid=[]
var list_packed_uid = []

ListMimes = [] //? lista con i subtypes
ListSuperMimes = []//?lista con solo i types


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
            
            
            //console.log(exploit_data)
            //* cpu_architecture string
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
                
                
                // //***building tree
                console.log("BUILDING TREE")
                await BuildTree(data.firmware.meta_data.included_files, Tree, data.firmware)
                calculateLeaves(Tree) 
                calculateMimes(Tree) 
                BackupTree = JSON.parse(JSON.stringify(Tree))
                console.log("TREE BUILT")
                console.log(Tree)
                //console.log(JSON.stringify(Tree, null, 2))
                
                
                //*-------CVE 
                console.log("ASKING NIST")
                //await buildSWComponentWithCVE(data.firmware.analysis.cve_lookup)
                SW_COMP_CVE = FAKE_NIST_CALL
                console.log("NIST RESPONDED WITH ALL CVE")
                //console.log(SW_COMP_CVE)

                //*-------DANGER 
                console.log("RANKING FOs")
                rankdanger(data.firmware,SCORE_TYPE) //Riempie DANGER
                drawDanger(data.firmware)
                console.log("RANK ENDED")
                console.log(DANGER)


            })();
            
        })
    }
  
    //? pulisco le var
    list_packed=[]
    list_packed_hid=[]
    list_packed_uid = []    
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


