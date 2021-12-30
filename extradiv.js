// W_CRYPTO = 30.0
// W_CVE_CRIT = 15.0
// W_CVE_N_CRIT = 10.0
// W_USR_N_PWD = 30.0
// W_EXPLOIT = 1.5
// W_KNOWN_VULN = 5.0
//SCORE_TYPE = "base_score"

function extraDivLogic(fw){
    parameters = [W_CRYPTO,W_CVE_CRIT, W_CVE_N_CRIT,SCORE_TYPE,W_USR_N_PWD,W_EXPLOIT,W_KNOWN_VULN]
    param_str = ["W_CRYPTO","W_CVE_CRIT", "W_CVE_N_CRIT","SCORE_TYPE","W_USR_N_PWD","W_EXPLOIT","W_KNOWN_VULN"]
    d3.select("#parameters_container").selectAll("div").remove("*")
    parameters.forEach((param,index) => {
        par_div = d3.select("#parameters_container").append("div").attr("class","param_div")
        par_div.append("text")
            .attr("class","param_text")
            .text(param_str[index].toLowerCase())
        var max = 100
        var step = 1
        if(index == 1 || index == 2 || index == 5){
            if(index != 5) max = 10
            step = 0.1
        }
        if(index != 3){ //score_type
            par_div.append("input")
                .attr("type","range")
                .attr("class","slider")
                .attr("id",param_str[index]+"_slider")
                .attr("min",0)
                .attr("max",max)
                .attr("step",step)
                .attr("value",param)
                .on("input",function(){
                    d3.select(this).attr("value",this.value)
                    d3.select("#"+param_str[index]+"_value").text(this.value)
                    v = this.value
                    window[param_str[index]] = v
                })
            par_div.append("text").attr("id",param_str[index]+"_value")
                .attr("class","param_text")
                .text(param)
        }
        else{
            score_cont = par_div.append("div").attr("id","score_container")
            score_cont.append("button").text("base").style("width","fit-content")
            score_cont.append("button").text("impact").style("width","fit-content")
            score_cont.append("button").text("exploitability").style("width","fit-content")
        }
    });
    bottom = d3.select("#parameters_container").append("div").attr("id","reset_start_container")
    bottom.append("button").text("reset").style("width","fit-content").style("margin-right","10px").on("click",function(d){
        W_CRYPTO = 30.0
        W_CVE_CRIT = 0.2
        W_CVE_N_CRIT = 0.1
        W_USR_N_PWD = 30.0
        W_EXPLOIT = 1.5
        W_KNOWN_VULN = 5.0
        SCORE_TYPE = "base_score"
        extraDivLogic()
        rankdanger(fw,SCORE_TYPE)
        drawDanger(fw)
        rotateLabel("90","0",0)
    })
    bottom.append("button").text("apply").style("width","fit-content").on("click",function(d){
        rankdanger(fw,SCORE_TYPE) //Riempie DANGER
        drawDanger(fw)
        rotateLabel("90","0",0)

    })
}
