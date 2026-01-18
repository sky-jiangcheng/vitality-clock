// Lunar calendar conversion function
function getLunarDate(date) {
  const lunarCalendar = {
    1: '1st Month', 2: '2nd Month', 3: '3rd Month', 4: '4th Month', 5: '5th Month', 6: '6th Month',
    7: '7th Month', 8: '8th Month', 9: '9th Month', 10: '10th Month', 11: '11th Month', 12: '12th Month'
  };
  
  const lunarDays = {
    1: 'Day 1', 2: 'Day 2', 3: 'Day 3', 4: 'Day 4', 5: 'Day 5', 6: 'Day 6', 7: 'Day 7', 8: 'Day 8', 9: 'Day 9', 10: 'Day 10',
    11: 'Day 11', 12: 'Day 12', 13: 'Day 13', 14: 'Day 14', 15: 'Day 15', 16: 'Day 16', 17: 'Day 17', 18: 'Day 18', 19: 'Day 19', 20: 'Day 20',
    21: 'Day 21', 22: 'Day 22', 23: 'Day 23', 24: 'Day 24', 25: 'Day 25', 26: 'Day 26', 27: 'Day 27', 28: 'Day 28', 29: 'Day 29', 30: 'Day 30'
  };
  
  // Simplified lunar calendar calculation, can use a more accurate library in actual projects
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${lunarCalendar[month]} ${lunarDays[day]}`;
}

// Update clock hands
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // 计算指针旋转角度
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;
  
  // 更新指针样式
  document.querySelector('.hour-hand').style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
  document.querySelector('.minute-hand').style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
  document.querySelector('.second-hand').style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
}

// Update date information
function updateDate() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  };
  
  const solarDate = now.toLocaleDateString('en-US', options);
  const lunarDate = getLunarDate(now);
  
  document.getElementById('solarDate').textContent = solarDate;
  document.getElementById('lunarDate').textContent = lunarDate;
}

// Update current time display
function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

// Get weather information (using simulated data, can call real weather API in actual project)
function getWeather() {
  // Simulated weather data
  const weatherData = [
    { icon: '☀️', temp: '25', desc: 'Sunny', humidity: '60', wind: 'Level 3' },
    { icon: '🌤️', temp: '22', desc: 'Partly Cloudy', humidity: '55', wind: 'Level 2' },
    { icon: '🌧️', temp: '18', desc: 'Light Rain', humidity: '85', wind: 'Level 4' },
    { icon: '❄️', temp: '-2', desc: 'Snow', humidity: '75', wind: 'Level 5' }
  ];
  
  // Randomly select a weather
  const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
  
  // Update weather information
  document.getElementById('weatherIcon').textContent = randomWeather.icon;
  document.getElementById('temperature').textContent = `${randomWeather.temp}°C`;
  document.getElementById('weatherDesc').textContent = randomWeather.desc;
  document.getElementById('humidity').textContent = `${randomWeather.humidity}%`;
  document.getElementById('wind').textContent = randomWeather.wind;
}

// Style switching functionality
function setupStyleSelector() {
  const styleDots = document.querySelectorAll('.style-dot');
  const clockContainer = document.querySelector('.clock-container');
  
  styleDots.forEach(dot => {
    dot.addEventListener('click', () => {
      // Remove all active states
      styleDots.forEach(d => d.classList.remove('active'));
      // Add current active state
      dot.classList.add('active');
      
      // Remove all style classes
      clockContainer.className = 'clock-container';
      // Add current style class
      const style = dot.dataset.style;
      if (style) {
        clockContainer.classList.add(`style-${style}`);
      }
    });
  });
}

// Initialization function
function init() {
  // Initialize clock
  updateClock();
  setInterval(updateClock, 1000);
  
  // Initialize date
  updateDate();
  setInterval(updateDate, 60000); // Update every minute
  
  // Initialize current time display
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000); // Update every second
  
  // Initialize weather
  getWeather();
  
  // Initialize style selector
  setupStyleSelector();
}

// Add keyboard shortcut listener for closing popup (Escape key)
function setupKeyboardShortcuts() {
  // Listen for Escape key to close popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Cannot directly close popup in Chrome extension, but can simulate by losing focus or minimizing
      window.close();
    }
  });
}

// Initialize after page loads
document.addEventListener('DOMContentLoaded', () => {
  init();
  setupKeyboardShortcuts();
});