// netlify link https://serene-hypatia-f67995.netlify.app/

function convertFarenheit(event) {
  event.preventDefault;
  let convertedTemp = document.querySelector("#temperature");
  convertedTemp.innerHTML = Math.round((CelciusTemp * 9) / 5 + 32);
  document.getElementById("toFarenheit").style.color = "#202124";
  document.getElementById("toCelcius").style.color = "#0d6efd";
  let convertedForcastHigh = document.querySelectorAll(".forecast-high");
  convertedForcastHigh.forEach(function (High, index) {
    High.innerHTML = Math.round((CelciusForecastHighs[index] * 9) / 5 + 32);
  });
  let convertedForcastLow = document.querySelectorAll(".forecast-low");
  convertedForcastLow.forEach(function (Low, index) {
    Low.innerHTML = Math.round((CelciusForecastLows[index] * 9) / 5 + 32);
  });
}

function convertCelcius(event) {
  event.preventDefault;
  let convertedTemp = document.querySelector("#temperature");
  convertedTemp.innerHTML = Math.round(CelciusTemp);
  document.getElementById("toFarenheit").style.color = "#0d6efd";
  document.getElementById("toCelcius").style.color = "#202124";
  let convertedForcastHigh = document.querySelectorAll(".forecast-high");
  convertedForcastHigh.forEach(function (High, index) {
    High.innerHTML = Math.round(CelciusForecastHighs[index]);
  });
  let convertedForcastLow = document.querySelectorAll(".forecast-low");
  convertedForcastLow.forEach(function (Low, index) {
    Low.innerHTML = Math.round(CelciusForecastLows[index]);
  });
}

function displayDate(now) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentTime = document.querySelector("#time");
  let currentDay = document.querySelector("#day");
  let currentDate = document.querySelector("#date");
  let currentMonth = document.querySelector("#month");
  let currentYear = document.querySelector("#year");

  currentDay.innerHTML = days[now.getDay()];
  currentMonth.innerHTML = months[now.getMonth()];
  currentYear.innerHTML = now.getFullYear();
  currentDate.innerHTML = now.getDate();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let hours = now.getHours();
  if (hours < 12) {
    currentTime.innerHTML = now.getHours() + ":" + minutes + " AM";
  } else if (hours === 12) {
    currentTime.innerHTML = now.getHours() + ":" + minutes + " PM";
  } else if (hours > 12) {
    currentTime.innerHTML = now.getHours() - 12 + ":" + minutes + " PM";
  }
}

function displayForecast(forecast_response) {
  let forecastHTML = `<div class="row">`;
  let forecast = forecast_response.data.daily;
  forecast.forEach(function (forecastday, index) {
    if (index > 0 && index < 6) {
      let date = new Date(forecastday.dt * 1000);
      let day = date.getDay();
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="forecast-day-of-week">${days[day]}</div>
              <img class="forecast-icon" alt="Sunny" src="http://openweathermap.org/img/wn/${
                forecastday.weather[0].icon
              }@2x.png" />
              <div class="forecast-temp">
                <span class="forecast-high">${Math.round(
                  forecastday.temp.max
                )}</span>°
                <span class="forecast-low">${Math.round(
                  forecastday.temp.min
                )}</span>°
              </div>
            </div>`;
      CelciusForecastLows[index - 1] = forecastday.temp.min;
      CelciusForecastHighs[index - 1] = forecastday.temp.max;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";

  let forecastAPIURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={current,minutely,hourly,alerts}&appid=${apiKey}&units=${units}`;
  axios.get(forecastAPIURL).then(displayForecast);
}

function displayWeather(response) {
  CelciusTemp = response.data.main.temp;
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(CelciusTemp);
  document.getElementById("toFarenheit").style.color = "#0d6efd";
  document.getElementById("toCelcius").style.color = "#202124";
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#IDhumidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#IDwind");
  windElement.innerHTML = response.data.wind.speed;
  let descriptionElement = document.querySelector("#IDdescription");
  descriptionElement.innerHTML =
    response.data.weather[0].main +
    " with " +
    response.data.weather[0].description;

  //convert to new time zone
  localTime = new Date();
  utcTime = localTime.getTime() + localTime.getTimezoneOffset() * 60000;
  newCityTime = new Date(utcTime + 1000 * response.data.timezone);
  displayDate(newCityTime);
  //get Forecast for location
  getForecast(response.data.coord);
}

function getNewCityWeather(newCity) {
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
  axios
    .get(apiURL)
    .then(displayWeather)
    .catch(function (error) {
      if (error.response) {
        alert("Please enter a valid location to continue.");
      }
    });
}

function getCity(event) {
  let newCity = document.querySelector("#search-bar").value.toLowerCase();
  if (newCity.trim().length === 0) {
    alert("Please enter a city to continue.");
  } else {
    getNewCityWeather(newCity);
  }
}

function getLocalWeather(response) {
  let units = "metric";
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let currentCity = document.querySelector("#search-bar");
  currentCity.value = "";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayWeather);
}

function getCurrentData() {
  navigator.geolocation.getCurrentPosition(getLocalWeather);
  let now = new Date();
  displayDate(now);
}
function goCurrentDataHandler(event) {
  event.preventDefault();
  getCurrentData();
}

let apiKey = "4fc9de9420224385e6f3f281435126d7";
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let CelciusTemp = null;
let CelciusForecastLows = ["", "", "", "", ""];
let CelciusForecastHighs = ["", "", "", "", ""];
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("keypress", function (e) {
  if (e.which == 13) {
    e.preventDefault();
    getCity();
  }
});

getCurrentData();

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", goCurrentDataHandler);

let getFarenheit = document.querySelector("#toFarenheit");
let getCelcius = document.querySelector("#toCelcius");

getFarenheit.addEventListener("click", convertFarenheit);
getCelcius.addEventListener("click", convertCelcius);
