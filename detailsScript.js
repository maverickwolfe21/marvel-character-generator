var superheroInfoEl = document.getElementById("superhero-info");
var superheroPhotoEl = document.getElementById("superhero-photo");

const url = 'https://superhero-api.p.rapidapi.com/search?name=batman';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7cd0f0dca6mshe9693beb76ef842p1c5499jsn354b7b77a59f',
		'X-RapidAPI-Host': 'superhero-api.p.rapidapi.com'
	}
};



async function generateHeroData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        var heroData = JSON.parse(result);
        console.log(heroData);
        var firstHero = heroData.hero[0];
        console.log(firstHero);
        if (heroData.success == false) {
            superheroInfoEl.textContent = "This is not a hero in our database, sending you back!"
            var timer = 2;
            var goBackTimer = setInterval(function () {
                timer--;
                if (timer <= 0) {
                    window.location = "./index.html";
                }
            }, 1000);
            return;
        }

        function generateHeroTable(dataSel) {  
            var heroKey = Object.keys(firstHero.data[dataSel]);
            var heroVal = Object.values(firstHero.data[dataSel]);
            console.log

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

        var tablesToMake = [
            "appearance",
            "biography",
            "connections",
            "powerstats",
            "work"
        ];

        tablesToMake.forEach(element => {
            generateHeroTable(element);
        });

    } catch (error) {
        console.error(error);
        superheroInfoEl.textContent = "Server seems to be down! Sending you back!"
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