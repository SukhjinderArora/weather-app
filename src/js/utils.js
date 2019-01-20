// Converts the temperature to Celsius
export const convertToCelsius = tempInKelvin => (tempInKelvin - 273.15).toFixed(0);

// Converts the temperature to Fahrenheit
export const convertToFahrenheit = tempInKelvin => ((tempInKelvin - 273.15) * 9 / 5 + 32)
  .toFixed(0);

// Gets day and time from time stamp
export const getDayAndTime = (dt) => {
  const date = new Date(dt).toLocaleDateString('en-us', {
    weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true,
  });
  return date.replace('day', 'day,');
};

// Get day from time stamp
export const getDay = dt => new Date(dt).toLocaleDateString('en-us', { weekday: 'long' });

// Get today's day
export const getToday = () => new Date().toLocaleDateString('en-us', { weekday: 'long' });
