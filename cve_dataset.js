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
                    "cpe_name":element.cpe_name.replace("(CRITICAL)","").trim()
                }
                if(! SW_COMP_HIDE.includes(el.cpe_name)) new_dataset.push(el)
            });
        });

    });
    //console.log(new_dataset)
    return new_dataset
}
function collectSWC(sc){
    for (const key in sc) {
        if (Object.hasOwnProperty.call(sc, key)) {
            const element = sc[key];
            ALL_SWC.push(key)
        }
    }
    //*sorto come voglio io
    sc_ordered = []
    ALL_SWC.forEach(element => {
        for (let i = 0; i < SW_COMP_CVE.length; i+=10) {
            const n = SW_COMP_CVE[i].cpe_name.replace("(CRITICAL)","").trim();
            if(! SW_COMP_CVE_LIGHT.includes(n)) SW_COMP_CVE_LIGHT.push(n)
            if(n == element && ! sc_ordered.includes(element)) sc_ordered.push(n)
        }
    });
    //TODO da sortare in base al critical

    ALL_SWC.forEach(element => {
        if(! sc_ordered.includes(element)) {
            SW_COMP_NO_CVE.push(element)
            sc_ordered.push(element)
        }
    });
    ALL_SWC = sc_ordered
    SWC_ARRAY = SW_COMP_CVE_LIGHT //starts violin with this config

    // console.log(sc_ordered)
    

}