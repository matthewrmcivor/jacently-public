# Technology Stack - Jacently

## Overview

This document outlines the final technology stack decisions for Jacently's MVP and full build phases, based on the technical review and alignment with existing developer skills.

## Frontend Stack

### Core Framework

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Routing

- **React Router v6** - Client-side routing

### Mapping

- **Mapbox GL JS** - Primary mapping SDK
- **react-map-gl** - React wrapper for Mapbox

### Styling

- **CSS3** - Custom CSS with design system
- **CSS Custom Properties** - Design tokens (colors, spacing, etc.)

### State Management (Phase 2)

- **React Context API** - For MVP
- **Zustand or Redux** - For full build (if needed)

### Form Handling (Phase 2)

- **React Hook Form** - Form validation and management

### HTTP Client (Phase 2)

- **Axios** or **Fetch API** - API requests

## Backend Stack

### Runtime

- **Node.js 18+** (LTS) - JavaScript runtime

### Framework

- **Express.js** - Web application framework

### Database

- **MongoDB** - NoSQL database
- **MongoDB Atlas** - Cloud database hosting (recommended)

### File Storage

- **AWS S3** - Image and file storage
- **AWS CloudFront** - CDN for static assets (Phase 2)

### Authentication (Phase 2)

- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing

### Validation

- **Joi** or **Zod** - Request validation

### Environment Management

- **dotenv** - Environment variable management

## Hosting & Infrastructure

### Frontend Hosting

- **Vercel** or **Netlify** - Recommended for React apps
- **AWS S3 + CloudFront** - Alternative option
- **Render** - Alternative option

### Backend Hosting

- **Render** - Recommended (free tier available)
- **AWS EC2** or **Elastic Beanstalk** - Alternative
- **Heroku** - Alternative (if budget allows)

### Database Hosting

- **MongoDB Atlas** - Recommended (free tier available)
- **Self-hosted MongoDB** - Alternative (on EC2)

## Development Tools

### Package Manager

- **npm** - Default package manager

### Version Control

- **Git** - Version control
- **GitHub** - Repository hosting

### Code Quality

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Testing (Phase 2)

- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** or **Playwright** - E2E testing (Phase 3)

## Third-Party Services

### Mapping

- **Mapbox** - Primary mapping service
  - Free tier: 50,000 map loads/month
  - Paid: $5 per 1,000 loads after free tier

### Geocoding (Future)

- **Mapbox Geocoding API** - Address to coordinates
- **Google Geocoding API** - Alternative (if needed)

### Analytics (Phase 2)

- **Google Analytics** - User analytics
- **Mixpanel** or **Amplitude** - Product analytics (optional)

### Error Tracking (Phase 2)

- **Sentry** - Error monitoring
- **LogRocket** - Session replay (optional)

### Email (Phase 2)

- **SendGrid** or **AWS SES** - Transactional emails

## Technology Alignment with Resume

### Existing Skills Utilized

✅ **React** - Core frontend framework
✅ **TypeScript** - Type safety throughout
✅ **Node.js** - Backend runtime
✅ **MongoDB** - Database (experience with MySQL/Oracle translates)
✅ **AWS (S3, EC2)** - Cloud infrastructure
✅ **Git/GitHub** - Version control
✅ **REST APIs** - API design and integration

### Skills Strengthened

📈 **Mapbox GL JS** - New mapping SDK
📈 **MongoDB** - Deep dive into NoSQL
📈 **Geospatial Queries** - Location-based data
📈 **Mobile-First Development** - Responsive design
📈 **React Performance** - Optimization techniques

## Package Dependencies

### Frontend (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "react-map-gl": "^7.1.7",
    "mapbox-gl": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### Backend (Phase 2 - package.json)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "aws-sdk": "^2.1500.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "typescript": "^5.2.2",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
```

## Development Workflow

### Local Development

1. Frontend: `npm run dev` (Vite dev server)
2. Backend: `npm run dev` (nodemon with ts-node)
3. Database: MongoDB Atlas connection string

### Build Process

1. Frontend: `npm run build` (Vite production build)
2. Backend: `npm run build` (TypeScript compilation)
3. Deploy: Automated via Git push (Vercel/Render)

### Environment Variables

- `.env.local` - Local development
- `.env.production` - Production environment
- Never commit `.env` files

## Performance Considerations

### Frontend

- Code splitting with React.lazy()
- Image optimization and lazy loading
- Map tile optimization
- Bundle size optimization

### Backend

- Database indexing (geospatial, text, etc.)
- Query optimization
- Caching (Redis in Phase 3)
- API response compression

## Security Considerations

### Frontend

- Environment variables for API keys
- HTTPS only in production
- Input sanitization
- XSS prevention

### Backend

- Input validation
- SQL injection prevention (MongoDB handles)
- CORS configuration
- Rate limiting
- JWT token security
- Password hashing

## Scalability Path

### MVP (Phase 2)

- Single server instance
- MongoDB Atlas free tier
- Basic caching

### Full Build (Phase 3)

- Load balancing (if needed)
- Database replication
- Redis caching layer
- CDN for static assets
- Horizontal scaling

## Cost Estimates

### Development (MVP)

- **Mapbox**: Free (50K loads/month)
- **MongoDB Atlas**: Free tier or $9/month
- **AWS S3**: ~$1-5/month
- **Hosting (Render)**: Free tier or $7/month
- **Total**: ~$0-25/month

### Production (Scaled)

- **Mapbox**: $5-50/month (depending on usage)
- **MongoDB Atlas**: $25-100/month
- **AWS S3**: ~$10-50/month
- **Hosting**: $20-100/month
- **Total**: ~$60-300/month

## Decision Rationale

### Why Mapbox over Google Maps?

- Better customization for branding
- More cost-effective at scale
- Superior mobile performance
- Free tier covers MVP usage

### Why MongoDB over PostgreSQL?

- Flexible schema for MVP
- Native geospatial queries
- Aligns with existing skills
- Faster development

### Why Vite over Create React App?

- Faster build times
- Better developer experience
- Modern tooling
- Smaller bundle sizes

### Why Render over AWS directly?

- Simpler deployment
- Free tier available
- Good for MVP
- Can migrate to AWS later if needed

## Next Steps

1. ✅ Finalize technology stack decisions
2. ✅ Set up frontend project structure
3. ✅ Set up backend project structure (Phase 2)
4. ✅ Configure development environment
5. ✅ Set up CI/CD pipeline (Phase 2)
6. ✅ Deploy to staging environment

## Resources

- **React Docs**: https://react.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/
- **Vite Docs**: https://vitejs.dev/
- **Mapbox GL JS**: https://docs.mapbox.com/mapbox-gl-js/
- **MongoDB Docs**: https://www.mongodb.com/docs/
- **Express Docs**: https://expressjs.com/
- **Node.js Docs**: https://nodejs.org/
