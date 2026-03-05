# Backend Architecture Proposal - Jacently

## Overview

This document outlines the proposed backend architecture for Jacently's MVP and full build phases. The architecture is designed to be scalable, maintainable, and aligned with the developer's existing skills (Node.js, MongoDB, PostgreSQL, AWS).

## Technology Stack Decision

### Recommended Stack: **Node.js + MongoDB**

**Rationale**:

1. **Developer Experience**: Aligns with existing skills (Node.js, MongoDB)
2. **Flexibility**: MongoDB's document model fits event data structure well
3. **Rapid Development**: Faster MVP development with flexible schema
4. **Scalability**: Can scale horizontally as needed
5. **Cost-Effective**: Lower initial infrastructure costs

### Alternative: **Node.js + PostgreSQL**

**Consider PostgreSQL if**:

- Complex relational queries are required
- ACID compliance is critical
- Team has strong SQL expertise
- Need for complex joins and aggregations

## Architecture Overview

### High-Level Architecture

```
┌─────────────┐
│   Client    │
│  (React)    │
└──────┬──────┘
       │
       │ HTTPS/REST API
       │
┌──────▼──────────────────┐
│   Node.js/Express API   │
│   (REST Endpoints)      │
└──────┬──────────────────┘
       │
       ├──────────┬──────────┐
       │          │          │
┌──────▼──┐  ┌───▼────┐  ┌──▼──────┐
│ MongoDB │  │ AWS S3 │  │ Mapbox  │
│ Database│  │(Images)│  │  API    │
└─────────┘  └────────┘  └─────────┘
```

## Database Schema Design

### MongoDB Collections

#### Events Collection

```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  category: string,
  subcategory?: string,

  // Location
  address: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    coordinates: {
      type: "Point",
      coordinates: [lng, lat] // GeoJSON format
    }
  },

  // Timing
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string,
  timezone: string,
  isRecurring: boolean,
  recurrencePattern?: string,

  // Attributes
  isFree: boolean,
  price?: number,
  currency?: string,
  isFamilyFriendly: boolean,
  ageRestriction?: string,

  // Media
  images: string[], // S3 URLs
  thumbnail?: string,

  // Contact & Organization
  organizer: {
    name: string,
    email: string,
    phone?: string,
    website?: string
  },

  // Metadata
  createdAt: Date,
  updatedAt: Date,
  status: 'active' | 'cancelled' | 'completed',
  views: number,

  // Search
  tags: string[],

  // Indexes
  // - 2dsphere index on address.coordinates
  // - Text index on title, description, tags
  // - Index on category, startDate, status
}
```

#### Users Collection (Phase 2)

```typescript
{
  _id: ObjectId,
  email: string,
  passwordHash: string,
  name: string,
  preferences: {
    defaultRadius: number,
    favoriteCategories: string[],
    notifications: boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Event Sponsors Collection (Phase 2)

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  organizationName: string,
  contactInfo: {
    email: string,
    phone: string,
    website?: string
  },
  verificationStatus: 'pending' | 'verified' | 'rejected',
  createdAt: Date
}
```

## API Endpoints

### Events API

#### GET /api/events

**Query Parameters**:

- `lat` (required): Latitude
- `lng` (required): Longitude
- `radius` (optional): Search radius in miles (default: 10)
- `category` (optional): Event category filter
- `timeFilter` (optional): 'now', 'today', 'thisWeek'
- `isFree` (optional): boolean
- `isFamilyFriendly` (optional): boolean
- `limit` (optional): Results limit (default: 50)
- `offset` (optional): Pagination offset

**Response**:

```json
{
  "events": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "address": {...},
      "startDate": "ISO date",
      "endDate": "ISO date",
      "coordinates": [lng, lat],
      "distance": 2.5,
      "isFree": true,
      "isFamilyFriendly": true,
      "thumbnail": "url"
    }
  ],
  "total": 25,
  "limit": 50,
  "offset": 0
}
```

#### GET /api/events/:id

**Response**: Full event details

#### POST /api/events

**Body**: Event creation data
**Response**: Created event with ID

#### PUT /api/events/:id

**Body**: Updated event data
**Response**: Updated event

#### DELETE /api/events/:id

**Response**: Success confirmation

### Geospatial Query Example

```javascript
// MongoDB geospatial query for nearby events
const events = await Event.find({
  "address.coordinates": {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
      $maxDistance: radius * 1609.34, // Convert miles to meters
    },
  },
  startDate: { $gte: new Date() },
  status: "active",
})
  .limit(limit)
  .skip(offset);
```

## Technology Choices

### Runtime: Node.js

- **Version**: Node.js 18+ (LTS)
- **Framework**: Express.js
- **Rationale**:
  - Aligns with existing skills
  - Fast development
  - Large ecosystem
  - Good performance for I/O-heavy operations

### Database: MongoDB

- **Version**: MongoDB 6.0+
- **Hosting**: MongoDB Atlas (cloud) or self-hosted
- **Rationale**:
  - Flexible schema for MVP
  - Native geospatial queries
  - Good performance for read-heavy workloads
  - Easy horizontal scaling

### File Storage: AWS S3

- **Purpose**: Event images and thumbnails
- **Rationale**:
  - Scalable and cost-effective
  - CDN integration (CloudFront)
  - Aligns with existing AWS skills

### Authentication (Phase 2): JWT

- **Library**: `jsonwebtoken`
- **Storage**: HTTP-only cookies or localStorage
- **Rationale**: Stateless, scalable, secure

### Validation: Joi or Zod

- **Purpose**: Request validation
- **Rationale**: Type-safe validation, good TypeScript support

### Environment Variables: dotenv

- **Purpose**: Configuration management
- **Rationale**: Standard practice, secure

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── aws.ts
│   ├── controllers/
│   │   ├── events.controller.ts
│   │   └── auth.controller.ts
│   ├── models/
│   │   ├── Event.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── events.routes.ts
│   │   └── auth.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── services/
│   │   ├── geocoding.service.ts
│   │   └── image.service.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── app.ts
├── tests/
├── .env
├── package.json
└── tsconfig.json
```

## API Design Principles

### RESTful Design

- Use standard HTTP methods (GET, POST, PUT, DELETE)
- Resource-based URLs
- Proper HTTP status codes
- Consistent response format

### Error Handling

```json
{
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "Event with ID 123 not found",
    "statusCode": 404
  }
}
```

### Pagination

- Use `limit` and `offset` for pagination
- Include `total` count in response
- Default limit: 50 items

### Rate Limiting

- Implement rate limiting (e.g., 100 requests/minute)
- Use `express-rate-limit` middleware

## Security Considerations

### Input Validation

- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries (MongoDB handles this)

### Authentication & Authorization

- JWT tokens for authentication (Phase 2)
- Role-based access control (Phase 2)
- Event ownership verification

### CORS

- Configure CORS for frontend domain
- Restrict to specific origins in production

### Environment Variables

- Never commit `.env` files
- Use environment variables for secrets
- Rotate API keys regularly

## Deployment Architecture

### Development

- Local MongoDB or MongoDB Atlas (free tier)
- Local Node.js server
- AWS S3 bucket for images

### Production (AWS)

- **Compute**: EC2 or Elastic Beanstalk
- **Database**: MongoDB Atlas or self-hosted on EC2
- **Storage**: S3 for images
- **CDN**: CloudFront for static assets
- **Load Balancer**: Application Load Balancer (if needed)

### Alternative: Render

- **Compute**: Render Web Service
- **Database**: Render PostgreSQL (if using PostgreSQL) or MongoDB Atlas
- **Storage**: AWS S3 or Render Disk
- **CDN**: CloudFront or Render CDN

## Performance Optimization

### Database Indexes

- Geospatial index on `address.coordinates`
- Text index on `title`, `description`, `tags`
- Indexes on `category`, `startDate`, `status`

### Caching

- Redis for frequently accessed data (Phase 2)
- Cache event lists by location/radius
- Cache geocoding results

### Image Optimization

- Resize images on upload
- Generate thumbnails
- Use WebP format when possible
- Lazy load images on frontend

## Monitoring & Logging

### Logging

- Use `winston` or similar for structured logging
- Log errors, API requests, performance metrics
- Store logs in CloudWatch (AWS) or similar

### Monitoring

- Application performance monitoring (APM)
- Database query performance
- API response times
- Error rates

## Testing Strategy

### Unit Tests

- Test controllers, services, utilities
- Use Jest or Mocha
- Mock database calls

### Integration Tests

- Test API endpoints
- Test database operations
- Use test database

### E2E Tests (Future)

- Test complete user flows
- Use Cypress or Playwright

## Migration Path

### Phase 1 (Exploratory)

- No backend required
- Mock data in frontend

### Phase 2 (MVP Build)

- Node.js + Express API
- MongoDB database
- Basic CRUD operations
- Geospatial queries
- Image upload to S3

### Phase 3 (Full Build)

- Authentication & authorization
- User management
- Advanced features
- Performance optimizations
- Caching layer

## Next Steps

1. ✅ Finalize database schema
2. ✅ Set up Node.js + Express project structure
3. ✅ Configure MongoDB connection
4. ✅ Implement basic CRUD endpoints
5. ✅ Implement geospatial queries
6. ✅ Set up image upload to S3
7. ✅ Add error handling and validation
8. ✅ Deploy to staging environment
