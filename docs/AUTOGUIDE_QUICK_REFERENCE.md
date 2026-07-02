# Auto Guide System - Quick Reference

## 🚀 Quick Start

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

## 📋 Current Pages

| Page | Status | Steps |
|------|--------|-------|
| Login | ✅ | 5 |
| Product | ✅ | 8 |
| Admin Login | ✅ | 5 |

## 🎯 Guide Pages

```javascript
// Available pages
'login'      // Customer login
'product'    // Product listing
'admin'      // Admin login
```

## 💾 LocalStorage

### View
```javascript
localStorage.getItem('seenGuides')
// Output: {"login":true,"product":true}
```

### Clear
```javascript
localStorage.removeItem('seenGuides')
location.reload()
```

### Clear One Guide
```javascript
const guides = JSON.parse(localStorage.getItem('seenGuides') || '{}')
delete guides['product']
localStorage.setItem('seenGuides', JSON.stringify(guides))
location.reload()
```

## 🎨 Customization

### Change Colors
```css
/* AutoGuide.css */
.guide-highlight {
  border: 3px solid #your-color;
}

.guide-btn-next {
  background: #your-color;
}
```

### Change Position
```jsx
{
  position: 'top'      // 'top', 'bottom', 'left', 'right'
}
```

### Disable Highlight
```jsx
{
  highlight: false     // No highlight box
}
```

## 📝 Add New Guide

### Step 1: Add in AutoGuide.jsx
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
    {
      title: 'Second Step',
      description: 'More description',
      target: '.another-selector',
      position: 'top',
      highlight: false,
    },
  ],
}
```

### Step 2: Include in Page
```jsx
<AutoGuide page="myPage" />
```

## 🔧 Troubleshooting

### Guide not showing
```javascript
// 1. Clear LocalStorage
localStorage.removeItem('seenGuides')

// 2. Reload page
location.reload()

// 3. Check console
console.log(localStorage.getItem('seenGuides'))
```

### Highlight in wrong position
```javascript
// CSS selector might be wrong
// Use correct selector

// Wrong
target: '.product'

// Correct
target: '.products-grid .product-card'
```

### Tooltip going outside
```jsx
// Change position
position: 'left'  // Instead of 'top'
```

## 📱 Mobile Testing

```javascript
// Test on mobile
// Chrome DevTools → Toggle device toolbar
// Or open on your phone
```

## 🎬 Animations

```css
/* Highlight pulse */
@keyframes pulse {
  0% { box-shadow: ... }
  50% { box-shadow: ... }
  100% { box-shadow: ... }
}

/* Tooltip slide in */
@keyframes slideIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
```

## 📊 Performance

- Bundle Size: ~5KB
- No Dependencies
- 60fps Animations
- Mobile Optimized

## 🌍 Browser Support

✅ Chrome
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile

## 📚 Files

```
AutoGuide.jsx          Main component
AutoGuide.css          Styling
GuideButton.jsx        Restart button
AUTO_GUIDE_SYSTEM.md   Full documentation
AUTOGUIDE_SETUP.md     Setup guide
AUTOGUIDE_SUMMARY.md   Summary
AUTOGUIDE_ARCHITECTURE.md  Architecture
```

## 🔗 Integration

### Login Page
```jsx
import AutoGuide from '../../components/AutoGuide'

export default function Login() {
  return (
    <div>
      <AutoGuide page="login" />
      {/* form */}
    </div>
  )
}
```

### Product Page
```jsx
import AutoGuide from '../../components/AutoGuide'

export default function Product() {
  return (
    <div>
      <AutoGuide page="product" />
      {/* products */}
    </div>
  )
}
```

## 🎯 CSS Selectors

### Login Page
```css
.login-form              /* Form container */
input[type="email"]      /* Email input */
input[type="password"]   /* Password input */
button[type="submit"]    /* Submit button */
.signup-link             /* Signup link */
```

### Product Page
```css
.products-grid           /* Products container */
.product-card            /* Product card */
.product-price           /* Price */
.color-selector          /* Color options */
.size-selector           /* Size options */
.add-to-cart-btn         /* Add to cart button */
.wishlist-btn            /* Wishlist button */
.cart-icon               /* Cart icon */
```

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Guide not showing | `localStorage.removeItem('seenGuides')` |
| Highlight wrong position | Check CSS selector |
| Tooltip outside | Change position |
| Wrong on mobile | Check responsive CSS |

## 💡 Tips

1. **Clear LocalStorage** - If having issues
2. **Check CSS Selectors** - Wrong selector won't highlight
3. **Change Position** - If tooltip goes outside
4. **Test on Mobile** - Works on all devices
5. **Check Console** - For any errors

## 🎓 Learning Resources

- `AUTOGUIDE_SETUP.md` - Detailed setup
- `AUTO_GUIDE_SYSTEM.md` - Complete documentation
- `AUTOGUIDE_ARCHITECTURE.md` - Architecture
- `AUTOGUIDE_SUMMARY.md` - Summary

## 📞 Support

If you have issues:

1. Clear LocalStorage
2. Check CSS selectors
3. Check console for errors
4. Read documentation

---

**Version:** 1.0.0
**Last Updated:** April 2026

🎉 **Happy Guiding!**
