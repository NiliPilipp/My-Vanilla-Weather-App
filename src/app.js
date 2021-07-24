// netlify link https://serene-hypatia-f67995.netlify.app/
function displayDate(now) {
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
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

function displayWeather(response) {
  CelciusTemp = Math.round(response.data.main.temp);

  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = CelciusTemp;
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
}

function getNewCityWeather(newCity) {
  let units = "metric";
  let apiKey = "4fc9de9420224385e6f3f281435126d7";
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
  event.preventDefault();
  let newCity = document.querySelector("#search-bar").value.toLowerCase();
  if (newCity.trim().length === 0) {
    alert("Please enter a city to continue.");
  } else {
    getNewCityWeather(newCity);
  }
}

function getLocalWeather(response) {
  let apiKey = "4fc9de9420224385e6f3f281435126d7";
  let units = "metric";
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
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

function convertFarenheit(event) {
  event.preventDefault;
  let convertedTemp = document.querySelector("#temperature");
  convertedTemp.innerHTML = Math.round((CelciusTemp * 9) / 5 + 32);
}

function convertCelcius(event) {
  event.preventDefault;
  let convertedTemp = document.querySelector("#temperature");
  convertedTemp.innerHTML = CelciusTemp;
}

let CelciusTemp = null;
getCurrentData();

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", goCurrentDataHandler);

let getFarenheit = document.querySelector("#toFarenheit");
let getCelcius = document.querySelector("#toCelcius");

getFarenheit.addEventListener("click", convertFarenheit);
getCelcius.addEventListener("click", convertCelcius);
