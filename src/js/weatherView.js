import elements from './elements';
import * as utils from './utils';

// Weather Icons
import clearDay from '../assets/weather-icons/day.svg';
import clearNight from '../assets/weather-icons/night.svg';
import cloudyDay from '../assets/weather-icons/cloudy-day.svg';
import cloudyNight from '../assets/weather-icons/cloudy-night.svg';
import cloudy from '../assets/weather-icons/cloudy.svg';
import rain from '../assets/weather-icons/rain.svg';
import showerRain from '../assets/weather-icons/shower-rain.svg';
import snow from '../assets/weather-icons/snowy.svg';
import thunder from '../assets/weather-icons/thunder.svg';
import mist from '../assets/weather-icons/foggy.svg';

// Gets input from the form
export const getInput = () => elements.input.value;

// Clears form input
export const clearInput = () => {
  elements.input.value = '';
};

// Adds Loader to screen
export const renderLoader = () => {
  const loaderIcons = [
    clearDay,
    clearNight,
    cloudyDay,
    cloudyNight,
    cloudy,
    rain,
    showerRain,
    snow,
    thunder,
  ];
  const loader = `
      <div class="loader">
        <img src="${loaderIcons[Math.round(Math.random() * (loaderIcons.length - 1))]}" alt="weather icons" class="loader__icon">
      </div>
  `;
  elements.weatherContainer.innerHTML = loader;
};

// Clears the loader from screen
export const clearLoader = () => {
  elements.weatherContainer.innerHTML = '';
};

// Gets appropiate weather icon depending on weather and iconID received from API response
const getWeatherIcon = (iconID) => {
  let weatherIcon = '';

  switch (iconID) {
    case '01d':
      weatherIcon = clearDay;
      break;
    case '01n':
      weatherIcon = clearNight;
      break;
    case '02d':
      weatherIcon = cloudyDay;
      break;
    case '02n':
      weatherIcon = cloudyNight;
      break;
    case '03d':
      weatherIcon = cloudy;
      break;
    case '03n':
      weatherIcon = cloudy;
      break;
    case '04d':
      weatherIcon = cloudy;
      break;
    case '04n':
      weatherIcon = cloudy;
      break;
    case '09d':
      weatherIcon = showerRain;
      break;
    case '09n':
      weatherIcon = showerRain;
      break;
    case '10d':
      weatherIcon = rain;
      break;
    case '10n':
      weatherIcon = rain;
      break;
    case '11d':
      weatherIcon = thunder;
      break;
    case '11n':
      weatherIcon = thunder;
      break;
    case '13d':
      weatherIcon = snow;
      break;
    case '13n':
      weatherIcon = snow;
      break;
    case '50d':
      weatherIcon = mist;
      break;
    case '50n':
      weatherIcon = mist;
      break;
    default:
      weatherIcon = clearDay;
  }

  return weatherIcon;
};

// Updates the current weather view
export const updateCurrentWeatherView = (weatherData) => {
  const markup = `
    <div class="current-weather">
      <h1 class="city-name">${weatherData.cityName}</h1>
      <h3 class="date-time">${utils.getDayAndTime(weatherData.date * 1000)}</h3>
      <h3 class="weather-description">${weatherData.weather.main}</h2>
      <img src="${getWeatherIcon(weatherData.weather.icon)}" alt="weather icon" class="weather-icon">
      <h1 class="current-temp">
        <span class="temp-in-c selected">${utils.convertToCelsius(weatherData.main.temp)}</span>
        <span class="temp-in-f">${utils.convertToFahrenheit(weatherData.main.temp)}</span>
        <sup>
          <button class="temp-unit btn-celsius active-unit">&deg;C</button>
          <span>|</span>
          <button class="temp-unit btn-fahrenheit">&deg;F</button>
        </sup>
      </h1>
      <div class="extra-weather-details">
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind: ${Math.trunc(weatherData.wind.speed * 3.6)} km/h</p>
      </div>
    </div>
  `;

  elements.weatherContainer.insertAdjacentHTML('afterbegin', markup);
};

// Updates the weather forecast view
export const updateWeatherForecastView = (weatherForecast) => {
  const forecast = weatherForecast.list.map((weather) => {
    return `
      <div class="weather">
        <img src="${getWeatherIcon(weather.weather[0].icon)}" alt="weather icon" class="weather-forecast-icon">
        <h2 class="forecast-day">${utils.getDay(weather.dt * 1000)}</h2>
        <div class="temp">
          <h3 class="max-temp">
            <span class="temp-in-c selected">${utils.convertToCelsius(weather.main.temp_max)}&deg;</span>
            <span class="temp-in-f">${utils.convertToFahrenheit(weather.main.temp_max)}&deg;</span>
          </h3>
          <h3 class="min-temp">
            <span class="temp-in-c selected">${utils.convertToCelsius(weather.main.temp_min)}&deg;</span>
            <span class="temp-in-f">${utils.convertToFahrenheit(weather.main.temp_min)}&deg;</span> 
          </h3>
        </div>
      </div>
    `;
  });

  const markup = `
    <div class="weather-forecast">
      ${forecast.join('')}
    </div>`;

  elements.weatherContainer.insertAdjacentHTML('beforeend', markup);
};

export const showError = (errorMessage) => {
  const markup = `
    <div class="error-message"><p>${errorMessage}</p></div>
    `;

  elements.weatherContainer.insertAdjacentHTML('afterbegin', markup);
};
