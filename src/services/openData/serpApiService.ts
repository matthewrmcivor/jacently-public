import { Event } from '../../data/mockEvents';

export interface SerpApiEvent {
  title: string;
  date?: {
    start_date?: string;
    when?: string;
  };
  address?: string[];
  link?: string;
  description?: string;
  ticket_info?: {
    source?: string;
    link?: string;
    link_type?: string;
  }[];
  venue?: {
    name?: string;
    rating?: number;
    reviews?: number;
    link?: string;
  };
  thumbnail?: string;
  image?: string;
  event_location_map?: {
    image?: string;
    link?: string;
    serpapi_link?: string;
  };
}

export interface SerpApiSearchParams {
  query: string;
  location?: string;
  gl?: string; // country code
  hl?: string; // language code
  start?: number; // pagination offset
  htichips?: string; // filters like 'date:today', 'event_type:Virtual-Event'
}

interface SerpApiResponse {
  search_metadata?: {
    status?: string;
  };
  events_results?: SerpApiEvent[];
  error?: string;
}

/**
 * Fetch a single page of events from SerpAPI Google Events
 */
async function fetchSerpApiPage(
  params: SerpApiSearchParams,
  apiKey: string,
  start: number = 0
): Promise<SerpApiEvent[]> {
  const searchParams = new URLSearchParams({
    engine: 'google_events',
    api_key: apiKey,
    q: params.query,
  });

  if (params.location) {
    searchParams.append('location', params.location);
  }
  if (params.gl) {
    searchParams.append('gl', params.gl);
  }
  if (params.hl) {
    searchParams.append('hl', params.hl);
  }
  if (start > 0) {
    searchParams.append('start', start.toString());
  }
  if (params.htichips) {
    searchParams.append('htichips', params.htichips);
  }

  // Use proxy in development to avoid CORS issues
  const isDev = import.meta.env.DEV;
  const baseUrl = isDev ? '/api/serpapi' : 'https://serpapi.com/search';
  const url = `${baseUrl}?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`);
  }

  const data: SerpApiResponse = await response.json();

  if (data.error) {
    throw new Error(`SerpAPI error: ${data.error}`);
  }

  console.log(`SerpAPI page response: ${data.events_results?.length || 0} events`, data.events_results?.slice(0, 2));

  return data.events_results || [];
}

/**
 * Check if an event date is valid (not in the past, not too far in the future)
 */
function isValidEventDate(serpEvent: SerpApiEvent): boolean {
  const dateInfo = serpEvent.date;
  if (!dateInfo) return true; // No date info, keep the event

  const now = new Date();
  const currentYear = now.getFullYear();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check start_date if available
  if (dateInfo.start_date) {
    const parsed = new Date(dateInfo.start_date);
    if (!isNaN(parsed.getTime())) {
      // Filter out events before today or more than 2 years in the future
      if (parsed < today) return false;
      if (parsed.getFullYear() > currentYear + 2) return false;
      return true;
    }
  }

  // Check 'when' field
  if (dateInfo.when) {
    // Look for year in the when field
    const yearMatch = dateInfo.when.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year < currentYear) return false;
      if (year > currentYear + 2) return false;
    }
  }

  return true; // Keep events we can't parse - they're likely current
}

/**
 * Fetch events from SerpAPI Google Events (up to 50 results)
 */
export async function fetchSerpApiEvents(
  params: SerpApiSearchParams,
  apiKey: string,
  maxResults: number = 50
): Promise<SerpApiEvent[]> {
  try {
    console.log('Fetching SerpAPI events:', { query: params.query, location: params.location, maxResults });

    const allEvents: SerpApiEvent[] = [];
    const pageSize = 10; // SerpAPI typically returns ~10 results per page
    const maxPages = Math.ceil(maxResults / pageSize);

    // Fetch first page
    const firstPage = await fetchSerpApiPage(params, apiKey, 0);
    allEvents.push(...firstPage);

    // If we got results and need more, fetch additional pages
    if (firstPage.length > 0 && allEvents.length < maxResults) {
      const additionalPages = Math.min(maxPages - 1, 4); // Limit to 5 total pages (50 results)

      for (let i = 1; i <= additionalPages; i++) {
        const start = i * pageSize;
        try {
          const pageEvents = await fetchSerpApiPage(params, apiKey, start);
          if (pageEvents.length === 0) break; // No more results
          allEvents.push(...pageEvents);
          if (allEvents.length >= maxResults) break;
        } catch (error) {
          console.warn(`Failed to fetch page ${i + 1}:`, error);
          break;
        }
      }
    }

    // Filter out past events and events with invalid dates
    const validEvents = allEvents.filter((event, i) => {
      const isValid = isValidEventDate(event);
      if (!isValid && i < 5) {
        console.log(`Filtered out event: "${event.title}" date:`, event.date);
      }
      return isValid;
    });
    const events = validEvents.slice(0, maxResults);

    console.log(`SerpAPI returned ${allEvents.length} total events, ${validEvents.length} valid (future) events`);

    return events;
  } catch (error) {
    console.error('Error fetching SerpAPI events:', error);
    return [];
  }
}

/**
 * Parse date string from SerpAPI response
 * Returns ISO date string (YYYY-MM-DD)
 */
function parseEventDate(dateInfo?: { start_date?: string; when?: string }): string {
  if (!dateInfo) {
    return new Date().toISOString().split('T')[0];
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  // Try start_date first (usually in format "Jan 15, 2026" or similar)
  if (dateInfo.start_date) {
    try {
      const parsed = new Date(dateInfo.start_date);
      if (!isNaN(parsed.getTime())) {
        // Sanity check: if year is before current year, adjust to current/next year
        if (parsed.getFullYear() < currentYear) {
          // Try with current year
          const monthDay = `${parsed.toLocaleString('en-US', { month: 'short' })} ${parsed.getDate()}`;
          let adjusted = new Date(`${monthDay}, ${currentYear}`);
          if (adjusted < now) {
            adjusted = new Date(`${monthDay}, ${currentYear + 1}`);
          }
          return adjusted.toISOString().split('T')[0];
        }
        return parsed.toISOString().split('T')[0];
      }
    } catch {
      // Fall through to 'when' parsing
    }
  }

  // Try parsing from 'when' field (e.g., "Fri, Jan 17, 8 PM – 11 PM")
  if (dateInfo.when) {
    try {
      // First check if there's a year in the string
      const yearMatch = dateInfo.when.match(/\b(20\d{2})\b/);
      const year = yearMatch ? parseInt(yearMatch[1]) : currentYear;

      // Extract date portion (month and day)
      const dateMatch = dateInfo.when.match(/([A-Za-z]+,?\s+)?([A-Za-z]+)\s+(\d{1,2})/);
      if (dateMatch) {
        const month = dateMatch[2];
        const day = dateMatch[3];

        // Use the found year, or current year, adjusting if in the past
        let parsed = new Date(`${month} ${day}, ${year}`);

        // If no year was in the string and date is in the past, try next year
        if (!yearMatch && parsed < now) {
          parsed = new Date(`${month} ${day}, ${currentYear + 1}`);
        }

        if (!isNaN(parsed.getTime()) && parsed.getFullYear() >= currentYear) {
          return parsed.toISOString().split('T')[0];
        }
      }
    } catch {
      // Fall through to default
    }
  }

  return new Date().toISOString().split('T')[0];
}

/**
 * Generate a pseudo-random offset based on a string hash
 * This ensures the same venue always gets the same position
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Generate varied coordinates based on venue/address
 * Spreads events across a ~10 mile radius around the center
 */
function generateCoordinates(
  serpEvent: SerpApiEvent,
  centerLat: number,
  centerLng: number
): { lat: number; lng: number } {
  // Create a unique string from venue and address
  const uniqueStr = `${serpEvent.venue?.name || ''}-${serpEvent.address?.join('-') || ''}-${serpEvent.title || ''}`;
  const hash = hashString(uniqueStr);

  // Generate offsets (spread within ~0.15 degrees, roughly 10 miles)
  const latOffset = ((hash % 1000) / 1000 - 0.5) * 0.3;
  const lngOffset = (((hash >> 10) % 1000) / 1000 - 0.5) * 0.3;

  return {
    lat: centerLat + latOffset,
    lng: centerLng + lngOffset
  };
}

/**
 * Parse time from 'when' field
 * Returns time string (e.g., "8:00 PM")
 */
function parseEventTime(when?: string): { startTime: string; endTime: string } {
  const defaultTimes = { startTime: '12:00 PM', endTime: '11:59 PM' };

  if (!when) return defaultTimes;

  // Match patterns like "8 PM", "8:00 PM", "8 PM – 11 PM"
  const timeMatch = when.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/gi);

  if (timeMatch && timeMatch.length >= 1) {
    return {
      startTime: timeMatch[0],
      endTime: timeMatch[1] || timeMatch[0],
    };
  }

  return defaultTimes;
}

/**
 * Parse address array into structured address
 */
function parseAddress(addressArray?: string[]): {
  street: string;
  city: string;
  state: string;
  zipCode: string;
} {
  const defaultAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };

  if (!addressArray || addressArray.length === 0) {
    return defaultAddress;
  }

  // First element is usually venue/street
  const street = addressArray[0] || '';

  // Second element is usually "City, State ZIP" or "City, State"
  if (addressArray.length >= 2) {
    const cityStateZip = addressArray[1];
    const match = cityStateZip.match(/^(.+?),\s*([A-Z]{2})(?:\s+(\d{5}))?/);
    if (match) {
      return {
        street,
        city: match[1].trim(),
        state: match[2],
        zipCode: match[3] || '',
      };
    }
    return {
      street,
      city: cityStateZip,
      state: '',
      zipCode: '',
    };
  }

  return { ...defaultAddress, street };
}

/**
 * Transform SerpAPI event to app Event format
 */
export function transformSerpApiEventToEvent(
  serpEvent: SerpApiEvent,
  centerLat: number = 25.7617,
  centerLng: number = -80.1918
): Event {
  const address = parseAddress(serpEvent.address);
  const eventDate = parseEventDate(serpEvent.date);
  const times = parseEventTime(serpEvent.date?.when);

  // Generate unique ID from title and date
  const id = `serp-${serpEvent.title?.replace(/\W+/g, '-').toLowerCase().slice(0, 50)}-${eventDate}`;

  // Determine category based on title/description
  const category = categorizeEvent(serpEvent.title || '', serpEvent.description || '');

  // Check if event appears to be free
  const isFree = checkIfFree(serpEvent);

  // Generate varied coordinates based on venue/address
  const coordinates = generateCoordinates(serpEvent, centerLat, centerLng);

  return {
    id,
    title: serpEvent.title || 'Untitled Event',
    description: serpEvent.description || `Event at ${serpEvent.venue?.name || address.street || 'venue'}`,
    category,
    address,
    coordinates,
    startDate: eventDate,
    endDate: eventDate,
    startTime: times.startTime,
    endTime: times.endTime,
    isFree,
    isFamilyFriendly: !containsAdultContent(serpEvent.title || '', serpEvent.description || ''),
    images: serpEvent.image ? [serpEvent.image] : [],
    thumbnail: serpEvent.thumbnail,
    organizer: {
      name: serpEvent.venue?.name || 'Event Organizer',
      email: '',
      website: serpEvent.link || serpEvent.venue?.link,
    },
    tags: generateTags(serpEvent),
  };
}

/**
 * Categorize event based on title and description
 */
function categorizeEvent(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  if (/concert|music|live band|dj|festival|show/.test(text)) return 'Music';
  if (/art|gallery|exhibit|museum|painting/.test(text)) return 'Art';
  if (/food|restaurant|dining|brunch|chef|culinary/.test(text)) return 'Food';
  if (/sports?|game|match|tournament|fitness|yoga|run/.test(text)) return 'Sports';
  if (/market|fair|vendor|craft|shop/.test(text)) return 'Market';
  if (/comedy|standup|laugh/.test(text)) return 'Comedy';
  if (/theater|theatre|play|musical|performance/.test(text)) return 'Theater';
  if (/tech|startup|coding|developer|hackathon/.test(text)) return 'Tech';
  if (/network|business|professional|meetup/.test(text)) return 'Networking';
  if (/family|kids|children|child/.test(text)) return 'Family';
  if (/nightlife|club|party|dance/.test(text)) return 'Nightlife';
  if (/wellness|health|meditation|spa/.test(text)) return 'Wellness';

  return 'Community';
}

/**
 * Check if event appears to be free
 */
function checkIfFree(event: SerpApiEvent): boolean {
  const text = `${event.title || ''} ${event.description || ''}`.toLowerCase();

  if (/free|no cost|complimentary|no charge/.test(text)) return true;
  if (event.ticket_info && event.ticket_info.length > 0) return false;

  return false; // Default to not free if uncertain
}

/**
 * Check for adult content
 */
function containsAdultContent(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return /21\+|18\+|adults only|bar crawl|wine tasting|beer|cocktail/.test(text);
}

/**
 * Generate tags from event data
 */
function generateTags(event: SerpApiEvent): string[] {
  const tags: string[] = ['SerpAPI'];
  const text = `${event.title || ''} ${event.description || ''}`.toLowerCase();

  if (/outdoor|outside|park/.test(text)) tags.push('Outdoor');
  if (/indoor|inside/.test(text)) tags.push('Indoor');
  if (/free/.test(text)) tags.push('Free');
  if (/virtual|online|zoom/.test(text)) tags.push('Virtual');
  if (/weekend/.test(text)) tags.push('Weekend');
  if (event.venue?.name) tags.push(event.venue.name);

  return tags;
}
