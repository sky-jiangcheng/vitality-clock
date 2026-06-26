// Lunar calendar data encoding (well-known format used by Chinese calendar libraries)
// Each entry encodes one lunar year's month structure:
//   bits[3:0]  = leap month number (0 = no leap month)
//   bits[4:15] = 12 bits for months 1-12 (1=30 days, 0=29 days), LSB=month1
//   bit[16]    = leap month days (0=29 days, 1=30 days)
var lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
];

// Chinese New Year dates: [year, month(0-based), day]
// Index 0 = year 1900
var cnyDates = [
  [1900, 0, 31], [1901, 1, 19], [1902, 1, 8],  [1903, 0, 29], [1904, 1, 16],
  [1905, 1, 4],  [1906, 0, 25], [1907, 1, 13], [1908, 1, 2],  [1909, 0, 22],
  [1910, 1, 10], [1911, 0, 30], [1912, 1, 18], [1913, 1, 6],  [1914, 0, 26],
  [1915, 1, 14], [1916, 1, 3],  [1917, 0, 23], [1918, 1, 11], [1919, 1, 1],
  [1920, 1, 20], [1921, 1, 8],  [1922, 0, 28], [1923, 1, 16], [1924, 1, 5],
  [1925, 0, 24], [1926, 1, 13], [1927, 1, 2],  [1928, 0, 23], [1929, 1, 10],
  [1930, 0, 30], [1931, 1, 17], [1932, 1, 6],  [1933, 0, 26], [1934, 1, 14],
  [1935, 1, 4],  [1936, 0, 24], [1937, 1, 11], [1938, 0, 31], [1939, 1, 19],
  [1940, 1, 8],  [1941, 0, 27], [1942, 1, 15], [1943, 1, 5],  [1944, 0, 25],
  [1945, 1, 13], [1946, 1, 2],  [1947, 0, 22], [1948, 1, 10], [1949, 0, 29],
  [1950, 1, 17], [1951, 1, 6],  [1952, 0, 27], [1953, 1, 14], [1954, 1, 3],
  [1955, 0, 24], [1956, 1, 12], [1957, 0, 31], [1958, 1, 18], [1959, 1, 8],
  [1960, 0, 28], [1961, 1, 15], [1962, 1, 5],  [1963, 0, 25], [1964, 1, 13],
  [1965, 1, 2],  [1966, 0, 21], [1967, 1, 9],  [1968, 0, 30], [1969, 1, 17],
  [1970, 1, 6],  [1971, 0, 27], [1972, 1, 15], [1973, 1, 3],  [1974, 0, 23],
  [1975, 1, 11], [1976, 0, 31], [1977, 1, 18], [1978, 1, 7],  [1979, 0, 28],
  [1980, 1, 16], [1981, 1, 5],  [1982, 0, 25], [1983, 1, 13], [1984, 1, 2],
  [1985, 1, 20], [1986, 1, 9],  [1987, 0, 29], [1988, 1, 17], [1989, 1, 6],
  [1990, 0, 27], [1991, 1, 15], [1992, 1, 4],  [1993, 0, 23], [1994, 1, 10],
  [1995, 0, 31], [1996, 1, 19], [1997, 1, 7],  [1998, 0, 28], [1999, 1, 16],
  [2000, 1, 5],  [2001, 0, 24], [2002, 1, 12], [2003, 1, 1],  [2004, 0, 22],
  [2005, 1, 9],  [2006, 0, 29], [2007, 1, 18], [2008, 1, 7],  [2009, 0, 26],
  [2010, 1, 14], [2011, 1, 3],  [2012, 0, 23], [2013, 1, 10], [2014, 0, 31],
  [2015, 1, 19], [2016, 1, 8],  [2017, 0, 28], [2018, 1, 16], [2019, 1, 5],
  [2020, 0, 25], [2021, 1, 12], [2022, 1, 1],  [2023, 0, 22], [2024, 1, 10],
  [2025, 0, 29], [2026, 1, 17], [2027, 1, 6],  [2028, 0, 26], [2029, 1, 13],
  [2030, 1, 3],  [2031, 0, 23], [2032, 1, 11], [2033, 0, 31], [2034, 1, 19],
  [2035, 1, 8],  [2036, 0, 28], [2037, 1, 15], [2038, 1, 4],  [2039, 0, 24],
  [2040, 1, 12], [2041, 1, 1],  [2042, 0, 22], [2043, 1, 10], [2044, 0, 30],
  [2045, 1, 17], [2046, 1, 6],  [2047, 0, 26], [2048, 1, 14], [2049, 1, 2],
];

var lunarMonthNames = [
  '', '1st Month', '2nd Month', '3rd Month', '4th Month', '5th Month', '6th Month',
  '7th Month', '8th Month', '9th Month', '10th Month', '11th Month', '12th Month'
];

var lunarDayNames = [
  '', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10',
  'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20',
  'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30'
];

function getLunarYearDays(yearIndex) {
  var info = lunarInfo[yearIndex];
  var sum = 0;
  for (var i = 0; i < 12; i++) {
    sum += ((info >> (4 + i)) & 1) ? 30 : 29;
  }
  var leapMonth = info & 0xf;
  if (leapMonth > 0) {
    sum += ((info >> 16) & 1) ? 30 : 29;
  }
  return sum;
}

function getLunarMonthDays(yearIndex, month) {
  var info = lunarInfo[yearIndex];
  var leapMonth = info & 0xf;
  if (leapMonth > 0 && month > leapMonth) {
    return ((info >> (4 + month - 2)) & 1) ? 30 : 29;
  }
  return ((info >> (4 + month - 1)) & 1) ? 30 : 29;
}

function getLeapMonth(yearIndex) {
  return lunarInfo[yearIndex] & 0xf;
}

function getLunarDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  var baseDate = new Date(1900, 0, 31);
  var offset = Math.floor((date.getTime() - baseDate.getTime()) / 86400000);

  var yearIndex = 0;
  var daysInYear = getLunarYearDays(yearIndex);

  while (offset >= daysInYear && yearIndex < lunarInfo.length - 1) {
    offset -= daysInYear;
    yearIndex++;
    daysInYear = getLunarYearDays(yearIndex);
  }

  var leapMonth = getLeapMonth(yearIndex);
  var isLeap = false;
  var lunarMonth = 0;
  var lunarDay = 0;

  for (var m = 1; m <= 12; m++) {
    var monthDays = getLunarMonthDays(yearIndex, m);
    if (offset < monthDays) {
      lunarMonth = m;
      lunarDay = offset + 1;
      isLeap = false;
      break;
    }
    offset -= monthDays;

    if (leapMonth === m) {
      var leapDays = ((lunarInfo[yearIndex] >> 16) & 1) ? 30 : 29;
      if (offset < leapDays) {
        lunarMonth = m;
        lunarDay = offset + 1;
        isLeap = true;
        break;
      }
      offset -= leapDays;
    }
  }

  var monthStr = lunarMonthNames[lunarMonth];
  if (isLeap) {
    monthStr = 'Leap ' + monthStr;
  }
  var dayStr = lunarDayNames[lunarDay];

  return monthStr + ' ' + dayStr;
}

// Update clock hands
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var hourAngle = (hours % 12) * 30 + minutes * 0.5;
  var minuteAngle = minutes * 6;
  var secondAngle = seconds * 6;

  document.querySelector('.hour-hand').style.transform = 'translate(-50%, -100%) rotate(' + hourAngle + 'deg)';
  document.querySelector('.minute-hand').style.transform = 'translate(-50%, -100%) rotate(' + minuteAngle + 'deg)';
  document.querySelector('.second-hand').style.transform = 'translate(-50%, -100%) rotate(' + secondAngle + 'deg)';
}

// Update date information
function updateDate() {
  var now = new Date();
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  var solarDate = now.toLocaleDateString('en-US', options);
  var lunarDate = getLunarDate(now);

  document.getElementById('solarDate').textContent = solarDate;
  document.getElementById('lunarDate').textContent = lunarDate;
}

// Update current time display
function updateCurrentTime() {
  var now = new Date();
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');

  document.getElementById('currentTime').textContent = hours + ':' + minutes + ':' + seconds;
}

// Deterministic weather based on current time (stable within the hour)
function getWeather() {
  var now = new Date();
  var hourSeed = Math.abs(now.getHours() + now.getDate() * 24 + (now.getMonth() + 1) * 24 * 31);
  var daySeed = Math.abs(now.getDate() + (now.getMonth() + 1) * 31);

  var weatherScenarios = [
    {
      icon: '\u2600\uFE0F', desc: 'Sunny', temp: 28, feelsLike: 30,
      humidity: 45, wind: '12 km/h', pressure: '1013 hPa',
      visibility: '16 km', uv: 'High', sunrise: '05:42', sunset: '19:28', location: 'Beijing'
    },
    {
      icon: '\uD83C\uDF24\uFE0F', desc: 'Partly Cloudy', temp: 22, feelsLike: 23,
      humidity: 55, wind: '8 km/h', pressure: '1016 hPa',
      visibility: '14 km', uv: 'Moderate', sunrise: '06:10', sunset: '18:55', location: 'Shanghai'
    },
    {
      icon: '\uD83C\uDF27\uFE0F', desc: 'Light Rain', temp: 17, feelsLike: 16,
      humidity: 85, wind: '18 km/h', pressure: '1008 hPa',
      visibility: '6 km', uv: 'Low', sunrise: '06:30', sunset: '17:40', location: 'Chengdu'
    },
    {
      icon: '\u26C5', desc: 'Cloudy', temp: 19, feelsLike: 18,
      humidity: 65, wind: '15 km/h', pressure: '1011 hPa',
      visibility: '10 km', uv: 'Low', sunrise: '06:05', sunset: '18:48', location: 'Guangzhou'
    },
    {
      icon: '\u2744\uFE0F', desc: 'Snow', temp: -3, feelsLike: -7,
      humidity: 78, wind: '22 km/h', pressure: '1020 hPa',
      visibility: '3 km', uv: 'None', sunrise: '07:15', sunset: '16:55', location: 'Harbin'
    },
    {
      icon: '\uD83C\uDF26\uFE0F', desc: 'Overcast', temp: 15, feelsLike: 14,
      humidity: 70, wind: '10 km/h', pressure: '1014 hPa',
      visibility: '9 km', uv: 'Low', sunrise: '06:20', sunset: '18:30', location: 'Nanjing'
    }
  ];

  var index = hourSeed % weatherScenarios.length;
  var w = weatherScenarios[index];

  document.getElementById('weatherIconLarge').textContent = w.icon;
  document.getElementById('weatherTempLarge').textContent = w.temp + '\u00B0';
  document.getElementById('weatherDescLarge').textContent = w.desc;
  document.getElementById('weatherFeels').textContent = 'Feels like ' + w.feelsLike + '\u00B0C';

  document.getElementById('wdHumidity').textContent = w.humidity + '%';
  document.getElementById('wdWind').textContent = w.wind;
  document.getElementById('wdPressure').textContent = w.pressure;
  document.getElementById('wdVisibility').textContent = w.visibility;
  document.getElementById('wdUv').textContent = w.uv;
  document.getElementById('wdSunrise').textContent = w.sunrise;
  document.getElementById('wdSunset').textContent = w.sunset;
  document.getElementById('wdLocation').textContent = w.location;
}

// Style switching
function setupStyleSelector() {
  var styleDots = document.querySelectorAll('.style-dot');
  var clockContainer = document.querySelector('.clock-container');

  styleDots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      styleDots.forEach(function(d) { d.classList.remove('active'); });
      dot.classList.add('active');

      clockContainer.className = 'clock-container';
      var style = dot.dataset.style;
      if (style) {
        clockContainer.classList.add('style-' + style);
      }
    });
  });
}

// Tab switching
function setupTabs() {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabViews = document.querySelectorAll('.tab-view');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabName = btn.dataset.tab;

      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabViews.forEach(function(v) { v.classList.remove('active'); });

      btn.classList.add('active');
      document.getElementById('tab-' + tabName).classList.add('active');
    });
  });
}

// Load saved settings
function loadSettings() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(['openShortcut'], function(result) {
      if (result.openShortcut) {
        // Settings loaded
      }
    });
  }
}

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.close();
    }
  });
}

function init() {
  updateClock();
  setInterval(updateClock, 1000);

  updateDate();
  setInterval(updateDate, 60000);

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  getWeather();

  setupStyleSelector();
  setupTabs();
  loadSettings();
}

document.addEventListener('DOMContentLoaded', function() {
  init();
  setupKeyboardShortcuts();
});
