import { Event } from '../../data/mockEvents';

export interface OpenWebNinjaEvent {
  event_id: string;
  name: string;
  link: string;
  description: string;
  language: string;
  date_human_readable: string;
  start_time: string;
  start_time_utc: string;
  start_time_precision_sec: number;
  end_time: string;
  end_time_utc: string;
  end_time_precision_sec: number;
  is_virtual: boolean;
  thumbnail?: string;
  publisher: string;
  publisher_favicon?: string;
  publisher_domain: string;
  ticket_links?: Array<{
    source: string;
    link: string;
    fav_icon?: string;
  }>;
  info_links?: Array<{
    source: string;
    link: string;
  }>;
  venue: {
    google_id: string;
    name: string;
    phone_number?: string | null;
    website?: string | null;
    review_count?: number;
    rating?: number;
    subtype: string;
    subtypes: string[];
    full_address: string;
    latitude: number;
    longitude: number;
    district?: string;
    street_number?: string;
    street: string;
    city: string;
    zipcode: string;
    state: string;
    country: string;
    timezone: string;
    google_mid?: string;
  };
}

export interface OpenWebNinjaResponse {
  Example?: {
    value: {
      status: string;
      request_id: string;
      parameters: {
        query: string;
        is_virtual: boolean;
        date: string;
        start: number;
      };
      data: OpenWebNinjaEvent[];
    };
  };
}

export interface OpenWebNinjaSearchParams {
  query?: string;
  date?: 'today' | 'thisWeek' | 'thisMonth' | 'any';
  is_virtual?: boolean;
  start?: number;
  lat?: number;
  lng?: number;
  radius?: number; // in miles
}

/**
 * Fetch a single page of events from OpenWebNinja API
 */
async function fetchOpenWebNinjaPage(
  params: OpenWebNinjaSearchParams,
  _apiKey: string,
  start: number = 0
): Promise<OpenWebNinjaEvent[]> {
  // In development, use local proxy; in production, use serverless function
  const isDev = import.meta.env.DEV;
  const baseUrl = isDev
    ? '/api/openwebninja/realtime-events-data/search-events'
    : '/api/events';
  const searchParams = new URLSearchParams();

  // Build query string - API requires a query parameter
  if (params.query !== undefined && params.query !== null && params.query !== '') {
    searchParams.append('query', params.query);
  } else {
    searchParams.append('query', `Events in Miami`);
  }

  if (params.lat) {
    searchParams.append('lat', params.lat.toString());
  }
  if (params.lng) {
    searchParams.append('lng', params.lng.toString());
  }
  if (params.radius && params.radius <= 25) {
    searchParams.append('radius', params.radius.toString());
  }
  if (params.date) {
    searchParams.append('date', params.date);
  }
  if (params.is_virtual !== undefined) {
    searchParams.append('is_virtual', params.is_virtual.toString());
  }
  if (start > 0) {
    searchParams.append('start', start.toString());
  }

  const url = `${baseUrl}?${searchParams.toString()}`;

  // In dev, include API key header; in prod, serverless function handles it
  const headers: HeadersInit = {};
  if (isDev) {
    const apiKey = import.meta.env.VITE_OPENWEBNINJA_API_KEY;
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 401) {
      console.warn('OpenWebNinja API key is invalid or expired.');
      return [];
    }
    if (response.status === 400) {
      console.warn('OpenWebNinja API returned Bad Request.');
      return [];
    }
    if (response.status === 503) {
      console.warn('OpenWebNinja API is temporarily unavailable.');
      return [];
    }
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const data: any = await response.json();

  // Extract events from the response structure
  let events: OpenWebNinjaEvent[] = [];

  if (data.Example?.value?.data && Array.isArray(data.Example.value.data)) {
    events = data.Example.value.data;
  } else if (data.value?.data && Array.isArray(data.value.data)) {
    events = data.value.data;
  } else if (Array.isArray(data.data)) {
    events = data.data;
  } else if (Array.isArray(data)) {
    events = data;
  }

  return events;
}

/**
 * Fetch events from OpenWebNinja API (up to 50 results with pagination)
 */
export async function fetchOpenWebNinjaEvents(
  params: OpenWebNinjaSearchParams,
  apiKey: string,
  maxResults: number = 50
): Promise<OpenWebNinjaEvent[]> {
  try {
    console.log('Fetching OpenWebNinja events:', { query: params.query, maxResults });

    const allEvents: OpenWebNinjaEvent[] = [];
    const pageSize = 10; // OpenWebNinja typically returns ~10 results per page
    const maxPages = Math.ceil(maxResults / pageSize);

    // Fetch first page
    const firstPage = await fetchOpenWebNinjaPage(params, apiKey, 0);
    allEvents.push(...firstPage);

    // If we got results and need more, fetch additional pages
    if (firstPage.length > 0 && allEvents.length < maxResults) {
      const additionalPages = Math.min(maxPages - 1, 4); // Limit to 5 total pages (50 results)

      for (let i = 1; i <= additionalPages; i++) {
        const start = i * pageSize;
        try {
          const pageEvents = await fetchOpenWebNinjaPage(params, apiKey, start);
          if (pageEvents.length === 0) break; // No more results
          allEvents.push(...pageEvents);
          if (allEvents.length >= maxResults) break;
        } catch (error) {
          console.warn(`Failed to fetch page ${i + 1}:`, error);
          break;
        }
      }
    }

    // Deduplicate by event_id
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex(e => e.event_id === event.event_id)
    );

    const events = uniqueEvents.slice(0, maxResults);

    console.log(`✅ Fetched ${allEvents.length} total, ${events.length} unique events from OpenWebNinja API`);
    return events;
  } catch (error) {
    console.error('Error fetching OpenWebNinja events:', error);
    return [];
  }
}

/**
 * Safely parse a date string and return a valid Date or fallback to today
 */
function safeParseDate(dateStr: string | undefined | null): Date {
  if (!dateStr) {
    return new Date();
  }
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    return new Date();
  }
  return parsed;
}

/**
 * Transform OpenWebNinja event to our Event format
 */
export function transformOpenWebNinjaEventToEvent(
  openWebEvent: OpenWebNinjaEvent
): Event {
  // Parse dates safely
  const startDate = safeParseDate(openWebEvent.start_time || openWebEvent.start_time_utc);
  const endDate = safeParseDate(openWebEvent.end_time || openWebEvent.end_time_utc);

  // Extract time from datetime
  const startTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
  const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

  // Determine category based on venue subtype or event name
  let category = 'Entertainment & Nightlife';
  const venueSubtype = openWebEvent.venue?.subtype?.toLowerCase() || '';
  if (venueSubtype.includes('music') || venueSubtype.includes('concert')) {
    category = 'Entertainment & Nightlife';
  } else if (venueSubtype.includes('theater') || venueSubtype.includes('hall')) {
    category = 'Arts & Culture';
  } else if (venueSubtype.includes('sport')) {
    category = 'Sports & Recreation';
  }

  // Determine if free (no ticket links or description suggests free)
  const isFree = !openWebEvent.ticket_links || openWebEvent.ticket_links.length === 0 ||
    (openWebEvent.description || '').toLowerCase().includes('free');

  // Extract address components
  const address = {
    street: openWebEvent.venue.street || '',
    city: openWebEvent.venue.city || '',
    state: openWebEvent.venue.state || '',
    zipCode: openWebEvent.venue.zipcode || '',
  };

  // Get ticket link if available
  const ticketLink = openWebEvent.ticket_links?.[0]?.link || openWebEvent.link;

  return {
    id: `openwebninja-${openWebEvent.event_id}`,
    title: openWebEvent.name,
    description: openWebEvent.description || 'Event details available at the venue.',
    category,
    subcategory: openWebEvent.venue.subtype || undefined,
    address,
    coordinates: {
      lat: openWebEvent.venue.latitude,
      lng: openWebEvent.venue.longitude,
    },
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    startTime,
    endTime,
    isFree,
    isFamilyFriendly: !venueSubtype.includes('club') && !venueSubtype.includes('bar'),
    images: openWebEvent.thumbnail ? [openWebEvent.thumbnail] : [],
    thumbnail: openWebEvent.thumbnail,
    organizer: {
      name: openWebEvent.venue.name,
      email: '',
      phone: openWebEvent.venue.phone_number || undefined,
      website: openWebEvent.venue.website || ticketLink || undefined,
    },
    tags: [
      category.toLowerCase().replace(/\s+/g, '-'),
      openWebEvent.venue.city?.toLowerCase() || '',
      venueSubtype.replace(/\s+/g, '-'),
    ].filter(Boolean),
  };
}
