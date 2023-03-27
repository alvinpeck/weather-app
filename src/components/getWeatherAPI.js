
const API_KEY = '171c54e68326e2c60a0fc13eaf28643c'; // replace with your own API key

 const getWeatherData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve weather data');
  }
  const data = await response.json();
  return data;
};

const getSuggestions = async (input) => {
  const url = `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&appid=${API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (response.ok) {
    return data.list.map((item) => ({ id: item.id, name: item.name, country: item.sys.country }));
  } else {
    throw new Error(data.message);
  }
}

export default (getWeatherData,getSuggestions);
