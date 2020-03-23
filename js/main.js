'use strict';

let series = [];
let favorites = [];
let giveUserNameSeries;

const giveNamebyUser = document.querySelector('.js-input-name');
const btn = document.querySelector('.js-btn-search');

//START GET API SERIES
function getApiSeries() {
  series = [];
  let serieByUser = giveNamebyUser.value;
  giveUserNameSeries = serieByUser;

  fetch('http://api.tvmaze.com/search/shows?q=' + giveUserNameSeries)
    .then(response => response.json())
    .then(searchs => {
      for (const search of searchs) {
        let seriesSearch = { id: search.show.id, name: search.show.name, image: search.show.image };
        series.push(seriesSearch);
        paintSeries();
      }
    });
}

btn.addEventListener('click', getApiSeries);
//FINISH GET API SERIES

//START PAINT AND LISTEN SERIES
function getSeriesHtmlCode(serie) {
  let htmlCode = '';
  let inside;
  for (const favorite of favorites) {
    if (favorite.id === serie.id) {
      inside = true;
      break;
    } else {
      inside = false;
    }
  }
  if (inside === true) {
    htmlCode += `<li class="series__list-style favorite__list--serie" id="${serie.id}">`;
  } else {
    htmlCode += `<li class="series__list-style" id="${serie.id}">`;
  }
  if (serie.image === null) {
    htmlCode += `  <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV.'" class="js-add-series series__img" alt="Serie: ${serie.name}" id="${serie.id}">`;
  } else {
    htmlCode += `  <img src="${serie.image.medium}" class="js-add-series series__img" alt="Serie: ${serie.name}" id="${serie.id}">`;
  }
  htmlCode += `  <p class="series__p">${serie.name}</p>`;
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

function listenAddSeries() {
  const seriesAddBtns = document.querySelectorAll('.js-add-series');
  for (const seriesaddBtn of seriesAddBtns) {
    seriesaddBtn.addEventListener('click', addFavoriteArray);
  }
}
//FINISH PAINT AND LISTEN SERIES

//START ADD FAVORITES
function addFavoriteArray(ev) {
  let clickedId = ev.target.id;
  clickedId = parseInt(clickedId);
  let foundSerie;
  for (const favoriteSerie of favorites) {
    if (favoriteSerie.id === clickedId) {
      foundSerie = favoriteSerie;
      const removefavorite = favorites.indexOf(foundSerie);
      favorites.splice(removefavorite, 1);
      break;
    } else {
      foundSerie = undefined;
    }
  }
  if (foundSerie === undefined) {
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
  }
  setInLocalStorage();
  paintFavorites();
  paintSeries();
}
//FINISH ADD FAVORITES

//START PAINT AND LISTEN FAVORITES
function getFavoritesHtmlCode(favorite) {
  let htmlCode = '';
  htmlCode += `<li class="favorites__list--style" id="${favorite.id}">`;
  if (favorite.image === null) {
    htmlCode += `  <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV.'" class="js-add-series favorites__img--small" alt="Serie: ${favorite.name}" id="${favorite.id}">`;
  } else {
    htmlCode += `  <img src="${favorite.image.medium}" class="js-add-series favorites__img--small" alt="Serie: ${favorite.name}" id="${favorite.id}">`;
  }
  htmlCode += `  <p class="favorites__p">${favorite.name}</p>`;
  htmlCode += `  <button class="js-remove-favorite favorites__button" id="${favorite.id}">x</button>`;
  htmlCode += `  </li>`;
  return htmlCode;
}

function paintFavorites() {
  let favoritesCode = '';
  favoritesCode += `<h3>Mis series favoritas<h3>`;
  for (const favorite of favorites) {
    favoritesCode += getFavoritesHtmlCode(favorite);
  }
  favoritesCode += `<button class="js-btn-reset favorites_reset">Reset</button>`;
  const favoritesElements = document.querySelector('.js-favorites-elements');
  favoritesElements.innerHTML = favoritesCode;
  listenAddFavorites();
  listenForReset();
}

function listenAddFavorites() {
  const favoritesAddBtns = document.querySelectorAll('.js-remove-favorite');
  for (const favoritesaddBtn of favoritesAddBtns) {
    favoritesaddBtn.addEventListener('click', deleteFavorite);
  }
  paintSeries();
}
//FINISH PAINT AND LISTEN FAVORITES

//START DELETE FAVORITES
function deleteFavorite(ev) {
  let clickedId = ev.target.id;
  clickedId = parseInt(clickedId);
  let foundSerie;
  for (const favoriteSerie of favorites) {
    if (favoriteSerie.id === clickedId) {
      foundSerie = favoriteSerie;
      const removefavorite = favorites.indexOf(foundSerie);
      favorites.splice(removefavorite, 1);
      break;
    }
  }
  setInLocalStorage();
  paintFavorites();
  paintSeries();
}
//FINISH DELETE FAVORITES
//START RESET FAVORITES
function listenForReset() {
  const listenForReset = document.querySelector('.js-btn-reset');
  listenForReset.addEventListener('click', resetFavorites);
}
function resetFavorites() {
  favorites = [];

  paintFavorites();
  setInLocalStorage();
}
//FINISH RESET FAVORITES

//START SEND AND GET LOCALSTORAGE
const setInLocalStorage = () => {
  const stringifyFavorites = JSON.stringify(favorites);
  localStorage.setItem('favorites', stringifyFavorites);
};
const getFromLocalStorage = () => {
  const localStorageFavorites = localStorage.getItem('favorites');
  if (localStorageFavorites !== null) {
    favorites = JSON.parse(localStorageFavorites);
  }
};
//FINISH SEND AND GET LOCALSTORAGE
getFromLocalStorage();
paintFavorites();
