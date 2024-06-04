function updateWeatherApp(response){
    
    let currentCity = document.querySelector("#current_city");
    currentCity.textContent = `${response.data.city}`;
let temperatureElement = document.querySelector("#current-temperature");
temperatureElement.textContent=Math.round(response.data.temperature.current);
let humidityElement= document.querySelector("#humidity-details");
humidityElement.textContent = `${response.data.temperature.humidity}%`;
let windElement = document.querySelector("#wind-details");
windElement.textContent= `${response.data.wind.speed}km/h`;
let conditionElement = document.querySelector("#condition");
conditionElement.textContent = response.data.condition.description;
let timeElement = document.querySelector("#current-time");
let date = new Date(response.data.time*1000);
timeElement.textContent= formattedDate(date);
let iconElement = document.querySelector("#icon");
//console.log(response.data.condition.icon_url)
iconElement.innerHTML = `<img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png"  class="current-temperature-icon"/>`
}

function formattedDate(date){
    let minutes =date.getMinutes();
    let hours =date.getHours();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    return `${day}, ${hours}:${minutes}`;
}
 


function searchCity (current_city){
    let apiKey = "563e7044b32f1b708991107c1o5tdea2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${current_city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherApp) .catch(error => {
        console.error("Error fetching weather data:", error);
    });;
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }
  
  function getForecast(current_city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${current_city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast).catch(error => {
      console.error("Error fetching weather data:", error);
  });;
}

function displayForecast(response) {
    console.log(response.data);
    let forecastHtml = "";
  
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
        forecastHtml +
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

function searchButton(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
     searchCity(searchInput.value);
     getForecast(searchInput.value);
     
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', searchButton);