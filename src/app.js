// netlify link https://serene-hypatia-f67995.netlify.app/
function getCurrentDate() {
  let currentDate = document.querySelector(".date-block .current-day");
  let currentTime = document.querySelector(".date-block .current-time");
  let currentMonth = document.querySelector(".date-block .current-month");
  let currentYear = document.querySelector(".date-block .current-year");
  let now = new Date();
  currentDate.innerHTML = getCurrentDay(now.getDay());
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  currentTime.innerHTML = now.getHours() + ":" + minutes;
  currentMonth.innerHTML = getCurrentMonth(now.getMonth());
  currentYear.innerHTML = now.getFullYear();
}

function displayWeather(response) {
  console.log("display weather");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
}

function getNewCityWeather(newCity) {
  let units = "metric";
  let apiKey = "4fc9de9420224385e6f3f281435126d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
  console.log(`URL is ${apiURL}`);
  axios.get(apiURL).then(displayWeather);
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
  console.log("getLocalWeather");
  let apiKey = "4fc9de9420224385e6f3f281435126d7";
  let units = "metric";
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocalWeather);
}

function getCurrentDate() {
  let today = document.querySelector("#day");
  let currentMonth = document.querySelector("#month");
  let currentYear = document.querySelector("#year");
  let now = new Date();
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
  today.innerHTML = days[now.getDay()];
  currentMonth.innerHTML = months[now.getMonth()];
  currentYear.innerHTML = now.getFullYear();

  let currentTime = document.querySelector("#time");
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let hours = now.getHours();
  if (hours < 12) {
    currentTime.innerHTML = now.getHours() + ":" + minutes + " AM";
  } else {
    currentTime.innerHTML = now.getHours() - 12 + ":" + minutes + " PM";
  }
}

getCurrentDate();
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);
