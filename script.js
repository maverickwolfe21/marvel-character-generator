let textInput = document.querySelector("#name");
let recentSearchesOl = document.querySelector("#recent-searches-list");

let previousSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));

if (previousSearchHistory && previousSearchHistory.length > 0) {
  for (let i = 0; i < previousSearchHistory.length && i < 5; i++) {
    var characterItem = document.createElement("li");
    characterItem.textContent = previousSearchHistory[i];
    recentSearchesOl.append(characterItem);
  }
}

function handleSearch() {
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

  var characterItem = document.createElement("li");
  characterItem.textContent = textInput.value;

  recentSearchesOl.prepend(characterItem);
  textInput.value = "";
}

// recentSearchesOl.addEventListener("click", function (e) {
//   if (e.target && e.target.matches("li")) {
//     window.location = "./details.html?name=" + e.target.innerText;
//   }
// });
