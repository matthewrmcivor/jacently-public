# Wireframes & Design Concepts - Jacently MVP

## Overview

Mobile-first wireframes and design concepts for Jacently's map-centric event discovery platform. All designs prioritize mobile devices (phones and tablets) with responsive desktop considerations.

## Design Principles

1. **Map-Centric**: Map view is the primary interface
2. **Mobile-First**: Optimized for touch interactions and small screens
3. **Simplicity**: Clean, uncluttered interface
4. **Speed**: Fast loading and responsive interactions
5. **Accessibility**: Clear typography, high contrast, large touch targets

## Screen Wireframes

### 1. Map View (Primary Screen)

```
┌─────────────────────────────────┐
│  [☰]  Jacently        [🔍] [⚙️] │ ← Header (sticky)
├─────────────────────────────────┤
│                                 │
│         📍 User Location        │
│                                 │
│      🎪  🎭  🎨  🎤             │ ← Event Pins
│                                 │
│              🎯                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│  [Radius: 10 mi ▼]  [Filters]  │ ← Controls
├─────────────────────────────────┤
│  [Map] [List]                   │ ← View Toggle
└─────────────────────────────────┘
```

**Key Elements**:

- Full-screen map with event pins
- User location marker (blue dot)
- Event pins with category icons
- Radius control (top right or bottom)
- Filter button
- View toggle (Map/List)
- Search button (optional)

**Interactions**:

- Tap pin → Event preview card
- Tap preview → Event detail page
- Long press pin → Quick actions
- Pinch to zoom
- Pan to explore

---

### 2. List View (Alternative)

```
┌─────────────────────────────────┐
│  [☰]  Jacently        [🔍] [⚙️] │ ← Header
├─────────────────────────────────┤
│  [Radius: 10 mi ▼]  [Filters]  │ ← Controls
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🎪 Farmers Market           │ │ ← Event Card
│ │ Today, 9:00 AM - 2:00 PM   │ │
│ │ 📍 0.5 mi away              │ │
│ │ [Free] [Family-Friendly]   │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🎤 Open Mic Night           │ │
│ │ Tonight, 7:00 PM - 10:00 PM│ │
│ │ 📍 1.2 mi away              │ │
│ │ [Free]                      │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🎯 Trivia Night              │ │
│ │ Tomorrow, 8:00 PM           │ │
│ │ 📍 2.1 mi away              │ │
│ │ [Paid]                      │ │
│ └─────────────────────────────┘ │
│                                 │
│                                 │
├─────────────────────────────────┤
│  [Map] [List]                   │ ← View Toggle
└─────────────────────────────────┘
```

**Key Elements**:

- Scrollable list of event cards
- Event cards show: icon, title, time, distance, tags
- Tap card → Event detail page
- Pull to refresh
- Infinite scroll (future)

---

### 3. Event Detail Page (Modal/Page)

```
┌─────────────────────────────────┐
│  [←]                    [⋯]     │ ← Header
├─────────────────────────────────┤
│  [Event Image/Photo]            │
│                                 │
├─────────────────────────────────┤
│  🎪 Farmers Market              │ ← Title
│  📍 Downtown Plaza              │
│  📅 Today, 9:00 AM - 2:00 PM   │
│  [Free] [Family-Friendly]      │ ← Tags
├─────────────────────────────────┤
│  About                          │
│  Fresh produce, local vendors,  │
│  live music, and food trucks.  │ ← Description
│  Perfect for the whole family!  │
│                                 │
├─────────────────────────────────┤
│  Location                       │
│  📍 123 Main St, City, ST 12345 │
│  [Get Directions]               │ ← Action
│  [Small Map Preview]            │
├─────────────────────────────────┤
│  Contact                        │
│  📧 info@farmersmarket.com      │
│  📞 (555) 123-4567              │
│  🌐 www.farmersmarket.com       │
├─────────────────────────────────┤
│  [Share] [Bookmark] [Report]   │ ← Actions
└─────────────────────────────────┘
```

**Key Elements**:

- Event image/photo (if available)
- Title, location, date/time
- Category tags
- Full description
- Location with map preview
- Contact information
- Action buttons (Share, Bookmark, Report)

**Mobile**: Full-screen modal
**Desktop**: Side panel or modal

---

### 4. Filter Panel

```
┌─────────────────────────────────┐
│  Filters              [✕]       │ ← Header
├─────────────────────────────────┤
│  Time                            │
│  ○ Now                          │
│  ● Today                        │ ← Selected
│  ○ This Week                    │
│                                 │
├─────────────────────────────────┤
│  Attributes                      │
│  ☑ Free                         │ ← Checked
│  ☑ Family-Friendly              │ ← Checked
│  ☐ 18+                          │
│                                 │
├─────────────────────────────────┤
│  Category                        │
│  ☐ Markets & Fairs              │
│  ☐ Entertainment                │
│  ☐ Community                    │
│  ☐ Food & Drink                 │
│                                 │
├─────────────────────────────────┤
│  [Clear All]  [Apply Filters]   │ ← Actions
└─────────────────────────────────┘
```

**Key Elements**:

- Time filters (radio buttons)
- Attribute filters (checkboxes)
- Category filters (checkboxes)
- Clear all button
- Apply button
- Active filter badges shown on main view

**Mobile**: Bottom sheet or slide-in panel
**Desktop**: Side panel or dropdown

---

### 5. Event Creation Form (Sponsor Portal)

```
┌─────────────────────────────────┐
│  [←]  Create Event              │ ← Header
├─────────────────────────────────┤
│  Event Title *                   │
│  [___________________________]   │
│                                 │
│  Category *                      │
│  [Select Category ▼]            │
│                                 │
│  Date & Time *                   │
│  Date: [MM/DD/YYYY]             │
│  Start: [HH:MM]  End: [HH:MM]  │
│                                 │
│  Location *                      │
│  Address: [_________________]   │
│  City: [________]  ST: [__]     │
│  [Use Current Location]         │
│                                 │
│  Description *                   │
│  [___________________________]  │
│  [___________________________]  │
│                                 │
│  Photos                          │
│  [+ Add Photo]                  │
│                                 │
│  Contact Information *           │
│  Name: [_________________]      │
│  Email: [_________________]      │
│  Phone: [_________________]      │
│                                 │
│  Additional Info                 │
│  ☐ Free Event                   │
│  ☐ Family-Friendly              │
│  Website: [_________________]   │
│                                 │
├─────────────────────────────────┤
│  [Cancel]  [Create Event]       │ ← Actions
└─────────────────────────────────┘
```

**Key Elements**:

- Required fields marked with \*
- Category dropdown
- Date/time pickers
- Location input with map picker option
- Photo upload
- Contact information
- Optional attributes
- Form validation

---

### 6. Radius Control

```
┌─────────────────────────────────┐
│  Search Radius                   │
│  [5] ────●────── [150] miles    │ ← Slider
│                                 │
│  Current: 10 miles              │
│                                 │
│  [5] [10] [25] [50] [100] [150]│ ← Quick Select
│                                 │
│  [Apply]                         │
└─────────────────────────────────┘
```

**Key Elements**:

- Slider control (5-150 miles)
- Quick select buttons
- Current radius display
- Visual radius circle on map

---

## Component Specifications

### Event Pin (Map Marker)

- **Size**: 32x32px (touch target: 44x44px)
- **Icon**: Category-specific icon
- **Color**: Primary blue with category accent
- **State**: Default, Hover, Selected
- **Animation**: Scale on tap

### Event Card (List View)

- **Height**: ~120px
- **Padding**: 16px
- **Border Radius**: 12px
- **Shadow**: Subtle elevation
- **Content**: Icon, Title, Time, Distance, Tags

### Filter Badge

- **Height**: 28px
- **Padding**: 8px 12px
- **Border Radius**: 14px
- **Background**: Light gray
- **Text**: Filter name + ✕ icon

### Button

- **Height**: 44px (mobile), 36px (desktop)
- **Padding**: 12px 24px
- **Border Radius**: 8px
- **States**: Default, Hover, Active, Disabled

## Responsive Breakpoints

- **Mobile**: < 768px (primary focus)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Color Palette

- **Primary**: #2563eb (Blue)
- **Secondary**: #10b981 (Green)
- **Accent**: #f59e0b (Orange)
- **Background**: #ffffff
- **Surface**: #f9fafb
- **Text Primary**: #111827
- **Text Secondary**: #6b7280
- **Border**: #e5e7eb
- **Error**: #ef4444
- **Success**: #10b981

## Typography

- **Heading 1**: 24px, Bold
- **Heading 2**: 20px, Semi-bold
- **Heading 3**: 18px, Semi-bold
- **Body**: 16px, Regular
- **Small**: 14px, Regular
- **Caption**: 12px, Regular

## Spacing System

- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

## Interaction Patterns

### Tap Interactions

- **Single Tap**: Select/open
- **Long Press**: Context menu
- **Double Tap**: Zoom (map)

### Gestures

- **Swipe**: Navigate between views
- **Pinch**: Zoom map
- **Pull**: Refresh list
- **Drag**: Pan map

## Accessibility Considerations

- **Touch Targets**: Minimum 44x44px
- **Contrast**: WCAG AA compliant
- **Focus Indicators**: Clear visible focus
- **Screen Readers**: ARIA labels on all interactive elements
- **Keyboard Navigation**: Full keyboard support
- **Text Size**: Scalable up to 200%

## Design System Implementation

The design system is implemented in `src/styles/design-system.css` with CSS custom properties for:

- Colors
- Spacing
- Typography
- Border radius
- Shadows
- Transitions

## Next Steps

1. Create high-fidelity mockups (optional)
2. Build React components based on wireframes
3. Implement responsive layouts
4. Test on actual mobile devices
5. Gather user feedback
