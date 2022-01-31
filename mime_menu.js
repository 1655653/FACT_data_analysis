var range_color_array = ["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01"]
function MimeMenu(){
    colormimeSupertype = d3.scaleOrdinal().domain(ListSuperMimes).range(d3.schemeAccent)
    colormimeSubtype = d3.scaleOrdinal().domain(ListMimes).range(range_color_array)
    console.log(ListSuperMimes)
    console.log(ListMimes)
    //*creo il div per  supermimes
    mimes_div = d3.select("#center").append("div").attr("id","mime_list")
    d3.select("#center").append("div").attr("id","sub_mime_list")
    
    mimes_div.append("div").attr("id","mixed_folders_div")
            .append("span").text("Mixed folders")
            .style("color","#7da19d")
            
    ListSuperMimes.forEach(mime => {
        mime_div= mimes_div.append("div").attr("id",mime+"_div")
        //text
        mime_div.append("span").text(mime)
            .style("color",function(d){
                return colormimeSupertype(mime)
            })
            .on("click",function(d){
                d3.select("#"+mime+"_div").remove()
                //TODO RESET BUTTON
            })
        //checkbox
        mime_div.append('input').attr('type','checkbox').attr("id",mime+"_checkbox")
            .on("click",function(d){
                if(d3.select(this).node().checked){
                    ListMimes.forEach(full_mime => {
                        if(full_mime.includes(mime)){
                            d3.select("#sub_mime_list").append("span")
                            .attr("id",full_mime.replace(/[/.]/g,"_")+"_span")
                            .text(full_mime)
                            .style("color",function(d){
                                return colormimeSubtype(full_mime)
                            })
                            .style("margin-top",function(d){
                               scale = d3.scaleLinear().domain([0,ListMimes.length]).range([15,1])
                               value = scale(d3.select("#sub_mime_list").selectAll("span").nodes().length)
                               d3.select("#sub_mime_list").selectAll("span").style("margin-top",value+"px")
                               return value+"px"
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
            })
    });
}

