# MVP Scope - Refined (Post-Phase 1)

## Overview

This document provides the refined MVP scope for Jacently based on Phase 1 exploratory work. The scope has been validated through prototype development and technical review.

## Phase 1 Validation

### Validated Assumptions

✅ **Map-Centric Interface**: Confirmed as primary discovery method
✅ **Mobile-First Design**: Prototype demonstrates mobile-friendly layout
✅ **Filter Functionality**: Basic filters work well, advanced filters planned for Phase 2
✅ **Event Detail Pages**: Modal approach works well for mobile
✅ **Technology Stack**: React + TypeScript + Mapbox + MongoDB confirmed

### Refinements Based on Prototype

- **Map Integration**: Mapbox selected over Google Maps (cost, customization, performance)
- **Backend**: MongoDB confirmed (flexibility, geospatial queries)
- **Hosting**: Render + Vercel/Netlify recommended (simplicity, cost)
- **Event Creation**: Moved to Phase 2 (focus on discovery first)

## MVP Scope (Phase 2)

### Core Features (Must Have)

#### 1. Map View

- ✅ Interactive Mapbox map
- ✅ Event pins with category icons
- ✅ User location marker
- ✅ Clickable pins to view event details
- ✅ Map controls (zoom, pan)
- ✅ Custom map styling

#### 2. List View

- ✅ Alternative to map view
- ✅ Scrollable event cards
- ✅ Event information display
- ✅ Clickable cards to view details

#### 3. Event Discovery

- ✅ Geolocation-based search
- ✅ Radius control (5-150 miles)
- ✅ Events within radius displayed
- ✅ Distance calculation
- ✅ Event sorting by distance

#### 4. Event Filters

- ✅ Time filters: Today, This Week
- ✅ Attribute filters: Free, Family-Friendly
- ✅ Filter badges showing active filters
- ✅ Clear filters functionality
- ⏳ Advanced filters (Phase 2 - full panel)

#### 5. Event Details

- ✅ Event detail modal/page
- ✅ Full event information
- ✅ Date, time, location
- ✅ Description
- ✅ Contact information
- ✅ "Get Directions" button
- ✅ Event tags (Free, Family-Friendly, etc.)

#### 6. Mobile-First Design

- ✅ Responsive layout
- ✅ Touch-friendly interactions
- ✅ Mobile-optimized UI
- ✅ Fast loading times

### Enhanced Features (Phase 2)

#### 7. Event Creation (Sponsor Portal)

- ⏳ Event creation form
- ⏳ Image upload
- ⏳ Form validation
- ⏳ Event submission
- ⏳ Event management

#### 8. Backend API

- ⏳ REST API endpoints
- ⏳ Event CRUD operations
- ⏳ Geospatial queries
- ⏳ Image upload to S3
- ⏳ Data validation

#### 9. Advanced Filters

- ⏳ Full filter panel
- ⏳ Category filters
- ⏳ Date range filters
- ⏳ Advanced search

### Out of Scope (Post-MVP)

#### Phase 3 Features

- ❌ User authentication
- ❌ User accounts
- ❌ Event bookmarking
- ❌ Social sharing
- ❌ Recurring events
- ❌ Admin dashboard
- ❌ Payment integration
- ❌ Push notifications
- ❌ Event recommendations

## Technical Requirements

### Frontend

- React 18 + TypeScript
- Mapbox GL JS integration
- Responsive CSS design system
- Mobile-first approach
- Performance optimization

### Backend

- Node.js + Express
- MongoDB with geospatial queries
- AWS S3 for images
- REST API architecture
- Error handling and validation

### Hosting

- Frontend: Vercel or Netlify
- Backend: Render or AWS
- Database: MongoDB Atlas
- Storage: AWS S3

## Success Criteria

### Technical

- [ ] Mapbox map loads in < 3 seconds
- [ ] App works on iOS Safari and Chrome Android
- [ ] Geolocation accuracy within 100 meters
- [ ] No critical bugs
- [ ] API response time < 500ms

### User Experience

- [ ] Users find events within 2 minutes
- [ ] Filters work correctly
- [ ] Event details display properly
- [ ] Mobile experience is smooth
- [ ] Intuitive navigation

### Business

- [ ] Prototype demonstrates value
- [ ] Ready for stakeholder review
- [ ] Ready for user testing
- [ ] Clear path to Phase 3

## Timeline

**Phase 2 Duration**: 14-16 weeks
**Estimated Hours**: 197-285 hours
**Estimated Cost**: $29,550 - $42,750 (at $150/hr)

## Next Steps

1. ✅ Complete Phase 1 (Exploratory)
2. ⏳ Review prototype with stakeholders
3. ⏳ Gather feedback
4. ⏳ Finalize Phase 2 plan
5. ⏳ Begin Phase 2 development

## Conclusion

The MVP scope has been refined based on Phase 1 exploratory work. The prototype successfully demonstrates core functionality and validates the technical approach. Phase 2 will build upon this foundation to create a fully functional MVP.
