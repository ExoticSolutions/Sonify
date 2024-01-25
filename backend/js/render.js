import { cleanString } from "./apiPrep.js";
import { REQUESTS } from "./apiPrep.js";
import { encodeTarget } from "./apiPrep.js";
import { getAccess } from "./apiPrep.js";
import { getToken } from "./apiPrep.js";
import { getCountryCode, getGeoLocation } from "./location.js";
import footerData from "./footer.js";
const featuredPlaylistsElement = document.querySelector(
  ".featured-playlist-data"
);
const newAlbumsElement = document.querySelector(".new-albums-data");
const testElement = document.querySelector(".test-link");
const topArtistsElement = document.querySelector(".top-artists-data");
console.log(topArtistsElement);
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
  const endpoint =
    REQUESTS.search +
    `?q=${encodeURIComponent(targetSearch)}&type=track&limit=30`;
  console.log(targetSearch);
  console.log(encodeURIComponent(targetSearch));
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
      localStorage.setItem("search-results", JSON.stringify(data.tracks.items));
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

  const artistsData = getRelevantArtists();
  renderArtistsElement(artistsData);

  renderFooter();
}

function renderArtistsElement(artistCollection) {
  let mock = [];
  console.log(artistCollection);

  artistCollection.forEach((item) => {
    const endpoint = REQUESTS.getArtist + `${item.artist_id}`;
    console.log(endpoint);

    fetch(endpoint, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        mock.push(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        localStorage.setItem("artists-data", JSON.stringify(mock));
      });
  });
  //try to localstorage the artists data
  appendArtistElement();
}

function appendArtistElement() {
  let artistHTML = "";
  //we will generate the elements in this function the artistsdata with the artists images
  const endpoint = REQUESTS.getArtist;
  const artistsData = JSON.parse(localStorage.getItem("artists-data"));
  console.log(artistsData);

  artistsData.forEach((item) => {
    console.log(item.name);
    artistHTML += `
    <div class="swiper-slide" class="w-full h-full">
       <div class="">
         <a href="#" class="w-full h-full">
           <img src="${item.images[0].url}" class="w-full h-full"/>
         </a>
       </div>
    </div>`;
  });
  topArtistsElement.innerHTML += artistHTML;
}

function getRelevantArtists() {
  const artistSpecificData = [];
  const targetData = JSON.parse(localStorage.getItem("New-Albums"));
  console.log(targetData);

  targetData.forEach((item) => {
    console.log(`Artists ID: ${item.artists[0].id}`);
    artistSpecificData.push({
      artist_id: item.artists[0].id,
      artist_name: item.artists[0].name,
    });
  });
  return artistSpecificData;
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
       <a href="track.html" class="Album-img" data-id="${albumItem.id}">
         <img src="${albumItem.images[0].url}" alt="${albumItem.artists[0].name}" class=""/>
       </a>
    </div>`;
  });

  newAlbumsElement.innerHTML = newAlbumsHTML;
}

document.querySelectorAll(".Album-img").forEach((item) => {
  item.addEventListener("click", function () {
    console.log(`clicked`);
    const targetAlbums = JSON.parse(localStorage.getItem("New-Albums"));
    console.log(targetAlbums);
    let albumId = item.dataset.id;
    let matchingAlbum;

    targetAlbums.forEach((albumItem) => {
      console.log(albumId);

      if (albumId === albumItem.id) {
        matchingAlbum = albumItem;
        console.log("true");
      }
    });
    console.log(matchingAlbum);

    localStorage.setItem("Target-Album", JSON.stringify(matchingAlbum));
  });
});

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
    mappedDataHTML += `
    <div class="swiper-slide">
      <a href="track.html" >
        <img src="${playlistItem.images[0].url}" alt="" />
      </a>
    </div>`;
  });

  featuredPlaylistsElement.innerHTML = mappedDataHTML;
}
