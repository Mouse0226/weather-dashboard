var searchFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        getCityCoordinates(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    };
};

var getCityCoordinates = function(city) {
    // api url to get city coordinates
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a610a4f996190e02758011b8e6d8a9b";

    fetch (apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    getCityWeather(data.coord.lat, data.coord.lon, city);
                });
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });
};

var getCityWeather = function(lat, lon, city) {
    // using city coordinates, get city weather info using one call api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=8a610a4f996190e02758011b8e6d8a9b&units=imperial";
    
    fetch (apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayWeather(data, city);
                });
            } else {
                alert("Error retrieving weather information, please try again later");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });
};

var displayWeather = function(weather, city) {
    // clear old content
    weatherContainerEl.textContent = "";

    // derive date from unix timestamp
    var timestamp = weather.current.dt;
    // multiply by 1000 for milliseconds
    var date = new Date(timestamp * 1000);
    var formatDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();

    var titleEl = document.createElement("h2");
    titleEl.textContent = city + " (" + formatDate + ")";

    weatherContainerEl.appendChild(titleEl);
}

searchFormEl.addEventListener("submit", formSubmitHandler);