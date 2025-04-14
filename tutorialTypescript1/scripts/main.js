import { dataSeries } from './dataSeries.js';
// 1. cómo se referencian los objetos del DOM desde el código TS
var seriesTbody = document.getElementById('dataSeries');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalSeasonElm = document.getElementById("avg-seasons");
// 3. cómo se conecta un elemento HTML existente con el código TS
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderSeriesInTable(dataSeries);
totalSeasonElm.innerHTML = "Seasons average: ".concat(getAvgSeasons(dataSeries).toFixed(0));
//Cuando accedes a la propiedad innerHTML de un elemento HTML,
//obtienes o puedes establecer el contenido HTML que está dentro
//de ese elemento, incluidas las etiquetas HTML y su contenido.
// 2. cómo se crean nuevos elementos HTML
function renderSeriesInTable(series) {
    clearSeriesInTable();
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var _a;
        var trElement = document.createElement("tr");
        trElement.innerHTML = "\n      <td>".concat(serie.id, "</td>\n      <td><a href=\"#\" class=\"serie-link\">").concat(serie.name, "</a></td>\n      <td>").concat(serie.studio, "</td>\n      <td>").concat(serie.seasons, "</td>");
        (_a = trElement.querySelector(".serie-link")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarDetalleSerie(serie);
        });
        seriesTbody.appendChild(trElement);
    });
}
// 4. Revisión por parte de los estudiantes
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearSeriesInTable();
    var seriesFiltered = searchSerieByName(text, dataSeries);
    renderSeriesInTable(seriesFiltered);
}
function searchSerieByName(nameKey, series) {
    return nameKey === '' ? dataSeries : series.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getAvgSeasons(series) {
    if (series.length === 0)
        return 0;
    var totalSeasons = 0;
    series.forEach(function (serie) {
        totalSeasons += serie.seasons;
    });
    return totalSeasons / series.length;
}
function mostrarDetalleSerie(serie) {
    var detalle = document.getElementById("detalleSerie");
    detalle.innerHTML = "\n    <div class=\"card mb-3\" style=\"max-width: 540px;\">\n      <div class=\"row g-0\">\n        <div class=\"col-md-4\">\n          <img src=\"".concat(serie.imgurl, "\" class=\"img-fluid rounded-start\" alt=\"").concat(serie.name, "\">\n        </div>\n        <div class=\"col-md-8\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(serie.name, "</h5>\n            <p class=\"card-text\">").concat(serie.description, "</p>\n            <a href=\"").concat(serie.url, "\" class=\"btn btn-primary\" target=\"_blank\">Ver sitio oficial</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  ");
}
function clearSeriesInTable() {
    while (seriesTbody.hasChildNodes()) {
        if (seriesTbody.firstChild != null) {
            seriesTbody.removeChild(seriesTbody.firstChild);
        }
    }
}
