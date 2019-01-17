import '@babel/polyfill';
import elements from './elements';
import geoLocation from './geoLocation';
import getWeather from './weather';
import * as weatherView from './weatherView';

// base url for weather API
const baseURL = 'https://api.openweathermap.org/data/2.5';

// Gets weather by GeoLocation
const getWeatherByGeoLocation = (event) => {
  if ('geolocation' in navigator) {
    geoLocation()
      .then((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const url = `${baseURL}/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_TOKEN}`;
        weatherView.renderLoader();
        getWeather(url)
          .then((weatherData) => {
            console.log(weatherData);
            weatherView.updateCurrentWeatherView(weatherData[0]);
          })
          .catch((error) => {
            console.log(error.response);
            weatherView.showError(error.response.data.message);
          });
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
  const city = weatherView.getInput();
  if (city.trim() === '') return;
  const url = `${baseURL}/weather?q=${city}&APPID=${process.env.WEATHER_TOKEN}`;
  event.preventDefault();
  weatherView.renderLoader();
  getWeather(url)
    .then((weatherData) => {
      console.log(weatherData);
      weatherView.updateCurrentWeatherView(weatherData[0]);
      weatherView.clearInput();
    })
    .catch((error) => {
      console.log(error.response);
      weatherView.showError(error.response.data.message);
    });
};

const convertTempUnit = (event) => {
  if (event.target.classList.contains('btn-celsius')) {
    document.querySelector('.temp-in-c').classList.add('selected');
    document.querySelector('.temp-in-f').classList.remove('selected');
    document.querySelector('.btn-celsius').classList.add('active-unit');
    document.querySelector('.btn-fahrenheit').classList.remove('active-unit');
  } else if (event.target.classList.contains('btn-fahrenheit')) {
    document.querySelector('.temp-in-c').classList.remove('selected');
    document.querySelector('.temp-in-f').classList.add('selected');

    document.querySelector('.btn-fahrenheit').classList.add('active-unit');
    document.querySelector('.btn-celsius').classList.remove('active-unit');
  }
};

// Event Listeners
window.addEventListener('load', getWeatherByGeoLocation);
elements.form.addEventListener('submit', weatherFormHandler);
elements.weatherContainer.addEventListener('click', convertTempUnit);
