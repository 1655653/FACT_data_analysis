var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var unpack_blacklist = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg
//*
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true

//*--------------------SUNBURST VARS
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 700 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);
  
var svg = d3.select("#treemap_div")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
// Data strucure
var partition = d3.partition()
    .size([2 * Math.PI, radius]);
//* --------------------SUNBURST VARS

//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
list_packed=[]
list_packed_hid=[]

ListFOs = []
//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true

//* call all firmwares
d3.json(url, function(data) {
    select=document.getElementById("allFW")
    var ljs = data.uids
    ljs.unshift("---") //? <----- riempio la lista con gli uid dei firmware (per ora ho solo quelli)
    ljs.forEach(function (item) {
        let op = document.createElement('option');
        op.setAttribute("value", item)
        select.appendChild(op);
        op.innerHTML += item;
    });
})

document.getElementById("start").onclick = callFW//? <---- chiamata quando premi bottone

var Tree = {}
//* starts analysis on a selected FW
function callFW() {
    var selectBox = document.getElementById("allFW");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //console.log(selectedValue)
    if(selectedValue != "---"){
        url = endpoint+"firmware/"+selectedValue+"?summary=true"
        d3.json(url, function(data) { //?<----- chiamata alle api
            document.getElementById("reportOf").innerHTML = "</br>Report of "+ data.firmware.meta_data.hid + "  MIME: "+data.firmware.analysis.file_type.mime 
            if (document.getElementById("unpackerCKBOX").checked){
                console.log(data)
                document.getElementById("reportOf").innerHTML += "</br>"+ "Total " + data.firmware.meta_data.total_files_in_firmware +" files "
                Tree["uid"] = data.request.uid
                Tree["hid"] = data.firmware.meta_data.hid
                Tree["size"] = data.firmware.meta_data.size
                Tree["children"] = [];
                (async () => {
                    await BuildTree(data.firmware.meta_data.included_files, Tree["children"])
                    calculateFOlderSize(Tree)
                    console.log(Tree)
                    console.log("TREE BUILT")
                    DrawSunburst()
                    
                })();
            } 
        })
    }
  
    //? pulisco le var

    list_response_cpu_archi=[]
    list_response_unpacker=[]
    list_packed=[]
    list_packed_hid=[]
  
}
function calculateFOlderSize(fatherNode){
    if (fatherNode["children"].length == 0){ //foglia
        return fatherNode["size"]
    }
    fatherNode["children"].forEach(child => {
        fatherNode["size"] += calculateFOlderSize(child)
    });
    return fatherNode["size"]
  
}
function computeTextRotation(d) {
    var angle = (d.x0 + d.x1) / Math.PI * 90;
    // Avoid upside-down labels
    //return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
    return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
}
function DrawSunburst(){
    // create a tooltip
    var Tooltip = d3.select("#treemap_div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")

    function filter_min_arc_size_text(d, i) {return (d.dx*d.depth*radius/3)>14};
    
    var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html("hid:" + d.data.hid + "<br>uid:"+d.data.uid+"<br>size:"+d.data.size)
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY + 10) + 'px')
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style('stroke', '#fff')
          .style("opacity", 0.9)
      }
    
    var root = d3.hierarchy(Tree).sum(function (d) { return d.size});
    partition(root);
    var arc = d3.arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });
        // Put it all together
    g.selectAll('g')  // <-- 1
        .data(root.descendants())
        .enter().append('g').attr("class", "node").attr("id",function(d){return d.data.hid})  // <-- 2
        .append('path')  // <-- 2
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.hid); })
        .style("opacity", 0.9)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    //Populate the <text> elements with our data-driven titles.
    g.selectAll(".node")
    .append("text")
    .filter(filter_min_arc_size_text)
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; 
        }).attr("dx", "-20") // radius margin
            .attr("dy", ".5em") // rotation align
            .text(function(d) {  
                if(d.parent != null){
                    return d.data.hid 
                }
            });
}
//* builds the tree calling all packed/unpacked FO
async function BuildTree(included_files, fatherNode){ //input is list of included files of the father node
            if( included_files.length > 0){
                promises = [];
                included_files.forEach(function(item) {
                    url = endpoint+"file_object/"+item+"?summary=true";
                    promises.push(axios.get(url));
                });
                const res = await Promise.all(promises)
                for(let response of res){
                    ListFOs.push(response.data)

                    var node = {}
                    node["uid"] = response.data.request.uid
                    node["hid"] = response.data.file_object.meta_data.hid
                    node["size"] = response.data.file_object.meta_data.size
                    node["children"] = []
        
                    // fatherNode.push(node)
                    //*path managemnt
                    var path = response.data.file_object.meta_data.virtual_file_path[0]
                    path = path.substring(path.indexOf("/")).split("/").filter(d => d != "")
                    path.pop()
                    if(path.length>0)
                        managePath(fatherNode,path,node)
                    else{
                        fatherNode.push(node)
                    }
                    
                    await BuildTree(response.data.file_object.meta_data.included_files, node["children"]);
                };
                
            }
}
  

function managePath(fatherNode,path,node){
    //console.log(path)
    //devo andare in fondo fin quando trovo una folder esistente
    var found = false //true se trovo una folder esistente
    fatherNode.forEach(element => {
        if(element["hid"]==path[0]){ //se la cartella esiste
            found = true
            if(path.length> 0) managePath(element["children"],path.slice(1),node) //se posso continuo
            else { //appendere il nodo
                element["children"].push(node)
            }
        }
            
    });
    if(!found ){ //non ho trovato alcuna cartella, la devo creare
        if(path.length>0) {
            var folder = {}
            folder["uid"] = "folder"
            folder["hid"] = path[0]
            folder["size"] = 0
            folder["children"] = []
            fatherNode.push(folder) //appendo la cartella
            managePath(folder["children"],path.slice(1),node) //vado giu fino a quando non ho piu path
        }
        else{
            fatherNode.push(node)
        }
    }
    

}
function hasFolder(fatherNode,folderi){
    fatherNode.forEach(element => {
        if (element["uid"]=="folder" && element["hid"] == folderi)
            return true
    });
    return false
}






