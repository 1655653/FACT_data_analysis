function convertSWCtoVolin(){
    new_dataset = []
    SW_COMP_CVE.forEach(element => {
        all_cve_objs = cve_count(element,SCORE_TYPE)
        element.uid_affected.forEach(uid => {
            all_cve_objs.forEach(cve => {
                var el = {
                    "uid":uid,
                    "hid": ALL_REST_RESPONSE[uid].hid,
                    "score": cve[SCORE_TYPE],
                    "cve_name":cve.cve_code,
                    "cpe_name":element.cpe_name
                }
                if(! SW_COMP_HIDE.includes(el.cpe_name)) new_dataset.push(el)
            });
        });

    });
    console.log(new_dataset)


    //*sorto come voglio io
    SW_COMP_CVE_LIGHT.sort((a,b) => {
        //rank first by max value
        var max_a = 0
        var max_b = 0
        new_dataset.forEach(element => {
            if(element.cpe_name == a && max_a < element.score) max_a = element.score
            if(element.cpe_name == b && max_b < element.score) max_b = element.score
        });
        return max_a > max_b ? -1 : 1
        
    })
    ALL_SWC.sort((a,b) => {
        //rank first by max value
        var max_a = 0
        var max_b = 0
        new_dataset.forEach(element => {
            if(element.cpe_name == a && max_a < element.score) max_a = element.score
            if(element.cpe_name == b && max_b < element.score) max_b = element.score
        });
        return max_a > max_b ? -1 : 1
    })

    return new_dataset
}
function collectSWC(sc){
    for (const key in sc) {
        if (Object.hasOwnProperty.call(sc, key)) {
            const element = sc[key];
            ALL_SWC.push(key)
        }
    }
    
    for (let i = 0; i < SW_COMP_CVE.length; i+=10) {
        const n_trimmed = SW_COMP_CVE[i].cpe_name.replace("(CRITICAL)","").trim();
        const n = SW_COMP_CVE[i].cpe_name
        if(! SW_COMP_CVE_LIGHT.includes(n)) SW_COMP_CVE_LIGHT.push(n)
        if(n.includes("(CRITICAL)")) {
            index = ALL_SWC.indexOf(n_trimmed)
            ALL_SWC[index] += " (CRITICAL)"
        }
    }

    SWC_ARRAY = SW_COMP_CVE_LIGHT //starts violin with this config

}