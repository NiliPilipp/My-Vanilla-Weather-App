// netlify link https://serene-hypatia-f67995.netlify.app/
function displayWeather(response) {
  let temperatureElement = document.querySelector("#IDtemperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#IDcity");
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

let units = "metric";
let apiKey = "4fc9de9420224385e6f3f281435126d7";
let newCity = "Tel Aviv";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
console.log(`URL is ${apiURL}`);
axios.get(apiURL).then(displayWeather);
