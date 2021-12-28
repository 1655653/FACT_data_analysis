
/*/		P --> Plain_cred = [0,1] * weight_p
	E -->  Exploit_mitiga_enabled = [0,1] * #expl * w_exp_m /// se un fo ha piu mitigation è piu sicuro di altre
	Cry  -->  Crypto = [0,1] * w_cry
	CVE  -->  Cve (score parametrico) = ( ∑ [1,10] * i-th_cve ) * w_CVE
P+Cry+CVE-E
Tutti i packed vanno tra i suspicious*/
EXM_FILL = "#83cd4b"
AAA_FILL = "#c80003"
function rankdanger(fw,score){
    dangerous_fo = []
    for (const uid in ALL_REST_RESPONSE) {
        if (Object.hasOwnProperty.call(ALL_REST_RESPONSE, uid)) {
            const element = ALL_REST_RESPONSE[uid];
            rankdanger_single(fw,uid,score,dangerous_fo) //Riempie DANGER
        }
    }
    dangerous_fo.sort(function(a, b) { 
        return b.overall - a.overall;
    })
    DANGER.system = dangerous_fo
}
function rankdanger_single(fw,uid,score,dangerous_fo){
    var CRYPTO = 0
    var cripto = fw.analysis.crypto_material.summary
    for (const key in cripto) {
        if (Object.hasOwnProperty.call(cripto, key)) {
            const element = cripto[key];
            element.forEach(e => {
                if(e==uid) CRYPTO +=  W_CRYPTO
            });
        }
    }
    var USR_N_PWD = 0
    var usr_pwd = fw.analysis.users_and_passwords.summary
    for (const key in usr_pwd) {
        if (Object.hasOwnProperty.call(usr_pwd, key)) {
            const element = usr_pwd[key];
            element.forEach(e => {
                if(e==uid) USR_N_PWD += W_USR_N_PWD
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
    EXPLOIT *= W_EXPLOIT

    var CVE = 0
    var cpe = SW_COMP_CVE
    cpe.forEach(e => {
        var w_cve = e.cpe_name.split(" ")[0] =="(CRITICAL)"? W_CVE_CRIT:W_CVE_N_CRIT
        e.uid_affected.forEach(u => {
            if(u==uid) {
                CVE+= e[score]* cve_count(e,SCORE_TYPE).length / w_cve
                //console.log(e)
            }
        });
    });


    var KNOWN_VULN = 0
    var known_vuln = fw.analysis.known_vulnerabilities.summary
    if(Object.entries(known_vuln).length != 0) KNOWN_VULN = W_KNOWN_VULN
    var overall = parseFloat((CRYPTO+CVE+USR_N_PWD+KNOWN_VULN-EXPLOIT).toFixed(1))
    if(overall > 0){
        // console.log(ALL_REST_RESPONSE[uid])
        // console.log(uid+"  CRYPTO  "+CRYPTO +"  USR_N_PWD  "+USR_N_PWD +"  EXPLOIT  "+EXPLOIT +"  CVE  "+CVE )
        el = {
            "uid":uid,
            "hid":ALL_REST_RESPONSE[uid].hid,
            "CRY":CRYPTO,
            "CVE":CVE,
            "UPW":USR_N_PWD,
            "EXM":EXPLOIT,
            "KVU":KNOWN_VULN,
            "overall": overall
        }
        dangerous_fo.push(el)
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
    var rect_dim
    DANGER.system.forEach((fo, index) => {
        //* tooltip
        var tooltip_rect
        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
            tooltip_rect = d3.select("#FO_squares_div")
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
        var fo_name = d3.select("#FO_name_div").append("text").text(fo.hid).attr("class","div_column")
        fo_name.style("opacity",0).transition().duration(2500).style("opacity",1)
        d3.select("#FO_score_div").append("text").text(fo.overall).attr("class","div_column overall").style("opacity",0).transition().duration(2500).style("opacity",1)
        
        //* rect spawn
        var svg_rect = d3.select("#FO_squares_div").append("svg").attr("id",fo.uid).attr('height',  fo_name.style("height"))
        rect_dim = parseFloat(fo_name.style("height")).toFixed(2) - 3
        d3.select("#critical_div").style("height",(11*rect_dim)+"px")
        d3.select("#FO_titles_div").style("height",rect_dim+"px")
        
        var pad = 5
        var x_rect=pad
        for (let i = 0; i < Object.keys(fo).length; i++) {
            item = Object.keys(fo)[i]
            if(item!="hid" && item != "uid" && item != "overall"){
                if(index==0) d3.select("#FO_titles_div").append("text").text(item).attr("class","acronym_title")
                if(fo[item] > 0) metric_occurrences[item]++
                stroke_color = '#000000a6'
                svg_rect.append('rect')
                .attr('stroke-width', '2px')
                .attr('fill', function(d){
                    if(fo[item] > 0 && item!="EXM") {
                        stroke_color = AAA_FILL
                        return stroke_color
                    }
                    else if(fo[item] > 0 && item=="EXM") {
                        stroke_color = EXM_FILL
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
    d3.select("#critical_div").style("border-style", "solid") //appears

    d3.select("#FO_squares_div").style("width",d3.select("#FO_titles_div").style("width"))
    
    //*per far spazio ai titoli
    d3.select("#FO_name_div").append("text").text("CRITICAL").style("height",d3.select("#FO_titles_div").style("height")).style("width",d3.select("#FO_titles_div").style("width")).style("color","red").style("text-align","end").lower() 
    d3.select("#FO_score_div").append("text").text("placeholder").style("height",d3.select("#FO_titles_div").style("height")).style("width","1px").style("visibility","hidden").style("font-size","10px").lower()
    
    //*accetta
    d3.select("#FO_name_div").selectAll("text").text(function(d){
        text = d3.select(this).text()
        wi_text = d3.select(this).style("width")
        wi_div = d3.select("#FO_name_div").style("width")
        if(text.length>15){
            text = text.substring(text.length-15,text.length)
        }
        return text
    })
    console.log(metric_occurrences)
    
    //* draw istogramma 
    d3.select("#summa_expand").style("visibility","visible")
    summaExpand(rect_dim)
    d3.select("#summa_expand").on("click",function(d){
        summaExpand(rect_dim)
    })
    //* text total files
    d3.select("#summa_critical_div").append("text").text("Found "+ DANGER.system.length +" critical files").style("position","absolute").lower()

    //*extradiv con tutti gli slider
    d3.select("#parameters_expand").style("visibility","visible")
    d3.select("#parameters_expand").on("click",function(d){
        var is_down = d3.select("#parameters_expand").select("i").attr("class") == "fas fa-caret-right"? true:false
        if(is_down) {
           //sarebbe carina n-animazione
            d3.select("#parameters_container").style("display","block")
            d3.select("#parameters_expand").select("i").attr("class","fas fa-caret-left")
        }
        else{
            d3.select("#parameters_container").style("display","none")
            d3.select("#parameters_expand").select("i").attr("class","fas fa-caret-right")
        }
    })
    //* make extradiv interactive
    extraDivLogic()
}
//*draw histogram when expanded
function summaExpand(rect_dim){
    pad = 20 //from name
    w = getDimFloat("FO_name_div","width") 
    d3.select("#summa_expand").style("margin-left",(w+pad)+"px")

    var is_down = d3.select("#summa_expand").select("i").attr("class") == "fas fa-caret-down"? true:false
    if(is_down) {
        drawHistogramSumma(rect_dim)
        d3.select("#summa_expand").select("i").attr("class","fas fa-caret-up")
    }
    else{
        d3.select("#summa_critical_div").select("svg").remove()
        d3.select("#summa_expand").select("i").attr("class","fas fa-caret-down")
    }
}
//*draw histogram
function drawHistogramSumma(rect_dim){
    let margin = {top: 20, right: 0, bottom: 15, left: 0};
    let svgWidth = getDimFloat("FO_squares_div","width"), svgHeight = rect_dim*5;
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
    
    let svg_histo = d3.select("#summa_critical_div").append("svg");
    var pad  = 5 //from score
    w = getDimFloat("FO_name_div","width") + getDimFloat("FO_score_div","width")
    svg_histo.style("margin-left",(w+pad)+"px")
    //square_bound = document.getElementById("FO_squares_div").getBoundingClientRect();
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
        .attr("fill",function(d) { return d == "EXM"? EXM_FILL:AAA_FILL})
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
}


//*utils
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