
import { Serie } from './serie.js';

import { dataSeries } from './dataSeries.js';

// 1. cómo se referencian los objetos del DOM desde el código TS
let seriesTbody: HTMLElement = document.getElementById('dataSeries')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;

const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalSeasonElm: HTMLElement = document.getElementById("avg-seasons")!;


// 3. cómo se conecta un elemento HTML existente con el código TS
btnfilterByName.onclick = () => applyFilterByName();

renderSeriesInTable(dataSeries);

totalSeasonElm.innerHTML = `Seasons average: ${getAvgSeasons(dataSeries).toFixed(0)}`;
//Cuando accedes a la propiedad innerHTML de un elemento HTML,
                                                          //obtienes o puedes establecer el contenido HTML que está dentro
                                                          //de ese elemento, incluidas las etiquetas HTML y su contenido.

// 2. cómo se crean nuevos elementos HTML
function renderSeriesInTable(series: Serie[]): void {
  clearSeriesInTable();
  console.log('Desplegando series');
  
  series.forEach((serie) => {
    const trElement = document.createElement("tr");
    
    trElement.innerHTML = `
      <td>${serie.id}</td>
      <td><a href="#" class="serie-link">${serie.name}</a></td>
      <td>${serie.studio}</td>
      <td>${serie.seasons}</td>`;

    trElement.querySelector(".serie-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarDetalleSerie(serie);
    });

    seriesTbody.appendChild(trElement);
  });
}

 

 // 4. Revisión por parte de los estudiantes

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearSeriesInTable();
  let seriesFiltered: Serie[] = searchSerieByName(text, dataSeries);
  renderSeriesInTable(seriesFiltered);
}

function searchSerieByName(nameKey: string, series: Serie[]) {
  return nameKey === '' ? dataSeries : series.filter( c => 
    c.name.match(nameKey));
}

function getAvgSeasons(series: Serie[]): number {
  if (series.length === 0) return 0;

  let totalSeasons: number = 0;
  series.forEach((serie) => {
    totalSeasons += serie.seasons;
  });

  return totalSeasons / series.length;
}


function mostrarDetalleSerie(serie: Serie): void {
  const detalle = document.getElementById("detalleSerie")!;
  detalle.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${serie.imgurl}" class="img-fluid rounded-start" alt="${serie.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${serie.name}</h5>
            <p class="card-text">${serie.description}</p>
            <a href="${serie.url}" class="btn btn-primary" target="_blank">Ver sitio oficial</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function clearSeriesInTable() {
  while (seriesTbody.hasChildNodes()) {
    if (seriesTbody.firstChild != null) {
      seriesTbody.removeChild(seriesTbody.firstChild);
     
    }
  }
}