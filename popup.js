// 农历转换函数
function getLunarDate(date) {
  const lunarCalendar = {
    1: '正月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月',
    7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'
  };
  
  const lunarDays = {
    1: '初一', 2: '初二', 3: '初三', 4: '初四', 5: '初五', 6: '初六', 7: '初七', 8: '初八', 9: '初九', 10: '初十',
    11: '十一', 12: '十二', 13: '十三', 14: '十四', 15: '十五', 16: '十六', 17: '十七', 18: '十八', 19: '十九', 20: '二十',
    21: '廿一', 22: '廿二', 23: '廿三', 24: '廿四', 25: '廿五', 26: '廿六', 27: '廿七', 28: '廿八', 29: '廿九', 30: '三十'
  };
  
  // 这里使用简化的农历计算，实际项目中可以使用更精确的农历库
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${lunarCalendar[month]}${lunarDays[day]}`;
}

// 更新时钟指针
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

// 更新日期信息
function updateDate() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  };
  
  const solarDate = now.toLocaleDateString('zh-CN', options);
  const lunarDate = getLunarDate(now);
  
  document.getElementById('solarDate').textContent = solarDate;
  document.getElementById('lunarDate').textContent = lunarDate;
}

// 更新当前时间显示
function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

// 获取天气信息（使用模拟数据，实际项目中可以调用天气 API）
function getWeather() {
  // 模拟天气数据
  const weatherData = [
    { icon: '☀️', temp: '25', desc: '晴天', humidity: '60', wind: '3级' },
    { icon: '🌤️', temp: '22', desc: '多云', humidity: '55', wind: '2级' },
    { icon: '🌧️', temp: '18', desc: '小雨', humidity: '85', wind: '4级' },
    { icon: '❄️', temp: '-2', desc: '雪', humidity: '75', wind: '5级' }
  ];
  
  // 随机选择一个天气
  const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
  
  // 更新天气信息
  document.getElementById('weatherIcon').textContent = randomWeather.icon;
  document.getElementById('temperature').textContent = `${randomWeather.temp}°C`;
  document.getElementById('weatherDesc').textContent = randomWeather.desc;
  document.getElementById('humidity').textContent = `${randomWeather.humidity}%`;
  document.getElementById('wind').textContent = randomWeather.wind;
}

// 风格切换功能
function setupStyleSelector() {
  const styleDots = document.querySelectorAll('.style-dot');
  const clockContainer = document.querySelector('.clock-container');
  
  styleDots.forEach(dot => {
    dot.addEventListener('click', () => {
      // 移除所有活动状态
      styleDots.forEach(d => d.classList.remove('active'));
      // 添加当前活动状态
      dot.classList.add('active');
      
      // 移除所有风格类
      clockContainer.className = 'clock-container';
      // 添加当前风格类
      const style = dot.dataset.style;
      if (style) {
        clockContainer.classList.add(`style-${style}`);
      }
    });
  });
}

// 初始化函数
function init() {
  // 初始化时钟
  updateClock();
  setInterval(updateClock, 1000);
  
  // 初始化日期
  updateDate();
  setInterval(updateDate, 60000); // 每分钟更新一次
  
  // 初始化当前时间显示
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000); // 每秒更新一次
  
  // 初始化天气
  getWeather();
  
  // 初始化风格选择器
  setupStyleSelector();
}

// 添加退出弹窗的快捷键监听（Escape键）
function setupKeyboardShortcuts() {
  // 监听Escape键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Chrome扩展中不能直接关闭弹窗，但可以通过失去焦点或最小化来模拟
      window.close();
    }
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  init();
  setupKeyboardShortcuts();
});