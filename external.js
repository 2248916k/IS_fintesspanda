if(typeof(DOMParser) == 'undefined') {
    DOMParser = function() {}
    DOMParser.prototype.parseFromString = function(str, contentType) {
        if(typeof(ActiveXObject) != 'undefined')
        {
            var xmldata = new ActiveXObject('MSXML.DomDocument');
            xmldata.async = false;
            xmldata.loadXML(str);
            return xmldata;
        } else if(typeof(XMLHttpRequest) != 'undefined')
        {
            var xmldata = new XMLHttpRequest;
            if(!contentType) {
            contentType = 'application/xml';
        }
            xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
            if(xmldata.overrideMimeType) {
                xmldata.overrideMimeType(contentType);
            }
            xmldata.send(null);
            return xmldata.responseXML;
        }
    }
}

function loadFile(input, onload_func) {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        balert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText() {
        onload_func(fr.result);
    }
}

