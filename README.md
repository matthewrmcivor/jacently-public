# Jacently

**Mobile-first event discovery platform**

Jacently helps users find what's happening nearby, from concerts and festivals to farmers markets, comedy shows, and community events. The app centers around a location-based map experience that dynamically updates as you explore your surroundings.

## Features

- Interactive map view with event markers that updates as you pan and zoom
- Events filtered to the visible map bounds with dynamic radius calculation
- Location input updates automatically via reverse geocoding as you move the map
- List view for browsing events
- Calendar view with month and week modes
- Advanced filtering:
  - Date filters (today, tomorrow, this weekend, this week, next week, this month, next month)
  - Multi-select category filters
  - Location-based search
- Real-time event data from OpenWebNinja API
- Search functionality with location-aware queries
- Event details with venue information
- Serverless function to protect API keys in production

## Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Mobile-first responsive styling

### APIs & Services

- **OpenWebNinja** - Real-time event data
- **Mapbox GL JS** - Interactive mapping via `react-map-gl`
- **Mapbox Geocoding** - Forward and reverse geocoding for location search

### Backend

- **Vercel Serverless Functions** - API key protection in production

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `env.example` to `.env.local` and add your API keys:

```bash
cp env.example .env.local
```

Required environment variables:
- `VITE_OPENWEBNINJA_API_KEY` - OpenWebNinja real-time events API key
- `VITE_MAPBOX_TOKEN` - Mapbox access token for the interactive map

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
Jacently/
├── api/                     # Vercel serverless functions
│   └── events.js            # Proxies event API calls (hides API key)
├── src/
│   ├── components/          # React components
│   │   ├── CalendarView/    # Calendar with month and week modes
│   │   ├── EventCard/       # Event card display
│   │   ├── EventDetail/     # Event detail modal
│   │   ├── FilterBar/       # Filter controls
│   │   ├── MapView/         # Map with bounds-aware event loading
│   │   └── SearchBar/       # Search input
│   ├── data/                # Mock data and types
│   ├── pages/               # Page components
│   ├── services/            # API services
│   │   └── openData/        # Event data fetching and transformation
│   └── styles/              # CSS and design system
├── package.json
└── README.md
```

## License

Proprietary - Jacently Project
