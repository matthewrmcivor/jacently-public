import { CityEventData, OpenDataConfig } from './types';
import { Event } from '../../data/mockEvents';
import { fetchWithCorsHandling, isCorsError } from './corsProxy';

/**
 * Generic fetcher for city government open data portals
 * Supports common formats like Socrata, CKAN, and custom JSON APIs
 * 
 * Note: Many city APIs have CORS restrictions. For production, use a backend proxy.
 */
export async function fetchCityEvents(
  config: OpenDataConfig,
  useCorsProxy: boolean = false
): Promise<CityEventData[]> {
  try {
    let url = config.endpoint;
    
    // If no endpoint provided, try to construct from city/state
    if (!url && config.city && config.state) {
      // Common patterns for city open data portals
      const citySlug = config.city.toLowerCase().replace(/\s+/g, '');
      
      // Try Socrata format (common for many US cities)
      url = `https://${citySlug}.opendata.arcgis.com/datasets/${citySlug}::events/geoservice`;
    }

    if (!url) {
      console.warn('No endpoint provided for city events');
      return [];
    }

    const headers: HeadersInit = {};
    if (config.apiKey) {
      headers['X-App-Token'] = config.apiKey;
    }

    const response = await fetchWithCorsHandling(url, { headers }, useCorsProxy);

    if (!response.ok) {
      throw new Error(`Failed to fetch city events: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data.features && Array.isArray(data.features)) {
      // GeoJSON format
      return data.features.map((feature: any) => ({
        ...feature.properties,
        coordinates: feature.geometry?.coordinates
          ? {
              lng: feature.geometry.coordinates[0],
              lat: feature.geometry.coordinates[1]
            }
          : undefined
      }));
    } else if (data.data && Array.isArray(data.data)) {
      // Socrata format
      return data.data;
    } else if (data.results && Array.isArray(data.results)) {
      return data.results;
    }

    return [];
  } catch (error) {
    if (isCorsError(error)) {
      console.warn('CORS error fetching city events. City events will be disabled. For production, use a backend proxy.');
      console.warn('To enable city events in development, you can:');
      console.warn('1. Use Vite proxy configuration (recommended)');
      console.warn('2. Set up a backend proxy server');
      console.warn('3. Use a CORS proxy service (not recommended for production)');
    } else {
      console.error('Error fetching city events:', error);
    }
    return [];
  }
}

/**
 * Transform city event data to Event format
 */
export function transformCityEventToEvent(
  cityEvent: CityEventData,
  defaultCity?: string,
  defaultState?: string
): Event {
  // Parse dates
  const startDate = cityEvent.startDate 
    ? new Date(cityEvent.startDate)
    : new Date();
  
  const endDate = cityEvent.endDate
    ? new Date(cityEvent.endDate)
    : startDate;

  // Parse times
  let startTime = cityEvent.startTime || '10:00';
  let endTime = cityEvent.endTime || '18:00';

  // If time is in datetime format, extract time portion
  if (cityEvent.startDate && cityEvent.startDate.includes('T')) {
    const dateTime = new Date(cityEvent.startDate);
    startTime = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;
  }

  // Extract address
  let address = {
    street: '',
    city: defaultCity || cityEvent.address?.city || cityEvent.location || '',
    state: defaultState || cityEvent.address?.state || '',
    zipCode: cityEvent.address?.zipCode || ''
  };

  // Try to parse location string
  if (cityEvent.location && !cityEvent.address) {
    const locationParts = cityEvent.location.split(',').map(s => s.trim());
    if (locationParts.length >= 2) {
      address.street = locationParts[0];
      address.city = locationParts[1] || address.city;
      if (locationParts.length >= 3) {
        const stateZip = locationParts[2].split(' ');
        address.state = stateZip[0] || address.state;
        address.zipCode = stateZip[1] || address.zipCode;
      }
    } else {
      address.street = cityEvent.location;
    }
  } else if (cityEvent.address) {
    address = {
      street: cityEvent.address.street || '',
      city: cityEvent.address.city || address.city,
      state: cityEvent.address.state || address.state,
      zipCode: cityEvent.address.zipCode || address.zipCode
    };
  }

  // Get coordinates
  let coordinates = { lat: 0, lng: 0 };
  if (cityEvent.coordinates) {
    coordinates = cityEvent.coordinates;
  } else if (cityEvent.latitude && cityEvent.longitude) {
    coordinates = {
      lat: parseFloat(cityEvent.latitude),
      lng: parseFloat(cityEvent.longitude)
    };
  }

  // Determine category
  const category = cityEvent.category || 'Community & Social';
  
  // Generate ID
  const id = `city-event-${cityEvent.title?.replace(/\s+/g, '-').toLowerCase()}-${startDate.getTime()}`;

  return {
    id,
    title: cityEvent.title || 'Community Event',
    description: cityEvent.description || 'Local community event',
    category,
    address,
    coordinates,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    startTime,
    endTime,
    isFree: cityEvent.isFree !== undefined ? cityEvent.isFree : true,
    isFamilyFriendly: true, // Default for city events
    images: [],
    thumbnail: `https://via.placeholder.com/300x200?text=${encodeURIComponent(cityEvent.title || 'Event')}`,
    organizer: {
      name: cityEvent.contact?.name || cityEvent.organizer?.name || 'City of ' + address.city,
      email: cityEvent.contact?.email || cityEvent.organizer?.email || '',
      phone: cityEvent.contact?.phone || cityEvent.organizer?.phone,
      website: cityEvent.contact?.website || cityEvent.organizer?.website
    },
    tags: [
      category.toLowerCase().replace(/\s+/g, '-'),
      'city-event',
      address.city?.toLowerCase() || ''
    ]
  };
}

/**
 * Example configurations for popular cities
 */
export const cityConfigs: Record<string, OpenDataConfig> = {
  // Miami - Use Vite proxy in development to avoid CORS
  // In development: /api/city-events will be proxied to https://www.miamigov.com/api/events
  // In production: Use a backend proxy server
  miami: {
    city: 'Miami',
    state: 'FL',
    // Use Vite proxy in development (see vite.config.ts)
    endpoint: import.meta.env.DEV 
      ? '/api/city-events' 
      : 'https://www.miamigov.com/api/events', // Will fail in production without backend proxy
  },
  // New York - Socrata format (usually CORS-friendly)
  newyork: {
    city: 'New York',
    state: 'NY',
    endpoint: 'https://data.cityofnewyork.us/resource/dg92-zbpx.json'
  },
  // Los Angeles - Socrata format (usually CORS-friendly)
  losangeles: {
    city: 'Los Angeles',
    state: 'CA',
    endpoint: 'https://data.lacity.org/resource/events.json'
  }
};

