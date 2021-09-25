var endpoint = "http://192.168.30.177:5000/rest/"
var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
//var url = endpoint+"firmware/"+dummy_UID+"?summary=true"
var url = endpoint+"firmware"


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

  document.getElementById("reportOf").innerHTML = "</br>Report of "+ json_response.firmware.meta_data.hid+" ( " + fw_size +" Bytes when packed, "+json_response.firmware.analysis.unpacker.size_unpacked+" Bytes when unpacked )</br>"
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
    select.onchange = changeFO
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
  list_response.push(rj)
  list_packed_hid = rj.file_object.meta_data.hid

  document.getElementById("tot").innerHTML =  tot +" total bytes packed ( "+ (tot/fw_size*100).toFixed(2) + " % )" 
  op = document.createElement('option');
  document.getElementById("packed").appendChild(op)
  op.innerHTML += rj.file_object.meta_data.hid;


}

function changeFO() {
  var selectBox = document.getElementById("packed");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var fosize = list_response[selectBox.selectedIndex].file_object.meta_data.size
  document.getElementById("info_FO").innerHTML = "File object " + selectedValue + " with uid" + list_response[selectBox.selectedIndex].request.uid + " has size " + fosize + " Bytes"
  console.log(list_response[selectBox.selectedIndex].file_object.meta_data.size)
 }