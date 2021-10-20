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
                    console.log("TREE BUILT")
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
                    .enter().append('g').attr("class", "node")  // <-- 2
                    .append('path')  // <-- 2
                    .attr("display", function (d) { return d.depth ? null : "none"; })
                    .attr("d", arc)
                    .style('stroke', '#fff')
                    .style("fill", function (d) { return color((d.children ? d : d.parent).data.mime_type); });
                    // Populate the <text> elements with our data-driven titles.
                    g.selectAll(".node")
                    .append("text")
                    .attr("transform", function(d) {
                        return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
                        .attr("dx", "-20") // radius margin
                        .attr("dy", ".5em") // rotation align
                        .text(function(d) {  
                            if(d.parent != null){
                                if(d.depth == 1) return d.data.hid
                                else return d.data.hid }
                            });
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
function computeTextRotation(d) {
    var angle = (d.x0 + d.x1) / Math.PI * 90;

    // Avoid upside-down labels
    return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
    //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
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
        
                    fatherNode.push(node)
                    console.log(Tree)
                    await BuildTree(response.data.file_object.meta_data.included_files, node["children"]);
                };
                
            }
        }
 
function ManageTreeFolder(path){

}