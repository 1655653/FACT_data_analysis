//var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
//var url = endpoint+"firmware/"+dummy_UID+"?summary=true"
var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var unpack_blacklist = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg

//* cpu_architecture var
document.getElementById("software_componentsCKBOX").checked=true
var list_response_cpu_archi=[]
//* unpacker var
var list_response_unpacker=[]
var list_packed=[] //? contiene solo gli uid dei packed
var list_packed_hid=[]
var tot = 0;
var fw_size

main();

//* gestione con promise delle chiamate api a FACT
async function main() {
	//var result = await makeGetRequest(url,analyze_result);
  
	var result = await makeGetRequest(url,getallFW);
}

//*chiamata generica
function makeGetRequest(url,method,item) {
  return new Promise(function (resolve, reject) {
    axios.get(url).then(
      (response) => {
        var result = response.data;
        console.log('Processing Request');
        method(result,item)
        resolve(result);
      },
        (error) => {
        reject("error"+error);
      }
    );
  });
}

//*chiama tutti i FW del db di fact e popola la select
function getallFW(json_response){
  select=document.getElementById("allFW")
  //select.onchange = callFW //? <---- chiamata al fw selected
  document.getElementById("start").onclick = callFW//? <---- chiamata quando premi bottone

  var ljs = json_response.uids
  ljs.unshift("---") //? <----- riempio la lista con gli uid dei firmware (per ora ho solo quelli)
  ljs.forEach(function (item) {
    let op = document.createElement('option');
    op.setAttribute("value", item)
    select.appendChild(op);
    op.innerHTML += item;
  });
}

//* chiama lo specifico fw
function callFW() {
  var selectBox = document.getElementById("allFW");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  console.log(selectedValue)
  if(selectedValue != "---"){
    url = endpoint+"firmware/"+selectedValue+"?summary=true"
    tot=0
    makeGetRequest(url,analyze_result); //? la call
  }

  //? pulisco le var
  document.getElementById("cpu_architecture_div").innerHTML =""
  document.getElementById("info_unpacker_FO").innerHTML = ""
  document.getElementById("over").innerHTML = ""
  list_response_cpu_archi=[]
  list_response_unpacker=[]
  list_packed=[]
  list_packed_hid=[]

 }

//* analizza il firmware e chiama le analisi scelte dei FO
async function analyze_result(json_response){  
  document.getElementById("reportOf").innerHTML = "</br>Report of "+ json_response.firmware.meta_data.hid + "  MIME: "+json_response.firmware.analysis.file_type.mime 
    
  if (document.getElementById("unpackerCKBOX").checked){
    unpacker(json_response)
  } 
  if (document.getElementById("cpu_architectureCKBOX").checked){
    cpu_architecture(json_response)
  } 
  if (document.getElementById("software_componentsCKBOX").checked){
    sw_components(json_response)
  } 


}

function sw_components(json_response){
  var sw_summary =  json_response.firmware.analysis.software_components.summary
  var sw_obj = Object.keys(sw_summary)
  console.log(sw_summary)
  console.log("-------\n"+sw_obj)
  document.getElementById("software_components_div").innerHTML = "SOFTWARE COMPONENTS: " 
  if(sw_obj.length > 0){
    for (let i = 0; i < sw_obj.length; i++) {
      const element = sw_obj[i];
      document.getElementById("software_components_div").innerHTML+= sw_summary[element].length + " component(s) of this type: "+ element +" "
      
      //?creo e setto il select dei fo 
      var select = document.createElement('select');
      select.setAttribute("id", element)
      op = document.createElement('option');
      op.innerHTML += "----"
      select.appendChild(op)
      document.getElementById('software_components_div').appendChild(select);
      
      document.getElementById("software_components_div").innerHTML+="</br>"

      //? chiamo tutti i fo 
      sw_summary[element].forEach(function (item) {
        url = endpoint+"file_object/"+item+"?summary=true";
        (async () => {
          await makeGetRequest(url,analyze_sw_comp_FO,element)   // uso funzioni anonime, asincrono devo lavorare sull analisi del singolo file object
        })();
      });

    }
  }
  
}

function analyze_sw_comp_FO(rj,element){
  console.log(rj.file_object.meta_data.hid)
  console.log(rj.request.uid)
  op = document.createElement('option');
  document.getElementById(element).appendChild(op)
  op.innerHTML += rj.file_object.meta_data.hid;
}

//* cpu_architecture
function cpu_architecture(json_response){
  var list_cpu_arch_uids = json_response.firmware.analysis.cpu_architecture.summary
  var list_cpu_arch = Object.keys(list_cpu_arch_uids)

  console.log(list_cpu_arch_uids)
  document.getElementById("cpu_architecture_div").innerHTML = "CPU_ARCHITECTURE: " 

  if(list_cpu_arch.length > 0){
    for (let i = 0; i < list_cpu_arch.length; i++) {
      document.getElementById("cpu_architecture_div").innerHTML += list_cpu_arch_uids[list_cpu_arch[i]].length + " devices with this architecture: " + list_cpu_arch[i] +"</br>"
       //?creo e setto il select dei fo 
       select = document.createElement('select');
       select.setAttribute("id", "cpu_archi_select")
       select.onchange = select_cpu_arch_FO //? <----------- CHIAMATA AL FO SELECTED
       op = document.createElement('option');
       op.innerHTML += "----"
       select.appendChild(op)
       document.getElementById('cpu_architecture_div').appendChild(select);
       
       
       
       //? chiamo tutti i fo 
       list_cpu_arch_uids[list_cpu_arch[i]].forEach(function (item) {
         url = endpoint+"file_object/"+item+"?summary=true";
         (async () => {
           await makeGetRequest(url,analyze_cpu_arch_FO,item)   // uso funzioni anonime, asincrono devo lavorare sull analisi del singolo file object
         })();
       });
    }
  }
  else{
    document.getElementById("cpu_architecture_div").innerHTML += "No results with this plugin"
  }
}
//* cpu_architecture --> aggiunge nome alla select
function analyze_cpu_arch_FO(rj){
  console.log(rj.file_object.meta_data.hid)
  console.log(rj.request.uid)
  console.log("--------")
  list_response_cpu_archi.push(rj) //? ---> aggiorno lista globale
  //list_packed_hid = rj.file_object.meta_data.hid

  op = document.createElement('option');
  document.getElementById("cpu_archi_select").appendChild(op)
  op.innerHTML += rj.file_object.meta_data.hid;
}

//* cpu_architecture --> stampa path
function select_cpu_arch_FO(){
  var selectBox = document.getElementById("cpu_archi_select");
  var FOhid = selectBox.options[selectBox.selectedIndex].value;
  console.log(FOhid)
}

//*unpacker 
function unpacker(json_response){
  fw_size = json_response.firmware.analysis.unpacker.size_packed
  list_packed = json_response.firmware.analysis.unpacker.summary.packed
  document.getElementById("over").innerHTML += " UNPACKER: " + fw_size +" Bytes when packed, "+json_response.firmware.analysis.unpacker.size_unpacked+" Bytes when unpacked "+ "</br>"+
                                              "Over " + json_response.firmware.meta_data.total_files_in_firmware +" files, "
    if( list_packed !== undefined && json_response.firmware.analysis.unpacker.number_of_unpacked_files > 0){
      document.getElementById("over").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  " 
      
      //?creo e setto il select dei fo 
      select = document.createElement('select');
      select.setAttribute("id", "packed")
      select.onchange = selectFO //? <----------- CHIAMATA AL FO SELECTED
      op = document.createElement('option');
      op.innerHTML += "----"
      select.appendChild(op)
      document.getElementById('over').appendChild(select);
      
      
      
      //? chiamo tutti i fo non spacchettati
      list_packed.forEach(function (item) {
        url = endpoint+"file_object/"+item+"?summary=true";
        (async () => {
          await makeGetRequest(url,analyze_packed_FO,item)   // uso funzioni anonime, asincrono devo lavorare sull analisi del singolo file object
        })();
      });
    }
    else if (json_response.firmware.analysis.unpacker.number_of_unpacked_files == 0){
      document.getElementById("over").innerHTML += "FACT unpacked 0 elements "
    }
    else {
      document.getElementById("over").innerHTML += "FACT has been able to unpack every elements  "
    }
    document.getElementById("tot").innerHTML =""
}

//* unpacker ---> calcolo percentuali e totali dei packed
function analyze_packed_FO(rj){
  tot+=rj.file_object.meta_data.size
  console.log(rj.file_object.meta_data.hid)
  console.log(rj.request.uid)
  console.log("--------")
  list_response_unpacker.push(rj) //? ---> aggiorno lista globale
  list_packed_hid = rj.file_object.meta_data.hid

  var tot_perc_byte = (tot/fw_size*100).toFixed(2)
  if (tot_perc_byte < 0.01) tot_perc_byte = 0.01
  document.getElementById("tot").innerHTML =  tot +" total bytes packed ( "+ tot_perc_byte + " % )" 
  op = document.createElement('option');
  document.getElementById("packed").appendChild(op)
  op.innerHTML += rj.file_object.meta_data.hid;
}

//* unpacker ---> analisi sul singolo FO
function selectFO() {
  var selectBox = document.getElementById("packed");
  var FOhid = selectBox.options[selectBox.selectedIndex].value;
  console.log(FOhid)
  var fosize = list_response_unpacker[selectBox.selectedIndex-1].file_object.meta_data.size   ///selectBox.selectedIndex-1 perchè ho aggiunto "---"
  var selectedFO = list_response_unpacker[selectBox.selectedIndex-1].file_object
  console.log(selectedFO)
  var mime_check = "The file type is not blacklisted, so it should have been unpacked ( MIME: "+selectedFO.analysis.file_type.mime+")"
  if(selectedFO.analysis.unpacker["0_ERROR_genericFS"]) mime_check = "during the unpacking process, a genericFS error arisen  ( MIME: "+selectedFO.analysis.file_type.mime+")"
  if(unpack_blacklist.includes(selectedFO.analysis.file_type.mime))  mime_check= "unpacking skipped due to blacklisted file type ( MIME: "+selectedFO.analysis.file_type.mime+")"
  document.getElementById("info_unpacker_FO").innerHTML = "</br>File object " + FOhid + " with UID: " + list_response_unpacker[selectBox.selectedIndex-1].request.uid + " has size " + fosize + " Bytes </br>"+
                                                mime_check+"</br>Other info: " + list_response_unpacker[selectBox.selectedIndex-1].file_object.analysis.unpacker.info+""
  
  //console.log(list_response_unpacker[selectBox.selectedIndex].file_object.meta_data.size)
 }