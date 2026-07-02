# Image Upload Error Fix - "Request failed with status code 500"

## Problem

Vendor dashboard ya admin blog me image upload karte waqt yeh error aa raha hai:
```
Error uploading image: Request failed with status code 500
```

## Cause

Yeh error 2 reasons se aa sakta hai:
1. Multer package install nahi hai
2. Uploads folder nahi bana hai

---

## Solution - 3 Steps

### Step 1: Install Multer Package

Backend folder me jao aur multer install karo:

```bash
cd backend
npm install multer
```

**Output dikhega:**
```
added 1 package, and audited X packages in Xs
```

### Step 2: Create Uploads Folder

Backend me uploads folder banao:

**Windows:**
```cmd
cd backend
mkdir uploads
```

**Mac/Linux:**
```bash
cd backend
mkdir uploads
```

**Verify:**
```
backend/
├── uploads/          ← Yeh folder hona chahiye
├── models/
├── routes/
└── server.js
```

### Step 3: Restart Backend Server

```bash
cd backend
npm run dev
```

**Output dikhega:**
```
Server running on port 5000
MongoDB connected
```

---

## Quick Fix (All in One)

Backend folder me yeh commands run karo:

```bash
cd backend
npm install multer
mkdir uploads
npm run dev
```

---

## Verify Fix

### Test Image Upload

1. **Login as Vendor:**
   ```
   http://localhost:3000/vendor/login
   ```

2. **Add Product:**
   ```
   Click "Add Product"
   Fill product details
   ```

3. **Upload Image:**
   ```
   Click "Choose File" for Image 1
   Select any image from computer
   Wait for upload...
   ```

4. **Success:**
   ```
   ✅ "Image uploaded successfully!"
   Image URL appears in input field
   Preview shows on right side
   ```

---

## Check Backend Logs

Backend console me yeh dikhna chahiye:

**Success:**
```
POST /api/upload/image 200 - 123ms
```

**Error (if still failing):**
```
POST /api/upload/image 500 - 45ms
Error: ENOENT: no such file or directory, open 'uploads/...'
```

---

## Common Issues

### Issue 1: "Cannot find module 'multer'"

**Cause:** Multer not installed

**Solution:**
```bash
cd backend
npm install multer
```

### Issue 2: "ENOENT: no such file or directory"

**Cause:** Uploads folder missing

**Solution:**
```bash
cd backend
mkdir uploads
```

### Issue 3: "Permission denied"

**Cause:** No write permission (Linux/Mac)

**Solution:**
```bash
cd backend
chmod 755 uploads
```

### Issue 4: Still getting 500 error

**Debug Steps:**

1. **Check backend console** for detailed error
2. **Verify folder exists:**
   ```bash
   cd backend
   ls -la
   # Should show "uploads" folder
   ```
3. **Check package.json:**
   ```bash
   cat package.json | grep multer
   # Should show: "multer": "^1.4.5-lts.1"
   ```
4. **Restart backend:**
   ```bash
   npm run dev
   ```

---

## File Structure

After fix, your backend should look like:

```
backend/
├── middleware/
│   └── upload.js          ✅ Multer config
├── routes/
│   └── upload.js          ✅ Upload endpoints
├── uploads/               ✅ CREATE THIS FOLDER
│   └── (images will be saved here)
├── node_modules/
│   └── multer/            ✅ INSTALL THIS PACKAGE
├── models/
├── package.json
└── server.js
```

---

## Test Upload Flow

### Complete Test

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Login as Vendor:**
   ```
   Email: vendor@test.com
   Password: vendor123
   ```

3. **Add Product:**
   ```
   Name: Test Product
   Description: Test
   Price: 500
   Stock: 10
   Category: Men
   ```

4. **Upload Image:**
   ```
   Image 1: Click "Choose File"
   Select: any .jpg or .png file
   Wait: "Uploading..." message
   Success: "Image uploaded successfully!"
   ```

5. **Check:**
   ```
   - Image URL appears in input
   - Preview shows on right
   - URL format: http://localhost:5000/uploads/product-xxxxx.jpg
   ```

6. **Save Product:**
   ```
   Click "Add Product"
   Success: "Product added successfully!"
   ```

7. **Verify:**
   ```
   - Product appears in list
   - Image shows in product card
   - Click product to see detail page
   - Image shows properly
   ```

---

## Backend Upload Endpoint

### How It Works

**Endpoint:** `POST /api/upload/image`

**Request:**
```javascript
FormData {
  image: File (from input type="file")
}
```

**Process:**
1. Multer receives file
2. Validates file type (jpg, png, gif, webp)
3. Checks file size (max 5MB)
4. Generates unique filename
5. Saves to `backend/uploads/`
6. Returns URL

**Response (Success):**
```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "http://localhost:5000/uploads/product-1234567890-123456789.jpg",
  "filename": "product-1234567890-123456789.jpg"
}
```

**Response (Error):**
```json
{
  "message": "Error uploading image",
  "error": "ENOENT: no such file or directory"
}
```

---

## Uploads Folder

### What Gets Saved

**Filename Format:**
```
product-{timestamp}-{random}.{extension}
```

**Examples:**
```
product-1709876543210-987654321.jpg
product-1709876543211-123456789.png
product-1709876543212-456789123.webp
```

**Access URL:**
```
http://localhost:5000/uploads/product-1709876543210-987654321.jpg
```

---

## Troubleshooting Commands

### Check if multer is installed
```bash
cd backend
npm list multer
```

**Expected output:**
```
multer@1.4.5-lts.1
```

### Check if uploads folder exists
```bash
cd backend
ls -la | grep uploads
```

**Expected output:**
```
drwxr-xr-x  2 user user 4096 Mar 10 10:00 uploads
```

### Check backend logs
```bash
cd backend
npm run dev
```

**Watch for:**
```
Server running on port 5000
MongoDB connected
```

### Test upload manually
```bash
curl -X POST http://localhost:5000/api/upload/image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/test.jpg"
```

---

## Prevention

### Always Remember

**Before starting project:**
```bash
cd backend
npm install        # Installs all packages including multer
mkdir uploads      # Creates uploads folder
npm run dev        # Starts server
```

**In .gitignore:**
```
# Don't commit uploaded images
uploads/*
!uploads/.gitkeep
```

**Create .gitkeep:**
```bash
cd backend/uploads
touch .gitkeep
```

This ensures uploads folder exists in git but images are not committed.

---

## Summary

**Problem:** Image upload error 500

**Causes:**
1. ❌ Multer not installed
2. ❌ Uploads folder missing

**Solution:**
```bash
cd backend
npm install multer
mkdir uploads
npm run dev
```

**Verify:**
1. ✅ Multer in node_modules
2. ✅ Uploads folder exists
3. ✅ Backend running
4. ✅ Test upload works

**Ab image upload kaam kar raha hai!** 🎉
