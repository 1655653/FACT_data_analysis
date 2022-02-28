// W_CRYPTO = 30.0
// W_CVE_CRIT = 15.0
// W_CVE_N_CRIT = 10.0
// W_USR_N_PWD = 30.0
// W_EXPLOIT = 1.5
// W_KNOWN_VULN = 5.0
//SCORE_TYPE = "base_score"

old_config = []
function extraDiv(fw){
    var ex_w = getDimFloat("extra_right_side","width")    
    var pad = 10
    var rs_right = getDimFloat("extra_right_side","width") + pad
    d3.select("#rightside").style("right",rs_right+"px")
    rotateLabel("0","90",0)
    d3.select("#parameters_expand").style("visibility","visible")
    d3.select("#param_label").style("visibility","visible")
    d3.select("#parameters_expand").on("click",function(d){
        var is_down = d3.select("#parameters_expand").select("i").attr("class") == "fas fa-caret-right"? true:false
        if(is_down) {//apri tutto
            //sarebbe carina n'animazione
            rotateLabel("90","0",1000)
            d3.select("#appendix").style("flex-direction","row")
            d3.select("#parameters_expand").select("i").attr("class","fas fa-caret-left")
            d3.select("#parameters_container").style("visibility","visible")
            d3.select("#parameters_container").transition().duration(1000).style("width","200px")
            d3.select("#extra_right_side").style("background",EXTRA_DIV_COLOR).style("border","solid 1px")
            //? senza sta parte i parametri overlappano rightside
            // rs_right = getDimFloat("extra_right_side","width") + pad
            // d3.select("#rightside").style("right",rs_right+"px")
            
            
        }
        else{//chiudi tutto
            rotateLabel("0","90",1000)
            d3.select("#appendix").style("flex-direction","column")
            d3.select("#parameters_expand").select("i").attr("class","fas fa-caret-right")
            d3.select("#extra_right_side").style("background",BCKGROUND_COLOR).style("border","none")
            d3.select("#parameters_container").style("visibility","hidden")
            d3.select("#parameters_container").transition().duration(1000).style("width","0px")
            //? senza sta parte i parametri overlappano rightside  
            // rs_right = getDimFloat("extra_right_side","width") + pad
            // d3.select("#rightside").style("right",rs_right+"px")          
        }
    })
    
    //* make extradiv interactive
    extraDivLogic(fw)
}
    
//     //* make extradiv interactive

function extraDivLogic(fw){
    parameters = [W_CRYPTO,W_CVE_CRIT, W_CVE_N_CRIT,SCORE_TYPE,W_USR_N_PWD,W_EXPLOIT,W_KNOWN_VULN,THRESHOLD]
    old_config = parameters
    param_str = ["W_CRYPTO","W_CVE_CRIT", "W_CVE_N_CRIT","SCORE_TYPE","W_USR_N_PWD","W_EXPLOIT","W_KNOWN_VULN","THRESHOLD"]
    d3.select("#parameters_container").selectAll("div").remove("*")
    parameters.forEach((param,index) => {
        par_div = d3.select("#parameters_container").append("div").attr("class","param_div")
        par_div.append("text")
            .attr("class","param_text")
            .text(Labelize(param_str[index].toLowerCase()))
        var max = 100
        var step = 1
        if(index == 1 || index == 2 || index == 5){
            if(index != 5) max = 10
            step = 0.1
        }
        if(index==7){
            CRITICAL_FO.system.forEach(element => {
                max = max<element.overall? element.overall:max
            });
        }
        if(index != 3){ //score_type
            par_div.append("input")
                .attr("type","range")
                .attr("class","slider myslider")
                .attr("id",param_str[index]+"_slider")
                .attr("min",0)
                .attr("max",max)
                .attr("step",step)
                .attr("value",param)
                .on("mousedown",function(){
                    old_config[index]= this.value
                })
                .on("input",function(){
                    d3.select(this).attr("value",this.value)
                    d3.select("#"+param_str[index]+"_value").text(this.value)
                    v = this.value
                    // old_config[index]= window[param_str[index]]
                    window[param_str[index]] = v
                })
                .on("mouseup",function(){
                    v = this.value
                    // old_config[index]= window[param_str[index]]
                    window[param_str[index]] = v

                    rankdanger(fw,SCORE_TYPE) //Riempie DANGER
                    drawDanger(fw)
                    
                    d3.select("#summa_critical_div").select("svg").remove()
                    d3.select("#summa_expand_c").select("i").attr("class","fas fa-caret-down")
                    d3.select("#summa_sus_div").select("svg").remove()
                    d3.select("#summa_expand_s").select("i").attr("class","fas fa-caret-down")
                    d3.select("#others_expand").select("i").attr("class","fas fa-caret-down")
                    d3.select("#neutral_div").transition().duration(700).style("height",getDimFloat("others_txt_and_expand","height")+"px")
                    
                    changeMaxThresh()
                    // d3.select("#apply_params").dispatch("click")
                })
            text_div = par_div.append("div").attr("class","params_text_div")
            text_div.append("text").text("0")
            text_div.append("text").attr("id",param_str[index]+"_value")
                .attr("class","param_text")
                .text(param)
            text_div.append("text").attr("id",param_str[index]+"_max").text(max)
        }
        else{
            score_cont = par_div.append("div").attr("class","radio_toolbar_extradiv")
            buildBtns(score_cont,"base","score_param_btn","radioFruit1")
            buildBtns(score_cont,"impact","score_param_btn","radioFruit1")
            buildBtns(score_cont,"exploitability","score_param_btn","radioFruit1")
            
        }
    });


    bottom = d3.select("#parameters_container").append("div").attr("id","reset_start_container")

    bottom.append("i").attr("class","fa-solid fa-arrow-rotate-left").on("click",function(){
        console.log(old_config)
        for (let index = 0; index < old_config.length; index++) {
            window[param_str[index]] = old_config[index];
        }
        extraDivLogic(fw)
        rankdanger(fw,SCORE_TYPE)
        drawDanger()
    })


    bottom.append("button").text("reset").style("width","fit-content").style("margin-right","10px").on("click",function(d){
        W_CRYPTO = 30.0
        W_CVE_CRIT = 0.2
        W_CVE_N_CRIT = 0.1
        W_USR_N_PWD = 30.0
        W_EXPLOIT = 1.5
        W_KNOWN_VULN = 5.0
        SCORE_TYPE = "base_score"
        THRESHOLD = 25
        extraDivLogic(fw)
        rankdanger(fw,SCORE_TYPE)
        drawDanger()
        rotateLabel("90","0",0)
        changeMaxThresh()

    })
    // bottom.append("button").text("apply").style("width","fit-content").attr("id","apply_params")
    //     .on("click",function(d){
    //         rankdanger(fw,SCORE_TYPE) //Riempie DANGER
    //         drawDanger(fw)
    //         rotateLabel("90","0",0)
    //         d3.select("#parameters_expand").dispatch('click')
            
    //         d3.select("#summa_critical_div").select("svg").remove()
    //         d3.select("#summa_expand_c").select("i").attr("class","fas fa-caret-down")
    //         d3.select("#summa_sus_div").select("svg").remove()
    //         d3.select("#summa_expand_s").select("i").attr("class","fas fa-caret-down")
    //         d3.select("#others_expand").select("i").attr("class","fas fa-caret-down")
    //         d3.select("#neutral_div").transition().duration(700).style("height",getDimFloat("others_txt_and_expand","height")+"px")
    //     })


}

function buildBtns(cont,id,family,name){ //shared with sc component
    cont.append("input")
                .attr("type","radio")   
                .attr("id",id+family)
                .attr("name",name)
    cont.append("label")
                .attr("for",id+family)
                .text(id)
                .on("click",function(d){
                    SCORE_TYPE = id+"_score"
                    if(family == "score_sc_btn") DrawSWComponents()
                })
    
}



function changeMaxThresh(){
    
    var max = 10
    CRITICAL_FO.system.forEach(element => {
        max = max<element.overall? element.overall:max
    });
    d3.select("#THRESHOLD_max").text(max)
}



function Labelize(l){
    switch (l) {
        case "w_crypto":
            return "Crypto Weight"
        case "w_cve_crit":
            return "Critical CVE Weight"
        case "w_cve_n_crit":
            return "Non-critical CVE Weight"
        case "score_type":
            return "Score type"
        case "w_usr_n_pwd":
            return "User-Password Weight"
        case "w_exploit":
            return "Mitigation Weight"
        case "w_known_vuln":
            return "Known Vuln Weight"
        case "threshold":
            return "Threshold"
    }
}