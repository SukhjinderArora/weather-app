import axios from 'axios';

// Get current weather
const getCurrentWeather = (url) => {
  return axios.get(url)
    .then((res) => {
      return {
        cityName: `${res.data.name}, ${res.data.sys.country}`,
        main: res.data.main,
        weather: res.data.weather[0],
        wind: res.data.wind,
        date: res.data.dt,
      };
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

// get weather forecast
const getWeatherForecast = (url) => {
  return axios.get(url)
    .then((res) => {
      const { data } = res;
      return {
        city: data.city,
        list: data.list.filter(item => item.dt_txt.includes('12:00:00')),
      };
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const getWeather = (url) => {
  const currentWeather = getCurrentWeather(url);
  const forecast = getWeatherForecast(url.replace('/weather', '/forecast'));
  return Promise.all([currentWeather, forecast]);
};

export default getWeather;
