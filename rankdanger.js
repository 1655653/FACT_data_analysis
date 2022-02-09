
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
var original_rank_width
var original_square_height
var lock_w = true
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

metric_occurrences_list = []

function drawSingleDanger(t,type){ //t=c,s,n type=critical,sus,neutral
    d3.select("#FO_squares_div_"+t).selectAll("svg").remove()
    d3.select("#rightside").style("width","326px")
    d3.select("#FO_score_div_"+t).style("margin-right","20px")
    //*DRAW NEUTRAL
    if(t =="n") {
        drawNeutral(t)
        return
    }
    //*CRIT E SUS
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
        d3.select("#summa_"+type+"_div").style("visibility","visible").style("font-size","13px")
        d3.select("#summa_expand_"+t).style("visibility","visible")
  
        list_fo.system.forEach((fo, index) => {
            
            var fo_name = d3.select("#FO_name_div_"+t).append("span").text(fo.hid).attr("class","div_column").attr("id",fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_"))
            fo_name.style("opacity",0).transition().duration(600).style("opacity",1)
            fo_name.style("height","23.8px")
            //*con click destro rimuovi approved or not
            fo_name.on("contextmenu", function(data, index) {
                d3.event.preventDefault();
                d3.select(this).selectAll("*").transition().duration(300).style("opacity","0").remove()
                delete approved_or_not[d3.select(this).attr("id")] 
            });

            //*details for every fo
            fo_name.on("click",function(d){
                nodes= d3.select("#FO_name_div_"+t).node().childNodes
                for (let index = 0; index < nodes.length; index++) {
                    const node = nodes[index];
                    if(d3.select(node).attr("id") == fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_")){
                        createDetailsdiv(fo,t,index)
                    }
                }
            })
            //*hovering on swc,exm,sun
            fo_name.on("mouseover",function(d){
                connectWithBp(fo.hid,"mouseover")
                connectWithSc(fo.hid,"mouseover")
                connectWithSun(fo.uid,"mouseover")
                
            })
            fo_name.on("mouseout",function(d){
                connectWithBp(fo.hid,"mouseout")
                connectWithSc(fo.hid,"mouseout")
                connectWithSun(fo.uid,"mouseout")

            })
            total = fo.overall
            if(fo.packed) total = "PCKD"
            d3.select("#FO_score_div_"+t).append("text").text(total).attr("class","div_column overall").attr("id",fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_"))
                .style("opacity",0)
                .transition().duration(600)
                .style("opacity",1)
            if(total>99 || total == "PCKD") d3.select("#FO_score_div_"+t).style("margin-right","0px")
            
            var svg_rect = d3.select("#FO_squares_div_"+t).append("svg").attr("id",fo.uid).attr('height',  fo_name.style("height"))
            rect_dim = parseFloat(fo_name.style("height")).toFixed(2) - 3
            //* rect spawn
            d3.select("#"+type+"_div").style("max-height",(22*rect_dim)+"px")
            d3.select("#FO_titles_div_"+t).style("height",rect_dim+"px")
            //* rect loop
            var pad = 5
            var x_rect=pad
            for (let i = 0; i < Object.keys(fo).length; i++) {
                item = Object.keys(fo)[i]
                // console.log(fo)
                if(item!="hid" && item != "uid" && item != "overall" && item != "packed"){
                    if(index==0) d3.select("#FO_titles_div_"+t).append("text").text(item).attr("class","acronym_title")
                    if(fo[item] > 0 && item != "EXM") metric_occurrences[item]++
                    else if( fo[item] == 0 && item == "EXM" ) metric_occurrences[item]++
                    stroke_color = '#000000a6'
                    svg_rect.append('rect')
                    .attr('stroke-width', '2px')
                    .attr('fill', function(d){
                        if(fo.packed) return "#ffffff00"
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
                    // .on("mouseover",function(d){
                        
                    //     d3.select("body")
                    //         .append("div").attr("id","tcd")
                    //         .style("visibility", "visible")
                    //         .attr("class", "tooltip_sw_comp_critical")
                    //         .style('left', (d3.event.clientX) + 'px')
                    //         .style('top',(d3.event.clientY-15)+"px")
                    //         .append("span").text(" ")
                    //         .style("opacity","0")
                    //         .style("font-size","11px")
                    //         .transition().duration(500)
                    //         .style("opacity","1")
                            
                    //     })
                    // .on("mouseleave",function(d){
                    //     d3.selectAll("#tcd")
                    //     .transition().duration(500)
                    //     .style("opacity","0").remove()
                    // })
                    // .on("click",clicked)
                    .transition().duration(600)
                    .attr("x",x_rect)
                    .attr('width', rect_dim)
                    .attr('height', rect_dim)
                    .attr("max-height",original_square_height)
                    
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
        d3.select("#FO_name_div_"+t).append("span").text(name_div)
            .style("height",d3.select("#FO_titles_div_"+t).style("height"))
            .style("width",d3.select("#FO_titles_div_"+t).style("width"))
            .style("color",color)
            .style("text-align","end")
            .lower() 
            .attr("class","no_search")
        d3.select("#FO_score_div_"+t).append("span").text("placeholder")
            .style("height",d3.select("#FO_titles_div_"+t).style("height"))
            .style("width","1px")
            .style("visibility","hidden")
            .lower()
            .attr("class","no_search")
        
        // //*accetta
        d3.select("#FO_name_div_"+t).selectAll("span").text(function(d){
            text = d3.select(this).text()
            if(text.length>10){
                text = "..."+text.substring(text.length-10,text.length)
            }
            return text.replace("-","_")
        })

        
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
        var a = type == "sus"? "suspicious": type
        d3.select("#summa_"+type+"_div").append("text").text(list_fo.system.length +" "+ a +" files").style("position","absolute").lower()
    }
        //neutral div width
    else{
        d3.select("#"+type+"_div").style("visibility","hidden")
        d3.select("#summa_"+type+"_div").style("visibility","hidden")
        d3.select("#summa_expand_"+t).style("visibility","hidden")
    }
    if(lock_w)original_rank_width = d3.select("#critical_div").node().getBoundingClientRect().width
    lock_w =false
    d3.select("#critical_div").style("max-width",original_rank_width+"px")
    d3.select("#sus_div").style("max-width",original_rank_width+"px")
    d3.select("#neutral_div").style("max-width",original_rank_width+"px")
    d3.select("#FO_name_div_"+t).style("max-width","100px")
    
    d3.select("#FO_squares_div_"+t).style("margin-top","2px")
    // d3.select("#neutral_div").style("max-width", getDimFloat("critical_div","width")+"px") 
}
//*draw neutral
var lock_neutral = false
var original_w
function drawNeutral(t){
    d3.select("#FO_name_div_"+t).selectAll("*").remove()
    // d3.select("#FO_name_div_"+t).style("min-width",original_rank_width+"px")
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
    
    //creazione search bar
    if(!lock_neutral) original_w = getDimFloat("critical_div","width")
    lock_neutral = true
    d3.select("#rightside").append('textarea').attr("id","search_bar_FO")
    // d3.select("#rightside").append('textarea').attr("id","search_bar_FO").style("width",original_w+"px")
    d3.select("#search_bar_FO").style("width",original_w+"px")

    //expand
    // console.log(original_w)
    d3.select("#others_expand").on("click",function(d){
        console.log(original_w)

        var is_down = d3.select("#others_expand").select("i").attr("class") == "fas fa-caret-down"? true:false
        if(is_down){
            //fill with files
            NEUTRAL_FO.system.forEach(fo => {
                var fo_name = d3.select("#FO_name_div_"+t).append("text").text(fo.hid).attr("class","div_column").attr("id",fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_"))
                fo_name.style("opacity",0).transition().duration(600).style("opacity",1)
                //*details for every fo
                fo_name.on("click",function(d){
                    nodes= d3.select("#FO_name_div_"+t).node().childNodes
                    for (let index = 0; index < nodes.length; index++) {
                        const node = nodes[index];
                        if(d3.select(node).attr("id") == fo.hid.replace(/[/]/g,"_").replace(/[.]/g,"_EXTENSION_")){
                            createDetailsdiv(fo,t,index)
                        }
                    }
                })
                //*rightclick
                fo_name.on("contextmenu", function(data, index) {
                    d3.event.preventDefault();
                    d3.select(this).selectAll("*").transition().duration(300).style("opacity","0").remove()
                    delete approved_or_not[d3.select(this).attr("id")] 
                });
            })
            d3.select("#others_expand").select("i").attr("class","fas fa-caret-up")
            d3.select("#neutral_div").style("overflow-y","auto")
            d3.select("#neutral_div").style("height",getDimFloat("others_txt_and_expand","height")+"px").transition().duration(700).style("height",d3.select("#neutral_div").style("max-height"))
            //dim seatrch bar
            // w = getDimFloat("neutral_div","width")
            // d3.select("#search_bar_FO").transition().duration(1000).style("width",original_w+30+"px")
        }
        else{
            d3.select("#neutral_div").style("overflow-y","hidden")
            d3.select("#neutral_div").transition().duration(700).style("height",getDimFloat("others_txt_and_expand","height")+"px")
            d3.select("#FO_name_div_"+t).selectAll(".div_column").style("opacity",1).transition().duration(600).style("opacity",0).remove()
            d3.select("#others_expand").select("i").attr("class","fas fa-caret-down")
            
            d3.selectAll("#fo_details").remove()
            //dim seatrch bar
            // w = getDimFloat("neutral_div","width")
            // d3.select("#search_bar_FO").transition().duration(1000).style("width",original_w+"px") 
        }
        rememberOknotook()
    })
    rememberOknotook()
}

//*draw histogram when expanded
function summaExpand(rect_dim,t,type){
    var is_down = d3.select("#summa_expand_"+t).select("i").attr("class") == "fas fa-caret-down"? true:false
    if(is_down) {
        drawHistogramSumma(rect_dim,t,type)
        d3.select("#summa_expand_"+t).select("i").attr("class","fas fa-caret-up")
        if(t =="s") d3.select("#neutral_div").style("margin-top","5px")
        if(t =="c") d3.select("#sus_div").style("margin-top","5px")
    }
    else{
        d3.select("#summa_"+type+"_div").select("svg").remove()
        d3.select("#summa_expand_"+t).select("i").attr("class","fas fa-caret-down")
        if(t =="s") d3.select("#neutral_div").style("margin-top","25px")
        if(t =="c") d3.select("#sus_div").style("margin-top","25px")
    }
}
//*draw histogram
function drawHistogramSumma(rect_dim,t,type){
    //console.log(metric_occurrences_list)
    metric_occurrences = metric_occurrences_list[tToIndex(t)]
    let margin = {top: 20, right: 0, bottom: 25, left: 0};
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
    w = getDimFloat("FO_name_div_"+t,"width") + getDimFloat("FO_score_div_"+t,"width") +  parseInt(d3.select("#FO_score_div_"+t).style("margin-right").replace("px",""))
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
        .transition().duration(500)//on transition
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
    svg_histo.selectAll(".axis--x").selectAll("span").style("visibility", "hidden")  
    svg_w = getDimFloat("FO_name_div_c","width") + getDimFloat("FO_score_div_c","width") 

}

