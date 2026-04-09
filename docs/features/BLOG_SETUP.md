# Blog System Setup Guide

## Quick Setup

### 1. Create Sample Blog Data

Backend terminal mein run karein:
```bash
cd backend
npm run seed-blogs
```

Yeh automatically create karega:
- 3 Categories (Fashion Tips, Style Guide, News)
- 3 Sample Blogs (published)

### 2. View Blogs

Frontend par jao:
- Public Blog Page: http://localhost:3000/blog
- Admin Blog Management: http://localhost:3000/admin/blogs
- Admin Category Management: http://localhost:3000/admin/categories

## Manual Blog Creation

### Step 1: Login as Admin
```
Email: admin@test.com
Password: admin123
```

### Step 2: Create Categories First

1. Go to: http://localhost:3000/admin/categories
2. Click "Add Category"
3. Fill in:
   - Name: Fashion Tips
   - Description: Latest fashion trends
   - Image URL: (optional)
   - Active: ✓
4. Click "Create Category"

### Step 3: Create Blog

1. Go to: http://localhost:3000/admin/blogs
2. Click "Add Blog"
3. Fill in:
   - Title: Your Blog Title
   - Excerpt: Short description (optional)
   - Content: Full blog content
   - Image URL: (optional)
   - Category: Select from dropdown
   - Tags: fashion, style, trends (comma separated)
   - Published: ✓ (check to make it live)
4. Click "Create Blog"

## Troubleshooting

### Error: "Title is required"
- Make sure title field is not empty
- Title must have at least 1 character

### Error: "Content is required"
- Content field cannot be empty
- Add some text in the content area

### Error: "Blog with this title already exists"
- Each blog must have a unique title
- Change the title slightly

### Error: "Category not found"
- Create categories first before creating blogs
- Or leave category empty (optional)

### Error: "Unauthorized" or "Access denied"
- Make sure you're logged in as admin
- Check browser console for auth errors

### Categories not showing in dropdown
- Go to Categories page and create at least one category
- Refresh the Blogs page

### Blog not appearing on website
- Make sure "Published" checkbox is checked
- Only published blogs appear on public blog page
- Draft blogs only visible in admin panel

## Features

### Admin Features:
- Create, Edit, Delete blogs
- Create, Edit, Delete categories
- Publish/Unpublish blogs
- Add tags to blogs
- Add images to blogs
- Assign categories to blogs
- View blog statistics (views)

### Public Features:
- View all published blogs
- Filter blogs by category
- Read individual blog posts
- View blog metadata (author, date, views)
- See blog tags

## API Endpoints

### Categories:
- GET `/api/categories` - Get all active categories
- POST `/api/categories` - Create category (admin only)
- PUT `/api/categories/:id` - Update category (admin only)
- DELETE `/api/categories/:id` - Delete category (admin only)

### Blogs:
- GET `/api/blogs` - Get all published blogs
- GET `/api/blogs/:slug` - Get single blog by slug
- GET `/api/blogs/admin/all` - Get all blogs (admin only)
- POST `/api/blogs` - Create blog (admin only)
- PUT `/api/blogs/:id` - Update blog (admin only)
- DELETE `/api/blogs/:id` - Delete blog (admin only)

## Database Models

### Category Schema:
```javascript
{
  name: String (required, unique),
  slug: String (auto-generated),
  description: String,
  image: String,
  active: Boolean (default: true)
}
```

### Blog Schema:
```javascript
{
  title: String (required),
  slug: String (auto-generated, unique),
  content: String (required),
  excerpt: String,
  image: String,
  category: ObjectId (ref: Category),
  author: ObjectId (ref: User, required),
  published: Boolean (default: false),
  views: Number (default: 0),
  tags: [String]
}
```

## Tips

1. **Always create categories first** before creating blogs
2. **Use descriptive titles** - they become the URL slug
3. **Add excerpts** for better preview on blog listing page
4. **Use tags** for better organization
5. **Check Published** to make blog visible on website
6. **Add images** for more engaging content
7. **Use line breaks** in content for better readability

## Browser Console Debugging

Open browser console (F12) to see detailed logs:
- "Submitting blog data:" - Shows what data is being sent
- "Create response:" - Shows server response
- "Error saving blog:" - Shows any errors

Check Network tab to see API calls:
- POST /api/blogs - Creating blog
- PUT /api/blogs/:id - Updating blog
- GET /api/blogs/admin/all - Fetching blogs
