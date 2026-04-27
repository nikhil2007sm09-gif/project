# Auto Guide System - Automated User Guidance

## Features

Auto Guide is an automated guidance system that helps new users understand different sections of the website.

### Current Pages

1. **Login Page** - Login guidance
2. **Product Page** - Product browsing and purchasing guidance

## How It Works

### 1. Auto Start
- When a user visits a page for the first time, the guide starts automatically
- Users are guided through different steps

### 2. Saved in LocalStorage
- After viewing the guide once, it's saved in `seenGuides`
- The guide won't show again on subsequent visits

### 3. Restart Guide
- Users can click the "Guide" button to view the guide again
- This button is located at the bottom right of the page

## Components

### AutoGuide.jsx
**Location:** `frontend/src/components/AutoGuide.jsx`

This is the main component that displays the guide.

**Props:**
- `page` (string): Page name - 'login' or 'product'
- `onClose` (function): Callback when guide closes

**Features:**
- Highlight with overlay
- Smooth animations
- Complete English guidance
- Mobile responsive

### GuideButton.jsx
**Location:** `frontend/src/components/GuideButton.jsx`

This button restarts the guide.

## Login Page Guide Steps

```
1. Welcome - Form introduction
2. Enter Email - Email field
3. Enter Password - Password field
4. Login - Login button
5. Create New Account - Registration link
```

## Product Page Guide Steps

```
1. Browse Products - Product grid
2. Product Details - Click any card
3. Price and Size - Price information
4. Select Color - Color options
5. Select Size - Size options
6. Add to Cart - Add to Cart button
7. Add to Wishlist - Wishlist button
8. View Cart - Cart icon
```

## Usage

### Include in Page

```jsx
import AutoGuide from '../../components/AutoGuide'

export default function MyPage() {
  return (
    <div>
      <AutoGuide page="product" />
      {/* rest of content */}
    </div>
  )
}
```

### Add New Page

1. Add new guide in `AutoGuide.jsx`:

```jsx
const guides = {
  myPage: [
    {
      title: 'Title',
      description: 'Description',
      target: '.selector',
      position: 'bottom',
      highlight: true,
    },
    // more steps...
  ],
}
```

2. Include in page:

```jsx
<AutoGuide page="myPage" />
```

## Styling

### CSS Classes

- `.guide-overlay` - Dark background
- `.guide-highlight` - Highlight box
- `.guide-tooltip` - Information box
- `.guide-btn` - Buttons

### Customization

Edit `AutoGuide.css` to change colors and sizes:

```css
.guide-highlight {
  border: 3px solid #ff6b6b; /* Change color */
}

.guide-btn-next {
  background: #ff6b6b; /* Button color */
}
```

## LocalStorage

### Seen Guides

```javascript
// Format
{
  "login": true,
  "product": true
}

// View
const seenGuides = JSON.parse(localStorage.getItem('seenGuides') || '{}')

// Restart
delete seenGuides['product']
localStorage.setItem('seenGuides', JSON.stringify(seenGuides))
```

## Mobile Responsive

- Auto-sized on small screens
- Touch-friendly buttons
- Stays within viewport

## Future Features

- [ ] Home page guide
- [ ] Checkout guide
- [ ] Admin dashboard guide
- [ ] Analytics tracking
- [ ] Video tutorials
- [ ] Keyboard shortcuts

## Troubleshooting

### Guide not showing

```javascript
// Clear LocalStorage
localStorage.removeItem('seenGuides')
// Reload page
location.reload()
```

### Highlight in wrong position

- CSS selector might be wrong
- Element class might have changed
- Check selector in `AutoGuide.jsx`

### Tooltip going outside

- Change position: 'top', 'bottom', 'left', 'right'
- Increase gap in `getTooltipPosition` function

## Code Example

```jsx
// Product.jsx
import AutoGuide from '../../components/AutoGuide'

export default function Product() {
  return (
    <div className="min-h-screen">
      <AutoGuide page="product" />
      
      {/* Products Grid */}
      <div className="products-grid">
        {/* Product Cards */}
        <div className="product-card">
          <div className="product-price">₹999</div>
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="wishlist-btn">❤️</button>
        </div>
      </div>
    </div>
  )
}
```

## Performance

- Lightweight component
- No external dependencies
- Smooth animations
- Minimal re-renders

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

---

**Last Updated:** April 2026
**Version:** 1.0.0
