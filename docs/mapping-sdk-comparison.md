# Mapping SDK Comparison - Google Maps vs Mapbox

## Overview

This document evaluates Google Maps JavaScript API and Mapbox GL JS for Jacently's map-centric event discovery platform. Both SDKs are evaluated on pricing, features, customization, mobile performance, and integration complexity.

## Google Maps JavaScript API

### Overview

Google Maps is the most widely used mapping platform, offering comprehensive mapping services with extensive global coverage and familiar user experience.

### Pricing (as of 2024)

- **Free Tier**: $200 credit per month
  - Dynamic Maps: $7 per 1,000 loads
  - Static Maps: $2 per 1,000 requests
  - Geocoding: $5 per 1,000 requests
- **Typical MVP Usage**: ~10,000 map loads/month = ~$70/month (within free tier)
- **Scaling**: Costs increase linearly with usage
- **Billing**: Pay-as-you-go, automatic billing

### Features

✅ **Strengths**:

- Extensive global coverage and data
- Familiar user experience (most users know Google Maps)
- Rich POI (Points of Interest) data
- Street View integration available
- Geocoding and reverse geocoding
- Directions API available
- Places API for venue data
- Well-documented with extensive examples
- Strong TypeScript support

❌ **Limitations**:

- Limited customization of map styling
- Requires API key management
- Can be expensive at scale
- Less control over map rendering
- Branding requirements (Google logo)

### Customization

- **Map Styles**: Limited predefined styles (roadmap, satellite, terrain, hybrid)
- **Custom Styling**: Basic customization via Styled Maps (limited color/style options)
- **Markers**: Customizable icons, but limited styling options
- **Controls**: Standard controls, limited customization

### Mobile Performance

- **Bundle Size**: ~200KB (minified)
- **Load Time**: Fast initial load
- **Rendering**: Good performance on mobile devices
- **Offline**: Limited offline support
- **Touch Interactions**: Native touch support, smooth pan/zoom

### Integration Complexity

- **Setup**: Moderate - requires API key, domain restrictions
- **React Integration**: Good - `@react-google-maps/api` library available
- **TypeScript**: Excellent type definitions
- **Documentation**: Comprehensive, many examples
- **Learning Curve**: Moderate - familiar to most developers

### Code Example

```typescript
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap center={{ lat: 37.7749, lng: -122.4194 }} zoom={13}>
        <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
      </GoogleMap>
    </LoadScript>
  );
};
```

### Best For

- Projects requiring familiar UX
- Applications needing extensive POI data
- Projects with moderate customization needs
- Teams familiar with Google ecosystem

---

## Mapbox GL JS

### Overview

Mapbox is a developer-focused mapping platform known for extensive customization, beautiful default styles, and strong performance on mobile devices.

### Pricing (as of 2024)

- **Free Tier**: 50,000 map loads/month
- **Paid Tier**: $5 per 1,000 loads after free tier
- **Typical MVP Usage**: ~10,000 map loads/month = Free
- **Scaling**: More cost-effective at scale
- **Billing**: Pay-as-you-go, automatic billing

### Features

✅ **Strengths**:

- Extensive customization and styling options
- Beautiful default map styles
- Strong mobile performance
- Vector tiles (faster rendering)
- 3D map support
- Custom data visualization
- Strong developer tools
- Excellent documentation
- Open-source core (MapLibre)

❌ **Limitations**:

- Less familiar to end users
- Smaller POI database than Google
- Requires more setup for advanced features
- Less brand recognition

### Customization

- **Map Styles**: Highly customizable via Mapbox Studio
- **Custom Styling**: Full control over colors, fonts, layers
- **Markers**: Fully customizable, can use custom HTML/CSS
- **Controls**: Fully customizable or build your own

### Mobile Performance

- **Bundle Size**: ~150KB (minified)
- **Load Time**: Fast initial load with vector tiles
- **Rendering**: Excellent performance, optimized for mobile
- **Offline**: Better offline support with vector tiles
- **Touch Interactions**: Excellent native touch support

### Integration Complexity

- **Setup**: Moderate - requires access token, domain restrictions
- **React Integration**: Good - `react-map-gl` library available
- **TypeScript**: Good type definitions
- **Documentation**: Comprehensive, developer-focused
- **Learning Curve**: Moderate - requires understanding of vector tiles

### Code Example

```typescript
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
  return (
    <Map
      mapboxAccessToken="YOUR_ACCESS_TOKEN"
      initialViewState={{
        longitude: -122.4194,
        latitude: 37.7749,
        zoom: 13,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={-122.4194} latitude={37.7749} />
    </Map>
  );
};
```

### Best For

- Projects requiring custom branding
- Applications needing unique map styling
- Mobile-first applications
- Projects with design-heavy requirements
- Cost-sensitive projects at scale

---

## Side-by-Side Comparison

| Feature                | Google Maps                   | Mapbox             |
| ---------------------- | ----------------------------- | ------------------ |
| **Free Tier**          | $200 credit/month             | 50,000 loads/month |
| **Cost at 10K loads**  | ~$70/month (within free tier) | Free               |
| **Cost at 100K loads** | ~$700/month                   | ~$250/month        |
| **Customization**      | Limited                       | Extensive          |
| **Mobile Performance** | Good                          | Excellent          |
| **Bundle Size**        | ~200KB                        | ~150KB             |
| **POI Data**           | Extensive                     | Moderate           |
| **Learning Curve**     | Moderate                      | Moderate           |
| **TypeScript Support** | Excellent                     | Good               |
| **React Integration**  | Good                          | Good               |
| **Documentation**      | Comprehensive                 | Comprehensive      |
| **Brand Recognition**  | High                          | Moderate           |

---

## Recommendation for Jacently MVP

### Primary Recommendation: **Mapbox GL JS**

**Rationale**:

1. **Cost-Effective**: Free tier covers MVP usage (50K loads/month)
2. **Customization**: Better aligns with Jacently's need for unique branding
3. **Mobile Performance**: Superior performance on mobile devices (critical for MVP)
4. **Scalability**: More cost-effective as usage grows
5. **Developer Experience**: Strong React integration with `react-map-gl`
6. **Design Flexibility**: Allows for custom map styling that matches brand

### Secondary Consideration: **Google Maps**

**Use Google Maps if**:

- Brand recognition is critical
- Extensive POI data is required
- Users expect familiar Google Maps experience
- Budget allows for higher costs at scale

### Hybrid Approach (Future)

Consider using both:

- **Mapbox**: Primary map display (customization, performance)
- **Google Places API**: POI data and venue information
- **Google Geocoding**: Address validation and geocoding

---

## Implementation Plan

### Phase 1 (Prototype)

- **SDK**: Mapbox GL JS
- **Library**: `react-map-gl`
- **Purpose**: Demo integration, test performance, validate approach

### Phase 2 (MVP Build)

- **SDK**: Mapbox GL JS (primary)
- **Integration**: Full map view with event pins
- **Features**: Custom markers, clustering, filters
- **Styling**: Custom map style via Mapbox Studio

### Phase 3 (Full Build)

- **SDK**: Mapbox GL JS (primary)
- **Enhancements**: 3D buildings, custom layers, advanced visualizations
- **Optional**: Google Places API for venue data

---

## Next Steps

1. ✅ Create Mapbox account and get access token
2. ✅ Install `react-map-gl` and `mapbox-gl` packages
3. ✅ Implement basic map component in prototype
4. ✅ Test mobile performance
5. ✅ Create custom map style in Mapbox Studio
6. ✅ Document integration process

## Resources

- **Mapbox GL JS Docs**: https://docs.mapbox.com/mapbox-gl-js/
- **react-map-gl Docs**: https://visgl.github.io/react-map-gl/
- **Google Maps JS API Docs**: https://developers.google.com/maps/documentation/javascript
- **@react-google-maps/api**: https://react-google-maps-api-docs.netlify.app/
