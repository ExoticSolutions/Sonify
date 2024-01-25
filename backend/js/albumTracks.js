import { REQUESTS } from "./apiPrep.js";
import footerData from "./footer.js";
const albumTopInfoElement = document.querySelector(".main-album-info");
const footerElement = document.querySelector(".footer");
console.log(albumTopInfoElement);
let token = JSON.parse(localStorage.getItem("Token"));
token = token.access_token;
console.log(token);

const selectedAlbumData = JSON.parse(localStorage.getItem("Target-Album"));
const albumID = selectedAlbumData.id;
console.log(selectedAlbumData);
console.log(`Target ID: ${albumID}`);

renderAlbumData();

function renderAlbumData() {
  getAlbumTracks();
  renderAlbumInfo();
  renderFooter();
}

function renderFooter() {
  console.log(footerData);
  footerElement.classList.add("grid");
  footerElement.classList.add("grid-cols-3");
  footerElement.classList.add("text-center");
  let footerHTML = "";
  footerData.forEach((item) => {
    console.log(item);
    footerHTML += `
    <div class="mt-2">
      <h1 class="footer-title">${item.title}</h1>
      <div class="grid grid-rows-4 mt-1">
        <div>
          <a href="#" class="footer-subtext">${item.first}</a>
        </div>
        <div>
          <a href="#" class="footer-subtext">${item.second}</a>
        </div> 
        <div>
          <a href="#" class="footer-subtext">${item.third}</a>
        </div> 
        <div>
          <a href="#" class="footer-subtext">${item.fourth}</a>
        </div>
      </div>
    </div>`;
  });
  footerElement.innerHTML += footerHTML;
}

function getAlbumTracks() {
  const endpoint = REQUESTS.getAlbumTracks + `${albumID}/tracks`;

  fetch(endpoint, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("Target-Album-Tracks", JSON.stringify(data.items));
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderAlbumInfo() {
  const albumTracksData = JSON.parse(
    localStorage.getItem("Target-Album-Tracks")
  );

  const mainAlbumInfo = selectedAlbumData;

  let AlbumInfoHTML = "";

  AlbumInfoHTML = `
  <div class="border border border-stone-800">
   <div class="grid grid-cols-1">
    <div class="border border-stone-800">
    <img src="${mainAlbumInfo.images[0].url}" class="album-art ms-auto me-auto">
    </div>
    <div>
      <div class="grid grid-rows-2">
        <div class="border border-stone-800">
          <h1 class="album-name">${mainAlbumInfo.name}</h1>
          <h1 class="album-author">by ${mainAlbumInfo.artists[0].name}</h1>
        </div>
        <div class="mt-1">
         <h1 class="release-date">Release-date: ${
           mainAlbumInfo.release_date
         }</h1>
         <h1 class="release-date">Tracks: ${albumTracksData.length}</h1>
         <a href="#" class="release-date">Sonify Exclusive</a>
        </div>
      </div>    
    </div>
    <div class="grid grid-rows-auto">
      ${renderAlbumTracks(albumTracksData)}
    </div>
   </div>

  </div>`;
  albumTopInfoElement.innerHTML = AlbumInfoHTML;
  console.log(albumTracksData.length);
}

function renderAlbumTracks(targetData) {
  let albumTracksHTML = "";
  let trackNumber = 1;

  targetData.forEach((data) => {
    console.log(data);
    albumTracksHTML += `
    <div class="border border-stone-800 py-1 px-2">
      <a href="track-lyrics.html" class="track-name" data-name="${data.name}" data-artist="${data.artists[0].name}">${trackNumber}. ${data.name}</a>
    </div>`;
    ++trackNumber;
  });

  return albumTracksHTML;
}

document.querySelectorAll(".track-name").forEach((item) => {
  item.addEventListener("click", function () {
    const trackName = item.dataset.name;
    const artistName = item.dataset.artist;
    console.log(trackName);
    let targetTrackData = {
      albumID: selectedAlbumData.id,
      track: trackName,
      Album: selectedAlbumData.name,
      artist: artistName,
    };

    console.log(selectedAlbumData);

    localStorage.setItem("get-lyrics", JSON.stringify(targetTrackData));
  });
});
