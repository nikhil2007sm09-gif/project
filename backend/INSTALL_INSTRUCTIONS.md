# Backend Setup Instructions

## IMPORTANT: Image Upload Setup

### Quick Setup (3 Steps):

**Step 1: Install Multer**
```bash
cd backend
npm install
```

**Step 2: Create Uploads Folder**
```bash
mkdir uploads
```

**Step 3: Start Server**
```bash
npm run dev
```

---

## Error Fix: Multer Package Missing

Agar backend start karte waqt yeh error aaye:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'multer'
```

### Solution:

Backend folder me jao aur packages install karo:

```bash
cd backend
npm install
```

Yeh command package.json me jo bhi dependencies hai sab install kar dega, including multer.

### Create Uploads Folder

Images store karne ke liye uploads folder banao:

```bash
mkdir uploads
```

### Start Server

```bash
npm run dev
```

---

## What is Multer?

- Multer ek package hai jo file uploads handle karta hai
- Yeh images ko laptop se upload karke `backend/uploads` folder me save karega
- Phir woh images `http://localhost:5000/uploads/filename` se accessible hongi

---

## Features Now Available

### 1. Vendor Product Images
- Upload 5 images per product from laptop
- Or paste image URLs
- Live preview

### 2. Admin Blog Images
- Upload blog featured image from laptop
- Or paste image URL
- Large preview

---

## Verify Installation

Installation ke baad check karo:

```bash
npm list multer
```

Agar sab theek hai to aapko version number dikhega:
```
multer@1.4.5-lts.1
```

---

## Folder Structure

After setup, your backend should look like:

```
backend/
├── middleware/
│   └── upload.js          ✅ Already created
├── routes/
│   └── upload.js          ✅ Already created
├── uploads/               ⚠️ YOU NEED TO CREATE THIS
│   └── (uploaded images will be stored here)
├── node_modules/
│   └── multer/            ⚠️ INSTALL WITH npm install
├── package.json           ✅ Already has multer dependency
└── server.js              ✅ Already configured
```

---

## Common Issues

### Issue 1: Multer not found
```bash
cd backend
npm install
```

### Issue 2: Uploads folder missing
```bash
cd backend
mkdir uploads
```

### Issue 3: Permission denied (Linux/Mac)
```bash
chmod 755 uploads
```

---

## Test Upload

After setup, test image upload:

1. Start backend: `npm run dev`
2. Login as vendor: http://localhost:3000/vendor/login
3. Add product
4. Click "Choose File" and select an image
5. Should see "Image uploaded successfully!"

---

## Need Help?

Check these files for detailed guides:
- `IMAGE_UPLOAD_GUIDE.md` - Complete image upload documentation
- `TROUBLESHOOTING.md` - Common issues and solutions
- `QUICKSTART.md` - Quick start guide

