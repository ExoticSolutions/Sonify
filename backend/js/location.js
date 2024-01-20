export function getGeoLocation() {
  const API_KEY_IP = "c41b51e9c55c8e0757db672b4bf51b7f778038d086e3c51296b43efa";
  const endpoint = `https://api.ipdata.co?api-key=${API_KEY_IP}`;
  fetch(endpoint, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      localStorage.setItem("country_code", data.country_code);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getCountryCode() {
  return localStorage.getItem("country_code");
}
