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
THRESHOLD = 29
var CRITICAL_FO={"system":[],"user":[]}
var SUS_FO={"system":[],"user":[]}
var NEUTRAL_FO={"system":[],"user":[]}
var SCORE_TYPE = "base_score"
var DANGER={"CRITICAL_FO":CRITICAL_FO,"SUS_FO":SUS_FO,"NEUTRAL_FO":NEUTRAL_FO} //?e.g system.uid=score --->system.464665=10
var approved_or_not={} //{hid:yes,hid:no}


var margin = {top: 10, right: 10, bottom: 10, left: 100},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

//*small multiples
var exploit_data
var exm_data
var color_scale
var mitigations = []
var mitigations_not_present = []
var fo_by_exm =[]
// var bP //Bipartite!

//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
var list_packed=[]
var list_packed_hid=[]
var LIST_PACKED_UID = []
var cve_lookup_fw
var sw_components_fw
var exm_fw
var n_fos
//*report
var has_crit_files=[]
var has_sus_files=[]

//*mime
var ListMimes = [] //? lista con i subtypes
ListMimes = ["filesystem/squashfs","text/plain","application/x-executable","application/x-sharedlib","inode/symlink","application/x-object","image/gif","image/png","application/octet-stream"]
var ListSuperMimes = []//?lista con solo i types
ListSuperMimes = ["filesystem","text","application","inode","image"]
var colormimeSupertype
var colormimeSubtype
var mime_filtered=[]
//*gestisce la dimensione del sc panel
d3.select("#leftside").style("max-height",window.screen.height/2.6+"px")



//* call all firmwares
// d3.json(url, function(data) {
//     select=document.getElementById("allFW")
//     var ljs = data.uids
//     ljs.unshift("---") //? <----- riempio la lista con gli uid dei firmware (per ora ho solo quelli)
//     ljs.forEach(function (item) {
//         let op = document.createElement('option');
//         op.setAttribute("value", item)
//         select.appendChild(op);
//         op.innerHTML += item;
//     });
    
// })
var debug_mode = false
var fw = "short"
document.getElementById("start").onclick = callFW//? <---- chiamata quando premi bottone
document.getElementById("debug").onclick = db_callFW
document.getElementById("debug2").onclick = db_callFW2
function db_callFW() {
    debug_mode = true
    callFW()
}
function db_callFW2() {
    debug_mode = true
    fw = "long"
    ListMimes = ["firmware/trx","filesystem/squashfs","text/plain","image/gif","inode/symlink","application/x-executable","application/x-sharedlib","image/vnd.microsoft.icon","application/x-object","image/png","image/jpeg","application/csv","application/octet-stream","application/x-archive","image/bmp","filesystem/minix","application/x-lzma","application/x-cpio"]
    ListSuperMimes = ["firmware","filesystem","text","image","inode","application"]
    callFW()
}
//* starts analysis on a selected FW
function callFW() {
    console.log("STARTED")
    ShowLoader(true)
    
    var selectBox = document.getElementById("allFW");
    var selectedValue
    if(debug_mode){
        if(fw=="short")selectedValue = "de7ddf183b9b0cea6a96f1af3ab5a6bda5a171c1b13890ddc8aa84264f07ffc9_3662970"
        else  selectedValue = "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
    }
    //console.log(selectedValue)
    if(selectedValue != "---"){
        url = endpoint+"firmware/"+selectedValue+"?summary=true" 
            var data
            if(fw=="short"){
                data = FW_web_demo_short
            }   
            else{
                data = FW_web_demo_long
            }    
            //console.log(exploit_data)
            //* cpu_architecture string
            var cpu_info =  []
            for (const key in data.firmware.analysis.cpu_architecture.summary) {
                if (Object.hasOwnProperty.call(data.firmware.analysis.cpu_architecture.summary, key)) {
                    const element = data.firmware.analysis.cpu_architecture.summary[key];
                    cpu_info.push(key)
                }
            }
            var plu = ", CPU architecture"
            cpu_info.length > 1 ? plu += "s: " : plu+= ": "
            mb = parseFloat(data.firmware.meta_data.size)/1000000
            n_fos = data.firmware.meta_data.total_files_in_firmware
            d3.select("#reportOf").html("Report of "+ data.firmware.meta_data.hid +" ("+data.firmware.meta_data.total_files_in_firmware +" files, "+mb.toFixed(2)+"MB )"+ "<tspan>  MIME: "+data.firmware.analysis.file_type.mime +"</tspan>" + plu +cpu_info)
            d3.select("#downloadFW").style("visibility", "visible")
                .on("click",function(d){
                    if (confirm('Are you sure you want to download the entire firmware?')) 
                            // Save it!
                            download( data.request.uid ,data.firmware.analysis.file_type.mime )
                })
            d3.select("#reportFW").style("visibility", "visible")
                .on("click",function(d){
                    BuildReport(data.firmware)
                    // if (confirm('Are you sure you want to download the report of the firmware?')) 
                    //         // Save it!
                    //         downloadReport( data.request.uid)
                })
            // .on("click",function(){console.log("download started");download( data.request.uid ,data.firmware.analysis.file_type.mime )})
        
            //console.log(data)
            cve_lookup_fw= data.firmware.analysis.cve_lookup.summary
            sw_components_fw= data.firmware.analysis.software_components.summary
            exm_fw = data.firmware.analysis.exploit_mitigations.summary

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
                // BuildTree(data.firmware.meta_data.included_files, Tree, data.firmware)
                // calculateLeaves(Tree) 
                // calculateMimes(Tree) 
                ALL_REST_RESPONSE = ALL_REST_RESPONSE_short
                Tree = TREE_short_web_demo
                extension_dict = ['.htm', '.gif', '.so', '.js', '.sh', '.service', '.0', '.ico', '.ko', '.png', '.1', '.conf', '.jpg', '.crt', '.7', '.css', '.la', '.pc', '.11', '.2', '.19', '.h', '.53', '.3', '.12', '.8', '.IPv6', '.cgi', '.tmp', '.exe', '.system', '.pem', '.txt', '.GPL', '.rules', '.lai', '.trf', '.26', '.a', '.o', '.html', '.xml', '.6', '.start', '.key', '.5', '.d/avahi-daemon', '.bmp', '.action', '.info', '.d/messagebus', '.52', '.d/avahi-dnsconfd', '.4', '.FAQ', '.55', '.TXT', '.cache', '.cnf', '.51', '.down-root', '.bin', '.d/afpd', '.14', '.default', '.polarssl', '.cpio']
                console.log(TREE_short_web_demo)
                if(fw=="long") {
                    Tree = TREE_long
                    ALL_REST_RESPONSE = ALL_REST_RESPONSE_long
                }
                BackupTree = JSON.parse(JSON.stringify(Tree))
                console.log("TREE BUILT")
                console.log(Tree)
                //console.log(JSON.stringify(Tree, null, 2))
                
                
                // //***building packedUI
                console.log("BUILDING PACKED UI")
                packedUI(data.firmware.analysis.unpacker)
                console.log("PACKED UI BUILT")
                
                //*-------CVE 
                console.log("ASKING NIST")
                if(!debug_mode) await buildSWComponentWithCVE(data.firmware.analysis.cve_lookup) //!!UNCOMMENT TO RUN IT NORMALLY
                else{
                    SW_COMP_CVE = FAKE_NIST_CALL_short // debug reasons //!!COMMENT TO RUN IT NORMALLY
                    if(fw=="long") SW_COMP_CVE = FAKE_NIST_CALL_long // debug reasons //!!COMMENT TO RUN IT NORMALLY
                }
                d3.select("#db_mod").remove()
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
                console.log("TREE ranked")
                BackupTree = JSON.parse(JSON.stringify(Tree))
                
                //*-------SW COMPONENTS + CVE VIEW (LEFTSIDE) 
                //buildEXMDataset(data.firmware.analysis.exploit_mitigations.summary)
                console.log("BUILDING SW COMPONENTS + CVE VIEW")
                collectSWC(data.firmware.analysis.software_components.summary)
                DrawSWComponents()
                console.log(ALL_SWC)
                console.log("---------SW COMPONENTS + CVE VIEW BUILT")

                // //** SUNBURST */
                console.log("BUILDING SUNBURST")
                MimeMenu()
                DrawSunburst()
                console.log("---------SUNBURST BUILT")
                
                // //** DIRECTORY */
                console.log("BUILDING DIRECTORY")
                DrawDirectory()
                console.log("DIRECTORY BUILT")

                // //** BIPARTITE */
                console.log("BUILDING BIPARTITE GRAPH")
                exm_data = buildExploitData(data.firmware.analysis.exploit_mitigations.summary)
                buildBipartiteGraph(exm_data)
                console.log("---------BIPARTITE GRAPH BUILT")
                
                //*allieneo i divs
                center  = d3.select("#center").node().getBoundingClientRect().width
                ls = d3.select("#leftside").node().getBoundingClientRect().width
                miti = d3.select("#ex_miti_svg_container").node().getBoundingClientRect().width
                w_miti = center - (miti-ls)
                d3.select("#directory_container").style("width",w_miti+"px")
                ShowLoader(false)
                // d3.select("#center").style("width","fit-content")
                //d3.select("#directory_container").select("rect").dispatch("click")

                //sposto right un po piu a sinistra
                t = parseFloat(d3.select("#rightside").style("right").replace("px",""))
                d3.select("#rightside").style("right",t+35+"px")
                
                rw =  parseFloat(d3.select("#rightside").style("width").split("px")[0])
                ex_r = parseFloat(d3.select("#extra_right_side").style("right").replace("px",""))
                d3.select("#extra_right_side").style("right",ex_r+rw+t+55+"px")
                
                console.log(extension_dict)
                d3.select("#application_checkbox").dispatch("click")
                d3.select("#application_checkbox").dispatch("click")

            })();
    }
  
    //? pulisco le var
    list_packed=[]
    list_packed_hid=[]
    list_packed_uid = []    
}




function drawDanger(){
    d3.select("#search_bar_FO").remove()
    // d3.select(".refresh").selectAll("*").remove()
    d3.select("#rightside").selectAll("text").remove()
    d3.select("#rightside").selectAll("span").remove()
    d3.selectAll("#fo_details").remove()
    drawSingleDanger("c","critical")
    drawSingleDanger("s","sus")
    drawSingleDanger("n","neutral")
    buildSearchBar()
    rememberOknotook()
    d3.selectAll(".summa_expand").dispatch("click")
    BackupTree = JSON.parse(JSON.stringify(Tree))
}
