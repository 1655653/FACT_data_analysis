var endpoint = "http://192.168.30.177:5000/rest/"
var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
//var url = endpoint+"firmware/"+dummy_UID+"?summary=true"
var url = endpoint+"firmware"
var unpack_blacklist = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg


var list_response=[]
var list_packed=[]
var list_packed_hid=[]
var tot = 0;
var fw_size

main();

//* gestione con promise delle chiamate api a FACT
async function main() {
	//var result = await makeGetRequest(url,analyze_result);
	var result = await makeGetRequest(url,getallFW);
}

function getallFW(json_response){
  select=document.getElementById("allFW")
  select.onchange = callFW
  var ljs = json_response.uids
  ljs.unshift("---")
  ljs.forEach(function (item) {
    let op = document.createElement('option');
    op.setAttribute("value", item)
    select.appendChild(op);
    op.innerHTML += item;
  });

}
function callFW() {
  var selectBox = document.getElementById("allFW");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  console.log(selectedValue)
  url = endpoint+"firmware/"+selectedValue+"?summary=true"
  tot=0
  makeGetRequest(url,analyze_result);
  document.getElementById("info_FO").innerHTML = ""
  document.getElementById("over").innerHTML = ""
  list_response=[]
  list_packed=[]
  list_packed_hid=[]

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

//* analizza il firmware e chiama l'analisi dei FO
async function analyze_result(json_response){  
  fw_size = json_response.firmware.analysis.unpacker.size_packed
  list_packed = json_response.firmware.analysis.unpacker.summary.packed

  document.getElementById("reportOf").innerHTML = "</br>Report of "+ json_response.firmware.meta_data.hid+" ( " + fw_size +" Bytes when packed, "+json_response.firmware.analysis.unpacker.size_unpacked+" Bytes when unpacked )"+ 
                                                  "MIME: "+json_response.firmware.analysis.file_type.mime+"</br>"
  document.getElementById("over").innerHTML +="Over " + json_response.firmware.meta_data.total_files_in_firmware +" files, "
  
  if( list_packed !== undefined && json_response.firmware.analysis.unpacker.number_of_unpacked_files > 0){
    document.getElementById("over").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  " 
    list_packed.forEach(function (item,idx,array) {
      url = endpoint+"file_object/"+item+"?summary=true";
      (async () => {
        await makeGetRequest(url,analyzeFO,item)   //* uso funzioni anonime, asincrono devo lavorare sull analisi del singolo file object
      })();
    });

    //?creo il select dei fo 
    select = document.createElement('select');
    select.setAttribute("id", "packed")
    select.onchange = selectFO
    op = document.createElement('option');
    op.innerHTML += "----"
    select.appendChild(op)
    document.getElementById('over').appendChild(select);
  }
  else if (json_response.firmware.analysis.unpacker.number_of_unpacked_files == 0){
    document.getElementById("over").innerHTML += "FACT unpacked 0 elements "
  }
  else {
    document.getElementById("over").innerHTML += "FACT has been able to unpack every elements  "
  }
  document.getElementById("tot").innerHTML =""
}

//* calcolo percentuali e totali
function analyzeFO(rj,item){
  tot+=rj.file_object.meta_data.size
  console.log(rj.file_object.meta_data.hid)
  console.log(rj.request.uid)
  console.log("--------")
  list_response.push(rj)
  list_packed_hid = rj.file_object.meta_data.hid

  var tot_perc_byte = (tot/fw_size*100).toFixed(2)
  if (tot_perc_byte < 0.01) tot_perc_byte = 0.01
  document.getElementById("tot").innerHTML =  tot +" total bytes packed ( "+ tot_perc_byte + " % )" 
  op = document.createElement('option');
  document.getElementById("packed").appendChild(op)
  op.innerHTML += rj.file_object.meta_data.hid;
}

//* analisi sul singolo FO
function selectFO() {
  var selectBox = document.getElementById("packed");
  var FOhid = selectBox.options[selectBox.selectedIndex].value;
  console.log(FOhid)
  var fosize = list_response[selectBox.selectedIndex-1].file_object.meta_data.size   //?selectBox.selectedIndex-1 perchè ho aggiunto "---"
  var selectedFO = list_response[selectBox.selectedIndex-1].file_object
  console.log(selectedFO)
  var mime_check = "The file type is not blacklisted, so it should have been unpacked ( MIME: "+selectedFO.analysis.file_type.mime+")"
  if(unpack_blacklist.includes(selectedFO.analysis.file_type.mime))  mime_check= "file type blacklisted from the unpacker( MIME: "+selectedFO.analysis.file_type.mime+")"
  document.getElementById("info_FO").innerHTML = "File object " + FOhid + " with UID: " + list_response[selectBox.selectedIndex-1].request.uid + " has size " + fosize + " Bytes </br>"+
                                                mime_check+"</br>Other info: " + list_response[selectBox.selectedIndex-1].file_object.analysis.unpacker.info+""
  
  //console.log(list_response[selectBox.selectedIndex].file_object.meta_data.size)
 }