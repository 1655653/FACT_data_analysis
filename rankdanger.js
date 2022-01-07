
/*/		P --> Plain_cred = [0,1] * weight_p
	E -->  Exploit_mitiga_enabled = [0,1] * #expl * w_exp_m /// se un fo ha piu mitigation è piu sicuro di altre
	Cry  -->  Crypto = [0,1] * w_cry
	CVE  -->  Cve (score parametrico) = ( ∑ [1,10] * i-th_cve ) * w_CVE
P+Cry+CVE-E
Tutti i packed vanno tra i suspicious*/
EXM_FILL = "#83cd4b"
AAA_FILL = "#c80003"
EXTRA_DIV_COLOR = "#6e747e"
BCKGROUND_COLOR = "#4f545c"
function rankdanger(fw,score){
    //clean
    //DANGER={"system":[],"user":[]} //?e.g system.uid=score --->system.464665=10
    CRITICAL_FO={"system":[],"user":[]}
    SUS_FO={"system":[],"user":[]}
    NEUTRAL_FO={"system":[],"user":[]}
    for (const uid in ALL_REST_RESPONSE) {
        if (Object.hasOwnProperty.call(ALL_REST_RESPONSE, uid)) {
            const element = ALL_REST_RESPONSE[uid];
            rankdanger_single(fw,uid,score) //Riempie DANGER
        }
    }
    
    CRITICAL_FO.system.sort(function(a, b) { 
        return b.overall - a.overall;
    })
    NEUTRAL_FO.system.sort(function(a, b) { 
        return d3.ascending(a.hid, b.hid);
    })
    SUS_FO.system.sort(function(a, b) { 
        return b.overall - a.overall;
    })
}
function rankdanger_single(fw,uid,score){
    var CRYPTO = 0
    var cripto = fw.analysis.crypto_material.summary
    for (const key in cripto) {
        if (Object.hasOwnProperty.call(cripto, key)) {
            const element = cripto[key];
            element.forEach(e => {
                if(e==uid) CRYPTO +=  parseFloat(W_CRYPTO)
            });
        }
    }
    var USR_N_PWD = 0
    var usr_pwd = fw.analysis.users_and_passwords.summary
    for (const key in usr_pwd) {
        if (Object.hasOwnProperty.call(usr_pwd, key)) {
            const element = usr_pwd[key];
            element.forEach(e => {
                if(e==uid) USR_N_PWD += parseFloat(W_USR_N_PWD)
            });
        }
    }
    var EXPLOIT = 0
    var ex_mit = fw.analysis.exploit_mitigations.summary
    for (const key in ex_mit) {
        if (Object.hasOwnProperty.call(ex_mit, key)) {
            const element = ex_mit[key];
            element.forEach(e => {
                if(e==uid) {
                    var enordi = key.split(" ").at(-1);
                    if(enordi == "enabled" || enordi== "present")
                        EXPLOIT++
                }
            });
        }
    }
    EXPLOIT *= W_EXPLOIT/2

    var CVE = 0
    var cpe = SW_COMP_CVE

    cpe.forEach(e => {
        var w_cve = e.cpe_name.split(" ").at(-1) =="(CRITICAL)"? W_CVE_CRIT:W_CVE_N_CRIT
        
        e.uid_affected.forEach(u => {
            if(u==uid) {
                CVE+= parseFloat(e[score]* cve_count(e,SCORE_TYPE).length *w_cve)
                //console.log(e)
            }
        });
    });


    var KNOWN_VULN = 0
    var known_vuln = fw.analysis.known_vulnerabilities.summary
    if(Object.entries(known_vuln).length != 0) KNOWN_VULN = parseFloat(W_KNOWN_VULN)

    var PACK = fw.analysis.unpacker.summary.packed
    var is_packed = false
    if (PACK && PACK.indexOf(uid) > -1) {
        //In the array!
        is_packed = true
    } 
    var overall = parseFloat((CRYPTO+CVE+USR_N_PWD+KNOWN_VULN-EXPLOIT).toFixed(1))
    el = {
        "uid":uid,
        "hid":ALL_REST_RESPONSE[uid].hid,
        "CRY":CRYPTO,
        "CVE":CVE,
        "UPW":USR_N_PWD,
        "EXM":EXPLOIT,
        "KVU":KNOWN_VULN,
        "overall": overall,
        "packed": is_packed //il prob è quando è true
    }
    
    if(overall > THRESHOLD){
        // console.log(ALL_REST_RESPONSE[uid])
        // console.log(uid+"  CRYPTO  "+CRYPTO +"  USR_N_PWD  "+USR_N_PWD +"  EXPLOIT  "+EXPLOIT +"  CVE  "+CVE )
        CRITICAL_FO.system.push(el)
    }
    else if((overall>0 && overall < THRESHOLD)||is_packed) SUS_FO.system.push(el)
    else{
        NEUTRAL_FO.system.push(el)
    }

}

//per l'istogramma
var metric_occurrences ={
    "CRY":0,
    "CVE":0,
    "UPW":0,
    "EXM":0,
    "KVU":0,
}
function drawDanger(){
    d3.select("#search_bar_FO").remove()
    d3.select(".refresh").selectAll("*").remove()
    d3.select("#rightside").selectAll("text").remove()
    drawSingleDanger("c","critical")
    drawSingleDanger("s","sus")
    drawSingleDanger("n","neutral")
    buildSearchBar()
   }

metric_occurrences_list = []

function drawSingleDanger(t,type){ //t=c,s,n type=critical,sus,neutral
    d3.select("#FO_squares_div_"+t).selectAll("svg").remove()
    //*draw_neutral
    if(t =="n") {
        drawNeutral(t)
        return
    }
    metric_occurrences ={
        "CRY":0,
        "CVE":0,
        "UPW":0,
        "EXM":0,
        "KVU":0,
    }
    metric_occurrences_list[tToIndex(t)] = metric_occurrences
    var rect_dim
    var list_fo
    if(t=="c") list_fo = CRITICAL_FO
    if(t=="s") list_fo = SUS_FO
    // if(t=="n") list_fo = NEUTRAL_FO
    if(list_fo.system.length>0){
        d3.select("#"+type+"_div").style("visibility","visible")
        d3.select("#summa_"+type+"_div").style("visibility","visible")
        d3.select("#summa_expand_"+t).style("visibility","visible")
  
        list_fo.system.forEach((fo, index) => {
            //* tooltip
            var tooltip_rect
            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function(d) {
                tooltip_rect = d3.select("#FO_squares_div_c")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip_danger")
                tooltip_rect.style("opacity", 1)
                d3.select(this).style("opacity", 1)
            }
            var mousemove = function(d) {
                console.log(d3.select(this).attr("id"))
                tooltip_rect
                .html("info_tooltip")
                .style('left', (d3.event.pageX + 10) + 'px')
                .style('top', (d3.event.pageY + 10) + 'px')
            }
            var mouseleave = function(d) {
                tooltip_rect.style("opacity", 0)
                d3.select(this).style("opacity", 0.8)
                
                d3.select(".tooltip_danger").remove()
            }
            var clicked = function(d) {
                id = d3.select(this).attr("id")
                metric = id.split("_")[0]
                var fill_square = metric == "EXM"? fill_square = EXM_FILL : fill_square = AAA_FILL
                d3.select(this).attr("fill",fill_square)
            }
            //*---------- tooltip
            var fo_name = d3.select("#FO_name_div_"+t).append("text").text(fo.hid).attr("class","div_column").attr("id",fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_"))
            fo_name.style("opacity",0).transition().duration(2500).style("opacity",1)
            total = fo.overall
            if(fo.packed) total = "PACKED"
            d3.select("#FO_score_div_"+t).append("text").text(total).attr("class","div_column overall").attr("id",fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_"))
                .style("opacity",0)
                .transition().duration(2500)
                .style("opacity",1)
            
            //* rect spawn
            var svg_rect = d3.select("#FO_squares_div_"+t).append("svg").attr("id",fo.uid).attr('height',  fo_name.style("height"))
            rect_dim = parseFloat(fo_name.style("height")).toFixed(2) - 3
            d3.select("#"+type+"_div").style("max-height",(11*rect_dim)+"px")
            d3.select("#FO_titles_div_"+t).style("height",rect_dim+"px")
            //* rect loop
            var pad = 5
            var x_rect=pad
            for (let i = 0; i < Object.keys(fo).length; i++) {
                item = Object.keys(fo)[i]
                if(item!="hid" && item != "uid" && item != "overall" && item != "packed"){
                    if(index==0) d3.select("#FO_titles_div_"+t).append("text").text(item).attr("class","acronym_title")
                    if(fo[item] > 0 && item != "EXM") metric_occurrences[item]++
                    else if( fo[item] == 0 && item == "EXM" ) metric_occurrences[item]++
                    stroke_color = '#000000a6'
                    svg_rect.append('rect')
                    .attr('stroke-width', '2px')
                    .attr('fill', function(d){
                        if(fo[item] > 0 && item!="EXM") {
                            stroke_color = AAA_FILL
                            return stroke_color
                        }
                        else if(fo[item] == 0 && item=="EXM") {
                            stroke_color = AAA_FILL
                            return stroke_color
                        }
                        return "#ffffff00"
                    })
                    .attr('stroke', stroke_color )
                    .attr("id",item+"_"+fo.uid)
                    .attr("x",0)
                    .attr("y",1)
                    .attr("rx",4)
                    .style("opacity", 0.8)
                    // .on("mouseover", mouseover)
                    // .on("mousemove", mousemove)
                    // .on("mouseleave", mouseleave)
                    //.on("click",clicked)
                    .transition().duration(1500)
                    .attr("x",x_rect)
                    .attr('width', rect_dim)
                    .attr('height', rect_dim)
                    
                    x_rect+= rect_dim + pad
                }
            }
        });
        d3.select("#"+type+"_div").style("border-style", "solid") //appears
        d3.select("#rightside").style("border-style", "solid") //appears

        d3.select("#FO_squares_div_"+t).style("width",d3.select("#FO_titles_div_"+t).style("width"))
        
        //*per far spazio ai titoli

        var name_div
        var color
        if(t=="c") {name_div = "CRITICAL";color = "red"}
        if(t=="s") {name_div = "SUSPICIOUS";color = "yellow"}
        if(t=="n") {name_div = "NEUTRAL";color = "white"}
        d3.select("#FO_name_div_"+t).append("text").text(name_div)
            .style("height",d3.select("#FO_titles_div_"+t).style("height"))
            .style("width",d3.select("#FO_titles_div_"+t).style("width"))
            .style("color",color)
            .style("text-align","end")
            .lower() 
            .attr("class","no_search")
        d3.select("#FO_score_div_"+t).append("text").text("placeholder")
            .style("height",d3.select("#FO_titles_div_"+t).style("height"))
            .style("width","1px")
            .style("visibility","hidden")
            .lower()
            .attr("class","no_search")
        
        //*accetta
        d3.select("#FO_name_div_"+t).selectAll("text").text(function(d){
            text = d3.select(this).text()
            wi_text = d3.select(this).style("width")
            wi_div = d3.select("#FO_name_div_"+t).style("width")
            if(text.length>15){
                text = text.substring(text.length-15,text.length)
            }
            return text
        })
        // .on("mouseover",function(d){
        //     hid = d3.select(this).attr("id").replace("_EXTENSION_",".").replace(/[_]/g,"/")
        //     console.log(hid)
        //     bound = 5
        //     i = 0
        //     while( i < hid.length-bound) {
        //         g = hid.substring(i,bound+i)
        //         d3.select(this).transition(1500).duration(1500).text(g)
        //         i++
        //         if(i==hid.length-bound) i = 0
        //     }
        // })
        //console.log(metric_occurrences)
        //console.log(list_fo)
        
        //* draw istogramma 
        d3.select("#summa_expand_"+t).style("visibility","visible")
        //summaExpand(rect_dim,t,type)
        pad = 20 //from name
        w = getDimFloat("FO_name_div_"+t,"width") 
        if (w == 0){
            if(t == "s")   w = getDimFloat("FO_name_div_c","width") 
            if(t == "c")   w = getDimFloat("FO_name_div_s","width") 
        }
        d3.select("#summa_expand_"+t).style("margin-left",(w+pad)+"px")
        d3.select("#summa_expand_"+t).on("click",function(d){
            summaExpand(rect_dim,t,type)
        })
        //* text total files
        d3.select("#summa_"+type+"_div").append("text").text("Found "+ list_fo.system.length +" "+ type +" files").style("position","absolute").lower()
    }
        //neutral div width
    else{
        d3.select("#"+type+"_div").style("visibility","hidden")
        d3.select("#summa_"+type+"_div").style("visibility","hidden")
        d3.select("#summa_expand_"+t).style("visibility","hidden")
    }
    d3.select("#neutral_div").style("max-width", getDimFloat("critical_div","width")+"px") 
}
//*draw neutral
function drawNeutral(t){
    d3.select("#FO_name_div_"+t).selectAll("*").remove()
    d3.select("#neutral_div").style("border-style", "solid") //appears
    //drop down mngmnt
    var others_txt_and_expand = d3.select("#FO_name_div_"+t).append("div").attr("id","others_txt_and_expand").attr("class","no_search")
    others_txt_and_expand.html( "<button type='button'  id='others_expand' ><i class='fas fa-caret-down' ></i></button>")
    others_txt_and_expand.append("text").text("OTHERS")
        .style("color","black")
        .style("margin-left","25px")
        .style("margin-right","25px")
        .lower() 
        .attr("class","no_search")
    d3.select("#others_expand").on("click",function(d){
        var is_down = d3.select("#others_expand").select("i").attr("class") == "fas fa-caret-down"? true:false
        if(is_down){
            //fill with files
            NEUTRAL_FO.system.forEach((fo, index) => {
                var fo_name = d3.select("#FO_name_div_"+t).append("text").text(fo.hid).attr("class","div_column").attr("id",fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_"))
                fo_name.style("opacity",0).transition().duration(2500).style("opacity",1)
            })
            d3.select("#others_expand").select("i").attr("class","fas fa-caret-up")
            d3.select("#neutral_div").style("overflow-y","auto")
            d3.select("#neutral_div").style("height",getDimFloat("others_txt_and_expand","height")+"px").transition().duration(700).style("height",d3.select("#neutral_div").style("max-height"))
        }
        else{
            d3.select("#neutral_div").style("overflow-y","hidden")
            d3.select("#neutral_div").transition().duration(700).style("height",getDimFloat("others_txt_and_expand","height")+"px")
            d3.select("#FO_name_div_"+t).selectAll(".div_column").style("opacity",1).transition().duration(1500).style("opacity",0).remove()
            d3.select("#others_expand").select("i").attr("class","fas fa-caret-down")
        }

    })
}

//*draw histogram when expanded
function summaExpand(rect_dim,t,type){
    var is_down = d3.select("#summa_expand_"+t).select("i").attr("class") == "fas fa-caret-down"? true:false
    if(is_down) {
        drawHistogramSumma(rect_dim,t,type)
        d3.select("#summa_expand_"+t).select("i").attr("class","fas fa-caret-up")
    }
    else{
        d3.select("#summa_"+type+"_div").select("svg").remove()
        d3.select("#summa_expand_"+t).select("i").attr("class","fas fa-caret-down")
    }
}
//*draw histogram
function drawHistogramSumma(rect_dim,t,type){
    console.log(metric_occurrences_list)
    metric_occurrences = metric_occurrences_list[tToIndex(t)]
    let margin = {top: 20, right: 0, bottom: 15, left: 0};
    let svgWidth = getDimFloat("FO_squares_div_"+t,"width"), svgHeight = rect_dim*5;
    let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
    let sourceNames = [], sourceCount = [];
    
    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
    for(let key in metric_occurrences){
        if(metric_occurrences.hasOwnProperty(key)){
            sourceNames.push(key);
            sourceCount.push(parseInt(metric_occurrences[key]));
        }
    }
    x.domain(sourceNames);
    y.domain([0, d3.max(sourceCount, function(d) { return d; })]);
    
    let svg_histo = d3.select("#summa_"+type+"_div").append("svg");
    var pad  = 5 //from score
    w = getDimFloat("FO_name_div_"+t,"width") + getDimFloat("FO_score_div_"+t,"width")
    svg_histo.style("margin-left",(w+pad)+"px")
    //square_bound = document.getElementById("FO_squares_div_c").getBoundingClientRect();
    //svg_histo.attr("transform", "translate("+ (square_bound.x - pad)+",0)")

    svg_histo.attr('height', svgHeight)
        .attr('width', svgWidth);
    
    svg_histo = svg_histo.append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg_histo.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    
    svg_histo.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5))
        ;
            
    //* Create bars
    let bars = svg_histo.selectAll('.bar')
        .data(sourceNames)
        .enter()
        .append("g");
    
    bars.append('rect')
        .attr('class', 'bar')
        .attr("x", function(d) { return x(d); })
        .attr("fill",function(d) { return AAA_FILL})
        // .attr("fill",function(d) { return d == "EXM"? EXM_FILL:AAA_FILL})
        .attr("opacity",0.8)
        .attr("width", x.bandwidth())
        .attr("y", svgHeight)
        .attr("height", 0)
        // no bar at the beginning thus:
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); });
    
    bars.selectAll("rect")
        .transition().duration(1500)//on transition
        .attr("y", function(d) { return y(metric_occurrences[d]); })
        .attr("height", function(d) { return height - y(metric_occurrences[d]); })
    
    

    bars.append("text")
        .text(function(d) { 
            return metric_occurrences[d];
        })
        .attr("x", function(d){
            return x(d) + x.bandwidth()/2;
        })
        .attr("y", function(d){
            return y(metric_occurrences[d]) - 5;
        })
        .attr("font-size" , "11px")
        .attr("fill" , "black")
        .attr("text-anchor", "middle");

    svg_histo.selectAll(".axis--y").style("visibility", "hidden")  
    svg_histo.selectAll(".axis--x").selectAll("text").style("visibility", "hidden")  
    svg_w = getDimFloat("FO_name_div_c","width") + getDimFloat("FO_score_div_c","width") 

}


//*utils
function tToIndex(t){
    switch (t) {
        case "c":
            return 0
        case "s":
            return 1
        case "n":
            return 2
    
      
    }
}
function rotateLabel(s,e,d){
    var startTranslateState = 'rotate('+s+'deg)';
    var endTranslateState = 'rotate('+e+'deg)';
    var translateInterpolator = d3.interpolateString(startTranslateState, endTranslateState);
    d3.select("#param_label")
        .transition()
        .duration(d)
        .styleTween('transform', function (d) {
            return translateInterpolator;
        });
}
function cve_count(d,type){
    switch (type) {
        case "base_score":
            return d.all_cve_objects_bs
        case "exploitability_score":
            return d.all_cve_objects_es
        case "impact_score":
            return d.all_cve_objects_is
    }
}
function getDimFloat(id,dim){
    var r 
    try {
        r = parseFloat(d3.select("#"+id).style(dim).split("px")[0])
        if(!Number.isNaN(r))return r
        throw new Error('getDimFloat error, NAN in '+id + " "+dim)
    
    } catch (error) {
        throw error
    }
}