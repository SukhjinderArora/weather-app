import '@babel/polyfill';
import axios from 'axios';

import elements from './elements';
import geoLocation from './geoLocation';
import * as weatherView from './weatherView';

// base url for weather API
const baseURL = 'https://api.openweathermap.org/data/2.5';

// Async function for getting current weather and weather forecast
const getWeather = async (url) => {
  weatherView.renderLoader();
  try {
    const currentWeather = await axios(url);
    const weatherForecast = await axios(url.replace('/weather', '/forecast'));

    const data = {
      currentWeather: {
        cityName: `${currentWeather.data.name}, ${currentWeather.data.sys.country}`,
        main: currentWeather.data.main,
        weather: currentWeather.data.weather[0],
        date: currentWeather.data.dt,
        wind: currentWeather.data.wind,
      },
      forecast: {
        city: weatherForecast.data.city,
        list: weatherForecast.data.list.filter((item) => {
          const today = new Date().toLocaleDateString('en-us', { weekday: 'long' });
          const day = new Date(item.dt * 1000).toLocaleDateString('en-us', { weekday: 'long' });
          return day !== today && item.dt_txt.includes('12:00');
        }),
      },
    };
    console.log(data);
    weatherView.clearLoader();
    weatherView.updateCurrentWeatherView(data.currentWeather);
    weatherView.updateWeatherForecastView(data.forecast);
  } catch (error) {
    weatherView.clearLoader();
    weatherView.showError(error.response.data.message);
  }
};

// Gets weather by GeoLocation
const getWeatherByGeoLocation = async (event) => {
  if ('geolocation' in navigator) {
    geoLocation()
      .then((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const url = `${baseURL}/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_TOKEN}`;
        getWeather(url);
      })
      .catch((error) => {
        weatherView.showError(error.message);
      });
  } else {
    console.log('Geolocation not available');
  }
};

// Gets weather by city name
const weatherFormHandler = (event) => {
  event.preventDefault();
  const city = weatherView.getInput();
  if (city.trim() === '') return;
  const url = `${baseURL}/weather?q=${city}&APPID=${process.env.WEATHER_TOKEN}`;
  weatherView.clearInput();
  getWeather(url);
};

// Convert temperature unit between celsius and fahrenheit
const convertTempUnit = (event) => {
  const btnCelsius = document.querySelector('.btn-celsius');
  const btnFahrenheit = document.querySelector('.btn-fahrenheit');

  const tempCelsius = document.querySelectorAll('.temp-in-c');
  const tempFahrenheit = document.querySelectorAll('.temp-in-f');

  if (event.target === btnCelsius) {
    tempCelsius.forEach(element => element.classList.add('selected'));
    tempFahrenheit.forEach(element => element.classList.remove('selected'));

    btnCelsius.classList.add('active-unit');
    btnFahrenheit.classList.remove('active-unit');
  } else if (event.target === btnFahrenheit) {
    tempCelsius.forEach(element => element.classList.remove('selected'));
    tempFahrenheit.forEach(element => element.classList.add('selected'));

    btnFahrenheit.classList.add('active-unit');
    btnCelsius.classList.remove('active-unit');
  }
};


// Event Listeners
window.addEventListener('load', getWeatherByGeoLocation);
elements.form.addEventListener('submit', weatherFormHandler);
elements.weatherContainer.addEventListener('click', convertTempUnit);
