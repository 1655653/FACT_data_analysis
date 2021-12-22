
/*/		P --> Plain_cred = [0,1] * weight_p
	E -->  Exploit_mitiga_enabled = [0,1] * #expl * w_exp_m /// se un fo ha piu mitigation è piu sicuro di altre
	Cry  -->  Crypto = [0,1] * w_cry
	CVE  -->  Cve (score parametrico) = ( ∑ [1,10] * i-th_cve ) * w_CVE
P+Cry+CVE-E
Tutti i packed vanno tra i suspicious*/
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
                if(e==uid) CRYPTO =  W_CRYPTO
            });
        }
    }
    var USR_N_PWD = 0
    var usr_pwd = fw.analysis.users_and_passwords.summary
    for (const key in usr_pwd) {
        if (Object.hasOwnProperty.call(usr_pwd, key)) {
            const element = usr_pwd[key];
            element.forEach(e => {
                if(e==uid) USR_N_PWD = W_USR_N_PWD
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
    if(CVE > 0 ||USR_N_PWD>0||CRYPTO>0){
        // console.log(ALL_REST_RESPONSE[uid])
        // console.log(uid+"  CRYPTO  "+CRYPTO +"  USR_N_PWD  "+USR_N_PWD +"  EXPLOIT  "+EXPLOIT +"  CVE  "+CVE )
        el = {
            "uid":uid,
            "hid":ALL_REST_RESPONSE[uid].hid,
            "cripto":CRYPTO,
            "cve":CVE,
            "usr_n_pwd":USR_N_PWD,
            "exploit":EXPLOIT,
            "known_vuln":KNOWN_VULN,
            "overall": parseFloat((CRYPTO+CVE+USR_N_PWD+KNOWN_VULN-EXPLOIT).toFixed(1))
        }
        dangerous_fo.push(el)
    }
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

function drawDanger(){
    DANGER.system.forEach(fo => {
        var fo_name = d3.select("#FO_name_div").append("text").text(fo.hid).attr("class","div_column")
        d3.select("#FO_score_div").append("text").text(fo.overall).attr("class","div_column overall")
       
        var svg_rect = d3.select("#FO_squares_div").append("svg").attr("id",fo.uid).attr('height',  fo_name.style("height"))
        var rect_dim = parseFloat(fo_name.style("height")).toFixed(2) - 3
        var pad = 5
        var x_rect=pad
        for (let i = 0; i < 7; i++) {
            svg_rect.append('rect')
            .attr('stroke', 'black')
            .attr('fill', '#69a3b2')
            .transition().duration(1500)
            .attr("x",x_rect)
            .attr('width', rect_dim)
            .attr('height', rect_dim)
            x_rect+= rect_dim + pad
        }
    });
}