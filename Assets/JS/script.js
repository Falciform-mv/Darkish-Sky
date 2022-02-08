var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var citySaverEl = document.querySelector("#saved-city-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");



var formSubmitHandler = function(event) {
    event.preventDefault();
    // gets value from input element
    var cityname = cityInputEl.value.trim()
    if (cityname) {
        getCurrentWeather(cityname);
        // should take the city name input and pass the lat and lon coordinates to the getforecast
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
            // console.log(data.main.temp)
            displayCityWeather(data, city);
            saveCitySearch(city);
        })
};

// Can't get local storage working



// should create a variable for the searched city, then save it to local storage, append it to a Div called citySaverEl, and it should remain on the page, but it does not
var saveCitySearch = function(citynamesave) {
    var savedCity = citynamesave;
    console.log(savedCity);
    // Step 1 set savedCity to localStorage
    //create an empty array that can hold the cities
    //PUSH user-selected city into the array
    //set the array to localStorage, not the savedCity variable
    localStorage.setItem("citysave", savedCity);
    
    var cityDiv = document.createElement("div");
    var cityButton = document.createElement("button");
    cityButton.setAttribute('class', 'btn', 'btn-secondary');
    cityButton.textContent = savedCity;
    
    cityDiv.appendChild(cityButton);
    citySaverEl.appendChild(cityDiv);
    cityButton = localStorage.getItem("citysave");
}

var getsavedCity = function() {
    const previousCity = localStorage.getItem('citysave');
    if (previousCity) {
        //append everything
        //when we pull out local storage, it'll be in an array, so we'll need to LOOP through the items and make sure each of them is a button
        var cityDiv = document.createElement("div");
        var cityButton = document.createElement("button");
        cityButton.setAttribute('class', 'btn', 'btn-secondary');
        cityButton.textContent = previousCity;

        cityDiv.appendChild(cityButton);
        citySaverEl.appendChild(cityDiv);
    
    }
    

}

//if there is value in this function || if the function is not null
// if(getsavedCity()) {
    //append city info to container
    // give it the same styling/element tags as in saveCitySearch
// }

//you should be able to refresh page and see the city, because we're calling the function independtly 
getsavedCity();

var displayCityWeather = function(weatherdata, searchTerm) {
    // console.log(weatherdata);
    // console.log(searchTerm);
    cityContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm;

    // display city's temperature
    var paragraph = document.createElement("p");
    var temp = document.createElement("span");
    temp.textContent = Math.floor(weatherdata.main.temp) + " degrees F";
    paragraph.appendChild(temp);
    cityContainerEl.appendChild(paragraph);


    // display city's Wind
    var paragraph2 = document.createElement("p");
    var wind = document.createElement("span");
    wind.textContent = "Wind Direction: " + Math.floor(weatherdata.wind.speed) + " MPH";
    paragraph2.appendChild(wind);
    cityContainerEl.appendChild(paragraph2);
    

    // display city's Humidity
    var paragraph3 = document.createElement("p");
    var humidity = document.createElement("span");
    humidity.textContent = "Humidity: " + weatherdata.main.humidity + "%";
    paragraph3.appendChild(humidity);
    cityContainerEl.appendChild(paragraph3);

    // variables for 5 day forecast
    var latitude = weatherdata.coord.lat;
    var longitude = weatherdata.coord.lon;

    // calls getForecast and passes the variables that are equal to the api data from whatever city the user inputs
    getForecast(latitude, longitude);
    



}

// API call for 5 day forecast
var getForecast = function(lat, lon) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=9afbc1b15973c9d7704cc4f6dcd7af3c"
    fetch(forecastApi).then(function(response) {
        response.json().then(function(data) {
            // console.log(data)
            // the whole forecast data object is stored in the variable forecastData
            
            // runs through 5 days of weather data to acquire the forecast's temperatures, wind, and humidity
            for (i = 1; i <6; i++) {
                var temp5 = Math.floor(data.daily[i].temp.max);
                var wind5 = Math.floor(data.daily[i].wind_speed);
                var humid5 = Math.floor(data.daily[i].humidity);

                // console.log(wind5);


           
                 // Displays and dynamically creates forecast cards
            var cardContainer = document.createElement("div");
            cardContainer.setAttribute('class', 'card', 'col');
            var cardText = document.createElement("div");
            cardText.setAttribute('class', 'col-2', 'card-body');
            // displays the list of forecasted temperatures
            var fivetemps = document.createElement("p");
            fivetemps.textContent = "Temp: " + temp5; 
            // displays list of forecasted wind
            var fivewinds = document.createElement("p");
            fivewinds.textContent = "Wind: " + wind5 + " MPH";
            // displays list of forecasted humidity
            var fivehumid = document.createElement("p");
            fivehumid.textContent = "Humidity: " + humid5 + " %";


            cardText.appendChild(fivetemps); 
            cardText.appendChild(fivewinds);  
            cardText.appendChild(fivehumid);
            forecastContainerEl.appendChild(cardText); 
                
            }
           
            
        });
         // Clears previous data
         forecastContainerEl.textContent = "";
    });
    
}


// displays 5 day forecast in card format
var displayForecast = function(futureForecast) {
    
}


// upon clicking the Search button, run the function that takes user input value into the API call to get current weather for that inputed city
// event listeners
 userFormEl.addEventListener("submit", formSubmitHandler);
