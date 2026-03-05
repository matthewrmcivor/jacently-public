# Open Data Services

This directory contains services for fetching local events from public open data sources.

## CORS Handling

Many open data APIs block direct browser requests due to CORS (Cross-Origin Resource Sharing) policies. We've implemented several solutions:

### Development Solutions

1. **Vite Proxy (Recommended for Development)**

   - Configured in `vite.config.ts`
   - Automatically proxies requests through the dev server
   - No code changes needed - the service detects dev mode

2. **Backend Proxy (Required for Production)**

   - Set up a backend API endpoint that fetches data server-side
   - Update endpoints in `cityConfigs` to point to your backend

3. **Public CORS Proxy (Not Recommended)**
   - Only for quick testing
   - Set `useCorsProxy: true` in config
   - Unreliable and not suitable for production

### Error Handling

The services automatically handle CORS errors gracefully:

- Errors are logged to console
- Services continue with other data sources
- App falls back to mock data if all sources fail

## Available Services

### 1. Farmers Market Service

Fetches farmers market data from the USDA Farmers Market Directory.

**Note**: The USDA API may have CORS restrictions. For production, consider:

- Using a backend proxy to fetch the data
- Downloading the dataset periodically and serving it from your own server
- Using the `fetchFarmersMarketsFromDataset` function with a local dataset

### 2. City Event Service

Fetches community events from city government open data portals.

**Supported Formats**:

- Socrata (common for many US cities)
- CKAN
- GeoJSON
- Custom JSON APIs

**CORS Note**: Most city APIs have CORS restrictions. The service uses Vite proxy in development and will gracefully fail in production without a backend proxy.

**Configuration**: Add your city's endpoint to `cityConfigs` in `cityEventService.ts`

### 3. Unified Open Data Service

The `OpenDataService` class aggregates events from multiple sources and provides:

- Parallel fetching from all sources
- Automatic deduplication
- Distance-based filtering
- Error handling with fallbacks

## Usage

```typescript
import { OpenDataService } from "../services/openData";

const events = await OpenDataService.fetchEvents({
  lat: 25.7617,
  lng: -80.1918,
  radiusMiles: 10,
  city: "Miami",
  state: "FL",
  enableFarmersMarkets: true,
  enableCityEvents: true,
});
```

## Adding New Data Sources

1. Create a new service file (e.g., `newSourceService.ts`)
2. Implement fetch and transform functions
3. Add the source to `OpenDataService.fetchEvents()`

## Configuration

### City Event Endpoints

To add a new city, update `cityConfigs` in `cityEventService.ts`:

```typescript
export const cityConfigs: Record<string, OpenDataConfig> = {
  yourcity: {
    city: "Your City",
    state: "ST",
    endpoint: "https://data.yourcity.gov/api/events",
    apiKey: "optional-api-key",
  },
};
```

### Farmers Market API

The USDA Farmers Market Directory API endpoint:

- Base URL: `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch`
- Parameters: `lat`, `lng`
- No API key required (public data)

## Error Handling

All services are designed to fail gracefully:

- Errors are logged to console
- Empty arrays are returned on failure
- The app continues to work with mock data or other sources

## Future Enhancements

- Cache fetched data locally
- Background sync for offline support
- Rate limiting and request queuing
- More data sources (Eventbrite, Facebook Events, etc.)
