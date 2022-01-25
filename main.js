var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var UNPACK_BLACKLISTED = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//* global data structures
var INCLUDED_FILES //? usato per ricostruire l'albero dopo aver rimosso i filtri
var ALL_REST_RESPONSE={}//? collazione di tutte le chiamate api, ordinate con chiave l'UID
var Tree = {} //? a differenza di ALL_REST_RESPONSE, questa contriene i figli e le folder!
var BackupTree = {}

var SWC_ARRAY //?selector
var SW_COMP_CVE=[] //? collezione di tutte le cve
var SW_COMP_CVE_LIGHT=[] //? collezione di tutti sw components con cve
var ALL_SWC = [] //? collezione di tutti sw components
var SW_COMP_NO_CVE=[]//? collezione di tutti sw components senza cve
var SW_COMP_HIDE =[]//? swcomp che l'utente non vuole
var GLOBAL = true //? flag visualizzazione picchi cve locali o lglobali

//* danger algoritm vars
W_CRYPTO = 30.0
W_CVE_CRIT = 0.2
W_CVE_N_CRIT = 0.1
W_USR_N_PWD = 30.0
W_EXPLOIT = 1.5
W_KNOWN_VULN = 5.0
THRESHOLD = 25
var CRITICAL_FO={"system":[],"user":[]}
var SUS_FO={"system":[],"user":[]}
var NEUTRAL_FO={"system":[],"user":[]}
var SCORE_TYPE = "base_score"
var DANGER={"CRITICAL_FO":CRITICAL_FO,"SUS_FO":SUS_FO,"NEUTRAL_FO":NEUTRAL_FO} //?e.g system.uid=score --->system.464665=10



var margin = {top: 10, right: 10, bottom: 10, left: 100},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

//*small multiples
var exploit_data
var exm_data
var color_scale
var mitigations = []
var mitigations_not_present = []

//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
var list_packed=[]
var list_packed_hid=[]
var list_packed_uid = []
var cve_lookup_fw
var sw_components_fw

ListMimes = [] //? lista con i subtypes
ListSuperMimes = []//?lista con solo i types

//*gestisce la dimensione del sc panel
d3.select("#leftside").style("max-height",window.screen.height/2.6+"px")



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
            var plu = ", CPU architecture:"
            cpu_info.length > 1 ? plu += "s: " : plu+= ": "
            mb = parseFloat(data.firmware.meta_data.size)/1000000
            d3.select("#reportOf").html("Report of "+ data.firmware.meta_data.hid +" ("+data.firmware.meta_data.total_files_in_firmware +" files, "+mb.toFixed(2)+"MB )"+ "<tspan>  MIME: "+data.firmware.analysis.file_type.mime +"</tspan>" + plu +cpu_info)
            d3.select("#downloadFW").style("visibility", "visible").on("click",function(){console.log("download started");download( data.request.uid ,data.firmware.analysis.file_type.mime )})
        
            //console.log(data)
            cve_lookup_fw= data.firmware.analysis.cve_lookup.summary
            sw_components_fw= data.firmware.analysis.software_components.summary
            //***build root of Tree
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
                //await buildSWComponentWithCVE(data.firmware.analysis.cve_lookup) //!!UNCOMMENT TO RUN IT NORMALLY
                SW_COMP_CVE = FAKE_NIST_CALL_short // debug reasons //!!COMMENT TO RUN IT NORMALLY
                //SW_COMP_CVE = FAKE_NIST_CALL_long // debug reasons //!!COMMENT TO RUN IT NORMALLY
                console.log("---------NIST RESPONDED WITH ALL CVE")
                console.log(SW_COMP_CVE)

                //*-------DANGER (RIGHTSIDE) 
                console.log("RANKING FOs")
                rankdanger(data.firmware,SCORE_TYPE) //Riempie DANGER
                drawDanger()
                // //*-----parameters
                // //*extradiv con tutti gli slider
                extraDiv(data.firmware)
                console.log("---------RANK ENDED")
                console.log(DANGER)
                
                //*-------SW COMPONENTS + CVE VIEW (LEFTSIDE) 
                //buildEXMDataset(data.firmware.analysis.exploit_mitigations.summary)
                console.log("BUILDING SW COMPONENTS + CVE VIEW")
                collectSWC(data.firmware.analysis.software_components.summary)
                DrawSWComponents()
                console.log("---------SW COMPONENTS + CVE VIEW BUILT")
                console.log(ALL_SWC)
                
                console.log("BUILDING BIPARTITE GRAPH")
                exm_data = buildExploitData(data.firmware.analysis.exploit_mitigations.summary)
                buildBipartiteGraph(exm_data)
                console.log("---------BIPARTITE GRAPH BUILT")
            })();
            
        })
    }
  
    //? pulisco le var
    list_packed=[]
    list_packed_hid=[]
    list_packed_uid = []    
}




function drawDanger(){
    d3.select("#search_bar_FO").remove()
    d3.select(".refresh").selectAll("*").remove()
    d3.select("#rightside").selectAll("text").remove()
    d3.select("#rightside").selectAll("span").remove()
    drawSingleDanger("c","critical")
    drawSingleDanger("s","sus")
    drawSingleDanger("n","neutral")
    //buildSearchBar()
}



