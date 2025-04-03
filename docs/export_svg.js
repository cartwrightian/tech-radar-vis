
// allow saving the generated SVG 

// use via <button id='saveButton' onClick="exportSvg(radar)">Export</button>
// added to the html

function exportSvg(svgFromDom) {

    let css=`.blipText {
        fill: black;
        pointer-events: all;
        }
        .blipText:hover { 
        fill: red;
        }`

    var svg = clone(svgFromDom);

    svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');

    var style = document.createElement("style");
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