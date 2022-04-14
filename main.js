const api = {
  key: "2dd26c31596c011d1cecee5d35fd08bc",
  base: "https://api.openweathermap.org/data/2.5/"
}
const city = document.querySelector('.location .city');
const date = document.querySelector('.location .date');
const temp = document.querySelector('.current .temp');
const weather_el = document.querySelector('.current .weather');
const hilow = document.querySelector('.hi-low');
const container = document.querySelector(".app-wrap");
const btn = document.getElementById("btn");
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getWeatherData(searchbox.value);
  }
}

btn.onclick = () => {getWeatherData(searchbox.value)};

const getWeatherData = query => {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults)
    .catch(displayError);
}

const displayResults = data => {
  const now = new Date();
  city.innerText = `${data.name}, ${data.sys.country}`;
  date.innerText = formatDate(now);
  temp.innerText = `${Math.round(data.main.temp)}°c`;
  console.log(getCurrectBackground(data.weather[0].id));
  document.body.style.backgroundImage = `url(${getCurrectBackground(data.weather[0].id)})`;
  weather_el.innerText = data.weather[0].main;
  hilow.innerText = `${Math.round(data.main.temp_min)}°c / ${Math.round(data.main.temp_max)}°c`;
}

const displayError = () => {
  city.innerText = `Could not find city with such name`;
  date.innerText = ``;
  temp.innerText = ``;
  weather_el.innerText = ``;
  hilow.innerText = ``;
}

const getCurrectBackground = code => {
  switch (code){
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      container.classList.add("light");
      return './assets/thunder.jpg';
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      return "./assets/drizzle.jpg";
    case 500:	
    case 501:		
    case 502:	
    case 503:	
    case 504:	
    case 511:	
    case 520:	
    case 521:	
    case 522:	
    case 531:	
      container.classList.add("light");
      return "./assets/rain.jpg";
    case 600:	
    case 601:	
    case 602:	
    case 611:	
    case 612:	
    case 613:	
    case 615:	
    case 616:	
    case 620:	
    case 621:	
    case 622:
      container.classList.remove("light");
      return "./assets/snow.jpg"
    //random weather stuff
    case 701:	
    case 711:	
    case 721:	
    case 731:	
    case 741:	
    case 751:	
    case 761:	
    case 762:	
    case 771:	
    case 781:
      container.classList.add("light");
      return "./assets/bad-weather.jpg";
    case 800:
      container.classList.remove("light");
      return "./assets/sky.jpg";
    case 801:
    case 802:
    case 803:
    case 804:
      container.classList.remove("light");
      return "./assets/clouds.avif"
  }
   container.classList.remove("light");
   return "./assets/sky.jpg";
}


const formatDate = d => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

getWeatherData("Kraków");