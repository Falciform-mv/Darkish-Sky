var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var weatherSearchTerm = document.querySelector("#weather-search-term")



var formSubmitHandler = function(event) {
    event.preventDefault();
    // gets value from input element
    var cityname = cityInputEl.value.trim()
    if (cityname) {
        getCurrentWeather(cityname);
        cityContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city");
    }
};



var getCurrentWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=59b3a9c7982cb9a130291d84c800f167"

    fetch(apiURL)
        .then(function(response) {
            return response.json()
        }) .then(function(data) {
            console.log(data.main.temp)
            displayCityWeather(data, city);
        })
};


var displayCityWeather = function(weatherdata, searchTerm) {
    console.log(weatherdata);
    console.log(searchTerm);
    cityContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm;

    // display city's temperature
    var paragraph = document.createElement("p");

    var temp = document.createElement("span");
    temp.textContent = Math.floor(weatherdata.main.temp) + " degrees";

    paragraph.appendChild(temp)

    cityContainerEl.appendChild(paragraph);

    

}


// upon clicking the Search button, run the function that takes user input value into the API call to get current weather for that inputed city
// event listeners
 userFormEl.addEventListener("submit", formSubmitHandler);
