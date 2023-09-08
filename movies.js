const title = document.getElementById("title");
const searchButton = document.getElementById("search");
const outputField = document.getElementById("display");

// Headers for the api, which includes the API key
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '167c3412aamshb64d89dad04047fp129992jsne5daaa9adb7e',
        'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }
};

// Calls the API and brings the title that the user searched for
async function fetchData() {
    // Removes all previously searched movies
    removeElements();

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
    // Creates a div for each movie and gives the class name "movie"
    // We put this new element below our outputField element
    const div = document.createElement("div");
    div.className = "movie"
    outputField.appendChild(div);

    // Creates a header 4 for each information about the movie
    // All these headers then become children of the previously created div
    const movieTitle = document.createElement("h4");
    movieTitle.textContent = `Movie Title: ${item.title} `;
    div.appendChild(movieTitle);

    const release = document.createElement("h4");
    release.textContent = `Release Year: ${item.released} `;
    div.appendChild(release);

    const genre = document.createElement("h4");
    genre.textContent = `Genre: ${item.genre} `;
    div.appendChild(genre);

    // Each of the headers get the same class, called movieInfo
    movieTitle.className = "movieInfo";
    release.className = "movieInfo";
    genre.className = "movieInfo";
    
    console.log(item);
}

function removeElements() {
    // Selects all elements with the movie class, as an array
    let get = document.querySelectorAll('.movie');

    // Goes through each element and removes them
    get.forEach(element => {
        element.remove();
    });
}

// Calls function once user presses the search button
searchButton.addEventListener("click", fetchData);
