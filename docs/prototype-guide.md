# Prototype Guide - Jacently MVP

## Overview

This guide provides instructions for navigating and using the Jacently MVP prototype. The prototype demonstrates the core user flows and functionality planned for the full MVP build.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:

```bash
cd Jacently
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Prototype Features

### 1. Map View (Primary Interface)

**Location**: Default view when app loads

**Features**:

- Interactive map display (placeholder - Mapbox integration in Phase 2)
- Event pins showing event locations
- User location marker (if geolocation permission granted)
- Clickable event pins

**Interactions**:

- Click event pin to view event details
- Map shows events within selected radius
- User location automatically detected (if permitted)

**Current Status**:

- Placeholder map with event pins
- Full Mapbox integration planned for Phase 2

### 2. List View (Alternative Interface)

**Location**: Toggle from Map view using "List" button

**Features**:

- Scrollable list of event cards
- Event cards show: icon, title, date/time, distance, tags
- Click event card to view details

**Interactions**:

- Click event card to open event detail modal
- Scroll to see more events
- Filters apply to list view

### 3. Event Filters

**Location**: Filter bar at top of screen

**Quick Filters**:

- **Today**: Show only events happening today
- **Free**: Show only free events
- **Family-Friendly**: Show only family-friendly events

**Full Filter Panel** (Future):

- Time filters: Now, Today, This Week
- Attribute filters: Free, Family-Friendly, Age restrictions
- Category filters: Markets, Entertainment, Community, etc.

**Interactions**:

- Click filter buttons to toggle filters
- Active filters shown as badges
- Click "Clear All" to remove all filters
- Filters apply to both map and list views

### 4. Search Radius Control

**Location**: Below filter bar

**Features**:

- Slider to adjust search radius (5-150 miles)
- Quick select buttons: 5, 10, 25, 50 miles
- Current radius displayed

**Interactions**:

- Drag slider to adjust radius
- Click quick select buttons for common radii
- Map updates to show events within new radius

### 5. Event Detail Modal

**Location**: Opens when clicking event pin or card

**Features**:

- Full event information
- Event image/thumbnail
- Date, time, location
- Description
- Contact information
- Tags (Free, Family-Friendly, etc.)
- "Get Directions" button

**Interactions**:

- Click "Get Directions" to open Google Maps
- Click outside modal or "Close" button to dismiss
- Scroll to see all information

### 6. View Toggle

**Location**: Below radius control

**Features**:

- Toggle between Map and List views
- Active view highlighted

**Interactions**:

- Click "Map" to switch to map view
- Click "List" to switch to list view
- Filters and radius persist across views

## User Flows Demonstrated

### Flow 1: Discover Nearby Events

1. App loads → Map view displays
2. User location detected (if permitted)
3. Events within default radius (10 miles) shown as pins
4. User can adjust radius using slider
5. User clicks event pin → Event detail modal opens
6. User can view full event information

### Flow 2: Filter Events

1. User clicks "Today" filter → Only today's events shown
2. User clicks "Free" filter → Only free events shown
3. User clicks "Family-Friendly" filter → Only family-friendly events shown
4. Active filters shown as badges
5. User can clear individual filters or all filters

### Flow 3: Switch Between Views

1. User on Map view
2. User clicks "List" button → List view displays
3. Same events shown in list format
4. User clicks event card → Event detail modal opens
5. User clicks "Map" button → Returns to map view

### Flow 4: View Event Details

1. User clicks event pin or card
2. Event detail modal opens
3. User can see:
   - Event title and category
   - Date and time
   - Location with distance
   - Full description
   - Contact information
4. User clicks "Get Directions" → Google Maps opens
5. User clicks "Close" or outside modal → Modal closes

## Mock Data

The prototype uses mock event data located in `src/data/mockEvents.ts`. The mock data includes:

- 6 sample events in Riverside, CA area
- Various event types: Farmers Market, Open Mic, Trivia, Fundraiser, Karaoke, Craft Fair
- Different attributes: Free/Paid, Family-Friendly, Age restrictions
- Realistic dates and times
- Contact information

## Current Limitations

### Map Integration

- **Status**: Placeholder map (not real Mapbox integration)
- **Reason**: Mapbox integration requires API key and setup
- **Phase 2**: Full Mapbox GL JS integration with real map tiles

### Geolocation

- **Status**: Basic browser geolocation API
- **Limitation**: May not work on all devices/browsers
- **Phase 2**: Enhanced geolocation with fallback options

### Event Data

- **Status**: Static mock data
- **Limitation**: No real-time updates, no backend
- **Phase 2**: Backend API with MongoDB database

### Filters

- **Status**: Basic time and attribute filters
- **Limitation**: No category filter, no advanced filters
- **Phase 2**: Full filter panel with all options

### Event Creation

- **Status**: Not implemented
- **Phase 2**: Event sponsor portal for creating events

## Testing the Prototype

### Test Scenarios

1. **Basic Navigation**

   - Load app → Verify map view displays
   - Toggle to list view → Verify events shown as cards
   - Toggle back to map view → Verify map displays

2. **Filtering**

   - Click "Today" filter → Verify only today's events shown
   - Click "Free" filter → Verify only free events shown
   - Click "Family-Friendly" filter → Verify only family-friendly events shown
   - Clear all filters → Verify all events shown

3. **Radius Adjustment**

   - Adjust radius slider → Verify events update
   - Click quick select buttons → Verify radius changes
   - Verify events within new radius displayed

4. **Event Details**

   - Click event pin → Verify detail modal opens
   - Click event card → Verify detail modal opens
   - Verify all event information displays correctly
   - Click "Get Directions" → Verify Google Maps opens
   - Close modal → Verify modal closes

5. **Responsive Design**
   - Test on mobile device (or browser dev tools)
   - Verify layout adapts to screen size
   - Verify touch interactions work
   - Verify text is readable

## Known Issues

1. **Map Placeholder**: Map is a placeholder, not a real interactive map
2. **Geolocation**: May not work on all devices/browsers
3. **Event Pins**: Pins positioned approximately, not precisely
4. **No Backend**: All data is static mock data
5. **No Persistence**: Filters and selections don't persist on refresh

## Next Steps (Phase 2)

1. **Mapbox Integration**

   - Set up Mapbox account and API key
   - Integrate Mapbox GL JS
   - Implement real map tiles
   - Add map controls (zoom, pan, etc.)

2. **Backend Development**

   - Set up Node.js + Express API
   - Set up MongoDB database
   - Implement geospatial queries
   - Create event CRUD endpoints

3. **Enhanced Features**

   - Full filter panel
   - Event creation form
   - User authentication
   - Event management

4. **Performance Optimization**
   - Code splitting
   - Image optimization
   - Caching
   - Bundle size optimization

## Resources

- **Project README**: `/README.md`
- **Technical Documentation**: `/docs/tech-stack.md`
- **Backend Architecture**: `/docs/backend-architecture.md`
- **Mapping SDK Comparison**: `/docs/mapping-sdk-comparison.md`

## Support

For questions or issues with the prototype, refer to:

- Project documentation in `/docs` folder
- Code comments in component files
- Technical review documents

## Conclusion

This prototype successfully demonstrates the core user flows and functionality of Jacently. It provides a solid foundation for Phase 2 development, where we'll integrate real mapping services, build the backend API, and add advanced features.
