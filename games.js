const loadGames = document.getElementById("loadGame");
const content = document.getElementById("gameContent");
const url = 'https://epic-free-games.p.rapidapi.com/epic-free-games';
const ApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4099ab78f2msh0eb22cfce6cef26p1cbbd7jsn21da45057ae1',
        'X-RapidAPI-Host': 'epic-free-games.p.rapidapi.com'
    }
};

async function GetData() {
    remove();
    try {
        const response = await fetch(url, ApiOptions);
        const result = await response.json(); // Use response.json() to parse JSON directly
        console.log(result);

        // Loop through the games and call UpdateHTML() for each game
        result.forEach(item => {
            UpdateHTML(item);
        });

    } catch (error) {
        console.error(error);
    }
}

function UpdateHTML(item) {
    const div = document.createElement("div");
    div.className = "game";
    content.appendChild(div);

    const name = document.createElement("h2");
    name.className = "gameName";
    name.textContent = item.name;
    div.appendChild(name);

    const price = document.createElement("h2");
    price.className = "gamePrice";
    const decimalPrice = item.originalPrice / 100;
    price.textContent = `Original price: ${decimalPrice} ${item.currencyCode}`;
    div.appendChild(price);

    const image = document.createElement("img");
    image.src = item.offerImageTall;
    image.width = 400;
    image.height = 500;
    image.className = "gameImage";
    div.appendChild(image);
}

function remove() {
    // Selects all elements with the game class, as an array
    let get = document.querySelectorAll('.game');

    // Goes through each element and removes them
    get.forEach(element => {
        element.remove();
    });
}

// Calls function once user presses the load button
loadGames.addEventListener("click", GetData);
