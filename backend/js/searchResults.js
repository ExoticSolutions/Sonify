const results = JSON.parse(localStorage.getItem("search-results"));
const resultsElement = document.querySelector(".search-results");
console.log(results);

renderSearchResults();

function renderSearchResults() {
  createResultsElement();
}

function createResultsElement() {
  resultsHTML = "";

  results.forEach((item) => {
    console.log(item);
    resultsHTML += `
    <div class="border border-stone-700 p-3 ms-5 mt-3">
      <div class="grid grid-cols-2">
        <div>
          <img src="${item.album.images[0].url}" class="album-img"/>
        </div>
        <div class="border">
          <div class="ms-1 flex justify-start gap-1">
            <h1 class="text-white album-name">${item.name}</h1>
            <h1 class="text-white track-author">by ${item.artists[0].name}</h1>
          </div>
          <div>
           <h1 class="album-name">${item.album.release_date}</h1>
           <div class="mt-5 flex justify-center gap-2 link-btn">
             <a type="button" href="${item.external_urls.spotify}" target="_blank">View Track</a>
             <a href="${item.album.external_urls.spotify}" target="_blank">View Album</a>
           </div>
          </div>
        </div>
      </div>
    </div>`;
  });
  resultsElement.innerHTML += resultsHTML;
}
