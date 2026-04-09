# Image Upload Feature - Complete Guide

## Overview

Ab aap laptop ke downloads ya kisi bhi folder se images upload kar sakte ho:
- **Vendor Dashboard:** Product images (5 tak)
- **Admin Blog:** Blog featured image

---

## Setup Instructions

### Step 1: Install Multer Package

Backend folder me jao aur multer install karo:

```bash
cd backend
npm install
```

Yeh `multer` package install kar dega jo already `package.json` me add hai.

### Step 2: Create Uploads Folder

Backend me uploads folder banao:

```bash
mkdir uploads
```

**Windows me:**
```cmd
cd backend
mkdir uploads
```

### Step 3: Start Backend Server

```bash
npm run dev
```

Server start hone ke baad yeh message dikhega:
```
Server running on port 5000
MongoDB connected
```

---

## Features

### 1. Vendor Product Images

**Location:** Vendor Dashboard → Add/Edit Product

**Features:**
- Upload 5 images per product
- Each image slot has:
  - File upload button (laptop se select karo)
  - URL input field (ya direct URL paste karo)
  - Live preview
- First image = Main product image
- Remaining images = Gallery images

**How to Use:**

1. **Upload from Computer:**
   ```
   Click "Choose File" → Select image from laptop → Auto uploads
   ```

2. **Or Paste URL:**
   ```
   Type/paste image URL in the text field
   ```

3. **Preview:**
   ```
   Image preview automatically shows on right side
   ```

### 2. Admin Blog Images

**Location:** Admin Dashboard → Manage Blogs → Add/Edit Blog

**Features:**
- Upload 1 featured image per blog
- File upload button
- URL input field
- Large preview (max-width: 500px)

**How to Use:**

1. **Upload from Computer:**
   ```
   Click "Choose File" → Select image → Auto uploads
   ```

2. **Or Paste URL:**
   ```
   Type/paste image URL in the text field
   ```

3. **Preview:**
   ```
   Large preview shows below the upload section
   ```

---

## Technical Details

### Backend API

**Endpoint:** `POST /api/upload/image`

**Request:**
```javascript
FormData with 'image' field
```

**Response:**
```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "http://localhost:5000/uploads/product-1234567890-123456789.jpg",
  "filename": "product-1234567890-123456789.jpg"
}
```

**Features:**
- File size limit: 5MB
- Allowed formats: JPEG, JPG, PNG, GIF, WEBP
- Unique filename: `product-{timestamp}-{random}.ext`
- Stored in: `backend/uploads/`
- Accessible at: `http://localhost:5000/uploads/{filename}`

### File Storage

**Location:** `backend/uploads/`

**Naming Convention:**
```
product-1709876543210-987654321.jpg
product-1709876543211-123456789.png
```

**Static Serving:**
```javascript
// In server.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
```

### Frontend Implementation

**Vendor Dashboard:**
```javascript
const handleFileUpload = async (index, file) => {
  const formData = new FormData()
  formData.append('image', file)
  
  const res = await axios.post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  
  // Update image URL in state
  setFormData({ ...formData, images: [...images, res.data.imageUrl] })
}
```

**Admin Blogs:**
```javascript
const handleImageUpload = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  
  const res = await axios.post('/api/upload/image', formData)
  
  // Update image URL in state
  setFormData({ ...formData, image: res.data.imageUrl })
}
```

---

## User Interface

### Vendor Product Form

```
┌─────────────────────────────────────────────────┐
│ Product Images (up to 5)                        │
│ Upload from computer or paste image URL.        │
│ First image will be the main product image.     │
├─────────────────────────────────────────────────┤
│ Image 1 (Main):                                 │
│ [Choose File] [No file chosen]                  │
│ Or URL: [________________________] [Preview]    │
├─────────────────────────────────────────────────┤
│ Image 2:                                        │
│ [Choose File] [No file chosen]                  │
│ Or URL: [________________________] [Preview]    │
├─────────────────────────────────────────────────┤
│ ... (3 more slots)                              │
└─────────────────────────────────────────────────┘
```

### Admin Blog Form

```
┌─────────────────────────────────────────────────┐
│ Blog Image                                      │
├─────────────────────────────────────────────────┤
│ Upload from Computer:                           │
│ [Choose File] [No file chosen]                  │
│                                                 │
│ Or paste Image URL:                             │
│ [_________________________________________]     │
│                                                 │
│ Preview:                                        │
│ ┌─────────────────────────────────────┐        │
│ │                                     │        │
│ │         [Image Preview]             │        │
│ │                                     │        │
│ └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────┘
```

---

## Validation

### File Type Check
```javascript
if (!file.type.startsWith('image/')) {
  alert('Please select an image file')
  return
}
```

### File Size Check
```javascript
if (file.size > 5 * 1024 * 1024) {
  alert('Image size should be less than 5MB')
  return
}
```

### Backend Validation
```javascript
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'))
  }
}
```

---

## Error Handling

### Upload Errors

**File too large:**
```
Error: Image size should be less than 5MB
```

**Invalid file type:**
```
Error: Please select an image file
```

**Network error:**
```
Error uploading image: Network Error
```

**Server error:**
```
Error uploading image: Server error
```

### Loading States

**During Upload:**
```javascript
{uploadingImage && (
  <span className="text-sm text-blue-600">Uploading...</span>
)}
```

**Button Disabled:**
```javascript
<input
  type="file"
  disabled={uploadingImage}
/>
```

---

## Testing

### Test Vendor Product Upload

1. **Login as Vendor:**
   ```
   URL: http://localhost:3000/vendor/login
   Email: vendor@test.com
   Password: vendor123
   ```

2. **Add Product:**
   ```
   Click "Add Product"
   Fill product details
   ```

3. **Upload Images:**
   ```
   Image 1: Click "Choose File" → Select from laptop
   Wait for "Image uploaded successfully!"
   Image 2: Paste URL or upload another file
   ```

4. **Submit:**
   ```
   Click "Add Product"
   Check product card shows uploaded images
   ```

### Test Admin Blog Upload

1. **Login as Admin:**
   ```
   URL: http://localhost:3000/login?type=admin
   Email: admin@test.com
   Password: admin123
   ```

2. **Add Blog:**
   ```
   Click "Add Blog"
   Fill blog details
   ```

3. **Upload Image:**
   ```
   Click "Choose File" → Select image
   Wait for "Image uploaded successfully!"
   See preview below
   ```

4. **Submit:**
   ```
   Click "Create Blog"
   Check blog list shows uploaded image
   ```

---

## Troubleshooting

### Issue: "Cannot find package 'multer'"

**Solution:**
```bash
cd backend
npm install multer
```

### Issue: "ENOENT: no such file or directory, open 'uploads'"

**Solution:**
```bash
cd backend
mkdir uploads
```

### Issue: Images not showing after upload

**Check:**
1. Backend server running?
2. Uploads folder exists?
3. Image URL correct? (should be `http://localhost:5000/uploads/...`)
4. Browser console for errors?

### Issue: "File too large"

**Solution:**
- Compress image before upload
- Use online tools like TinyPNG
- Or increase limit in `backend/middleware/upload.js`:
  ```javascript
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
  ```

### Issue: Upload button not working

**Check:**
1. File input has `accept="image/*"`
2. onChange handler attached
3. No JavaScript errors in console
4. Network tab shows POST request

---

## File Structure

```
backend/
├── middleware/
│   └── upload.js          # Multer configuration
├── routes/
│   └── upload.js          # Upload endpoints
├── uploads/               # Uploaded images stored here
│   ├── product-123.jpg
│   ├── product-456.png
│   └── ...
└── server.js              # Static file serving

frontend/
└── src/
    └── pages/
        ├── VendorDashboard.jsx    # Product image upload
        └── AdminBlogs.jsx         # Blog image upload
```

---

## Security Features

### File Type Validation
- Only image files allowed
- Checks both extension and MIME type

### File Size Limit
- Maximum 5MB per file
- Prevents server overload

### Unique Filenames
- Timestamp + random number
- Prevents filename conflicts
- No overwriting existing files

### Authentication Required
- Must be logged in to upload
- JWT token verification
- Role-based access (vendor/admin)

---

## Best Practices

### For Users

1. **Image Size:**
   - Compress images before upload
   - Recommended: < 1MB per image
   - Use JPEG for photos, PNG for graphics

2. **Image Dimensions:**
   - Products: 800x800px or 1000x1000px
   - Blogs: 1200x630px (social media optimized)

3. **File Names:**
   - Use descriptive names
   - Avoid special characters
   - Example: `red-tshirt-front.jpg`

### For Developers

1. **Backup:**
   - Regularly backup `uploads/` folder
   - Consider cloud storage (AWS S3, Cloudinary)

2. **Optimization:**
   - Add image compression on upload
   - Generate thumbnails automatically
   - Use CDN for faster delivery

3. **Cleanup:**
   - Delete unused images periodically
   - Track image usage in database
   - Remove orphaned files

---

## Future Enhancements

### Planned Features

1. **Image Compression:**
   - Auto-compress on upload
   - Multiple sizes (thumbnail, medium, large)

2. **Cloud Storage:**
   - AWS S3 integration
   - Cloudinary support
   - CDN delivery

3. **Image Editor:**
   - Crop and resize
   - Filters and effects
   - Text overlay

4. **Drag & Drop:**
   - Drag files to upload
   - Multiple file selection
   - Progress bar

5. **Gallery Management:**
   - Reorder images
   - Set featured image
   - Bulk upload

---

## Summary

✅ **Vendor Products:** Upload 5 images per product
✅ **Admin Blogs:** Upload 1 featured image per blog
✅ **File Upload:** From laptop/computer
✅ **URL Support:** Paste image URLs
✅ **Live Preview:** See images before saving
✅ **Validation:** File type and size checks
✅ **Security:** Authentication required
✅ **Storage:** Local backend/uploads folder

**Ab aap easily images upload kar sakte ho!** 🎉
