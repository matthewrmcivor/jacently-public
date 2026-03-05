import { Event } from '../../data/mockEvents';
import {
  fetchFarmersMarkets,
  transformFarmersMarketToEvent
} from './farmersMarketService';
import {
  fetchCityEvents,
  transformCityEventToEvent,
  cityConfigs
} from './cityEventService';
import { OpenDataConfig } from './types';
import {
  fetchOpenWebNinjaEvents,
  transformOpenWebNinjaEventToEvent,
  OpenWebNinjaSearchParams
} from './openWebNinjaService';
import {
  fetchSerpApiEvents,
  transformSerpApiEventToEvent,
  SerpApiSearchParams
} from './serpApiService';

/**
 * Filter out events that are before today
 */
function filterPastEvents(events: Event[]): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  return events.filter(event => {
    // Compare date strings (YYYY-MM-DD format)
    return event.startDate >= todayStr;
  });
}

export interface OpenDataServiceConfig {
  lat: number;
  lng: number;
  radiusMiles?: number;
  city?: string;
  state?: string;
  enableFarmersMarkets?: boolean;
  enableCityEvents?: boolean;
  enableOpenWebNinja?: boolean;
  openWebNinjaApiKey?: string;
  openWebNinjaQuery?: string;
  enableSerpApi?: boolean;
  serpApiKey?: string;
  serpApiQuery?: string;
  serpApiLocation?: string;
  cityEventConfig?: OpenDataConfig;
  useCorsProxy?: boolean; // For development only - not recommended for production
}

/**
 * Unified service to fetch events from multiple open data sources
 */
export class OpenDataService {
  /**
   * Fetch events from all configured open data sources
   */
  static async fetchEvents(config: OpenDataServiceConfig): Promise<Event[]> {
    const events: Event[] = [];
    const radius = config.radiusMiles || 25;

    // Fetch from multiple sources in parallel
    const promises: Promise<Event[]>[] = [];

    // Farmers Markets
    if (config.enableFarmersMarkets !== false) {
      promises.push(
        fetchFarmersMarkets(config.lat, config.lng, radius)
          .then(markets => 
            markets.map(market => 
              transformFarmersMarketToEvent(market)
            )
          )
          .catch(error => {
            console.error('Error fetching farmers markets:', error);
            return [];
          })
      );
    }

    // City Events
    if (config.enableCityEvents !== false) {
      let cityConfig = config.cityEventConfig;
      
      // Auto-detect city config if not provided
      if (!cityConfig && config.city) {
        const cityKey = config.city.toLowerCase().replace(/\s+/g, '');
        cityConfig = cityConfigs[cityKey] || {
          city: config.city,
          state: config.state
        };
      }

      if (cityConfig) {
        promises.push(
          fetchCityEvents(cityConfig, config.useCorsProxy)
            .then(cityEvents => {
              // Filter by radius
              return cityEvents
                .map(event => transformCityEventToEvent(event, config.city, config.state))
                .filter(event => {
                  if (event.coordinates.lat && event.coordinates.lng) {
                    const distance = this.calculateDistance(
                      config.lat,
                      config.lng,
                      event.coordinates.lat,
                      event.coordinates.lng
                    );
                    return distance <= radius;
                  }
                  return true; // Include events without coordinates
                });
            })
            .catch(error => {
              console.error('Error fetching city events:', error);
              return [];
            })
        );
      }
    }

    // OpenWebNinja Events
    if (config.enableOpenWebNinja !== false && config.openWebNinjaApiKey) {
      const searchParams: OpenWebNinjaSearchParams = {
        lat: config.lat,
        lng: config.lng,
        radius: radius,
        is_virtual: false,
        date: 'any', // Can be 'today', 'thisWeek', 'thisMonth', 'any'
        start: 0,
      };

      // Build query string - use general query to get all event types
      if (config.openWebNinjaQuery !== undefined && config.openWebNinjaQuery !== '') {
        // Only use query if explicitly provided and not empty
        searchParams.query = config.openWebNinjaQuery;
      } else {
        // Default: use general location-based query to get all events
        searchParams.query = `Events in ${config.city || 'Miami'}`;
      }

      promises.push(
        fetchOpenWebNinjaEvents(searchParams, config.openWebNinjaApiKey)
          .then(openWebEvents => {
            // Only transform if we got events
            if (openWebEvents.length > 0) {
              return openWebEvents.map(event =>
                transformOpenWebNinjaEventToEvent(event)
              );
            }
            return [];
          })
          .catch(error => {
            console.error('Error fetching OpenWebNinja events:', error);
            // Return empty array on error - don't throw to allow other sources to work
            return [];
          })
      );
    }

    // SerpAPI Google Events
    if (config.enableSerpApi !== false && config.serpApiKey) {
      const searchParams: SerpApiSearchParams = {
        query: config.serpApiQuery || `Events in ${config.city || 'Miami'}`,
        location: config.serpApiLocation || config.city || 'Miami, Florida',
        gl: 'us',
        hl: 'en',
      };

      promises.push(
        fetchSerpApiEvents(searchParams, config.serpApiKey)
          .then(serpEvents => {
            if (serpEvents.length > 0) {
              return serpEvents.map(event =>
                transformSerpApiEventToEvent(event, config.lat, config.lng)
              );
            }
            return [];
          })
          .catch(error => {
            console.error('Error fetching SerpAPI events:', error);
            return [];
          })
      );
    }

    // Wait for all sources and combine results
    const results = await Promise.all(promises);
    results.forEach(sourceEvents => {
      events.push(...sourceEvents);
    });

    // Remove duplicates based on title and location
    const uniqueEvents = this.deduplicateEvents(events);

    // Filter out past events (final safety check)
    const futureEvents = filterPastEvents(uniqueEvents);

    console.log(`OpenDataService: ${uniqueEvents.length} unique events, ${futureEvents.length} future events`);

    return futureEvents;
  }

  /**
   * Calculate distance between two coordinates
   */
  private static calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Remove duplicate events based on title and coordinates
   * Also ensures unique IDs by appending index if needed
   */
  private static deduplicateEvents(events: Event[]): Event[] {
    const seen = new Set<string>();
    const idSet = new Set<string>();
    return events.map((event) => {
      const key = `${event.title}-${event.coordinates.lat}-${event.coordinates.lng}`;
      if (seen.has(key)) {
        // Duplicate event, return null to filter out
        return null;
      }
      seen.add(key);
      
      // Ensure unique ID
      let uniqueId = event.id;
      let idIndex = 0;
      while (idSet.has(uniqueId)) {
        idIndex++;
        uniqueId = `${event.id}-${idIndex}`;
      }
      idSet.add(uniqueId);
      
      return { ...event, id: uniqueId };
    }).filter((event): event is Event => event !== null);
  }

  /**
   * Get events within radius and sort by distance
   */
  static getEventsWithinRadius(
    events: Event[],
    centerLat: number,
    centerLng: number,
    radiusMiles: number
  ): Event[] {
    return events
      .map(event => {
        const distance = this.calculateDistance(
          centerLat,
          centerLng,
          event.coordinates.lat,
          event.coordinates.lng
        );
        return { ...event, distance };
      })
      .filter(event => event.distance! <= radiusMiles)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }
}

