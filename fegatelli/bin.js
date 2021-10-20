/*

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
  
  
function changeFunc() {
  var selectBox = document.getElementById("packed");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  console.log(selectedValue);
 }
  */

 /* list_cpu_arch.forEach(function (i) {
    list_cpu_arch[i]
    document.getElementById("cpu_architecture").innerHTML = item

  });  */



  /*
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


  */