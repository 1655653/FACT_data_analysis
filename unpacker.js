var endpoint = "http://192.168.30.177:5000/rest/"
var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
var url = endpoint+"firmware/"+dummy_UID+"?summary=true"



main();

async function main() {
	var result = await makeGetRequest(url,analyze_result);

}

function makeGetRequest(url,method,item) {
	return new Promise(function (resolve, reject) {
		axios.get(url).then(
			(response) => {
				var result = response.data;
				console.log('Processing Request');
        method(result)
				resolve(result);
			},
				(error) => {
				reject("error"+error);
			}
		);
	});
}


//?  dovrebbe  essere async

async function analyze_result(json_response){  //TODO tocca vedere quanto è stato spacchettato

  document.getElementById("textbox").innerHTML = "Report of "+ json_response.firmware.meta_data.hid+" ( " + json_response.firmware.meta_data.size +" Bytes" + "):</br>"
  //console.log(json_response.firmware.analysis.unpacker.summary.packed)
  var list_packed = json_response.firmware.analysis.unpacker.summary.packed
  document.getElementById("textbox").innerHTML +="Over " + json_response.firmware.meta_data.total_files_in_firmware +" files, "

  if(list_packed.length > 0)
    document.getElementById("textbox").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  "
  else {
    document.getElementById("textbox").innerHTML += "FACT has been able to unpack every elements  "
  }

  list_packed.forEach(function (item) {
    url = endpoint+"file_object/"+item+"?summary=true";
    (async () => {
      let response = await makeGetRequest(url,analyze_FO,item)   //* uso funzioni anonime, asincrono devo lavorare sull analisi
      console.log(response)
    })();
    
  });
}

var tot = 0
function analyze_FO(json_response,item){
  /* console.log("--------------------------")
  console.log("name:" + json_response.file_object.meta_data.hid +" "+ item)
  console.log("size" +  json_response.file_object.meta_data.size)  
  tot+=json_response.file_object.meta_data.size
  //*voglio calcolare quanti byte non ha spacchettato
  console.log(tot)
  console.log("--------------------------") */
}
