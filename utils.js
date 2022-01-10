//*utils 
function tToIndex(t){
    // //? serve a creare un selettore per metric_occurrences ={
    //     "CRY":0,...
    // }
    // metric_occurrences_list[tToIndex(t)] = metric_occurrences
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

function download(uid,contentType){
    var urldw = endpoint+"binary/"+uid
    d3.json(urldw, function(data) {
        //alert("download started");
        var b64 = data.binary
        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
        }
        const blob = b64toBlob(b64, contentType);
        const blobUrl = URL.createObjectURL(blob);
    
        //window.location = blobUrl;
        // // Construct the <a> element
        var link = document.createElement("a");
        link.download = data.file_name
        link.href = blobUrl;
    
        document.body.appendChild(link);
        link.click();
    })
}
