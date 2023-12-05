let textInput = document.querySelector("#name");
let charFormEl = document.querySelector("#character-form");
let recentSearchesOl = document.querySelector("#recent-searches-list");

let previousSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));

if (previousSearchHistory && previousSearchHistory.length > 0) {
  for (let i = 0; i < previousSearchHistory.length && i < 5; i++) {
    var characterItem = document.createElement("li");
    let cased = previousSearchHistory[i].substring(0, 1).toUpperCase() + previousSearchHistory[i].substring(1, previousSearchHistory[i].length);
    characterItem.textContent = cased;
    recentSearchesOl.append(characterItem);
  }
}

function handleSearch(e) {
  e.preventDefault();
  if (textInput.value === "") {
    return;
  }

  if (previousSearchHistory && previousSearchHistory.length > 0) {
    let searchHistory = previousSearchHistory;
    searchHistory.unshift(textInput.value);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  } else {
    let searchHistory = [];
    searchHistory.unshift(textInput.value);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  var superheroSearch = textInput.value;
  superheroSearch = superheroSearch.replace(/\s+/g, "-");
  textInput.value = "";
  window.location = "./details.html?name=" + superheroSearch;
}

charFormEl.addEventListener("submit", handleSearch);

recentSearchesOl.addEventListener("click", function (e) {
  if (e.target && e.target.matches("li")) {
    var superheroSearch = e.target.innerText;
    superheroSearch = superheroSearch.replace(/\s+/g, "-");
    window.location = "./details.html?name=" + superheroSearch;
  }
});
