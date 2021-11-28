//*interface to filter mimes

var mode = "mode = highligths"
var colormimeSupertype = d3.scaleOrdinal().domain(ListSuperMimes).range(d3.schemeAccent)
var colormimeSubtype = d3.scaleOrdinal().domain(ListMimes.reverse()).range(d3.schemeCategory10)
function BuildMimeFilterUI(list_m){
    //console.log(ListMimes)
    d3.select("#treemap_div").append("div").attr("id","filter_menu_type").attr("class","filter_menu")
    d3.select("#treemap_div").append("div").attr("id","filter_menu_subtype").attr("class","filter_menu")
    
    d3.select("#filter_menu_type").append('text').text("mixed folder").style("color","#7da19d")
    d3.select("#filter_menu_type").append('br');

    list_m.sort()
    list_m.forEach(element => { 
        if (! document.getElementById(element.split("/")[0])) { //? metto i macro tipi
            d3.select("#filter_menu_type").append('input').attr('type','checkbox').attr("id",element.split("/")[0]).on("click", setCheckbox)
            d3.select("#filter_menu_type").append("text").text(element.split("/")[0]).attr("id","text"+element.split("/")[0])
                .style("color", colormimeSupertype(element.split("/")[0]))
                // .on("mouseover", function() {highligthTheseMime(element,"super")})
                // .on("mouseleave", function() {DehighligthTheseMime(element,"super")});
            d3.select("#filter_menu_type").append('input').attr('type','checkbox').attr("id","details"+element.split("/")[0]).on("click", function(){showsubType(element.split("/")[0])})
            d3.select("#filter_menu_type").append('br');
        }
        if(element!="undefined"){ //? metto i subtypes
            d3.select("#filter_menu_subtype").append('input').attr('type','checkbox').attr("id",element.replace(/[/.]/g,"_")).style("visibility", "hidden").on("click", setSubCheckbox) //mi salvo l'id con il replace perchè al dom non piace lo slash
            d3.select("#filter_menu_subtype").append("text").text(element).attr("id","text"+element.replace(/[/.]/g,"_"))
                .style("color", function(){ //? se ci sono almeno due sottotipi uso colori diversi, senno uso quello del supertipo
                    if(moreThanOne(element))return colormimeSubtype(element)
                    return colormimeSupertype(element.split("/")[0])
                })
                .style("visibility", "hidden")
                // .on("mouseover", function() {highligthTheseMime(element,"sub")})
                // .on("mouseleave", function() {DehighligthTheseMime(element,"sub")});
            d3.select("#filter_menu_subtype").append('br');
        }
    });
    
    //? tipo di filtro
    d3.select("#filter_menu_type").append("button").text(mode).attr("id","filtername")
    d3.select("#filter_menu_type").append('br');
    
    d3.select('#filtername').on('click', function(){
        mode == "mode = highligths"? mode = "mode = remove": mode = "mode = highligths"
        d3.select('#filtername').text(mode)
        FilterMIME()
    })
    
    
    d3.select("#filter_menu_type").append("button").text("filter").attr("id","mime_filter_start")
    d3.select("#filter_menu_type").append("button").text("reset").attr("id","mime_filter_reset")
    d3.select("#filter_menu_type").append('br');
    //DrawMiniSunburst()

    
}


//* tools
//* if only one mime i use the same color of supertype
function moreThanOne(element){
    var howmany=0
    ListMimes.forEach(i => {
        if(element.split("/")[0]==i.split("/")[0]) howmany++ 
    });
    return howmany>1? true: false
}

function highligthTheseMime(type,suosub){
    var name = "#path"+type.replace(/[/.]/g,"_")
    if(suosub=="super"){
        name = '.path'+type.split("/")[0]
    }
    d3.selectAll(name).style("opacity", function(d) {return 1})
        
}

function DehighligthTheseMime(type,suosub) {
    var name = "#path"+type.replace(/[/.]/g,"_")
    if(suosub=="super"){
        name = '.path'+type.split("/")[0]
    }
    d3.selectAll(name)
        .style("opacity", function(d) {return d.data.filtered? 0.2:0.8})
        
}


//?coerenza ra i due div quando metto il check o lo tolgo  
var setSubCheckbox = function() {
    ListMimes.forEach(e => {
        if(! d3.select("#"+e.replace(/[/.]/g,"_")).property('checked')) {
            document.getElementById(e.split("/")[0]).checked = false;  
        }
    });
    FilterMIME()
}
var setCheckbox = function() {
    ListMimes.forEach(e => {
        if(d3.select('#'+e.split("/")[0]).property('checked')){
            d3.select("#"+e.replace(/[/.]/g,"_")).property('checked',"true")
            
        }
        else{
            document.getElementById(e.replace(/[/.]/g,"_")).checked = false;  
        }
    });
    FilterMIME()
}