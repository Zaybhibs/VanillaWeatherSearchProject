



function searchButton(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let currentCity = document.querySelector("#current-city");
    currentCity.textContent = searchInput.value;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener('submit', searchButton);