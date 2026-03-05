import React, { useState, useEffect, useRef } from 'react';
import { Event } from '../data/mockEvents';
import { openWebNinjaMockEvents } from '../data/openWebNinjaMockData';
import { OpenDataService } from '../services/openData';
import MapView from '../components/MapView';
import CalendarView from '../components/CalendarView';
import FilterBar, { FilterOptions, DateFilter } from '../components/FilterBar';
import EventCard from '../components/EventCard';
import EventDetail from '../components/EventDetail';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

type ViewMode = 'map' | 'calendar' | 'list' | 'friends';

// Helper function to get date range based on filter
function getDateRange(filter: DateFilter): { start: Date; end: Date } | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter) {
    case 'today':
      return {
        start: today,
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
      };
    case 'tomorrow': {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return {
        start: tomorrow,
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59)
      };
    }
    case 'thisWeekend': {
      // Find this Saturday and Sunday
      const dayOfWeek = today.getDay();
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + (6 - dayOfWeek));
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
      return {
        start: saturday,
        end: new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 23, 59, 59)
      };
    }
    case 'thisWeek': {
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
      return {
        start: today,
        end: endOfWeek
      };
    }
    case 'nextWeek': {
      const startOfNextWeek = new Date(today);
      startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()) + 1);
      const endOfNextWeek = new Date(startOfNextWeek);
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
      return {
        start: startOfNextWeek,
        end: endOfNextWeek
      };
    }
    case 'thisMonth': {
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {
        start: today,
        end: endOfMonth
      };
    }
    case 'nextMonth': {
      const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
      return {
        start: startOfNextMonth,
        end: endOfNextMonth
      };
    }
    default:
      return null;
  }
}

const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [filters, setFilters] = useState<FilterOptions>({
    dateFilter: 'all',
    isFree: null,
    isFamilyFriendly: null,
    categories: [],
    location: 'Miami, Florida'
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false);
  const [mapZoom, setMapZoom] = useState<number>(12);
  const [mapBounds, setMapBounds] = useState<{ north: number; south: number; east: number; west: number } | null>(null);
  const [mapActualZoom, setMapActualZoom] = useState<number>(12);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 25.7617, lng: -80.1918 });

  // Track last fetched coordinates to avoid redundant API calls when map
  // programmatically flies to a new location after a location-based fetch
  const lastFetchedCoordsRef = useRef<{ lat: number; lng: number } | null>(null);
  const lastFetchedZoomRef = useRef<number | null>(null);
  const mapMoveFetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipLocationGeocodeRef = useRef(false);
  // Refs so map-move effect can read current values without them as deps
  const activeSearchQueryRef = useRef(activeSearchQuery);
  const filterCategoriesRef = useRef(filters.categories);
  useEffect(() => { activeSearchQueryRef.current = activeSearchQuery; }, [activeSearchQuery]);
  useEffect(() => { filterCategoriesRef.current = filters.categories; }, [filters.categories]);

  // Geocode location and fetch events
  useEffect(() => {
    const geocodeAndFetchEvents = async () => {
      if (skipLocationGeocodeRef.current) {
        skipLocationGeocodeRef.current = false;
        return;
      }
      setIsLoadingEvents(true);

      // First, geocode the location
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      let lat = mapCenter.lat;
      let lng = mapCenter.lng;

      if (mapboxToken && filters.location) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(filters.location)}.json?access_token=${mapboxToken}&limit=1`
          );
          const data = await response.json();

          if (data.features && data.features.length > 0) {
            [lng, lat] = data.features[0].center;
            console.log(`📍 Geocoded "${filters.location}" to [${lat}, ${lng}]`);
            setMapCenter({ lat, lng });
            setMapZoom(12);
            setMapBounds(null); // Clear old bounds so events aren't filtered by old location
          }
        } catch (error) {
          console.error('Error geocoding location:', error);
        }
      }

      // Then fetch events using the coordinates
      try {
        const openWebNinjaApiKey = import.meta.env.VITE_OPENWEBNINJA_API_KEY;

        if (!openWebNinjaApiKey) {
          console.warn('Missing VITE_OPENWEBNINJA_API_KEY; skipping API fetch');
          setAllEvents(openWebNinjaMockEvents);
          setIsLoadingEvents(false);
          return;
        }

        const cityName = filters.location.split(',')[0].trim() || 'Miami';

        let query = `Events in ${cityName}`;

        if (activeSearchQuery && filters.categories.length > 0) {
          query = `${activeSearchQuery} ${filters.categories.join(' ')} events in ${cityName}`;
        } else if (activeSearchQuery) {
          query = `${activeSearchQuery} in ${cityName}`;
        } else if (filters.categories.length > 0) {
          query = `${filters.categories.join(' ')} events in ${cityName}`;
        }

        const openDataEvents = await OpenDataService.fetchEvents({
          lat,
          lng,
          radiusMiles: 50,
          city: cityName,
          state: 'FL',
          enableFarmersMarkets: false,
          enableCityEvents: false,
          enableOpenWebNinja: true,
          openWebNinjaApiKey: openWebNinjaApiKey,
          openWebNinjaQuery: query,
          enableSerpApi: false,
          useCorsProxy: false
        });

        let eventsToUse = openDataEvents;
        if (openDataEvents.length === 0) {
          console.warn('No events returned from OpenWebNinja for this location');
          eventsToUse = [];
        } else {
          console.log(`✅ Using ${openDataEvents.length} events from OpenWebNinja`);
        }

        console.log(`📍 Loaded ${eventsToUse.length} total events`);
        setAllEvents(eventsToUse);
        lastFetchedCoordsRef.current = { lat, lng };
        lastFetchedZoomRef.current = 12;
      } catch (error) {
        console.error('Error fetching open data events:', error);
        setAllEvents(openWebNinjaMockEvents);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    geocodeAndFetchEvents();
  }, [activeSearchQuery, filters.categories, filters.location]);

  useEffect(() => {
    // Filter events by map viewport bounds
    let events = allEvents;

    // Filter by viewport bounds if available (but not when searching)
    if (mapBounds && !activeSearchQuery) {
      events = allEvents.filter(event => {
        const lat = event.coordinates.lat;
        const lng = event.coordinates.lng;
        return lat >= mapBounds.south && lat <= mapBounds.north &&
               lng >= mapBounds.west && lng <= mapBounds.east;
      });
    }

    // Apply date filter
    if (filters.dateFilter !== 'all') {
      const dateRange = getDateRange(filters.dateFilter);
      if (dateRange) {
        events = events.filter(event => {
          const eventDate = new Date(event.startDate);
          return eventDate >= dateRange.start && eventDate <= dateRange.end;
        });
      }
    }

    if (filters.isFree !== null) {
      events = events.filter(event => event.isFree === filters.isFree);
    }

    if (filters.isFamilyFriendly !== null) {
      events = events.filter(event => event.isFamilyFriendly === filters.isFamilyFriendly);
    }

    // Note: Category filtering is now done via SerpAPI search query

    setFilteredEvents(events);
  }, [filters, allEvents, mapBounds, activeSearchQuery]);

  // When the user pans/zooms the map, re-fetch events for the new area
  useEffect(() => {
    if (!mapBounds) return;

    const centerLat = (mapBounds.north + mapBounds.south) / 2;
    const centerLng = (mapBounds.east + mapBounds.west) / 2;

    // Calculate search radius to match the visible map area
    const latSpan = mapBounds.north - mapBounds.south;
    const lngSpan = mapBounds.east - mapBounds.west;
    const latRadiusMiles = (latSpan / 2) * 69;
    const lngRadiusMiles = (lngSpan / 2) * 69 * Math.cos(centerLat * Math.PI / 180);
    const radiusMiles = Math.min(Math.max(Math.ceil(Math.max(latRadiusMiles, lngRadiusMiles) * 1.2), 1), 50);

    // Skip if neither the center nor the zoom has changed significantly
    if (lastFetchedCoordsRef.current) {
      const latDiff = Math.abs(centerLat - lastFetchedCoordsRef.current.lat);
      const lngDiff = Math.abs(centerLng - lastFetchedCoordsRef.current.lng);
      const centerUnchanged = latDiff < 0.01 && lngDiff < 0.01;
      // Treat zoom as unchanged if not yet recorded (avoids triggering on first map load)
      const zoomUnchanged = lastFetchedZoomRef.current === null ||
        Math.abs(mapActualZoom - lastFetchedZoomRef.current) < 1;
      if (centerUnchanged && zoomUnchanged) return;
    }

    if (mapMoveFetchTimerRef.current) clearTimeout(mapMoveFetchTimerRef.current);

    mapMoveFetchTimerRef.current = setTimeout(async () => {
      const openWebNinjaApiKey = import.meta.env.VITE_OPENWEBNINJA_API_KEY;
      if (!openWebNinjaApiKey) return;

      // Reverse-geocode the map center to get a human-readable location name
      let locationName = `${centerLat.toFixed(3)},${centerLng.toFixed(3)}`;
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      if (mapboxToken) {
        try {
          const geoRes = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${centerLng},${centerLat}.json?access_token=${mapboxToken}&types=neighborhood,locality,place&limit=1`
          );
          const geoData = await geoRes.json();
          if (geoData.features?.length > 0) {
            // Use "Neighborhood, City" format for a specific but concise location string
            const parts = (geoData.features[0].place_name || '').split(',').map((s: string) => s.trim());
            locationName = parts.slice(0, 2).filter(Boolean).join(', ') || geoData.features[0].text || locationName;
          }
        } catch {
          // fall through — coordinate string is still usable
        }
      }

      const query = activeSearchQueryRef.current
        ? `${activeSearchQueryRef.current} events in ${locationName}`
        : filterCategoriesRef.current.length > 0
          ? `${filterCategoriesRef.current.join(' ')} events in ${locationName}`
          : `Events in ${locationName}`;

      // Update the location input to show the area we're searching in
      skipLocationGeocodeRef.current = true;
      setFilters(prev => ({ ...prev, location: locationName }));

      setIsLoadingEvents(true);
      try {
        const openDataEvents = await OpenDataService.fetchEvents({
          lat: centerLat,
          lng: centerLng,
          radiusMiles,
          enableFarmersMarkets: false,
          enableCityEvents: false,
          enableOpenWebNinja: true,
          openWebNinjaApiKey,
          openWebNinjaQuery: query,
          enableSerpApi: false,
          useCorsProxy: false
        });
        lastFetchedCoordsRef.current = { lat: centerLat, lng: centerLng };
        lastFetchedZoomRef.current = mapActualZoom;
        setAllEvents(openDataEvents.length > 0 ? openDataEvents : []);
      } catch (error) {
        console.error('Error fetching events for map area:', error);
      } finally {
        setIsLoadingEvents(false);
      }
    }, 600);

    return () => {
      if (mapMoveFetchTimerRef.current) clearTimeout(mapMoveFetchTimerRef.current);
    };
  }, [mapBounds, mapActualZoom]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseEventDetail = () => {
    setSelectedEvent(null);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setActiveSearchQuery(query);
  };

  const handleClearSearch = () => {
    setActiveSearchQuery('');
  };

  const handleLocationChange = (location: string) => {
    console.log('Location changed to:', location);
    // Location is already updated via handleFilterChange
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <h1 className="app-title">Jacently</h1>
        <div className="app-header-actions">
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            activeQuery={activeSearchQuery}
            isLoading={isLoadingEvents}
          />
          <button className="icon-button" aria-label="Settings">⚙️</button>
        </div>
      </header>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        activeSearchQuery={activeSearchQuery}
        onClearSearch={handleClearSearch}
        onLocationChange={handleLocationChange}
      />

      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          Map
        </button>
        <button
          className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          Calendar
        </button>
        <button
          className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          List
        </button>
        <button
          className={`toggle-btn ${viewMode === 'friends' ? 'active' : ''}`}
          onClick={() => setViewMode('friends')}
        >
          Friends
        </button>
      </div>

      <main className="app-main">
        {isLoadingEvents ? (
          <div className="empty-state">
            <p>Loading events...</p>
            <p className="empty-state-subtext">Fetching from open data sources</p>
          </div>
        ) : viewMode === 'map' ? (
          <div className="map-container-wrapper">
            <MapView
              events={allEvents}
              center={mapCenter}
              zoom={mapZoom}
              onEventClick={handleEventClick}
              selectedEventId={selectedEvent?.id}
              onViewportChange={(bounds, zoom) => {
                setMapBounds(bounds);
                setMapActualZoom(zoom);
                setMapCenter({ lat: (bounds.north + bounds.south) / 2, lng: (bounds.east + bounds.west) / 2 });
              }}
            />
          </div>
        ) : viewMode === 'calendar' ? (
          <div className="calendar-container-wrapper">
            <CalendarView
              events={allEvents}
              onEventClick={handleEventClick}
            />
          </div>
        ) : viewMode === 'friends' ? (
          <div className="friends-container">
            <div className="empty-state">
              <p>Friends</p>
              <p className="empty-state-subtext">Coming soon - connect with friends and see what events they're attending</p>
            </div>
          </div>
        ) : (
          <div className="list-container">
            {filteredEvents.length === 0 ? (
              <div className="empty-state">
                <p>No events found</p>
                <p className="empty-state-subtext">
                  {activeSearchQuery
                    ? `No results for "${activeSearchQuery}". Try a different search term.`
                    : 'Try adjusting your filters or zoom the map to a different area'}
                </p>
                {activeSearchQuery && (
                  <button className="btn btn-secondary" onClick={handleClearSearch}>
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                />
              ))
            )}
          </div>
        )}
      </main>

      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onClose={handleCloseEventDetail}
        />
      )}
    </div>
  );
};

export default HomePage;
