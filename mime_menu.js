var range_color_array = ["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01"]
function MimeMenu(){
    colormimeSupertype = d3.scaleOrdinal().domain(ListSuperMimes).range(d3.schemeAccent)
    colormimeSubtype = d3.scaleOrdinal().domain(ListMimes).range(range_color_array)
    // console.log(ListSuperMimes)
    // console.log(ListMimes)

    d3.select("#mime_list").remove()
    d3.select("#sub_mime_list").remove()
    //*creo il div per  supermimes
    mimes_div = d3.select("#center").append("div").attr("id","mime_list")
    d3.select("#center").append("div").attr("id","sub_mime_list")
    
    mimes_div.append("div").attr("id","mixed_folders_div")
            .append("span").text("Mixed folders")
            .style("color","#7da19d")
            
    ListSuperMimes.forEach(mime => {
        mime_div= mimes_div.append("div").attr("id",mime+"_div")
        //se c'è solo un submime non creo la checkbox
        var m = ""
        var j = 0
        ListMimes.forEach(element => {
            if(element.includes(mime)){
                m = element
                j++
            }
        });
        var mime_txt = mime
        if(j == 1) mime_txt = m
        //*INITIAL  MIME SPAN (application)
        mime_div.append("span").text(mime_txt+" ("+mimeOccurence(mime_txt)+")")
            .style("color",function(d){
                return colormimeSupertype(mime)
            })
            .on("click",function(d){
                d3.select("#"+mime+"_div").remove()
                //RESET BUTTON
                if(d3.selectAll("#reset_mime").nodes().length == 0){
                    mimes_div.append("button").attr("id","reset_mime")
                        .text("Reset")
                        .on("click",function(){
                            Tree = JSON.parse(JSON.stringify(BackupTree))
                            MimeMenu()
                            d3.select("#reset_mime").transition().duration(200).style("opacity","0").remove()
                            
                            mime_filtered = []
                            DrawSunburst()
                        })
                }
                //DELETE FO
                FilterMIME(mime)
                d3.select(this).text(mime_txt+" ("+mimeOccurence(mime_txt)+")")

            })
            .on("mouseover", function() {highligthTheseMime(mime,"super","over")})
            .on("mouseleave", function() {highligthTheseMime(mime,"super","leave")});
        
        //*CHECKBOX
        if(j>1){ //almeno 2 submime
            mime_div.append('input').attr('type','checkbox').attr("id",mime+"_checkbox")
                .on("click",function(d){
                    if(d3.select(this).node().checked){
                        ListMimes.forEach(full_mime => {
                            //*FULL MIME SPAN application/x-sharedlib
                            if(full_mime.includes(mime)){
                                d3.select("#sub_mime_list").append("span")
                                .attr("id",full_mime.replace(/[/.]/g,"_")+"_span").attr("class",mime)
                                .text(full_mime+" ("+mimeOccurence(full_mime)+")")
                                .style("color",function(d){
                                    if(moreThanOne(full_mime))return colormimeSubtype(full_mime)
                                    return colormimeSupertype(full_mime.split("/")[0])
                                })
                                .style("margin-top",function(d){
                                scale = d3.scaleLinear().domain([0,ListMimes.length]).range([15,1])
                                value = scale(d3.select("#sub_mime_list").selectAll("span").nodes().length)
                                d3.select("#sub_mime_list").selectAll("span").style("margin-top",value+"px")
                                return value+"px"
                                })
                                .on("mouseover", function() {highligthTheseMime(full_mime,"sub","over")})
                                .on("mouseleave", function() {highligthTheseMime(full_mime,"sub","leave")})
                                .on("click",function(d){
                                    d3.select("#"+full_mime.replace(/[/.]/g,"_")+"_span").remove()
                                    //RESET BUTTON
                                    if(d3.selectAll("#reset_mime").nodes().length == 0){
                                        mimes_div.append("button").attr("id","reset_mime")
                                            .text("Reset")
                                            .on("click",function(){
                                                Tree = JSON.parse(JSON.stringify(BackupTree))
                                                MimeMenu()
                                                d3.select("#reset_mime").transition().duration(200).style("opacity","0").remove()
                                                
                                                mime_filtered = []
                                                DrawSunburst()
                                                DrawDirectory()
                                            })
                                    }
                                    //DELETE FO
                                    FilterMIME(full_mime)
                                    d3.select(this).text(full_mime+" ("+mimeOccurence(full_mime)+")")
                                })
                            }
                        });
                        //gestione padding
                        d3.select("#sub_mime_list").style("padding-top",function(){
                            scale = d3.scaleLinear().domain([0,ListMimes.length]).range([25,10])
                            return scale(d3.select("#sub_mime_list").selectAll("span").nodes().length) + "px"
                        })
                        //cambio opacita al super mime
                        d3.select("#"+mime+"_div").select("span").style("opacity","0.3").style("color","#8e9297")

                    }
                    else{ //non è checked
                        d3.select("#sub_mime_list").selectAll("span").nodes().forEach(node => {
                            if(node.id.includes(mime)) d3.select("#"+node.id).remove()
                        });
                        d3.select("#"+mime+"_div").select("span").style("opacity","1").style("color",colormimeSupertype(mime))
                    }
                    DrawSunburst()
                    DrawDirectory()
                })
        }
    });
        
}

function highligthTheseMime(type,suosub,ovoleave){
    var name = "#sb_path"+type.replace(/[/.]/g,"_")
    var hexcolor = colormimeSubtype(type)
    if(suosub=="super"){
        name = '.sb_path'+type.split("/")[0]
        hexcolor = colormimeSupertype(type)
    }
    opacitySunEDir(hexcolor,ovoleave,"bigsun","path")
    opacitySunEDir(hexcolor,ovoleave,"directory_container","rect")
    
}
function opacitySunEDir(hexcolor,ovoleave,id,item){
    all_paths = d3.select("#"+id).selectAll(item)
    all_paths.each(function(path){
            if(samergb(d3.select(this).style("fill"), hexcolor)){
                if(ovoleave=="over"){
                    d3.select(this).style("opacity","1")
                }
                else{
                    d3.select(this).style("opacity","0.8")
                }
            }
            else{ //non hanno lo stesso colore
                if(ovoleave=="over"){
                    d3.select(this).style("opacity","0.2")
                }
                else{
                    d3.select(this).style("opacity","0.8")
                }
            }

    })
}
//* if only one mime i use the same color of supertype
function moreThanOne(element){
    var howmany=0
    ListMimes.forEach(i => {
        if(element.split("/")[0]==i.split("/")[0]) howmany++ 
    });
    return howmany>1? true: false
}

mime_filtered = []
function FilterMIME(mime){
    if(!mime_filtered.includes(mime)) mime_filtered.push(mime)
    RemoveMimeFOFromTree(Tree,mime_filtered)
    calculateLeaves(Tree)
    calculateMimes(Tree)
    // console.log(Tree)
    DrawSunburst()
    DrawDirectory()

}
function samergb(rgb,hex){
    a = rgb.replace("rgb(","").replace(")","").split(",")
    b = hexToRgb(hex)
    return a[0]==b.r && a[1]==b.g && a[2]==b.b
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function mimeOccurence(m){
    var occ = 0
    for (const mime in Tree.mime_types) {
        if (Object.hasOwnProperty.call(Tree.mime_types, mime)) {
            if(mime.includes(m)) occ+=Tree.mime_types[mime]
        }
    }
    return occ==0? 1: occ
}