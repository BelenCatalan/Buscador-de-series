'use strict';

let series = [];
let favorites = [];
let giveUserNameSeries;

const giveNamebyUser = document.querySelector('.js-input-name');
const btn = document.querySelector('.js-btn-search');
// console.log(giveNamebyUser);
// console.log(btn);

function getApiSeries(ev) {
  let serieByUser = ev.target.parentElement.querySelector('.js-input-name').value;
  // console.log(serieByUser);
  giveUserNameSeries = serieByUser;

  fetch('http://api.tvmaze.com/search/shows?q=' + giveUserNameSeries)
    .then(response => response.json())
    .then(searchs => {
      console.log(searchs);
      for (const search of searchs) {
        // console.log(search.show.id);
        // console.log(search.show.name);
        // console.log(search.show.image.medium);
        let seriesSearch = { id: search.show.id, name: search.show.name, image: search.show.image };
        // console.log(seriesSearch);
        series.push(seriesSearch);
        paintSeries();
      }
      // console.log(series);
    });
}

btn.addEventListener('click', getApiSeries);
// console.log(series);

function getSeriesHtmlCode(serie) {
  let htmlCode = '';
  htmlCode += `<li class="list__style" id="${serie.id}">`;
  if (serie.image === null) {
    htmlCode += `  <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV.'" class="js-add-series" alt="Serie: ${serie.name}" id="${serie.id}">`;
  } else {
    htmlCode += `  <img src="${serie.image.medium}" class="js-add-series" alt="Serie: ${serie.name}" id="${serie.id}">`;
  }
  htmlCode += `  <p>${serie.name}</p>`;
  htmlCode += `  </li>`;
  return htmlCode;
}
function paintSeries() {
  let seriesCode = '';
  for (const serie of series) {
    seriesCode += getSeriesHtmlCode(serie);
  }
  const seriesElements = document.querySelector('.js-series-elements');
  seriesElements.innerHTML = seriesCode;
  listenAddSeries();
}
// listenAddSeries();
function listenAddSeries() {
  const seriesAddBtns = document.querySelectorAll('.js-add-series');
  console.log(seriesAddBtns);
  for (const seriesaddBtn of seriesAddBtns) {
    seriesaddBtn.addEventListener('click', addFavoriteArray);
  }
}

// function addFavoriteStyle() {}

function addFavoriteArray(ev) {
  debugger;
  const clickedId = ev.target.id;
  console.log(clickedId);
  let foundSerie;
  for (const favoriteSerie of favorites) {
  }
  if (foundSerie === undefined) {
    // si no está en favorites
    // busco el el array series el id
    let foundSeries = findInArray(clickedId, series);
    // añado todo el objeto al array favorites
    favorites.push({
      id: foundSeries.id,
      name: foundSeries.name,
      image: foundSeries.image
    });
  } else {
  }
  console.log(favorites);
}

// function deleteFavoriteArray() {}

const setInLocalStorage = () => {
  const stringifyFavorites = JSON.stringify(favorites);
  localStorage.setItem('favorites', stringifyFavorites);
};

// function getFavoritesHtmlCode() {}

// function paintFavorites() {}

// function listenAddFavorites() {}

// function deleteFavorite() {
//   addFavoriteStyle();
//   deleteFavoriteArray();
// }

// function resetFavorites() {}

const getFromLocalStorage = () => {
  const localStorageFavorites = localStorage.getItem('favorites');
  if (localStorageFavorites !== null) {
    favorites = JSON.parse(localStorageFavorites);
  }
};

// getApiSeries();
// paintFavorites();
