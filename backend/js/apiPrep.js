export const cleanString = `1a0d264e0c954fe7b2d6257821ba7a16:92dbda80720644bdbf45d2c4470ee47d`;
export const REQUESTS = {
  generateAccessToken: "https://accounts.spotify.com/api/token",
  featuredPlaylists: "https://api.spotify.com/v1/browse/featured-playlists",
  newAlbums: "https://api.spotify.com/v1/browse/new-releases",
  search: "https://api.spotify.com/v1/search",
};
export function encodeTarget(targetString) {
  return "Basic " + btoa(targetString);
}

export function getAccess(endpoint, encodedToken) {
  let accessToken = "";
  let finalToken;

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
