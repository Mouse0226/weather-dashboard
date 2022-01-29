var searchFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        getCityWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    };
};

var getCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a610a4f996190e02758011b8e6d8a9b";

    fetch (apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });
};

searchFormEl.addEventListener("submit", formSubmitHandler);