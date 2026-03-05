export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isFree: boolean;
  price?: number;
  isFamilyFriendly: boolean;
  ageRestriction?: string;
  images: string[];
  thumbnail?: string;
  organizer: {
    name: string;
    email: string;
    phone?: string;
    website?: string;
  };
  tags: string[];
  distance?: number; // in miles
}

// Helper to get random location
function getRandomLocation() {
  const locations = [
    { lat: 25.7617, lng: -80.1918, city: 'Miami', zip: '33131', street: '100 NE 1st Avenue' },
    { lat: 25.7663, lng: -80.1918, city: 'Miami', zip: '33131', street: '1200 Brickell Avenue' },
    { lat: 25.8014, lng: -80.1995, city: 'Miami', zip: '33127', street: '2500 NW 2nd Avenue' },
    { lat: 25.7654, lng: -80.2167, city: 'Miami', zip: '33135', street: '1500 SW 8th Street' },
    { lat: 25.7280, lng: -80.2380, city: 'Coconut Grove', zip: '33133', street: '3300 Grand Avenue' },
    { lat: 25.7907, lng: -80.1300, city: 'Miami Beach', zip: '33139', street: '1000 Lincoln Road' },
    { lat: 25.7907, lng: -80.1300, city: 'Miami Beach', zip: '33139', street: '1200 Ocean Drive' },
    { lat: 25.7214, lng: -80.2684, city: 'Coral Gables', zip: '33134', street: '200 Miracle Mile' },
    { lat: 25.9565, lng: -80.1392, city: 'Aventura', zip: '33180', street: '19501 Biscayne Boulevard' },
    { lat: 25.6931, lng: -80.1620, city: 'Key Biscayne', zip: '33149', street: '400 Crandon Boulevard' },
    { lat: 25.8195, lng: -80.3553, city: 'Doral', zip: '33178', street: '8300 NW 36th Street' },
    { lat: 25.8050, lng: -80.1950, city: 'Miami', zip: '33127', street: '3841 NE 2nd Avenue' },
    { lat: 25.8100, lng: -80.1900, city: 'Miami', zip: '33127', street: '3401 NE 1st Avenue' },
    { lat: 25.8915, lng: -80.1265, city: 'Bal Harbour', zip: '33154', street: '9700 Collins Avenue' },
    { lat: 25.9420, lng: -80.1230, city: 'Sunny Isles Beach', zip: '33154', street: '18070 Collins Avenue' },
    { lat: 25.8901, lng: -80.1867, city: 'North Miami', zip: '33161', street: '776 NE 125th Street' }
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

// Event data templates
const eventTemplates = [
  { title: 'Lincoln Road Farmers Market', cat: 'Markets & Fairs', sub: 'Farmers Markets', free: true, family: true, age: null, desc: 'Fresh produce, local vendors, live music, and food trucks. Perfect for the whole family!' },
  { title: 'Open Mic Night', cat: 'Entertainment & Nightlife', sub: 'Open Mic Nights', free: true, family: false, age: '18+', desc: 'Join us for an evening of local talent! Sign-ups start at 6:30 PM. All genres welcome.' },
  { title: 'Trivia Night', cat: 'Entertainment & Nightlife', sub: 'Trivia Nights', free: false, family: false, age: '21+', desc: 'Test your knowledge! Teams of up to 6. Prizes for top teams. Food and drinks available.' },
  { title: 'Karaoke Night', cat: 'Entertainment & Nightlife', sub: 'Karaoke Nights', free: true, family: false, age: '21+', desc: 'Sing your heart out! Song selection available. Happy hour specials until 8 PM.' },
  { title: 'Community Food Drive', cat: 'Community & Social', sub: 'Community Fundraisers', free: true, family: true, age: null, desc: 'Help us collect non-perishable food items for local families in need. Drop-off location with volunteers on site.' },
  { title: 'Craft Fair', cat: 'Markets & Fairs', sub: 'Craft Fairs', free: true, family: true, age: null, desc: 'Local artisans showcasing handmade goods, jewelry, pottery, and more. Food vendors on site.' },
  { title: 'Cultural Festival', cat: 'Arts & Culture', sub: 'Cultural Festivals', free: true, family: true, age: null, desc: 'Celebrate culture with live music, dance performances, authentic food, and art vendors.' },
  { title: 'Food Truck Gathering', cat: 'Food & Drink', sub: 'Food Truck Gatherings', free: true, family: true, age: null, desc: 'Food trucks gather with diverse cuisine options. Live music and outdoor seating.' },
  { title: 'Comedy Show', cat: 'Entertainment & Nightlife', sub: 'Comedy Shows', free: false, family: false, age: '18+', desc: 'Stand-up comedy featuring local and touring comedians. Food and drinks available.' },
  { title: 'Live Music', cat: 'Entertainment & Nightlife', sub: 'Live Music', free: false, family: false, age: '21+', desc: 'Live performances by local bands and musicians. Full bar and food menu available.' },
  { title: 'DJ Set', cat: 'Entertainment & Nightlife', sub: 'DJ Sets', free: false, family: false, age: '21+', desc: 'Dance the night away with top DJs spinning the latest hits. VIP tables available.' },
  { title: 'Charity Event', cat: 'Community & Social', sub: 'Charity Events', free: false, family: true, age: null, desc: 'Fundraising event for local charities. Silent auction and entertainment included.' },
  { title: 'Block Party', cat: 'Community & Social', sub: 'Block Parties', free: true, family: true, age: null, desc: 'Neighborhood block party with food, music, and activities for all ages.' },
  { title: 'Food Festival', cat: 'Food & Drink', sub: 'Food Festivals', free: false, family: true, age: null, desc: 'Taste the best of Miami with food vendors, live music, and family activities.' },
  { title: 'Wine Tasting', cat: 'Food & Drink', sub: 'Wine Tastings', free: false, family: false, age: '21+', desc: 'Sample wines from around the world with expert sommeliers. Light appetizers included.' },
  { title: 'Beer Garden', cat: 'Food & Drink', sub: 'Beer Gardens', free: false, family: false, age: '21+', desc: 'Outdoor beer garden with craft beers, food trucks, and live music.' },
  { title: 'Cooking Class', cat: 'Food & Drink', sub: 'Cooking Classes', free: false, family: true, age: null, desc: 'Learn to cook delicious meals with professional chefs. All ingredients provided.' },
  { title: 'Art Exhibition', cat: 'Arts & Culture', sub: 'Art Exhibitions', free: false, family: true, age: null, desc: 'Contemporary art exhibition featuring local and international artists. Guided tours available.' },
  { title: 'Gallery Opening', cat: 'Arts & Culture', sub: 'Gallery Openings', free: true, family: false, age: '18+', desc: 'Gallery opening reception with artist meet-and-greet. Wine and light refreshments.' },
  { title: 'Theater Performance', cat: 'Arts & Culture', sub: 'Theater Performances', free: false, family: true, age: null, desc: 'Live theater performance by local theater company. Matinee and evening shows available.' },
  { title: 'Poetry Reading', cat: 'Arts & Culture', sub: 'Poetry Readings', free: true, family: false, age: '18+', desc: 'Poetry reading featuring local poets and open mic session. Coffee and pastries available.' },
  { title: 'Book Signing', cat: 'Arts & Culture', sub: 'Book Signings', free: true, family: true, age: null, desc: 'Meet the author and get your book signed. Books available for purchase.' },
  { title: 'Basketball Pickup', cat: 'Sports & Recreation', sub: 'Pickup Games', free: true, family: false, age: null, desc: 'Casual pickup basketball game. All skill levels welcome. Bring your own ball.' },
  { title: 'Yoga Class', cat: 'Sports & Recreation', sub: 'Fitness Classes', free: false, family: true, age: null, desc: 'Outdoor yoga class in the park. Bring your own mat. All levels welcome.' },
  { title: 'Running Group', cat: 'Sports & Recreation', sub: 'Running Groups', free: true, family: false, age: null, desc: 'Group run through scenic Miami routes. All paces welcome. Water provided.' },
  { title: 'Cycling Event', cat: 'Sports & Recreation', sub: 'Cycling Events', free: true, family: false, age: null, desc: 'Group cycling ride through Miami. Helmets required. All skill levels welcome.' },
  { title: 'Outdoor Fitness', cat: 'Sports & Recreation', sub: 'Outdoor Activities', free: true, family: true, age: null, desc: 'Outdoor fitness class in the park. Fun for the whole family. No equipment needed.' },
  { title: 'Sports Viewing Party', cat: 'Sports & Recreation', sub: 'Sports Viewing Parties', free: false, family: false, age: '21+', desc: 'Watch the big game on our large screens. Food and drinks available. Reservations recommended.' },
  { title: 'Workshop', cat: 'Educational & Workshops', sub: 'Workshops', free: false, family: true, age: null, desc: 'Hands-on workshop to learn new skills. Materials provided. Registration required.' },
  { title: 'Seminar', cat: 'Educational & Workshops', sub: 'Seminars', free: false, family: false, age: null, desc: 'Educational seminar on current topics. Q&A session included. Light refreshments provided.' },
  { title: 'Class', cat: 'Educational & Workshops', sub: 'Classes', free: false, family: true, age: null, desc: 'Educational class for all skill levels. Materials included. Registration required.' },
  { title: 'Kids Activity', cat: 'Family & Kids', sub: 'Kids Activities', free: true, family: true, age: null, desc: 'Fun activities for kids including games, crafts, and entertainment. Parent supervision required.' },
  { title: 'Family Fun Day', cat: 'Family & Kids', sub: 'Family Fun Days', free: true, family: true, age: null, desc: 'Family-friendly event with activities, food, and entertainment for all ages.' },
  { title: 'Story Time', cat: 'Family & Kids', sub: 'Story Time', free: true, family: true, age: null, desc: 'Interactive story time for children. Books, songs, and activities. Perfect for toddlers and preschoolers.' },
  { title: 'Children Workshop', cat: 'Family & Kids', sub: 'Children\'s Workshops', free: false, family: true, age: null, desc: 'Creative workshop for children to learn and create. All materials provided. Ages 5-12.' },
  { title: 'Flea Market', cat: 'Markets & Fairs', sub: 'Flea Markets', free: true, family: true, age: null, desc: 'Vintage finds, antiques, collectibles, and more. Food vendors on site. Free parking available.' },
  { title: 'Artisan Market', cat: 'Markets & Fairs', sub: 'Artisan Markets', free: true, family: true, age: null, desc: 'Handmade goods from local artisans. Jewelry, pottery, textiles, and more. Live demonstrations.' },
  { title: 'Dance Event', cat: 'Entertainment & Nightlife', sub: 'Dance Events', free: false, family: false, age: '21+', desc: 'Dance party with live DJ and dance floor. Cocktail specials and VIP areas available.' },
  { title: 'Neighborhood Gathering', cat: 'Community & Social', sub: 'Neighborhood Gatherings', free: true, family: true, age: null, desc: 'Community gathering with food, music, and activities. Meet your neighbors!' },
  { title: 'Meetup', cat: 'Community & Social', sub: 'Meetups', free: true, family: false, age: null, desc: 'Social meetup for networking and making new friends. Light refreshments provided.' },
  { title: 'Social Mixer', cat: 'Community & Social', sub: 'Social Mixers', free: false, family: false, age: '21+', desc: 'Social mixer with drinks, appetizers, and networking opportunities. Dress code: smart casual.' },
  { title: 'Restaurant Event', cat: 'Food & Drink', sub: 'Restaurant Events', free: false, family: true, age: null, desc: 'Special restaurant event with featured menu items and live entertainment. Reservations recommended.' }
];

const venues = ['The Coffee House', 'The Pub', 'The Lounge', 'Community Center', 'Art Gallery', 'Park', 'Beach', 'Plaza', 'Market', 'Theater', 'Restaurant', 'Bar', 'Cafe', 'Studio', 'Gym', 'Library', 'Museum', 'Cultural Center', 'Sports Complex', 'Outdoor Venue', 'Brewery', 'Winery', 'Rooftop', 'Garden', 'Courtyard'];

// Generate 100 events
function generateEvents(): Event[] {
  const events: Event[] = [];
  const baseDate = new Date(2025, 0, 24);
  
  for (let i = 0; i < 100; i++) {
    const loc = getRandomLocation();
    const template = eventTemplates[i % eventTemplates.length];
    const venue = venues[i % venues.length];
    
    // Vary the title
    let title = template.title;
    if (i >= eventTemplates.length) {
      title = `${template.title} at ${venue}`;
    }
    
    // Keep original titles for first 8
    if (i < 8) {
      const originalTitles = [
        'Lincoln Road Farmers Market', 'Open Mic Night at Wynwood Coffee', 'Trivia Night at Brickell Pub',
        'Community Fundraiser: Miami Food Drive', 'Karaoke Night at South Beach Lounge', 'Coconut Grove Artisan Market',
        'Little Havana Cultural Festival', 'Brickell Food Truck Friday'
      ];
      title = originalTitles[i];
    }
    
    const dateOffset = Math.floor(i / 5); // Spread across dates
    const eventDate = new Date(baseDate);
    eventDate.setDate(eventDate.getDate() + dateOffset);
    
    const startHour = 9 + (i % 12); // Vary start times
    const endHour = Math.min(startHour + 2 + (i % 3), 23);
    
    const isFree = template.free && (i % 3 !== 0); // Mix free and paid
    const price = isFree ? undefined : [5, 10, 15, 20, 25, 30, 35, 40, 50][i % 9];
    
    // Add slight variation to coordinates
    const lat = loc.lat + (Math.random() - 0.5) * 0.04;
    const lng = loc.lng + (Math.random() - 0.5) * 0.04;
    
    events.push({
      id: String(i + 1),
      title,
      description: template.desc,
      category: template.cat,
      subcategory: template.sub,
      address: {
        street: loc.street,
        city: loc.city,
        state: 'FL',
        zipCode: loc.zip
      },
      coordinates: { lat, lng },
      startDate: eventDate.toISOString().split('T')[0],
      endDate: eventDate.toISOString().split('T')[0],
      startTime: `${startHour.toString().padStart(2, '0')}:00`,
      endTime: `${endHour.toString().padStart(2, '0')}:00`,
      isFree,
      price,
      isFamilyFriendly: template.family,
      ageRestriction: template.age || undefined,
      images: [],
      thumbnail: `https://via.placeholder.com/300x200?text=${encodeURIComponent(template.title)}`,
      organizer: {
        name: venue,
        email: `info@${venue.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `(305) ${100 + (i % 900)}-${1000 + (i % 9000)}`
      },
      tags: [template.title.toLowerCase().replace(/\s+/g, '-'), 'miami', 'local']
    });
  }
  
  return events;
}

export const mockEvents: Event[] = generateEvents();

// Helper function to get events within radius
export function getEventsWithinRadius(
  events: Event[],
  centerLat: number,
  centerLng: number,
  radiusMiles: number
): Event[] {
  return events
    .map(event => {
      const distance = calculateDistance(
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

// Calculate distance between two coordinates using Haversine formula
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

