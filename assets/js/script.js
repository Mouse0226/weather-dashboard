var searchFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

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
                    getCityWeather(data.coord.lat, data.coord.lon);
                });
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });
};

var getCityWeather = function(lat, lon) {
    // using city coordinates, get city weather info using one call api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=8a610a4f996190e02758011b8e6d8a9b&units=imperial";
    
    fetch (apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error retrieving weather information, please try again later");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });
};

searchFormEl.addEventListener("submit", formSubmitHandler);