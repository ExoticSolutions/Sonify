import { cleanString } from "./apiPrep.js";
import { REQUESTS } from "./apiPrep.js";
import { encodeTarget } from "./apiPrep.js";
import { getAccess } from "./apiPrep.js";
import { getToken } from "./apiPrep.js";
import { getCountryCode, getGeoLocation } from "./location.js";
alert(window.innerWidth);
import footerData from "./footer.js";
const featuredPlaylistsElement = document.querySelector(
  ".featured-playlist-data"
);
const newAlbumsElement = document.querySelector(".new-albums-data");
const footerElement = document.querySelector(".footer");
const searchBarBoxElement = document.querySelector(".search-bar-box");
const searchBarBtnElement = document.querySelector(".search-bar-btn");
console.log(newAlbumsElement);
console.log(featuredPlaylistsElement);
let COUNTRY_CODE = getCountryCode();
console.log(`Country: ${COUNTRY_CODE}`);

const encoded = encodeTarget(cleanString);

getAccess(REQUESTS.generateAccessToken, encoded);
let accessToken = getToken();
accessToken = accessToken.access_token;
console.log(accessToken);
console.log(`AAA: ${accessToken}`);
console.log(encoded);

console.log(accessToken);
getGeoLocation();
initializeRender();

searchBarBoxElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getSearchInput();
  }
});

searchBarBtnElement.addEventListener("key", function (event) {
  getSearchInput();
});

function getSearchInput() {
  const value = searchBarBoxElement.value;
  searchInput(value);
}

function searchInput(targetSearch) {
  const endpoint = REQUESTS.search;
  console.log(targetSearch);
  fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function initializeRender() {
  getRegionFeaturedPlaylists();
  renderRegionPlaylists();

  getNewAlbums();
  renderNewAlbums();

  renderFooter();
}

function renderFooter() {
  footerElement.classList.add("grid");
  footerElement.classList.add("grid-cols-3");
  footerElement.classList.add("text-center");
  footerElement.classList.add("mt-2");
  let footerHTML = "";

  footerData.forEach((footerItem) => {
    console.log(footerItem);
    footerHTML += `
    <div class="grid grid-rows-5 ">
      <div>
        <h1 class="footer-section-title">${footerItem.title}</h1>
      </div>
      <div>
       <a href="#" class="footer-section-subtext">${footerItem.first}</a>
      </div>
      <div>
        <a href="#" class="footer-section-subtext">${footerItem.second}</a>
      </div>
      <div>
        <a href="#" class="footer-section-subtext">${footerItem.third}</a>
      </div>
      <div>
        <a href="#" class="footer-section-subtext">${footerItem.fourth}</a>
      </div>
    </div>`;
  });

  footerElement.innerHTML = footerHTML;
}

function getNewAlbums() {
  const endpoint = REQUESTS.newAlbums;

  fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.albums.items);
      localStorage.setItem("New-Albums", JSON.stringify(data.albums.items));
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderNewAlbums() {
  const newAlbumsData = JSON.parse(localStorage.getItem("New-Albums"));
  let newAlbumsHTML = "";
  let iteration = 0;
  console.log(newAlbumsData);

  newAlbumsData.forEach((albumItem) => {
    console.log(albumItem);
    newAlbumsHTML += `
    <div class="swiper-slide">
      <img src="${albumItem.images[0].url}" alt="${albumItem.artists[0].name}" class=""/>
    </div>`;
  });

  newAlbumsElement.innerHTML = newAlbumsHTML;
}

function getRegionFeaturedPlaylists() {
  const endpoint = REQUESTS.featuredPlaylists;
  const AUTH = fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const targetData = data.playlists.items;
      console.log(data.playlists.items);
      localStorage.setItem(
        "Featured-Region-Playlists",
        JSON.stringify(targetData)
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderRegionPlaylists() {
  const featuredPlaylistData = JSON.parse(
    localStorage.getItem("Featured-Region-Playlists")
  );

  mapPlaylistContent(featuredPlaylistData);
}

function mapPlaylistContent(targetData) {
  console.log(targetData);
  let mappedDataHTML = "";

  targetData.forEach((playlistItem) => {
    console.log(playlistItem.images[0].url);
    mappedDataHTML += `
    <div class="swiper-slide">
     <img src="${playlistItem.images[0].url}" alt="" />
    </div>`;
  });

  featuredPlaylistsElement.innerHTML = mappedDataHTML;
}
