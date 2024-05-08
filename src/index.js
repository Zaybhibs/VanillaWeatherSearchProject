function updateWeatherApp(response){
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
iconElement.innerHTML = `<img src="${response.data.condition.description.icon_url}" class="current-temperature-icon"/>`;
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


function searchButton(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let currentCity = document.querySelector("#current_city");
    currentCity.textContent = searchInput.value;
     searchCity(searchInput.value);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', searchButton);