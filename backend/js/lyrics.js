import {
  REQUESTS,
  GeniusSecret,
  GeniusID,
  rapidApiHost,
  valgumeKey,
} from "./apiPrep.js";
const trackLyricsElement = document.querySelector(".track-lyric-data");
const artistDataELement = document.querySelector(".artist-data");
console.log(trackLyricsElement);
const targetTrack = JSON.parse(localStorage.getItem("get-lyrics"));
console.log(targetTrack);
console.log(GeniusID);
let trackFound = false;

renderPageElements();

function renderPageElements() {
  getTrackLyrics();
  renderArtistData();
  rednerLyrics();
}

function renderArtistData() {
  let artistDataHTML = "";
  artistDataELement.classList.add("grid");
  artistDataELement.classList.add("grid-rows-1");

  artistDataHTML += `
  <div class="grid grid-cols-2 p-3 gap-10 border border-stone-700">
    <div>
     <img src="${targetTrack.coverArt}" class="album-art"/>
    </div>
    <div class="">
      <div class="flex justify-start gap-1">
      <h1 class="album-name">${targetTrack.track}</h1>
      <h1 class="track-author">by ${targetTrack.artist}</h1>
      </div>
      <div>
       <h1 class="album-name">Released: ${targetTrack.launch}</h1>
       <h1 class="album-name">Sonify Exclusive</h1>

      
      </div>
    </div>
  </div>`;

  artistDataELement.innerHTML += artistDataHTML;
}

function rednerLyrics() {
  let lyricHTML = "";
  const lyrics = JSON.parse(localStorage.getItem("target-track-lyrics"));
  console.log(lyrics);

  lyricHTML = `
  <div class="border border-stone-700">
    <p class="text-white text-center track-lyrics ms-auto me-auto mt-5">
      "${lyrics}"
     </p>
     <p class="track-author flex justify-end me-5">© Vagalume</p>
  </div></br>`;
  trackLyricsElement.innerHTML += lyricHTML;
}

function getTrackLyrics() {
  const endpoint =
    REQUESTS.getLyrics +
    `?art=${encodeURIComponent(targetTrack.artist)}&mus=${encodeURIComponent(
      targetTrack.track
    )}&apikey=${valgumeKey}`;

  console.log(endpoint);

  fetch(endpoint)
    .then(function (resposne) {
      return resposne.json();
    })
    .then(function (data) {
      trackFound = true;
      console.log(data);
      localStorage.setItem(
        "target-track-lyrics",
        JSON.stringify(data.mus[0].text)
      );
    })
    .catch(function (error) {
      trackFound = false;

      console.log(error);
    });
}

//make a custom 404 error element
//idea search for lyrics using the search url for deezer
//obtain the object with the search reseults loop throught the object and finsd the target album extract the id
//use the id to search for the album then search for the track and obtain the track id
