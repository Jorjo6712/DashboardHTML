const weatherContent = document.getElementById("weatherContent");

function apiFetchData() {
    const request = new XMLHttpRequest();

    request.open("GET", "http://api.weatherstack.com/current?access_key=1959fdf3f11c80e464902d618594bedc&query=Copenhagen");

    request.send();

    request.onload = () => {
        if (request.status === 200) {
            // Parse text response to json and output to console
            var apiResponse = JSON.parse(request.responseText);
            console.log(apiResponse);

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
            time.textContent = `time measured: ${apiResponse.location.localtime}`;
            temperature.textContent = `Temperature: ${apiResponse.current.temperature}°`;
            icon.src = apiResponse.current.weather_icons;
            wind.textContent = `Wind: ${apiResponse.current.wind_speed}m/s`;
            visibility.textContent = `Visibility ${apiResponse.current.visibility}`;
            feelslike.textContent = `Feels like: ${apiResponse.current.feelslike}°`;
            humidity.textContent = `Humidity: ${apiResponse.current.humidity}%`;
            description.textContent = apiResponse.current.weather_descriptions;
            uv.textContent = `UV index: ${apiResponse.current.uv_index}`;
            console.log(visibility);

            // Make each element a child of the div called weatherContent
            weatherContent.appendChild(icon);
            weatherContent.appendChild(time);
            weatherContent.appendChild(location);
            weatherContent.appendChild(description);
            weatherContent.appendChild(temperature);
            weatherContent.appendChild(feelslike);
            weatherContent.appendChild(wind);
            weatherContent.appendChild(uv);
            weatherContent.appendChild(humidity);
            weatherContent.appendChild(visibility);


            /*
                  var weatherIconImg = new Image();
            
                  weatherIconImg.src = weatherIconUrl;
          
                  weatherDOM[0].appendChild(weatherIconImg);
            
                  var textToShow = 
                  `City: ${city}, 
                  Country: ${country}, 
                  Region: ${region}, 
                  Local Time: ${localtime},
                  Temperature: ${temperature}°, 
                  ${weather_descriptions}, 
                  Wind Speed: ${wind_speed}m/s,
                  Wind Degree: ${wind_degree},
                  Humidity: ${humidity}%,
                  Wind Direction: ${wind_direction},
                  Pressure: ${pressure},
                  Feels like: ${feelslike}°`;
                  
                  weatherDOM[0].textContent = textToShow; */


        } else {
            console.error('Failed to fetch weather data');
        }
    }
}

apiFetchData();