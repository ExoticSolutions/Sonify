import { REQUESTS } from "./apiPrep.js";
const playlistInfoElement = document.querySelector(".playlist-info");
const targetPlaylist = JSON.parse(localStorage.getItem("target-playlist"));
const playlistTracks = JSON.parse(
  localStorage.getItem("target-playlist-tracks")
);
console.log(targetPlaylist);

console.log(REQUESTS);

renderPlaylistTracks();

function renderPlaylistTracks() {
  renderInfo();
}

function renderInfo() {
  playlistInfoElement.classList.add("grid");
  playlistInfoElement.classList.add("grid-rows-3");
  playlistInfoElement.classList.add("border");
  let infoHTML = "<div>hello</div>";
  console.log(playlistTracks);

  infoHTML = `
  <div class="text-center">
    <img src="${targetPlaylist.url}" class="playlist-art ms-auto me-auto"/>
    <h1>${targetPlaylist.name}</h1>
  </div>`;

  playlistInfoElement.innerHTML += infoHTML;
}
