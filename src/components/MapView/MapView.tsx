import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl/mapbox';
import { Event } from '../../data/mockEvents';
import './MapView.css';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  events: Event[];
  // The map is always centered on Miami (lat: 25.7617, lng: -80.1918)
  center?: { lat: number; lng: number };
  zoom: number;
  onEventClick: (event: Event) => void;
  selectedEventId?: string | null;
  onViewportChange?: (bounds: { north: number; south: number; east: number; west: number }, zoom: number) => void;
}

const MapView: React.FC<MapViewProps> = ({
  events,
  center,
  zoom,
  onEventClick,
  selectedEventId,
  onViewportChange
}) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 25.7617,
    lng: -80.1918
  });
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>(events);

  // Default center to Miami if not provided
  const mapCenter = useMemo(
    () => center || { lat: 25.7617, lng: -80.1918 },
    [center]
  );

  // Fly to new center when it changes (skip if map is already there)
  useEffect(() => {
    if (mapInstance && center) {
      const current = mapInstance.getCenter();
      const latDiff = Math.abs(current.lat - center.lat);
      const lngDiff = Math.abs(current.lng - center.lng);
      if (latDiff < 0.0001 && lngDiff < 0.0001) return;
      mapInstance.flyTo({
        center: [center.lng, center.lat],
        zoom: zoom,
        duration: 1500
      });
    }
  }, [center, mapInstance, zoom]);

  useEffect(() => {
    // For now default to Miami; hook up browser geolocation later
    setUserLocation({ lat: 25.7617, lng: -80.1918 });
  }, []);

  // Store last bounds to prevent unnecessary updates (using ref to avoid dependency issues)
  const lastBoundsRef = useRef<string | null>(null);

  // Filter out events with invalid coordinates
  const validEvents = useMemo(() => {
    return events.filter(event => {
      const lat = event.coordinates?.lat;
      const lng = event.coordinates?.lng;
      return typeof lat === 'number' && typeof lng === 'number' &&
             !isNaN(lat) && !isNaN(lng) &&
             lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    });
  }, [events]);

  // Filter events based on map bounds
  const filterEventsByBounds = useCallback(() => {
    if (!mapInstance) {
      // If map not ready, show all valid events
      setVisibleEvents(validEvents);
      return;
    }

    const bounds = mapInstance.getBounds();
    if (!bounds) {
      setVisibleEvents(validEvents);
      return;
    }

    const filtered = validEvents.filter(event => {
      const lat = event.coordinates.lat;
      const lng = event.coordinates.lng;
      return bounds.contains([lng, lat]);
    });

    setVisibleEvents(filtered);

    // Notify parent of bounds change only if bounds actually changed
    if (onViewportChange) {
      const boundsKey = `${bounds.getNorth().toFixed(4)}-${bounds.getSouth().toFixed(4)}-${bounds.getEast().toFixed(4)}-${bounds.getWest().toFixed(4)}`;
      if (boundsKey !== lastBoundsRef.current) {
        lastBoundsRef.current = boundsKey;
        onViewportChange({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        }, mapInstance.getZoom());
      }
    }
  }, [validEvents, mapInstance, onViewportChange]);

  // Handle map load
  const handleMapLoad = useCallback((evt: any) => {
    const map = evt.target;
    setMapInstance(map);
    // Initial filter after map loads
    setTimeout(() => {
      const bounds = map.getBounds();
      if (bounds) {
        const filtered = validEvents.filter(event => {
          const lat = event.coordinates.lat;
          const lng = event.coordinates.lng;
          return bounds.contains([lng, lat]);
        });
        setVisibleEvents(filtered);
      }
    }, 100);
  }, [validEvents]);

  // Handle map move/zoom to update visible events
  const handleMapMoveEnd = useCallback(() => {
    filterEventsByBounds();
  }, [filterEventsByBounds]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Markets & Fairs': '🎪',
      'Entertainment & Nightlife': '🎤',
      'Community & Social': '🎯',
      'Food & Drink': '🍔',
      'Arts & Culture': '🎨',
      'Sports & Recreation': '⚽',
      'Educational & Workshops': '📚',
      'Family & Kids': '👨‍👩‍👧‍👦'
    };
    return icons[category] || '📅';
  };

  // Update visible events when events prop changes
  useEffect(() => {
    filterEventsByBounds();
  }, [validEvents, filterEventsByBounds]);

  if (!mapboxToken) {
    return (
      <div className="map-view">
        <div className="map-container map-missing-token">
          <div className="map-missing-token-content">
            <div className="map-placeholder-icon">🗺️</div>
            <p className="map-placeholder-text">Mapbox token needed</p>
            <p className="map-placeholder-subtext">
              Add VITE_MAPBOX_TOKEN to your .env.local to load the map.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-view">
      <div className="map-container">
        <Map
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            latitude: mapCenter.lat,
            longitude: mapCenter.lng,
            zoom
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          style={{ width: '100%', height: '100%' }}
          reuseMaps
          onLoad={handleMapLoad}
          onMoveEnd={handleMapMoveEnd}
          onZoomEnd={handleMapMoveEnd}
        >
          <NavigationControl position="bottom-right" showCompass={false} />
          <GeolocateControl position="bottom-right" />

          {visibleEvents.map((event) => (
            <Marker
              key={event.id}
              latitude={event.coordinates.lat}
              longitude={event.coordinates.lng}
              anchor="bottom"
            >
              <button
                className={`map-pin ${selectedEventId === event.id ? 'selected' : ''}`}
                onClick={() => onEventClick(event)}
                aria-label={`${event.title} - ${event.distance?.toFixed(1)} miles away`}
              >
                <span className="map-pin-icon">{getCategoryIcon(event.category)}</span>
                {selectedEventId === event.id && (
                  <div className="map-pin-tooltip">
                    <div className="map-pin-tooltip-title">{event.title}</div>
                    <div className="map-pin-tooltip-distance">
                      {event.distance?.toFixed(1)} mi away
                    </div>
                  </div>
                )}
              </button>
            </Marker>
          ))}

          {userLocation && (
            <Marker
              latitude={userLocation.lat}
              longitude={userLocation.lng}
              anchor="center"
            >
              <div className="map-user-location" aria-label="Your location">
                <div className="map-user-location-dot"></div>
                <div className="map-user-location-pulse"></div>
              </div>
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
};

export default MapView;

