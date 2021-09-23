var endpoint = "http://192.168.30.177:5000/rest/"
var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
var url = endpoint+"firmware/"+dummy_UID+"?summary=true"



main();

async function main() {
	var result = await makeGetRequest(url,analyze_result);

}

function makeGetRequest(url,method,item,last) {
	return new Promise(function (resolve, reject) {
		axios.get(url).then(
			(response) => {
				var result = response.data;
				console.log('Processing Request');
        method(result,item,last)
        if(last) document.getElementById("textbox").innerHTML += "TOT = "+tot
				resolve(result);
			},
				(error) => {
				reject("error"+error);
			}
		);
	});
}


//?  dovrebbe  essere async
var list_response;
var list_packed;
var tot = 0;
async function analyze_result(json_response){  //TODO tocca vedere quanto è stato spacchettato

  document.getElementById("textbox").innerHTML = "Report of "+ json_response.firmware.meta_data.hid+" ( " + json_response.firmware.meta_data.size +" Bytes" + "):</br>"
  //console.log(json_response.firmware.analysis.unpacker.summary.packed)
  list_packed = json_response.firmware.analysis.unpacker.summary.packed
  document.getElementById("textbox").innerHTML +="Over " + json_response.firmware.meta_data.total_files_in_firmware +" files, "

  if(list_packed.length > 0)
    document.getElementById("textbox").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  "
  else {
    document.getElementById("textbox").innerHTML += "FACT has been able to unpack every elements  "
  }
  var tot = 1
  list_response= [];
  

  list_packed.forEach(function (item,idx,array) {
    url = endpoint+"file_object/"+item+"?summary=true";
    (async () => {
      idx === array.length - 1? last = true : last = false
      await makeGetRequest(url,analyzeFO,item,last)   //* uso funzioni anonime, asincrono devo lavorare sull analisi
    })();
  });
}

function analyzeFO(rj,item){
  //document.getElementById("textbox").innerHTML += "TOT = "+tot
  tot+=rj.file_object.meta_data.size
  list_packed.push(item)
  list_response.push(rj)
}

