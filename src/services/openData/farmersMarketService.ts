import { FarmersMarketData } from './types';
import { Event } from '../../data/mockEvents';

/**
 * Fetches farmers market data from USDA Farmers Market Directory
 * Note: This uses a public dataset. For production, you may want to use
 * the official API or download the dataset periodically.
 */
export async function fetchFarmersMarkets(
  lat: number,
  lng: number,
  radiusMiles: number = 25
): Promise<FarmersMarketData[]> {
  try {
    // USDA Farmers Market Directory API endpoint
    // Use Vite proxy in development to avoid CORS and certificate issues
    const apiUrl = import.meta.env.DEV
      ? `/api/farmers-markets?lat=${lat}&lng=${lng}`
      : `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${lat}&lng=${lng}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch farmers markets: ${response.statusText}`);
    }

    const data = await response.json();
    
    // The API returns results in a specific format
    // Adjust parsing based on actual API response structure
    if (data.results && Array.isArray(data.results)) {
      return data.results.map((result: any) => ({
        MarketName: result.marketname || result.MarketName || '',
        city: result.city || '',
        State: result.state || '',
        zip: result.zip || '',
        x: parseFloat(result.longitude || result.x || '0'),
        y: parseFloat(result.latitude || result.y || '0'),
        street: result.street || '',
        Schedule: result.schedule || '',
        Products: result.products || '',
        Website: result.website || result.url || '',
        ...result
      })).filter((market: FarmersMarketData) => {
        // Filter by radius (rough calculation)
        if (market.x && market.y) {
          const distance = calculateDistance(lat, lng, market.y, market.x);
          return distance <= radiusMiles;
        }
        return false;
      });
    }

    return [];
  } catch (error) {
    console.error('Error fetching farmers markets:', error);
    // Return empty array on error to allow app to continue with other sources
    return [];
  }
}

/**
 * Alternative: Fetch from a static dataset or local cache
 * This is useful if the API has CORS issues or rate limits
 */
export async function fetchFarmersMarketsFromDataset(
  _lat: number,
  _lng: number,
  _radiusMiles: number = 25
): Promise<FarmersMarketData[]> {
  // In production, you might download the USDA dataset periodically
  // and serve it from your own backend or CDN
  // For now, this is a placeholder that would need the dataset file
  return [];
}

/**
 * Transform farmers market data to Event format
 */
export function transformFarmersMarketToEvent(
  market: FarmersMarketData,
  baseDate?: Date
): Event {
  // Use current date or provided base date
  const eventDate = baseDate || new Date();
  
  // Try to parse schedule to get times, default to morning hours
  let startTime = '08:00';
  let endTime = '14:00';
  
  if (market.Schedule) {
    // Simple parsing - adjust based on actual schedule format
    const timeMatch = market.Schedule.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);
    if (timeMatch) {
      let hour = parseInt(timeMatch[1]);
      const period = timeMatch[3]?.toUpperCase();
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      startTime = `${hour.toString().padStart(2, '0')}:00`;
      endTime = `${(hour + 6).toString().padStart(2, '0')}:00`;
    }
  }

  // Build address
  const addressParts = [];
  if (market.street) addressParts.push(market.street);
  if (market.city) addressParts.push(market.city);
  if (market.State) addressParts.push(market.State);
  if (market.zip) addressParts.push(market.zip);

  // Extract products for description
  const products = market.Products || '';
  const description = `Local farmers market featuring fresh produce and local vendors.${products ? ` Products: ${products}` : ''}`;

  return {
    id: `farmers-market-${market.MarketName?.replace(/\s+/g, '-').toLowerCase()}-${market.city || 'unknown'}`,
    title: market.MarketName || 'Farmers Market',
    description,
    category: 'Markets & Fairs',
    subcategory: 'Farmers Markets',
    address: {
      street: market.street || addressParts[0] || '',
      city: market.city || '',
      state: market.State || '',
      zipCode: market.zip || ''
    },
    coordinates: {
      lat: market.y || 0,
      lng: market.x || 0
    },
    startDate: eventDate.toISOString().split('T')[0],
    endDate: eventDate.toISOString().split('T')[0],
    startTime,
    endTime,
    isFree: true,
    isFamilyFriendly: true,
    images: [],
    thumbnail: `https://via.placeholder.com/300x200?text=${encodeURIComponent(market.MarketName || 'Farmers Market')}`,
    organizer: {
      name: market.MarketName || 'Local Farmers Market',
      email: '',
      website: market.Website
    },
    tags: ['farmers-market', 'local', 'fresh-produce', market.city?.toLowerCase() || '']
  };
}

// Helper function to calculate distance
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}


