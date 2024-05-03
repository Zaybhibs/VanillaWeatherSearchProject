

function searchCity (){
    let apiKey = "563e7044b32f1b708991107c1o5tdea2";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${current-city}&key=${apiKey}&units=metric`;
}




function searchButton(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let currentCity = document.querySelector("#current-city");
    currentCity.textContent = searchInput.value;
     searchCity(searchInput.value);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', searchButton);