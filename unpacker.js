var endpoint = "http://192.168.30.177:5000/rest/"
var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
var url = endpoint+"firmware/"+dummy_UID+"?summary=true"



FACTgetcall(url,analyze_result)

function FACTgetcall(url,method){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        method(xhttp.responseText)
      } else {
        console.log("error, status:" + this.status + ", readystate:"+this.readyState)
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}



function analyze_result(rT){
  var json_response = JSON.parse(rT);
  document.getElementById("textbox").innerHTML = "Unpacker report of "+ json_response.firmware.meta_data.hid+":</br>"


  //console.log(json_response.firmware.analysis.unpacker.summary.packed)
  var list_packed = json_response.firmware.analysis.unpacker.summary.packed
  if(list_packed.length > 0)
  document.getElementById("textbox").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  "
  
      //*selection with all packed elements
  select = document.createElement('select');
  select.setAttribute("id", "packed")
  select.onchange = changeFunc
  document.getElementById('textbox').appendChild(select);
  list_packed.forEach(function (item) {
    let op = document.createElement('option');
    op.setAttribute("value", item)
    select.appendChild(op);
    op.innerHTML += item;
  });
 //TODO tocca vedere quanto è stato spacchettato
}

function changeFunc() {
  var selectBox = document.getElementById("packed");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  console.log(selectedValue);
 }

