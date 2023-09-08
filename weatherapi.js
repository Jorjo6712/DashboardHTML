const weatherContent = document.getElementById("weatherContent");
const loadWeatherData = document.getElementById("loadWeatherData");


function apiFetchData() {
    const request = new XMLHttpRequest();

    var locationInput = loadWeatherData.value; 

    const apiKey = "1959fdf3f11c80e464902d618594bedc";

    request.open("GET", `http://api.weatherstack.com/current?access_key=${apiKey}&query=${locationInput}`);

    request.send();

    request.onload = () => {
        if (request.status === 200) {
            // Parse text response to json and output to console
            var apiResponse = JSON.parse(request.responseText);

                // Selects all elements with the game class, as an array
            let get = document.querySelectorAll('.weatherDiv');
            
                // Goes through each element and removes them
            get.forEach(element => {
                element.remove();
            });

            const div = document.createElement("div");
            div.className = "weatherDiv"
            weatherContent.appendChild(div);

            // Output variables to HTML, by creating elements
            const icon = document.createElement("img");
            const time = document.createElement("h2");
            const location = document.createElement("h2");
            const description = document.createElement("h2");
            const temperature = document.createElement("h2");
            const feelslike = document.createElement("h2");
            const wind = document.createElement("h2");
            const uv = document.createElement("h2");
            const humidity = document.createElement("h2");
            const visibility = document.createElement("h2");

            // Gives values to variables, from the API
            location.textContent = `Location: ${apiResponse.location.country}, ${apiResponse.location.name}`;
            time.textContent = `Time measured: ${apiResponse.location.localtime}`;
            temperature.textContent = `Temperature: ${apiResponse.current.temperature}°`;
            icon.src = apiResponse.current.weather_icons;
            icon.className = "weatherIcon";
            wind.textContent = `Wind: ${apiResponse.current.wind_speed} mph`;
            visibility.textContent = `Visibility: ${apiResponse.current.visibility} km`;
            feelslike.textContent = `Feels like: ${apiResponse.current.feelslike}°`;
            humidity.textContent = `Humidity: ${apiResponse.current.humidity}%`;
            description.textContent = apiResponse.current.weather_descriptions;
            uv.textContent = `UV index: ${apiResponse.current.uv_index}`;
            

            // Make each element a child of the div called weatherContent
            div.appendChild(icon);
            div.appendChild(time);
            div.appendChild(location);
            div.appendChild(description);
            div.appendChild(temperature);
            div.appendChild(feelslike);
            div.appendChild(wind);
            div.appendChild(uv);
            div.appendChild(humidity);
            div.appendChild(visibility);
            
        } else {
            console.error('Failed to fetch weather data');
        }
    }
}

loadWeatherData.onblur(apiFetchData);