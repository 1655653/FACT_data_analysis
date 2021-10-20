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

  
var svg = d3.select("#treemap_div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
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
    fw_size = data.firmware.analysis.unpacker.size_packed
    document.getElementById("reportOf").innerHTML += "</br> UNPACKER: " + fw_size +" Bytes when packed, "+data.firmware.analysis.unpacker.size_unpacked+" Bytes when unpacked "+ "</br>"+
                                                        "Over " + data.firmware.meta_data.total_files_in_firmware +" files, "

    if( list_packed !== undefined && data.firmware.analysis.unpacker.number_of_unpacked_files > 0){
        //? chiamo tutti i fo non spacchettati
        document.getElementById("reportOf").innerHTML += "FACT has not been able to unpack "+ list_packed.length + " elements  " 
        promises = [];
        list_packed.forEach(function(item) {
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
            
            var root = d3.hierarchy(dictFO)
            

            var max = d3.max(sizearr);
            var scale = d3.scaleLinear().domain([0, max]).range([0, 100]);

            root.sum(function(d){
                var v = d.size
                console.log(v)
                if(v > 300) return 300
                    // Here the size of each leave is given in the 'value' field in input data
                return d.size;
                })
                .sort(function (a, b) {
                    return b.height - a.height || b.size - a.size
                })
            console.log(root)
            d3.treemap()
                .size([width, height])
                .paddingTop(28)
                .paddingRight(7)
                .paddingInner(3)      // Padding between each rectangle
                //.paddingOuter(6)
                //.padding(20)
                (root)
            console.log(list_mime_type)    
              // prepare a color scale
            var color = d3.scaleOrdinal()
                .domain(list_mime_type)
                .range([ "#402D54", "#D18975", "#8FD175"])

                // And a opacity scale
            var opacity = d3.scaleLinear()
                .domain([10, 30])
                .range([.5,1])

            // use this information to add rectangles:
            var x = d3.scaleLinear()
                .domain([0, width])
                .range([0, width]);
            var y = d3.scaleLinear()
                .domain([0, height])
                .range([0, height]);

            svg.selectAll("rect")
                .data(root.leaves())
                .enter()
                .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { console.log("d="+d+"\nx1="+(d.x1) +"x0="+ d.x0); return d.x1 - d.x0; })
                .attr('height', function (d) { console.log(d.y1 - d.y0); return d.y1 - d.y0; })
                .style("stroke", "black")
                .style("fill", function(d){ console.log(d);return color(d.data.mime_type)} )
                .style("opacity", function(d){ return opacity(d.data.size)})

            // and to add the text labels UID
            svg.selectAll("text")
                .data(root.leaves())
                .enter()
                .append("text")
                .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
                .text(function(d){ return  d.data.name})
                .attr("font-size", "15px")
                .attr("fill", "white")
            //value of each rect
            svg
                .selectAll("vals")
                .data(root.leaves())
                .enter()
                .append("text")
                  .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
                  .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
                  .text(function(d){ return d.data.size })
                  .attr("font-size", "11px")
                  .attr("fill", "white")
            
            //mime type
            console.log(root.descendants())
            svg
            .selectAll("titles")
            .data(root.descendants().filter(function(d){return d.depth==1}))
            .enter()
            .append("text")
                .attr("x", function(d){ return d.x0})
                .attr("y", function(d){ return d.y0+21})
                .text(function(d){ return d.data.mime_type })
                .attr("font-size", "19px")
                .attr("fill",  function(d){ return color(d.data.mime_type)})
        });
        

        
    }
    else if (data.firmware.analysis.unpacker.number_of_unpacked_files == 0){
        document.getElementById("reportOf").innerHTML += "FACT unpacked 0 elements "
      }
      else {
        document.getElementById("reportOf").innerHTML += "FACT has been able to unpack every elements  "
      }

}