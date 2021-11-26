let now = new Date();
let DateMain = document.querySelector("#dateMain");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
dateMain.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function getCity(event) {
  event.preventDefault();
  let place = document.querySelector("#cityMain");
  let location = document.querySelector("#city-input");
  place.innerHTML = `${location.value}`;
  let city = location.value;
  let units = `metric`;
  let apiKey = "ed839774472bd8c401ae9d1d267d1cfa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDetails);
}
let city = document.querySelector("form");
city.addEventListener("submit", getCity);

function showDetails(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${temp}°C`;
  let feel = Math.round(response.data.main.feels_like);
  let tempFeel = document.querySelector("#feel");
  tempFeel.innerHTML = `Feels like: ${feel}°C`;
  let humidityLevel = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityLevel}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${wind}km/h`;
  let description = response.data.weather[0].description;
  let descriptionInput = document.querySelector("#description");
  descriptionInput.innerHTML = `${description}`;

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureFeel = response.data.main.feels_like;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ed839774472bd8c401ae9d1d267d1cfa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDetails);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;
let celsiusTemperatureFeel = null;

function showFarhenheitTemp(event) {
  event.preventDefault();
  let farhenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${Math.round(farhenheitTemp)}°F`;
  let farhenheitTempFeel = (celsiusTemperatureFeel * 9) / 5 + 32;
  let feel = document.querySelector("#feel");
  feel.innerHTML = `Feels like: ${Math.round(farhenheitTempFeel)}°F`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  let feel = document.querySelector("#feel");
  feel.innerHTML = `Feels like: ${Math.round(celsiusTemperatureFeel)}°C`;
}
let farhenheit = document.querySelector("#farhenheit");
farhenheit.addEventListener("click", showFarhenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);
