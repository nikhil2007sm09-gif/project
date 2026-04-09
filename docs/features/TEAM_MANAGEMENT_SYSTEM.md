# 👥 Team Management System

Complete team management system with admin dashboard, multiple display components, and responsive design.

---

## 🎯 Overview

Team Management System allows admins to:
- Add/Edit/Delete team members
- Upload member images
- Add contact information
- Add social media links
- Display team on multiple pages

Customers can view team members on:
- Home page (carousel slider)
- Product page (grid layout)
- About page (grid layout)

---

## 🏗️ Architecture

### Backend
- **Model:** `backend/models/Team.js`
- **Routes:** `backend/routes/team.js`
- **Database:** MongoDB

### Frontend Components
- **TeamSection:** Grid display component
- **TeamSlider:** Carousel display component
- **AdminTeam:** Admin management page

### Pages with Team Display
- Home page (`/`) - TeamSlider
- Product page (`/products`) - TeamSection
- About page (`/about`) - TeamSection

---

## 📊 Database Schema

```javascript
{
  name: String (required),
  role: String (required),
  description: String (required),
  image: String (required),
  email: String (optional),
  phone: String (optional),
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String
  },
  order: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Get All Team Members
```
GET /api/team
Response: Array of team members
```

### Get Single Team Member
```
GET /api/team/:id
Response: Team member object
```

### Create Team Member (Admin Only)
```
POST /api/team
Headers: Authorization: Bearer {token}
Body: FormData with name, role, description, image, email, phone, order
Response: Created team member
```

### Update Team Member (Admin Only)
```
PUT /api/team/:id
Headers: Authorization: Bearer {token}
Body: FormData with updated fields
Response: Updated team member
```

### Delete Team Member (Admin Only)
```
DELETE /api/team/:id
Headers: Authorization: Bearer {token}
Response: Success message
```

---

## 🎨 Components

### TeamSection Component
**File:** `frontend/src/components/TeamSection.jsx`

Grid display of team members with:
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Hover effects
- Contact icons
- Social media links

**Usage:**
```jsx
import TeamSection from '../../components/TeamSection'

<TeamSection />
```

### TeamSlider Component
**File:** `frontend/src/components/TeamSlider.jsx`

Carousel slider with:
- Navigation arrows
- Thumbnail navigation
- Slide counter
- Responsive design
- Auto-load from API

**Usage:**
```jsx
import TeamSlider from '../../components/TeamSlider'

<TeamSlider />
```

### AdminTeam Page
**File:** `frontend/src/pages/admin/AdminTeam.jsx`

Admin management interface with:
- Add new members
- Edit existing members
- Delete members
- Image upload
- Form validation
- Success/error notifications

**Route:** `/admin/team`

---

## 🚀 How to Use

### For Admin - Add Team Member

1. **Login as Admin**
   ```
   Email: admin@test.com
   Password: admin123
   ```

2. **Navigate to Team Management**
   - Click "Team" in admin sidebar
   - Or visit: `http://localhost:5173/admin/team`

3. **Add Team Member**
   - Click "Add Team Member" button
   - Fill in form:
     - **Name** (required)
     - **Role** (required)
     - **Description** (required)
     - **Email** (optional)
     - **Phone** (optional)
     - **Image** (upload)
     - **Display Order** (optional)
   - Click "Add Team Member"

4. **Edit Team Member**
   - Click "Edit" button on member card
   - Update details
   - Click "Update Team Member"

5. **Delete Team Member**
   - Click "Delete" button on member card
   - Confirm deletion

### For Customers - View Team

1. **Home Page** (`/`)
   - Scroll to team section
   - View carousel slider
   - Click arrows to navigate

2. **Product Page** (`/products`)
   - Scroll to bottom
   - View team grid
   - Hover for effects

3. **About Page** (`/about`)
   - Scroll to bottom
   - View team grid
   - See contact info

---

## 📱 Responsive Design

### Desktop (1024px+)
- TeamSlider: Full width with navigation
- TeamSection: 4 columns grid

### Tablet (768px - 1023px)
- TeamSlider: Responsive layout
- TeamSection: 2 columns grid

### Mobile (< 768px)
- TeamSlider: Full width, single column
- TeamSection: 1 column grid

---

## 🔐 Security

- ✅ Only admins can add/edit/delete
- ✅ Token-based authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ Image upload validation

---

## 🎯 Features

✅ Add/Edit/Delete team members  
✅ Image upload support  
✅ Contact information  
✅ Social media links  
✅ Display order management  
✅ Active/Inactive status  
✅ Responsive design  
✅ Hover effects  
✅ Admin dashboard integration  
✅ Multiple display components  

---

## 📋 Integration Checklist

- [x] Backend model created
- [x] Backend routes created
- [x] Frontend components created
- [x] Admin page created
- [x] Routes added to App.jsx
- [x] Team link added to admin dashboard
- [x] TeamSection added to Product page
- [x] TeamSlider added to Home page
- [x] TeamSection added to About page
- [x] Seed data created

---

## 🔄 Data Flow

```
Admin Dashboard
    ↓
Add/Edit/Delete Team Members
    ↓
Backend API (/api/team)
    ↓
Database (MongoDB)
    ↓
Frontend Components
    ↓
Display on Pages
```

---

## 💡 Best Practices

1. **Image Optimization**
   - Use compressed images
   - Recommended size: 400x400px
   - Supported formats: JPEG, PNG, GIF, WebP

2. **Content**
   - Keep descriptions concise
   - Use professional images
   - Add complete contact info

3. **Display Order**
   - Use order field to arrange members
   - Lower numbers appear first

4. **Social Links**
   - Include full URLs
   - Use HTTPS links
   - Verify links work

---

## 🐛 Troubleshooting

### Images not showing
- Check image URLs are valid
- Verify uploads folder exists
- Check file permissions

### API errors
- Verify backend is running
- Check token is valid
- Check user is admin

### Components not displaying
- Verify imports are correct
- Check routes are added
- Verify components are placed

---

## 📚 Related Documentation

- [Team System Setup](TEAM_SYSTEM_SETUP.md)
- [Team Integration Complete](TEAM_INTEGRATION_COMPLETE.md)
- [Team Added to All Pages](TEAM_ADDED_TO_ALL_PAGES.md)
- [Admin Credentials](../reference/ADMIN_CREDENTIALS.md)

---

## 🎓 Examples

### Add Team Member via API
```bash
curl -X POST http://localhost:5000/api/team \
  -H "Authorization: Bearer {token}" \
  -F "name=John Doe" \
  -F "role=Designer" \
  -F "description=Creative designer with 5 years experience" \
  -F "email=john@example.com" \
  -F "phone=1234567890" \
  -F "image=@image.jpg" \
  -F "order=1"
```

### Get All Team Members
```bash
curl http://localhost:5000/api/team
```

### Update Team Member
```bash
curl -X PUT http://localhost:5000/api/team/{id} \
  -H "Authorization: Bearer {token}" \
  -F "name=Jane Doe" \
  -F "role=Senior Designer"
```

### Delete Team Member
```bash
curl -X DELETE http://localhost:5000/api/team/{id} \
  -H "Authorization: Bearer {token}"
```

---

**Status:** ✅ Complete  
**Last Updated:** April 2026  
**Version:** 1.0
