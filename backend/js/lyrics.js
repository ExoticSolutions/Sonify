import { REQUESTS, Genius } from "./apiPrep.js";
const targetTrack = JSON.parse(localStorage.getItem("get-lyrics"));
console.log(targetTrack);
console.log(Genius);

renderPageElements();

function renderPageElements() {
  getTrackLyrics();
}

function getTrackLyrics() {
  fetch(REQUESTS.getLyrics + `?q=${encodeURIComponent("kendrick lamar")}`, {
    headers: {
      Authorization: "Bearer " + Genius,
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

//make a custom 404 error element
//idea search for lyrics using the search url for deezer
//obtain the object with the search reseults loop throught the object and finsd the target album extract the id
//use the id to search for the album then search for the track and obtain the track id
