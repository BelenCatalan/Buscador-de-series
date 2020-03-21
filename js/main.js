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
  let clickedId = ev.target.id;
  console.log(clickedId);
  clickedId = parseInt(clickedId);
  let foundSerie;
  for (const favoriteSerie of favorites) {
    if (favoriteSerie.id === clickedId) {
      //si favorito está en el array favoritos lo quito
      foundSerie = favoriteSerie;
      const removefavorite = favorites.indexOf(foundSerie);
      favorites.splice(removefavorite, 1);
      break;
    } else {
      foundSerie = undefined;
    }
  }
  if (foundSerie === undefined) {
    // si no está en favorites
    // busco el el array series el id

    let foundForFavorites;
    for (const itemSeries of series) {
      if (clickedId === itemSeries.id) {
        foundForFavorites = itemSeries;
        favorites.push({
          id: foundForFavorites.id,
          name: foundForFavorites.name,
          image: foundForFavorites.image
        });
      } else {
      }
    }
    // añado todo el objeto al array favorites
  }
  console.log(favorites);
  setInLocalStorage();
}

// function deleteFavoriteArray() {}

// function SetInLocalStorage() {}

// function getFavoritesHtmlCode() {}

// function paintFavorites() {}

// function listenAddFavorites() {}

// function deleteFavorite() {
//   addFavoriteStyle();
//   deleteFavoriteArray();
// }

// function resetFavorites() {}

// function getFromLocalStorage() {}

// getApiSeries();
// paintFavorites();
