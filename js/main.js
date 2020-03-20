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
        console.log(seriesSearch);
        series.push(seriesSearch);
      }
      console.log(series);
    });
}

btn.addEventListener('click', getApiSeries);
console.log(series);

function getSeriesHtmlCode() {
  let htmlCode = '';
  htmlCode += `<li>`;
  if (serie.image === null) {
    serie.image = '';
  }
  htmlCode += `  <img src="${serie.image}" class="" alt="Serie: ${serie.name}">`;
  htmlCode += `  <h3>${serie.name}</h3>`;
  htmlCode += `  </li>`;

  return htmlCode;
}
// function paintSeries() {}

// function listenAddSeries() {}

// function addFavoriteStyle() {}

// function addFavoriteArray() {}

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
