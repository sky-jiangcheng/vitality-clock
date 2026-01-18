# Vitality Clock

A Chrome extension that simulates a desktop digital clock with multiple dial styles, date display, and weather information.

## Features

- 🎨 **Multiple Dial Styles**: Classic, Modern, Minimalist, and Vintage styles available
- ⏰ **Real-time Clock Display**: Accurate analog clock with smooth hand animations
- 📅 **Dual Date Display**: Shows both Gregorian and Lunar dates simultaneously
- 🌤️ **Weather Information**: Displays current weather, temperature, humidity, and wind (simulated data)
- ⌨️ **Keyboard Shortcuts**: 
  - Default open shortcut: `Ctrl+Shift+O` (Windows/Linux) or `Command+Shift+O` (Mac)
  - Close popup shortcut: `Escape` (built-in feature)
  - Supports custom shortcut settings
- 📱 **Responsive Design**: Adapts to different plugin window sizes
- 🍎 **Apple-style UI**: Modern design with rounded corners, shadows, and gradients

## Tech Stack

- **HTML5**: Plugin structure and layout
- **CSS3**: Styling including multiple dial styles and responsive design
- **JavaScript**: Clock logic, date calculation, and interaction features
- **Chrome Extension API**: Browser extension development

## Installation

### Install from Chrome Web Store

(Available after publishing to Chrome Web Store)

### Local Development Installation

1. Clone or download this project to your local machine
2. Open Chrome browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the upper right corner
4. Click "Load unpacked"
5. Select the project folder
6. The plugin is successfully installed and will display a clock icon in the browser's upper right corner

## Usage

### Open the Clock

- Click the clock icon in the browser's upper right corner
- Or use the shortcut `Ctrl+Shift+O` (Windows) / `Command+Shift+O` (Mac)

### Switch Dial Styles

- Click the four style dots at the top of the plugin window
- From left to right: Classic, Modern, Minimalist, Vintage
- Style changes take effect in real-time

### View Date and Time

- Analog clock displayed on the left
- Gregorian date, Lunar date, and digital clock displayed on the right
- Weather information displayed at the bottom

## Project Structure

```
├── icons/              # Plugin icons
│   └── icon.svg       # Main icon
├── manifest.json      # Plugin configuration file
├── popup.html         # Plugin popup window page
├── popup.js           # Plugin core logic
├── styles.css         # Plugin styles
├── options.html       # Options page (reserved)
└── README.md          # Project documentation
```

## Main Function Implementation

### Clock Logic

- Uses `Date` object to get current time
- Implements smooth hand rotation animations using CSS transforms
- Updates clock display every second

### Date Calculation

- Formats Gregorian date using `toLocaleDateString`
- Implements simplified Lunar calendar conversion logic
- Updates date display every minute

### Weather Information

- Currently uses simulated data (randomly selects weather)
- Can be extended to call real weather APIs
- Includes weather icon, temperature, description, humidity, and wind

### Style Switching

- Switches between different styles using CSS class names
- Four styles: Classic, Modern, Minimalist, Vintage
- Click the style dots at the top to switch

## Browser Support

- Chrome 88+ (supports Manifest V3)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## Development Plan

- [ ] Add real weather API support
- [ ] Implement options page for user customization
- [ ] Add more dial styles
- [ ] Support 24-hour/12-hour format switching
- [ ] Add world clock functionality
- [ ] Support dark mode

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!

## Author

- Project URL: [https://github.com/sky-jiangcheng/vitality-clock](https://github.com/sky-jiangcheng/vitality-clock)
- Contact: jiangcheng1806@gmail.com

---

**Enjoy using Vitality Clock!** 🎉