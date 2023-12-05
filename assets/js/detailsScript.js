var superheroInfoEl = document.getElementById("superhero-info");
var superheroPhotoEl = document.getElementById("superhero-photo");
var animBox = document.querySelector(".animation-box");
var superheroName = document.location.search.split("=")[1];

const url = "https://superhero-api.p.rapidapi.com/search?name=" + superheroName;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7cd0f0dca6mshe9693beb76ef842p1c5499jsn354b7b77a59f",
    "X-RapidAPI-Host": "superhero-api.p.rapidapi.com",
  },
};

async function generateHeroData() {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    var heroData = JSON.parse(result);

    if (heroData.success == false) {
      superheroInfoEl.textContent = "This is not a hero in our database, sending you back!";
      var timer = 2;
      var goBackTimer = setInterval(function () {
        timer--;
        if (timer <= 0) {
          window.location = "./index.html";
        }
      }, 1000);
    }

    // This gets the first result of the heroes list
    var firstHero = heroData.hero[0];
    console.log(firstHero);

    // This will generate the table full of data
    function generateHeroTable(dataSel) {
      // Returns the names of the keys
      var heroKey = Object.keys(firstHero.data[dataSel]);

      // Returns the names of the values
      var heroVal = Object.values(firstHero.data[dataSel]);

      for (var i = 0; i < heroKey.length; i++) {
        var appearanceTable = document.getElementById("superhero-" + dataSel);
        var tableRow = document.createElement("tr");
        var tableCategory = document.createElement("td");
        var tableInfo = document.createElement("td");

        tableCategory.textContent = heroKey[i];
        tableInfo.textContent = heroVal[i];

        tableRow.appendChild(tableCategory);
        tableRow.appendChild(tableInfo);

        appearanceTable.appendChild(tableRow);
      }
    }

    var tablesToMake = ["appearance", "biography", "connections", "powerstats", "work"];

    tablesToMake.forEach((element) => {
      generateHeroTable(element);
    });

    // Get the gif
    var giphyUrl =
      "https://api.giphy.com/v1/gifs/search?api_key=W8T0FQZUb633jY4uGpRiNzr5aB3laRhH&q=" +
      superheroName +
      "&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

    fetch(giphyUrl).then(function (response) {
      if (response.ok) {
        // Add the gif if everything is successful
        response.json().then(function (data) {
          var heroGif = document.createElement("img");
          heroGif.src = data.data[0].images.fixed_height.url;
          heroGif.alt = "Gif of " + superheroName;
          animBox.appendChild(heroGif);
        });
      } else {
        var errMessage = document.createElement("p");
        errMessage.textContent = "Unable to find gif/ server may be down";
        animBox.appendChild(errMessage);
      }
    });
  } catch (error) {
    console.error(error);
    superheroInfoEl.textContent = "Server seems to be down! Sending you back!";
    var timer = 2;
    var goBackTimer = setInterval(function () {
      timer--;
      if (timer <= 0) {
        window.location = "./index.html";
      }
    }, 1000);
  }
}

generateHeroData();
