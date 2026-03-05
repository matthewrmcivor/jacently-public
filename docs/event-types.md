# Event Types Taxonomy - Jacently

## Core Event Categories

Jacently focuses on local, community-driven events. The following taxonomy organizes events into discoverable categories that align with user search behavior.

## Primary Event Categories

### 1. Markets & Fairs

- **Farmers Markets**
- **Craft Fairs**
- **Flea Markets**
- **Artisan Markets**
- **Holiday Markets**

**Characteristics**: Recurring, outdoor/indoor, vendor-based, family-friendly

### 2. Entertainment & Nightlife

- **Open Mic Nights**
- **Karaoke Nights**
- **Trivia Nights**
- **Comedy Shows**
- **Live Music**
- **DJ Sets**
- **Dance Events**

**Characteristics**: Evening/weekend, venue-based, social, age-restricted options

### 3. Community & Social

- **Community Fundraisers**
- **Charity Events**
- **Block Parties**
- **Neighborhood Gatherings**
- **Meetups**
- **Social Mixers**

**Characteristics**: Community-focused, often free, family-friendly, networking

### 4. Food & Drink

- **Food Festivals**
- **Wine Tastings**
- **Beer Gardens**
- **Food Truck Gatherings**
- **Restaurant Events**
- **Cooking Classes**

**Characteristics**: Food-centric, social, age-restricted options

### 5. Arts & Culture

- **Art Exhibitions**
- **Gallery Openings**
- **Theater Performances**
- **Poetry Readings**
- **Book Signings**
- **Cultural Festivals**

**Characteristics**: Cultural enrichment, varied pricing, diverse audiences

### 6. Sports & Recreation

- **Pickup Games**
- **Fitness Classes**
- **Running Groups**
- **Cycling Events**
- **Outdoor Activities**
- **Sports Viewing Parties**

**Characteristics**: Active participation, fitness-focused, varied skill levels

### 7. Educational & Workshops

- **Workshops**
- **Seminars**
- **Classes**
- **Tutorials**
- **Educational Talks**

**Characteristics**: Learning-focused, skill-building, registration often required

### 8. Family & Kids

- **Kids Activities**
- **Family Fun Days**
- **Story Time**
- **Children's Workshops**
- **Family Festivals**

**Characteristics**: Family-friendly, age-appropriate, safe environments

## Event Attributes

### Time-Based Attributes

- **Now** - Events happening currently
- **Today** - Events happening today
- **This Week** - Events within the next 7 days
- **This Weekend** - Events on Saturday/Sunday
- **Upcoming** - Future events beyond this week

### Cost Attributes

- **Free** - No cost to attend
- **Paid** - Requires payment
- **Donation** - Suggested donation
- **Tiered** - Multiple pricing options

### Audience Attributes

- **Family-Friendly** - Appropriate for all ages
- **18+** - Adult-only events
- **21+** - Age-restricted events
- **All Ages** - Open to everyone

### Location Attributes

- **Indoor** - Takes place indoors
- **Outdoor** - Takes place outdoors
- **Virtual** - Online events (future consideration)
- **Hybrid** - Both in-person and virtual

### Frequency Attributes

- **One-Time** - Single occurrence
- **Recurring** - Happens regularly (daily, weekly, monthly)
- **Series** - Multiple related events

## Event Data Schema (Proposed)

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  subcategory?: string;

  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };

  // Timing
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  isRecurring: boolean;
  recurrencePattern?: string;

  // Attributes
  isFree: boolean;
  price?: number;
  currency?: string;
  isFamilyFriendly: boolean;
  ageRestriction?: string;

  // Media
  images: string[];
  thumbnail?: string;

  // Contact & Organization
  organizerName: string;
  organizerEmail: string;
  organizerPhone?: string;
  website?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "cancelled" | "completed";
  views: number;

  // Tags for search
  tags: string[];
}
```

## Search & Discovery Considerations

### Primary Search Methods

1. **Location-based** - Find events near me (5-150 miles)
2. **Category-based** - Browse by event type
3. **Time-based** - Filter by when events occur
4. **Attribute-based** - Filter by free, family-friendly, etc.

### Secondary Discovery Methods (Future)

- Trending events
- Recommended events
- Similar events
- Popular venues
- Event series

## MVP Event Types Priority

For the MVP, we'll focus on the most common and discoverable event types:

1. **High Priority** (MVP):

   - Farmers Markets
   - Open Mic Nights
   - Trivia Nights
   - Karaoke Nights
   - Community Fundraisers

2. **Medium Priority** (MVP):

   - Live Music
   - Food Festivals
   - Art Exhibitions
   - Fitness Classes

3. **Low Priority** (Post-MVP):
   - Virtual Events
   - Recurring Series
   - Complex Multi-Day Events

## Future Considerations

- Event series and recurring patterns
- Multi-day festivals
- Virtual/hybrid events
- Event partnerships and sponsorships
- User-generated event tags
- Event recommendations based on user behavior
