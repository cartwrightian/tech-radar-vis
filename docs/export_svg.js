
// allow saving the generated SVG 

// use via <button id='saveButton' onClick="exportSvg(radar)">Export</button>
// added to the html

async function exportSvg(svgFromDom) {

    var svg = clone(svgFromDom);

    svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');

    var style = document.createElement("style");
    const css = await fetchCss('radar.css');
    style.innerHTML=css;
    svg.appendChild(style);

    const serializer = new XMLSerializer();
    const svgText = serializer.serializeToString(svg);

    const file = new Blob([svgText], {type: 'text/svg'});

    const downloadElement = document.createElement("a");
    const url = URL.createObjectURL(file);

    downloadElement.href = url;
    downloadElement.download = 'radar.svg';

    document.body.appendChild(downloadElement);
    downloadElement.click();
    setTimeout(function() {
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}

function clone(svgNode) {
    const result = svgNode.cloneNode();
    const children = svgNode.childNodes;
    children.forEach(child => {
        const clonedChild = clone(child);
        result.appendChild(clonedChild);
    });
    return result;
}

async function fetchCss(url) {
    const response = await fetch(url);
    const text = response.text();

    return text;
}
