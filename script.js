const apiKey = "01975e30126e0d1620a74a881bb6886b";

// DOM elements
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const localTime = document.getElementById('local-time');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const condition = document.getElementById('condition');

// Weather icon mapping
const iconMap = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '☁️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌦️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️'
};

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather();
  }
});

// Get weather data
async function getWeather() {
  const city = cityInput.value.trim();
  
  if (!city) {
    showError('Please enter a city name');
    return;
  }
  
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

// Display weather data
function displayWeather(data) {
  const iconCode = data.weather[0].icon;
  const currentTime = new Date().toLocaleTimeString();
  
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherIcon.textContent = iconMap[iconCode] || '🌤️';
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDesc.textContent = data.weather[0].description;
  localTime.textContent = currentTime;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} m/s`;
  condition.textContent = data.weather[0].description;
  
  // Clear any previous error
  const errorElement = document.querySelector('.error');
  if (errorElement) {
    errorElement.remove();
  }
}

// Show error message
function showError(message) {
  // Remove any existing error
  const existingError = document.querySelector('.error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create and display new error
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = message;
  weatherCard.appendChild(errorElement);
  
  // Reset weather data
  cityName.textContent = 'Search for a city';
  weatherIcon.textContent = '🌤️';
  temperature.textContent = '--°C';
  weatherDesc.textContent = '--';
  localTime.textContent = '--';
  feelsLike.textContent = '--°C';
  humidity.textContent = '--%';
  wind.textContent = '-- m/s';
  condition.textContent = '--';
}