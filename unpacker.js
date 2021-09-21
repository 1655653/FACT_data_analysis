var endpoint = "http://192.168.30.177:5000/rest/"
var dummy_UID= "ffef4a68007bcde84376e51e3eb9210bb869df9bebe958de31d8ab3850654e04_32759866"
var url = endpoint+"firmware/"+dummy_UID

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       //document.getElementById("demo").innerHTML = xhttp.responseText;
       console.log(xhttp.responseText)
       document.getElementById("rest").innerHTML = '<br>'+xhttp.responseText;
    } else {
      console.log("error, status:" + this.status)
    }
};
xhttp.open("GET", url, true);
xhttp.send();


