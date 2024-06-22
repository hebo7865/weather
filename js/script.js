'use strict'
const apiKey = '12c8222456ae475cbee143530241406'
const cityName = document.getElementById('cityName')
let data = {};
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let lon = '';
let lat = '';
let currentCity;
let allDates = [];

cityName.addEventListener('keyup', function(e){
    getWeather(e.target.value)
})


async function getWeather(e){
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${e}&days=3`
    const response = await fetch(apiUrl)
    data = await response.json()
    console.log(data);


    for(let i = 0; i < data.forecast.forecastday.length; i++){
        allDates.push(data.forecast.forecastday[i].date)
    }

    displayTodayWeather()
    anotherDay()
}

function displayTodayWeather(){
    const d = new Date(allDates[0]);
    const temp = `
    <div class="date-time d-flex justify-content-between mb-3">
        <p>${days[d.getDay(allDates[0])]}</p>
        <p>${data.current.last_updated.slice(8,10)} ${months[d.getMonth(allDates[0])]}</p>
    </div>
    <div class="location">
      <p>${data.location.name}</p>
    </div>
    <div class="temp">
        <h2>${data.current.temp_c}<span>&deg;c</span></h2>
    </div>
    <div class="weather-icon w-50 mx-auto">
        <img class="mb-2 w-25" src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p>${data.current.condition.text}</p>
    </div>
    <div  class="px-3 weather-desc d-flex justify-content-evenly">
      <p><img src="images/icon-umberella.png" alt="umbrlla">${data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
      <p><img src="images/icon-wind.png" alt="wind">${data.current.wind_kph}km/h</p>
      <p><img src="images/icon-compass.png" alt="East">East</p>
    </div>
    `

    document.getElementById('todayWeather').innerHTML = temp;
}

function anotherDay(){
    const dayOne = new Date(allDates[1]);
    const dayTwo = new Date(allDates[2])
    const tempOne = `
      <div class="day">
        <p>${days[dayOne.getDay(allDates[1])]}</p>
      </div>
      <div class="weather-icon">
        <img class="w-25" src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}">
        <p>${data.forecast.forecastday[1].day.condition.text}</p>
        </div>
      <div class="temp d-flex justify-content-between px-3 mt-3">
        <p>min: ${data.forecast.forecastday[1].day.maxtemp_c}<span>&deg;c</span></p>
        <p>max: ${data.forecast.forecastday[1].day.mintemp_c}<span>&deg;c</span></p>
      </div>
    `
    const tempTwo = `
      <div class="day">
        <p>${days[dayTwo.getDay(allDates[2])]}</p>
      </div>
      <div class="weather-icon">
        <img class="w-25" src="${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text}">
        <p>${data.forecast.forecastday[2].day.condition.text}</p>
        </div>
      <div class="temp d-flex justify-content-between px-3 mt-3">
        <p>min: ${data.forecast.forecastday[2].day.maxtemp_c}<span>&deg;c</span></p>
        <p>max: ${data.forecast.forecastday[2].day.mintemp_c}<span>&deg;c</span></p>
      </div>
    `
    document.querySelector('.day-two').innerHTML = tempOne
    document.querySelector('.day-three').innerHTML = tempTwo
}


function showPosition(position){
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    currentCity = `${lat},${lon}`
    getWeather(currentCity)
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
}

getLocation()

