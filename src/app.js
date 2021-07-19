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

function getWeather(newCity) {
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
    getWeather(newCity);
  }
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", getCity);
