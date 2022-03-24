
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
    doc.line(0, 15, 1000, currY); // horizontal line
    currY+=new_line
    doc.setFontSize(13)
    doc.text("Metadata", 15, currY);
    doc.setFontSize(9)

    currY+=new_line
    doc.addImage(metadata_data_url, "PNG", 15, currY-2, 25, 25);

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

    //**----------------------METADATA


    //*MIME TYPES
    doc.line(0, currY, 1000, currY); // horizontal line
    currY+=new_line
    doc.setFontSize(13)
    doc.text("File Types", 15, currY);
    doc.setFontSize(9)
    currY+=new_line
    doc.addImage(ft_data_url, "PNG", 15, currY+5, 30, 30);

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
    //*--------------------MIME TYPES
    //*EXP MITIGATIONS
    currY+=new_line
    doc.line(0, currY, 1000, currY); // horizontal line
    currY+=new_line
    doc.setFontSize(13)
    doc.text("Exploit Mitigations", 15, currY);
    doc.setFontSize(9)
    currY+=new_line

    doc.addImage(ex_du, "PNG", 15, currY-2, 25, 25);

    e = getExmReport(exm_fw)
    e.forEach(element => {
      doc.text(element[0]+": " + element[1], centerX, currY);
      currY+=new_line
    });

    
    //*---------------EXP MITIGATIONS





    //*MY ANALYSIS
    currY+=new_line
    
    doc.line(0, currY, 1000, currY); // horizontal line
    doc.setFontSize(13)
    currY+=new_line
    // doc.text("Analysis", 50, currY);
    currY+=new_line
    var Yparam = currY
    //*parameters
    doc.setFontSize(13)
    doc.text("Parameters", 140, Yparam);
    doc.setFontSize(9)
    Yparam+=new_line
    parameters.forEach((p,i) => {
      doc.text(param_str[i].replaceAll("_"," ")+" = "+ p, 140, Yparam);
      Yparam+=new_line
    });
    //*end parameters
    doc.setFontSize(13)
    doc.text("Critical Files", 15, currY);
    doc.setFontSize(9)
    currY+=new_line
    var cs_headers = createHeaders([
      "name",
      "score",
      "state",
    ]);
    doc.table(10, currY, generateCData(CRITICAL_FO), cs_headers);
    currY += 25 *CRITICAL_FO.system.length
    doc.setLineDash([2.5]);
    doc.line(0, currY, 1000, currY); // horizontal line
    doc.setLineDash();
    currY+=new_line
    currY+=new_line
    doc.setFontSize(13)
    doc.text("Suspicious Files", 15, currY);
    doc.setFontSize(9)
    currY+=new_line
    doc.table(10, currY, generateCData(SUS_FO), cs_headers);

    

    //*--------------END----MY ANALYSIS
    currY+=new_line

    //*SOFTWARE COMPONENTS
    doc.addPage("a4");
    currY=10
    doc.line(0, currY, 1000, currY); // horizontal line
    currY+=new_line
    doc.setFontSize(13)
    doc.text("Software Components and CVE", 15, currY);
    doc.setFontSize(9)

    var headers = createHeaders([
      "name",
      "CVE",
      "is_critical",
      "has_critical_files",
      "has_suspicious_files"
    ]);


    currY+=new_line
    doc.table(10, currY, generateSWCData(), headers);

    doc.save("a4.pdf");

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
  ALL_SWC.forEach(swc => {
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
        name: swc.replace("(CRITICAL)",""),
        CVE: cve,
        is_critical: crit,
        has_critical_files: has_cf,
        has_suspicious_files: has_sf,
    };
    result.push(Object.assign({}, data));
  });
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
  console.log(result)
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




