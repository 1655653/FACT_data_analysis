var endpoint = "http://192.168.30.177:5000/rest/"
var url = endpoint+"firmware"

var unpack_blacklist = ["audio/mpeg", "image/png", "image/jpeg", "image/gif", "application/x-shockwave-flash", "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/ogg", "text/plain", "application/pdf"] //? token from https://github.com/fkie-cad/fact_extractor/blob/master/fact_extractor/config/main.cfg

//* global vars
list_response_cpu_archi=[]
list_response_unpacker=[]
list_packed=[]
list_packed_hid=[]
dictFO = {}

//* checkbox mngm
document.getElementById("unpackerCKBOX").checked=true
//* margin
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
                unpacker(data)
                dictFO["name"] = data.firmware.meta_data.hid
                dictFO["children"] = []
            } 
        })
    }
  
    //? pulisco le var

    list_response_cpu_archi=[]
    list_response_unpacker=[]
    list_packed=[]
    list_packed_hid=[]
  
}

function unpacker(data){
    list_packed = data.firmware.analysis.unpacker.summary.packed
    list_unpacked = data.firmware.analysis.unpacker.summary.unpacked
    fw_size = data.firmware.analysis.unpacker.size_packed
    document.getElementById("reportOf").innerHTML += "</br> UNPACKER: " + fw_size +" Bytes when packed, "+data.firmware.analysis.unpacker.size_unpacked+" Bytes when unpacked "+ "</br>"+
                                                        "Over " + data.firmware.meta_data.total_files_in_firmware +" files, "

    if( list_packed !== undefined && data.firmware.analysis.unpacker.number_of_unpacked_files > 0){
        //? chiamo tutti i fo non spacchettati
        document.getElementById("reportOf").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  " 
        promises = [];
        list_unpacked.forEach(function(item) {
            url = endpoint+"file_object/"+item+"?summary=true";
            promises.push(axios.get(url));
        });
        var sizearr=[]
        Promise.all(promises).then(function (results) {
            var list_mime_type =[]
            results.forEach(function (response) {
                list_packed.push(response.data)
                var elem ={}
                elem["name"] = response.data.file_object.meta_data.hid
                elem["mime_type"] = response.data.file_object.analysis.file_type.mime
                elem["uid"] = response.data.request.uid
                elem["size"] = response.data.file_object.meta_data.size
                sizearr.push(elem["size"])
                
            
                var searchField = "mime_type";
                var searchVal = response.data.file_object.analysis.file_type.mime
                var found = false
                for (var i=0 ; i < dictFO.children.length ; i++){
                    if (dictFO.children[i][searchField] == searchVal) {
                       found = true
                       dictFO.children[i]["children"].push(elem)
                    }
                }
                
                var bigElem = {"mime_type" : response.data.file_object.analysis.file_type.mime,"children":[elem]}
                if (!found) dictFO.children.push(bigElem)
                if(!list_mime_type.includes(response.data.file_object.analysis.file_type.mime)) list_mime_type.push(response.data.file_object.analysis.file_type.mime)

            });
            console.log(dictFO)


            //* start drawing treemap
            var max = d3.max(sizearr);
            var scale = d3.scaleLinear().domain([0, max]).range([0, 100]);

            var root = d3.hierarchy(dictFO).sum(function (d) { return d.size});
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
                    .text(function(d) {  console.log(d) 
                                        if(d.parent != null){
                                            if(d.depth == 1) return d.data.mime_type 
                                            else return d.data.name }
                                        });
        });
        

        
    }
    else if (data.firmware.analysis.unpacker.number_of_unpacked_files == 0){
        document.getElementById("reportOf").innerHTML += "FACT unpacked 0 elements "
      }
      else {
        document.getElementById("reportOf").innerHTML += "FACT has been able to unpack every elements  "
      }

}

function computeTextRotation(d) {
    var angle = (d.x0 + d.x1) / Math.PI * 90;

    // Avoid upside-down labels
    return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
    //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
}