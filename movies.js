const title = document.getElementById("title");
const searchButton = document.getElementById("search");
const outputField = document.getElementById("display");
let resultArray;
// Headers for the api, which includes the API key
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4099ab78f2msh0eb22cfce6cef26p1cbbd7jsn21da45057ae1',
        'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }
};

// Calls the API and brings the title that the user searched for
async function fetchData() {
    const url = `https://ott-details.p.rapidapi.com/search?title=${title.value}&page=1`;
    try {
        // Gets the data from the api
        const response = await fetch(url, options);
        const textResult = await response.text();
        const result = JSON.parse(textResult);
        console.log(result);

        // Calls the update function 5 times, which are the 5 most recent movies with a matching name
        for (let i = 0; i < 5; i++) {
            const item = result.results[i];
            update(item);
        }
    } catch (error) {
        console.error(error);
    }
}

// Creates html elements to display information for the results
function update(item) {
    const div = document.createElement("div");
    div.className = "movie"
    outputField.appendChild(div);

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = `Movie Title: ${item.title} `;
    div.appendChild(movieTitle);

    const release = document.createElement("h4");
    release.textContent = `Release Year: ${item.released} `;
    div.appendChild(release);

    const genre = document.createElement("h4");
    genre.textContent = `Genre: ${item.genre} `;
    div.appendChild(genre); 

    movieTitle.className = "movieInfo";
    release.className = "movieInfo";
    genre.className = "movieInfo";

    console.log(item);
}

// Calls function once user presses the search button
searchButton.addEventListener("click", fetchData);
