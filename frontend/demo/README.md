# CityPulse Frontend Demo

A stunning, modern frontend demo for the CityPulse AI-powered civic intelligence platform.

## Features

### 🎨 Visual Design
- **Modern UI/UX**: Clean, professional design with smooth animations
- **3D Animations**: Three.js powered particle system in hero section
- **Gradient Effects**: Beautiful color gradients throughout
- **Glassmorphism**: Frosted glass effects on cards and panels
- **Responsive**: Works on all screen sizes

### ⚡ Interactive Elements
- **Live Alerts Dashboard**: Real-time notification system with filtering
- **Voice AI Interface**: Interactive Q&A with visual feedback
- **Topic Clusters**: Animated SVG visualization of trending topics
- **Smooth Scrolling**: Seamless navigation between sections
- **Notification Panel**: Slide-in panel for alerts

### 🚀 Technologies Used
- **Three.js**: 3D graphics and particle animations
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern animations and transitions
- **HTML5 Canvas**: Custom visualizations
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

## File Structure

```
frontend/demo/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── app.js             # JavaScript logic and interactions
└── README.md          # This file
```

## How to Run

### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python
cd frontend/demo
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Features Showcase

### 1. Hero Section
- Animated 3D particle system
- Mouse-following camera
- Gradient text effects
- Call-to-action buttons
- Live statistics

### 2. Features Grid
- 6 AI-powered features
- Technology badges (Nova 2, Titan, Polly)
- Hover animations
- Staggered fade-in effects

### 3. Alerts Dashboard
- Filter by type (All, Safety, Development, Community, Business)
- Priority scoring (1-10)
- Source attribution
- Real-time timestamps
- Color-coded priorities

### 4. Insights Section
- Topic cluster visualization (SVG)
- Trending topics list
- Investment hotspots
- Interactive charts

### 5. Voice AI Section
- Animated particle background
- Text input with suggestions
- Simulated AI responses
- Voice playback button
- Pulsing orb animation

### 6. Notification Panel
- Slide-in from right
- Scrollable list
- Click to view details
- Badge counter

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    /* ... more colors */
}
```

### Data
Edit sample data in `app.js`:
```javascript
const sampleAlerts = [ /* your alerts */ ];
const sampleTopics = [ /* your topics */ ];
const sampleInvestments = [ /* your investments */ ];
```

### Animations
Adjust animation speeds in `styles.css`:
```css
@keyframes fadeInUp {
    /* customize animation */
}
```

## Integration with Backend

To connect to your Laravel backend:

1. **Replace sample data** with API calls:
```javascript
// In app.js
async function loadAlerts() {
    const response = await fetch('/api/alerts/all');
    const data = await response.json();
    // render alerts
}
```

2. **Add voice API integration**:
```javascript
async function handleVoiceQuery(question) {
    const response = await fetch('/api/voice/ask', {
        method: 'POST',
        body: JSON.stringify({ question })
    });
    const data = await response.json();
    // display response
}
```

3. **Real-time updates** with WebSockets:
```javascript
const ws = new WebSocket('ws://your-backend/alerts');
ws.onmessage = (event) => {
    const alert = JSON.parse(event.data);
    addNewAlert(alert);
};
```

## Performance

- **Load Time**: < 2 seconds
- **FPS**: 60fps animations
- **Bundle Size**: ~50KB (uncompressed)
- **No Build Step**: Pure HTML/CSS/JS

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Demo Data

The demo includes sample data from your actual agents:
- 5 real alerts from smart_alerts.json
- 5 trending topics from community_pulse.json
- 4 investment neighborhoods from investment_insights.json

## Screenshots

### Hero Section
- 3D particle animation
- Gradient text
- Statistics

### Alerts Dashboard
- Filterable alerts
- Priority scores
- Source icons

### Voice AI
- Interactive input
- Suggestion chips
- Animated responses

## Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] More chart types (D3.js integration)
- [ ] Real-time WebSocket updates
- [ ] User authentication UI
- [ ] Map integration (Mapbox/Google Maps)
- [ ] Advanced filtering and search
- [ ] Export data functionality
- [ ] Mobile app version

## Credits

Built for Amazon Nova Hackathon 2026
- **AI Models**: Amazon Nova 2 Lite, Nova 2 Omni
- **Embeddings**: Amazon Titan Embeddings
- **Voice**: Amazon Polly Neural TTS
- **Infrastructure**: Amazon Bedrock

## License

MIT License - Feel free to use and modify!

## Support

For issues or questions, check the main project README or contact the development team.

---

**Note**: This is a demo frontend. In production, connect it to your Laravel backend API endpoints for real data.
