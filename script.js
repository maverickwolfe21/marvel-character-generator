let textInput = document.querySelector("#name");
let recentSearchesOl = document.querySelector("#recent-searches-list");

let previousSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));

if (previousSearchHistory && previousSearchHistory.length > 0) {
  for (let i = 0; i < previousSearchHistory.length; i++) {
    var characterItem = document.createElement("li");
    characterItem.textContent = previousSearchHistory[i];
    recentSearchesOl.append(characterItem);
  }
}

function handleSearch() {
  if (previousSearchHistory && previousSearchHistory.length > 0) {
    let searchHistory = previousSearchHistory;
    searchHistory.push(textInput.value);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  } else {
    let searchHistory = [];
    searchHistory.push(textInput.value);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  var characterItem = document.createElement("li");
  characterItem.textContent = textInput.value;

  recentSearchesOl.append(characterItem);
}
