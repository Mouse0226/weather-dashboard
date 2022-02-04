var searchFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather-container");
var fiveDayContainerEl = document.querySelector("#five-day-container");


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
                    displayFiveDay(data);
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
    
    // Create Element to Display City and Date
    var titleEl = document.createElement("h2");
    titleEl.textContent = city + " (" + formatDate + ") ";

    // Create Element to Display Weather Icon
    var iconEl = document.createElement("img");
    iconEl.src = "http://openweathermap.org/img/wn/" + weather.current.weather[0].icon +"@2x.png";
    iconEl.width = "45";
    iconEl.height = "45";
    iconEl.alt = "Weather Icon";

    // Create Element to Display Temp
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + weather.current.temp + "°F";

    // Create Element to Display Wind
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + weather.current.wind_speed + " MPH";

    // Create Element to Display Humidity
    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + weather.current.humidity + "%";

    // Create Element to Display UVI
    var uviEl = document.createElement("p");
    uviEl.textContent = "UV Index: " + weather.current.uvi;

    if (weather.current.uvi >= 6) {
        uviEl.classList = "uv-control has-text-white has-background-danger-dark";
    } else if (weather.current.uvi >= 3) {
        uviEl.classList = "uv-control has-text-white has-background-warning-dark";
    } else {
        uviEl.classList = "uv-control has-text-white has-background-success-dark";
    }

    weatherContainerEl.appendChild(titleEl);
    weatherContainerEl.appendChild(iconEl);
    weatherContainerEl.appendChild(tempEl);
    weatherContainerEl.appendChild(windEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(uviEl);
    weatherContainerEl.classList = "weather-container";
};

var displayFiveDay = function(data) {
    // clear old content
    fiveDayContainerEl.textContent = "";

    var titleEl = document.createElement("h2");
    titleEl.textContent = "5 Day Forecast:";
    fiveDayContainerEl.appendChild(titleEl);

    // initialize i to 1 and loop until 6 to ignore first position in array which is current date information
    for (var i = 1; i < 6; i++) {
        var cardEl = document.createElement("div");
        cardEl.classList = "card";

        fiveDayContainerEl.appendChild(cardEl);
    };
};

searchFormEl.addEventListener("submit", formSubmitHandler);