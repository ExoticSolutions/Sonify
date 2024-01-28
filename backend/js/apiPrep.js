export const cleanString = `1a0d264e0c954fe7b2d6257821ba7a16:92dbda80720644bdbf45d2c4470ee47d`;
export const REQUESTS = {
  localLink: "http://127.0.0.1:5500/frontend/HTML/track-lyrics.html",
  generateAccessToken: "https://accounts.spotify.com/api/token",
  featuredPlaylists: "https://api.spotify.com/v1/browse/featured-playlists",
  newAlbums: "https://api.spotify.com/v1/browse/new-releases",
  search: "https://api.spotify.com/v1/search",
  getTrack: "https://api.spotify.com/v1/tracks/",
  getAlbumTracks: "https://api.spotify.com/v1/albums/",
  getArtist: "https://api.spotify.com/v1/artists/",
  getLyrics: "https://api.vagalume.com.br/search.php",
  genuisAUTH: "https://api.genius.com/oauth/token",
  getPlaylistTracks: "https://api.spotify.com/v1/playlists/",
};
export const valgumeKey = "a3a61b0ba68ecafedebb83d4a1db689d";
export const rapidApiHost = "genius-song-lyrics1.p.rapidapi.com";
export const GeniusID =
  "WvFtrSR-2MMZ-29PUhMap65UBhX5XqkPsYXdOE6VmhtJgLtX-huQc5jLT2kbfdZQ";

export const GeniusSecret =
  "AvY43vObDxQvmCTNFMC8BA3l6WZWbz36UL5v8kgmUayy_SCZHmOUkqYw1YYcytyK5cX5JJEcEQtNUmCLLKYKWw";
export function encodeTarget(targetString) {
  return "Basic " + btoa(targetString);
}

export function getAccess(endpoint, encodedToken) {
  console.log(encodeTarget(cleanString));
  fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: encodedToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    //fix grant_type
    body: "grant_type=client_credentials",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      localStorage.setItem("Token", JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      let temp;
      temp = JSON.parse(localStorage.getItem("Token"));
    });
}

export function getToken() {
  return JSON.parse(localStorage.getItem("Token"));
}
