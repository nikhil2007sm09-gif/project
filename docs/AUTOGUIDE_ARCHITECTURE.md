# Auto Guide System - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Auto Guide System                         │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼────────┐   │   ┌────────▼────────┐
        │  AutoGuide.jsx │   │   │ GuideButton.jsx │
        │  (Main Logic)  │   │   │ (Restart Btn)   │
        └────────────────┘   │   └─────────────────┘
                │             │
        ┌───────▼────────┐   │
        │ AutoGuide.css  │   │
        │  (Styling)     │   │
        └────────────────┘   │
                              │
        ┌─────────────────────▼──────────────────────┐
        │         LocalStorage (seenGuides)          │
        │  { login: true, product: true, ... }       │
        └────────────────────────────────────────────┘
```

## Component Flow

```
User Visits Page
      │
      ▼
┌─────────────────────────────────┐
│ AutoGuide Component Mounts      │
└─────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────┐
│ Check LocalStorage              │
│ (seenGuides[page])              │
└─────────────────────────────────┘
      │
      ├─── Already Seen ──────┐
      │                       │
      ▼                       ▼
   Hidden              Show Guide
      │                       │
      │                   ┌───────────────────┐
      │                   │ Display Overlay   │
      │                   │ + Highlight       │
      │                   │ + Tooltip         │
      │                   └───────────────────┘
      │                       │
      │                   ┌───────────────────┐
      │                   │ User Navigates    │
      │                   │ Steps             │
      │                   └───────────────────┘
      │                       │
      │                   ┌───────────────────┐
      │                   │ Guide Complete    │
      │                   │ Save to Storage   │
      │                   └───────────────────┘
      │                       │
      └───────────┬───────────┘
                  │
                  ▼
          ┌──────────────────┐
          │ User Can Restart │
          │ with Guide Btn   │
          └──────────────────┘
```

## Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                    Page Component                         │
│  (Login, Product, Admin)                                 │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │  <AutoGuide page="product" /> │
        └───────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    ┌────────┐    ┌─────────┐    ┌──────────┐
    │ Guides │    │ Current │    │ Position │
    │ Config │    │ Step    │    │ Logic    │
    └────────┘    └─────────┘    └──────────┘
        │               │               │
        └───────────────┼───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Render UI Elements          │
        │  - Overlay                    │
        │  - Highlight Box              │
        │  - Tooltip                    │
        │  - Navigation Buttons         │
        └───────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   User Interaction            │
        │  - Next Button                │
        │  - Previous Button            │
        │  - Close Button               │
        └───────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Update State & Storage      │
        │  - Update currentStep         │
        │  - Save to LocalStorage       │
        │  - Scroll to Element          │
        └───────────────────────────────┘
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AutoGuide.jsx          ← Main Component
│   │   ├── AutoGuide.css          ← Styling
│   │   └── GuideButton.jsx        ← Restart Button
│   │
│   └── pages/
│       ├── auth/
│       │   └── Login.jsx          ← Updated
│       ├── admin/
│       │   └── AdminLogin.jsx     ← Updated
│       └── customer/
│           └── Product.jsx        ← Updated
│
docs/
├── features/
│   └── AUTO_GUIDE_SYSTEM.md       ← Full Documentation
│
├── AUTOGUIDE_SETUP.md             ← Setup Guide
├── AUTOGUIDE_SUMMARY.md           ← Summary
└── AUTOGUIDE_ARCHITECTURE.md      ← This File
```

## Component Props

```jsx
<AutoGuide 
  page="product"           // 'login' | 'product' | 'admin'
  onClose={() => {}}       // Optional callback
/>
```

## State Management

```javascript
// Component State
{
  currentStep: 0,          // Current guide step
  isVisible: true,         // Show/hide guide
  hasSeenGuide: false      // Check if seen before
}

// LocalStorage
{
  seenGuides: {
    login: true,
    product: true,
    admin: true
  }
}
```

## Guide Configuration

```javascript
const guides = {
  login: [
    {
      title: 'Title',              // Step title
      description: 'Description',  // Step description
      target: '.selector',         // CSS selector
      position: 'bottom',          // 'top'|'bottom'|'left'|'right'
      highlight: true              // Show highlight box
    },
    // ... more steps
  ],
  product: [
    // ... steps
  ]
}
```

## Lifecycle

```
1. Component Mount
   ├─ Check LocalStorage
   ├─ Load guides for page
   └─ Set initial state

2. Render
   ├─ Check if visible
   ├─ Get current step
   ├─ Calculate positions
   └─ Render UI

3. User Interaction
   ├─ Next/Previous
   ├─ Close
   └─ Scroll to element

4. Update
   ├─ Update currentStep
   ├─ Scroll to new element
   └─ Re-render

5. Complete
   ├─ Save to LocalStorage
   ├─ Hide guide
   └─ Call onClose callback
```

## CSS Architecture

```css
/* Main Container */
.guide-overlay          /* Dark background */
.guide-highlight        /* Highlight box */
.guide-tooltip          /* Info box */

/* Tooltip Positioning */
.guide-tooltip-top      /* Top position */
.guide-tooltip-bottom   /* Bottom position */
.guide-tooltip-left     /* Left position */
.guide-tooltip-right    /* Right position */

/* Content */
.guide-header           /* Title + Close */
.guide-footer           /* Progress + Buttons */

/* Buttons */
.guide-btn              /* Base button */
.guide-btn-prev         /* Previous button */
.guide-btn-next         /* Next button */

/* Animations */
@keyframes pulse        /* Highlight pulse */
@keyframes slideIn      /* Tooltip slide in */
```

## Responsive Breakpoints

```css
/* Desktop */
max-width: 300px
padding: 20px

/* Tablet (768px) */
max-width: 280px
padding: 16px

/* Mobile (480px) */
max-width: 90vw
padding: 14px
```

## Performance Optimization

```javascript
// Lazy Loading
const guides = {
  login: [...],      // Loaded on demand
  product: [...]     // Loaded on demand
}

// Memoization
const getHighlightPosition = (element) => {
  // Calculate once, reuse
}

// Event Delegation
// Single overlay click handler
// No individual element listeners
```

## Browser APIs Used

```javascript
// DOM APIs
document.querySelector()
element.getBoundingClientRect()
element.scrollIntoView()

// Storage APIs
localStorage.getItem()
localStorage.setItem()

// Window APIs
window.scrollY
window.innerWidth
window.scrollIntoView()
```

## Error Handling

```javascript
// Element Not Found
if (!targetElement) {
  // Skip highlight
  // Show tooltip anyway
}

// LocalStorage Not Available
try {
  localStorage.setItem()
} catch (e) {
  // Fallback to session
}

// Invalid Position
// Default to 'bottom'
```

## Integration Points

```
┌─────────────────────────────────────────┐
│         Page Component                  │
├─────────────────────────────────────────┤
│  import AutoGuide from '...'            │
│  <AutoGuide page="product" />           │
└─────────────────────────────────────────┘
         │
         ├─ Provides: page name
         ├─ Receives: onClose callback
         └─ Expects: CSS selectors to exist
```

## Extensibility

### Adding New Page

```javascript
// 1. Add to guides object
const guides = {
  newPage: [
    { title: '...', ... }
  ]
}

// 2. Use in component
<AutoGuide page="newPage" />
```

### Customizing Styles

```css
/* Override in your CSS */
.guide-highlight {
  border: 3px solid #custom-color;
}
```

### Adding Callbacks

```jsx
<AutoGuide 
  page="product"
  onClose={() => {
    // Do something when guide closes
  }}
/>
```

## Testing Strategy

```javascript
// Unit Tests
- Test guide configuration
- Test position calculations
- Test localStorage operations

// Integration Tests
- Test component rendering
- Test user interactions
- Test page integration

// E2E Tests
- Test full guide flow
- Test on different devices
- Test browser compatibility
```

## Deployment Checklist

- [ ] All components created
- [ ] CSS imported correctly
- [ ] Pages updated with AutoGuide
- [ ] LocalStorage working
- [ ] Mobile responsive
- [ ] English text displaying
- [ ] Animations smooth
- [ ] No console errors
- [ ] Documentation complete
- [ ] Testing done

---

**Version:** 1.0.0
**Last Updated:** April 2026
