
function BuildReport(fw){
    var meta = fw.meta_data
    const doc = new jsPDF();

    
    var currY = 10;
    var new_chapter = 10;
    var new_line = 5;
    var centerX = 80
    doc.text("Report of "+meta.hid, 50, currY);

    currY += new_chapter

    //**METADATA
    doc.setDrawColor(170, 173, 171) // draw red lines
    doc.line(0, currY, 1000, currY); // horizontal line
    doc.setTextColor("black")
    cy = currY
    cy+=new_line
    cy+=new_line

    doc.setFontSize(13)
    doc.text("Metadata", 30, cy);
    doc.setFontSize(9)

    // currY+=new_line
    doc.addImage(meta_2, "PNG", 15, cy-10, 15, 15);

    currY+=new_line
    doc.text("Vendor: "+ meta.vendor, centerX, currY);

    currY+=new_line
    doc.text("Name: "+ meta.device_name, centerX, currY);

    currY+=new_line
    doc.text("Size: "+ meta.size + " Bytes", centerX, currY);

    currY+=new_line
    doc.text("Version: "+ meta.version, centerX, currY);

    currY+=new_line
    doc.text("device class: "+ meta.device_class, centerX, currY);

    currY+=new_line
    doc.text("Total files: "+ meta.total_files_in_firmware, centerX, currY);

    currY+=new_line

    //**-------END-------------METADATA


    //*File TYPES
    doc.setTextColor(100)
    doc.line(0, currY, 1000, currY); // horizontal line
    doc.setTextColor("black")
    currY+=new_line
    currY+=new_line
    cy = currY
    cy+=new_line
    cy+=new_line
    doc.setFontSize(13)
    doc.text("File Types", 30, cy+5);
    doc.setFontSize(9)
    doc.addImage(ft_data_url, "PNG", 10, currY+5, 20, 20);

    const sortable = Object.fromEntries(
        Object.entries(Tree.mime_types).sort(([,a],[,b]) => b-a)
    );


    for (const key in sortable) {
      if (Object.hasOwnProperty.call(sortable, key)) {
        const occ = sortable[key]==0? 1:sortable[key]
        doc.text(key+" : " +occ, centerX, currY);
        currY+=new_line
      }
    }
    //*------END--------File TYPES
    //*EXP MITIGATIONS
    currY+=new_line
    doc.setTextColor(100)
    doc.line(0, currY, 1000, currY); // horizontal line
    doc.setTextColor("black")
    currY+=new_line
    currY+=new_line
    cy = currY
    cy+=new_line
    cy+=new_line
    doc.setFontSize(13)
    doc.text("Exploit Mitigations", 30, cy+2);
    doc.setFontSize(9)
    currY+=new_line

    doc.addImage(exploit2, "PNG", 15, currY-2, 13, 13);

    e = getExmReport(exm_fw)
    e.forEach(element => {
      doc.text(element[0]+": " + element[1], centerX, currY-5);
      currY+=new_line
    });

    
    //*----END-------EXP MITIGATIONS





    // //*MY ANALYSIS
    doc.addPage("a4")
    currY=0
    currY+=new_line
    doc.setTextColor(100)
    doc.line(0, currY, 1000, currY); // horizontal line
    doc.setTextColor("black")
    doc.setFontSize(13)
    currY+=new_line
    currY+=new_line
    doc.setFontSize(18)
    doc.text("Analysis of file objects", 15, currY);
    doc.setFontSize(11)    
    currY+=new_line
    py = currY
    // //*parameters
    doc.setFontSize(13)
    doc.text("Parameters", 140, py);
    doc.setFontSize(9)
    doc.setTextColor(100)
    currY+=new_line

    headparam = [{parameter:"Parameter", value:"Value"}]
    doc.autoTable({
      head: headparam,
      body: generateParamData(),
      startY: currY,
      showHead: 'firstPage',
      styles: {overflow: 'hidden'}, 
      margin: {left: 120} 
    })
    
    function generateParamData(){
      result = []
      parameters.forEach((p,i) => {
          var data = {
            parameter: param_str[i],
            value: p
        };
        result.push(Object.assign({}, data));
      });
      return result
    }
    // //*end parameters
    doc.setTextColor("black")
    doc.setFontSize(13)
    doc.text("Critical Files", 15, py);
    doc.setFontSize(9)
    doc.setTextColor(100)
    headcs = [{name:"HID", score:"Score", state: "State"}]

    doc.autoTable({
      head: headcs,
      body: generateCData(CRITICAL_FO),
      startY: currY,
      showHead: 'firstPage',
      styles: {overflow: 'hidden'}, 
      margin: {right: 120} 
    })
    
    currY += 8*(CRITICAL_FO.system.length+2)
    doc.setTextColor("black")
    doc.setFontSize(13)
    doc.text("Suspicious Files", 15, currY);
    doc.setFontSize(9)
    doc.setTextColor(100)
    currY+=new_line

    doc.autoTable({
      head: headcs,
      body: generateCData(SUS_FO),
      startY: currY,
      showHead: 'firstPage',
      styles: {overflow: 'hidden'}, 
      margin: {right: 120} 
    })



    

    //*--------------END----MY ANALYSIS
    currY+=new_line
    
    //*SOFTWARE COMPONENTS
    doc.addPage("a4");
    currY=10
    doc.line(0, currY, 1000, currY); // horizontal line
    currY+=new_line
    currY+=new_line
    doc.setTextColor("black")
    doc.setFontSize(18)
    doc.text("Software Components and CVE", 15, currY);
    doc.setFontSize(11)
    doc.setTextColor(100)
    
    currY+=new_line
    doc.autoTable({
      head: headRowsSWC(),
      body: generateSWCData(),
      startY: currY,
      showHead: 'firstPage',
    })
    

    doc.save("a4.pdf");

}
function headRowsSWC() {
  return [
    { id: 'ID', name: 'Name', cve: 'CVE', crit: 'Critical', crit_fo: 'Critical files',sus_fo:"Suspicious Files" },
  ]
}


function generateCData(c){

  var result = [];
  c.system.forEach(fo => {
    stato = " "
    id = fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_").replace("~","_TILDE")
    if(Object.keys(approved_or_not).includes(id)) stato = ""+approved_or_not[id]
    if(stato=="false") stato = "Dangerous"
    if(stato=="true") stato = "Safe"
    var data = {
        name: fo.hid,
        score: !fo.packed? fo.overall: "packed",
        state: stato,
    };
    result.push(Object.assign({}, data));
  });
  return result;
}


function generateSWCData(){
  var result = [];
  ALL_SWC.forEach((swc,i) => {
    var crit = swc.includes("(CRITICAL)")? true:false

    has_cf = false
    has_crit_files.forEach(cf => {
      if(swc.includes(cf)) has_cf = true
    });

    has_sf = false
    has_sus_files.forEach(sf => {
      if(swc.includes(sf)) has_sf = true
    });

    var cve = 0
    //total cve by sw
    SW_COMP_CVE.forEach(element => {
      if(element.cpe_name.includes(swc)){
        cve+= cve_count(element,SCORE_TYPE).length
      }
    });
    var data = {
        id: i+1,
        name: swc.replace("(CRITICAL)",""),
        cve: cve,
        crit: crit,
        crit_fo: has_cf,
        sus_fo: has_sf,
    };
    result.push(Object.assign({}, data));
  });
  //sort result
  result.sort(function(a,b){
    if(a.crit_fo && !b.crit_fo) return -1
    if(!a.crit_fo && b.crit_fo) return 1
    return parseInt(a.cve)>parseInt(b.cve) ? -1 : 1
  })
  result.map((e,i)=> e.id = i+1)
  return result;
};

function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    var w 
    if(i==0) w = 70
    if(i==1) w = 30
    if(i==2) w = 40
    if(i==3) w = 50
    if(i==4) w = 70
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i].replaceAll("_"," "),
      width: w,
      align: "center",
      padding: 0
    });
  }
  //console.log(result)
  return result;
}




function getExmReport(s){
  var exm_report = []
  for (const key in s) {
      if (Object.hasOwnProperty.call(s, key)) {
          var enordi = key.split(" ").at(-1);
          if(enordi == "enabled" || enordi== "present"){
              exm_report.push( [  [key.replace(enordi,"").trim()]   ,  s[key].length  ])
          }
          
      }
  }
  exm_report.sort((a,b)=> b[1]-a[1])
  return exm_report
}




