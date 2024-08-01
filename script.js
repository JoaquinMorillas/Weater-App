const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
const baseForecastURL = "https://api.openweathermap.org/data/2.5/forecast";

const API_KEY = "API-KEY";
const diffKelvin = 273.15;

document.getElementById("searchButton").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchData(city);
    fetchForecast(city);
  } else {
    document.getElementById("cityError").innerHTML = "Ingrese una ciudad";
  }
});

function fetchData(city) {
  fetch(`${baseURL}?q=${city}&appid=${API_KEY}&lang=es&units=metric`)
    .then((data) => data.json())
    .then((data) => showData(data));
}

function fetchForecast(city) {
  fetch(`${baseForecastURL}?q=${city}&appid=${API_KEY}&lang=es&units=metric`)
    .then((dataforecast) => dataforecast.json())
    .then((dataforecast) => showForecast(dataforecast));
}

function showData(data) {
  const div = document.getElementById("res");
  div.innerHTML = "";
  const city = document.createElement("h2");
  city.innerHTML = `${data["name"]}, ${data.sys.country} <br> Temperatura Actual`;
  div.appendChild(city);

  const weather = document.createElement("div");
  const icon = document.createElement("img");
  icon.src = `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`;
  icon.alt = "weather icon";

  const temp = document.createElement("h4");
  temp.innerHTML = `${Math.round(data["main"]["temp_max"])} °C`;
  weather.appendChild(temp);

  const description = document.createElement("p");
  description.innerHTML = data.weather[0].description;
  weather.appendChild(description);
  weather.appendChild(icon);

  div.appendChild(weather);

  //document.body.appendChild(div);
}

function showForecast(data) {
  const forecast = document.getElementById("forecast");
  forecast.style.marginTop = "10px";
  for (let i = 0; i < data.list.length; i++) {
    const weather = document.createElement("div");
    weather.id = "hourly";
    const timeStamp = document.createElement("p");
    timeStamp.innerHTML = data.list[i].dt_txt;

    weather.appendChild(timeStamp);

    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${data.list[i]["weather"][0]["icon"]}@2x.png`;
    icon.alt = "weather icon";

    const temp = document.createElement("h4");
    temp.innerHTML = `${Math.round(data.list[i]["main"]["temp_max"])} °C`;
    weather.appendChild(temp);

    const description = document.createElement("p");
    description.innerHTML = data.list[i].weather[0].description;
    weather.appendChild(description);
    weather.appendChild(icon);

    forecast.appendChild(weather);
  }
}
