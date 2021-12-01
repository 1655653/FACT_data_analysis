var max_str = ""



function drawMultipleHisto(){
    d3.selectAll(".UIDs_list_").remove();
    d3.selectAll("#back_btn").remove();
    d3.select("#exploit_container")
        .style("max-width",d3.select("#violin_div").style("width")+d3.select("#violin_div").style("padding-right"))
        .style("border-style","ridge")
    d3.select("#exploit_div").select("*").remove();

    for (const key in exploit_data) {
        if (Object.hasOwnProperty.call(exploit_data, key)) {
            const element = exploit_data[key];
            if(key.length>max_str.length) max_str = key
        }
    }
    console.log(max_str)
    for (const key in exploit_data) {
        if (Object.hasOwnProperty.call(exploit_data, key)) {
            const element = exploit_data[key];
            drawSingleHisto(element,key)
        }
    }
} 

function drawSingleHisto(data,method){
// set the dimensions and margins of the graph
var margin_exploit = {top: 15, right: 0, bottom: 20, left: 10},
    width_exp = 160 - margin_exploit.left - margin_exploit.right,
    heightexp = 100 - margin_exploit.top - margin_exploit.bottom;

// append the svg object to the body of the page
var svg_single_chart = d3.select("#exploit_div")
  .append("svg").attr("id",method).attr("class","exploit_div_normal")
    .attr("width", width_exp + margin_exploit.left + margin_exploit.right)
    .attr("height", heightexp + margin_exploit.top + margin_exploit.bottom)
    .style("border-color","black")
    .style("border-style","solid")
    .style("margin","5px")
  .append("g")
    .attr("transform",
          "translate(" + margin_exploit.left + "," + margin_exploit.top + ")");

// Parse the Data

// X axis
var si = d3.scaleLinear().domain([0,5]).range([12,6]) //scala per il font size della x
var pad = d3.scaleLinear().domain([2,4]).range([0.5,0.2]) //scala per il padding
pad = pad(data.length)
var x_exp = d3.scaleBand()
  .range([ 0, width_exp ])
  .domain(data.map(function(d) { return d.eod; }))
  .padding(pad)//0.2
  //.padding(function(d) { return pad(data.length); })
  .paddingInner(0.5);
svg_single_chart.append("g")
  .attr("transform", "translate(0," + heightexp + ")")
  .call(d3.axisBottom(x_exp))
  .selectAll("text")
    .style("text-anchor", "center")
    .style("font-size",si(data.length)+"px")
    
        
// Add Y axis
var maxY = 0
data.forEach(element => {
    if(element.Value > maxY) maxY = element.Value
});
var y_exp = d3.scaleLinear()
  .domain([0, maxY])
  .range([ heightexp, 0]);
svg_single_chart.append("g")
  .call(d3.axisLeft(y_exp).ticks(0))
 .attr("opacity","0");
  
//label method (canary,...)
si = d3.scaleLinear().domain([1,max_str.length]).range([14,9]) //scala per il font size della x
  svg_single_chart.append("text")
    .text(function(d) { return method.replace("_"," ")})
    .attr("transform", "translate(1,80)rotate(-90)")
    .style("text-anchor", "start")
    .style("font-size",si(method.length)+"px")
    .style("fill","white").raise()

// Bars
var bar = svg_single_chart.selectAll("mybar")
  .data(data)
  .enter()
  .append("g")
  

//ONclick  
var expandBar = function (d){
    d3.select("#exploit_div").selectAll("svg").attr("display","block")

    if(d3.select("#back_btn").empty()) d3.select("#exploit_div").append("button").text("back").attr("id","back_btn").on("click",function(e){drawMultipleHisto()})
    var div_w = d3.select("#exploit_div").style("width")
    var div_h = d3.select("#exploit_div").style("height")
    var e = d3.select("#exploit_container").selectAll("svg").filter(function() {
        return d3.select(this).attr("id") != method;  // Use a filter to select all other bars for the transition.
        })
    e.remove()
    var colorID = d3.select(this).attr("fill")
    if(colorID=="black") colorID = d3.select(this).attr("id")
    
    var list = d3.select("#exploit_container").append("div").attr("id","UIDs_list_"+colorID.replace("#","")).style("overflow-y","auto").attr("class","UIDs_list_")
    list
        .style("height","0px")
        .style("width","0px")
        .transition()
        .duration(400)
        .style("height",parseFloat(d3.select("svg").style("height"))+150+"px")
        .style("width","auto")
        .style("background-color",colorID)
    // search bar
    list.append('textarea').attr("id","search_bar_exploit").style("width","600px")
    
    .on("keydown",function(d){ 
        if(d3.event.keyCode==13 && !d3.event.shiftKey) {
            d3.event.preventDefault();
            return false
        }
    })
    .on("keyup",function(d){ 
        var v = d3.select(this).property("value")
            if(v == "") {
                d3.select("#exploit_container").select("#"+"UIDs_list_"+colorID.replace("#","")).selectAll("text").remove()
                d3.select("#exploit_container").select("#"+"UIDs_list_"+colorID.replace("#","")).selectAll("br").remove()
                appendText()
            }
            else{
                var size = d3.select("#exploit_container").select("#"+"UIDs_list_"+colorID.replace("#","")).selectAll("text").size()
                var rem = d3.select("#exploit_container").select("#"+"UIDs_list_"+colorID.replace("#","")).selectAll("text").filter(function() {
                    return !d3.select(this).attr("id").startsWith(v.replace(/[/.]/g,"_"));  // Use a filter to select all other bars for the transition.
                })
                var br = d3.select("#exploit_container").select("#"+"UIDs_list_"+colorID.replace("#","")).selectAll("br").filter(function() {
                    if(d3.select(this).attr("id") != "testa")
                    return !d3.select(this).attr("id").startsWith(v.replace(/[/.]/g,"_"));  // Use a filter to select all other bars for the transition.
                })
                if(size != rem.size()) {
                    rem.remove()
                    br.remove()
                    
                }
               
            }
    })
    list.append("br").attr("id","testa")
    appendText()    
    //append all text with uids
    function appendText(){
        d.UIDs.forEach(uid => {
            hid = all_REST_response[uid].hid
            list.append("text").text(hid).style("font-size","14px").style("opacity",0).attr("id",hid.replace(/[/.]/g,"_")).style("color","black").style("padding-left","20px").on("click",function(d){details_I_II(uid)})
            .transition()
            .duration(400)
            .delay(200)
            .style("opacity",1)
            list.append("br").attr("id",hid.replace(/[/.]/g,"_"))
        });
    }
}

var MoverBar = function (d){d3.select(this).style("stroke-width", "3px").style("stroke","black")}
var MleaveBar = function (d){d3.select(this).style("stroke-width", "3px").style("stroke","none")}
//actual histo
  bar.append("rect").attr("class","rect_histo")
    .attr("x", function(d) { return x_exp(d.eod); })
    .attr("width", x_exp.bandwidth()/1.5)
    .attr("rx", 2) //smoothness del rettangolo
    .attr("ry", 2)
    .attr("fill", function(d){
        if(d.eod.includes("enabled")) return "#50C878"
        if(d.eod.includes("disabled")) return "#880000"
        return "#69b3a2"
        
    })
    // no bar at the beginning thus:
    .attr("height", function(d) { return heightexp - y_exp(0); }) // always equal to 0
    .attr("y", function(d) { return y_exp(0); })
    .on("click",expandBar)
    .on("mouseover",MoverBar)
    .on("mouseleave",MleaveBar)

    //label numero sull'istogramma
bar.append("text")
    .text(function(d) { return d.Value })
    .attr("x",function(d){return x_exp(d.eod)+5})
    .attr("y",function(d){return y_exp(d.Value)-2})
    .attr("font-family" , "sans-serif")
    .attr("font-size" , "14px")
    .attr("fill" , "black")
    .attr("id",function(d){
        if(d.eod.includes("enabled")) return "#50C878"
        if(d.eod.includes("disabled")) return "#880000"
        return "#69b3a2"
        
    })
    .attr("text-anchor", "start")
    .on("click",expandBar)


// Animation
svg_single_chart.selectAll("rect")
  .transition()
  .duration(400)
  .attr("y", function(d) { return y_exp(d.Value); })
  .attr("height", function(d) { return heightexp - y_exp(d.Value); })
  .delay(function(d,i){return(i*100)})



}
