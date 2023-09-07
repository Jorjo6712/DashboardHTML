function apiFetchData() {
    const request = new XMLHttpRequest();
    var weatherDOM = document.getElementsByClassName("weatherContent");
  
    request.open("GET", "http://api.weatherstack.com/current?access_key=1959fdf3f11c80e464902d618594bedc&query=Copenhagen");
    
    request.send();
    
    request.onload = () => {
      if (request.status === 200) {
        var apiResponse = JSON.parse(request.responseText);
        var city = apiResponse.location.name;
        var country = apiResponse.location.country;
        var region = apiResponse.location.region;
        var localtime = apiResponse.location.localtime;
        var temperature = apiResponse.current.temperature;
        var weather_icons = apiResponse.current.weather_icons;
        var weather_descriptions = apiResponse.current.weather_descriptions;
        var wind_speed = apiResponse.current.wind_speed;
        var wind_degree = apiResponse.current.wind_degree;
        var humidity = apiResponse.current.humidity;
        var wind_direction = apiResponse.current.wind_dir;
        var pressure = apiResponse.current.pressure;
        var feelslike = apiResponse.current.feelslike;
  
        var weatherIconUrl = apiResponse.current.weather_icons[0];
  
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
        
        weatherDOM[0].textContent = textToShow;
  
        console.log(weatherIconImg);
  
  
      } else {
        console.error('Failed to fetch weather data');
      }
    }
  }