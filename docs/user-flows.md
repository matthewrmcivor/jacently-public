# User Flows - Jacently MVP

## Overview

This document outlines the core user flows for Jacently's MVP, focusing on mobile-first, map-centric event discovery.

## Primary User Flows

### Flow 1: Discover Events (Casual User)

**Goal**: Find nearby events quickly

**Steps**:

1. User opens app → Lands on map view
2. App requests geolocation permission
3. Map centers on user's location
4. Events within default radius (10 miles) display as pins
5. User can:
   - Tap pin to see event preview
   - Tap preview to view full event details
   - Apply filters (Now, Today, This Week, Free, Family-Friendly)
   - Adjust search radius (5-150 miles)
   - Switch to list view
6. User selects event → Views event detail page
7. User can view location, time, description, contact info

**Success Criteria**: User finds at least one relevant event within 2 minutes

---

### Flow 2: Filter Events

**Goal**: Narrow down event search by time and attributes

**Steps**:

1. User on map/list view
2. User taps filter button
3. Filter panel opens with options:
   - Time: Now, Today, This Week
   - Attributes: Free, Family-Friendly
4. User selects one or more filters
5. Map/list updates in real-time
6. Filter badges show active filters
7. User can clear individual filters or all filters

**Success Criteria**: Filters work correctly and update view immediately

---

### Flow 3: View Event Details

**Goal**: Get complete information about an event

**Steps**:

1. User taps event pin or event card
2. Event detail page opens (modal on mobile, page on desktop)
3. User sees:
   - Event title and category
   - Date and time
   - Location with map preview
   - Description
   - Photos (if available)
   - Contact information
   - Organizer details
4. User can:
   - Get directions (opens maps app)
   - Share event (future)
   - Bookmark event (future)
   - Report issue (future)

**Success Criteria**: All essential event information is accessible

---

### Flow 4: Create Event (Sponsor)

**Goal**: Post a new event to the platform

**Steps**:

1. User navigates to "Create Event" (from menu or button)
2. Event creation form opens
3. User fills required fields:
   - Event title
   - Category
   - Date and time
   - Location (address or map picker)
   - Description
   - Contact information
4. User adds optional fields:
   - Photos
   - Website
   - Price information
   - Tags (Free, Family-Friendly, etc.)
5. User submits form
6. Event is created and appears on map/list
7. Confirmation message shown

**Success Criteria**: Sponsor can successfully create event that appears on platform

---

### Flow 5: Switch Between Map and List View

**Goal**: Toggle between map and list views

**Steps**:

1. User on map view
2. User taps "List" button
3. List view displays events as cards
4. Events sorted by distance or time
5. User can tap event card to view details
6. User can tap "Map" button to return to map view
7. Filters and search radius persist across views

**Success Criteria**: Smooth transition between views, data consistency maintained

---

### Flow 6: Adjust Search Radius

**Goal**: Expand or narrow event search area

**Steps**:

1. User on map view
2. User taps radius control (slider or input)
3. User selects radius (5-150 miles)
4. Map updates to show new radius circle
5. Events within new radius load
6. Map may auto-zoom to fit radius

**Success Criteria**: Radius adjustment works smoothly, events update correctly

---

## Secondary User Flows (Future)

### Flow 7: User Authentication (Phase 2)

- Sign up / Sign in
- Profile management
- Saved events

### Flow 8: Recurring Events (Phase 2)

- Create recurring event series
- Manage event series

### Flow 9: Event Management (Phase 2)

- Edit event
- Cancel event
- View event analytics

### Flow 10: Social Features (Phase 2)

- Share event
- Bookmark event
- Follow organizers

## User Flow Diagrams

### Main Discovery Flow

```
[App Launch]
    ↓
[Request Location]
    ↓
[Map View with Events]
    ↓
    ├─→ [Tap Event Pin] → [Event Preview] → [Event Details]
    ├─→ [Apply Filters] → [Filtered Map View]
    ├─→ [Adjust Radius] → [Updated Map View]
    └─→ [Switch to List] → [List View] → [Tap Event Card] → [Event Details]
```

### Event Creation Flow

```
[Create Event Button]
    ↓
[Event Creation Form]
    ↓
[Fill Required Fields]
    ↓
[Add Optional Fields]
    ↓
[Submit Form]
    ↓
[Event Created]
    ↓
[Event Appears on Map]
```

## Mobile-First Considerations

### Touch Interactions

- Large tap targets (minimum 44x44px)
- Swipe gestures for navigation
- Pull-to-refresh for event list
- Pinch-to-zoom on map

### Screen Real Estate

- Bottom navigation for primary actions
- Collapsible filter panel
- Full-screen map view
- Modal event details (not full page)

### Performance

- Lazy load event images
- Progressive map loading
- Optimistic UI updates
- Offline capability (future)

## Error Handling Flows

### Location Denied

1. User denies location permission
2. App shows message explaining why location is needed
3. User can manually enter location or zip code
4. Map centers on entered location

### No Events Found

1. User searches with filters
2. No events match criteria
3. App shows "No events found" message
4. Suggestions to:
   - Adjust filters
   - Increase search radius
   - Try different time period

### Network Error

1. App attempts to load events
2. Network request fails
3. Error message shown
4. Retry button available
5. Cached events shown if available

## Accessibility Considerations

- Screen reader support for all interactive elements
- Keyboard navigation support
- High contrast mode support
- Clear focus indicators
- Descriptive alt text for images
- ARIA labels for map interactions
