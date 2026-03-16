# Debugging Guide

## Login Issues

### Check Backend is Running
```bash
# Backend should show:
# MongoDB connected
# Server running on port 5000
```

### Check Frontend Console
Open browser console (F12) and look for:
- Login result logs
- User data logs
- Any error messages

### Test Backend Directly
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123","userType":"admin"}'
```

### Common Issues

1. **"Invalid credentials"**
   - Make sure you ran `npm run seed` in backend
   - Check email and password are correct
   - Check userType matches the user's role

2. **"Network Error"**
   - Backend not running
   - Check backend is on port 5000
   - Check frontend axios baseURL in `frontend/src/utils/axios.js`

3. **"User not found"**
   - Database not seeded
   - Run `npm run seed` in backend folder

4. **Admin/Vendor/Affiliate not showing in navbar**
   - Check browser console for user data
   - User object should have `role` field
   - Clear localStorage and login again

### Clear Cache and Retry
```javascript
// In browser console:
localStorage.clear()
// Then refresh page and login again
```

## Database Issues

### Check MongoDB is Running
```bash
mongosh
# Should connect successfully
```

### View Users in Database
```bash
mongosh
use clothesshop
db.users.find().pretty()
```

### Reset Database
```bash
cd backend
npm run seed
```

## Port Issues

### Backend Port Already in Use
Edit `backend/.env`:
```
PORT=5001
```

Then update `frontend/src/utils/axios.js`:
```javascript
baseURL: 'http://localhost:5001'
```

### Frontend Port Already in Use
Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 3001,
  // ...
}
```

## Enable Debug Logs

### Backend
Add to `backend/server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body)
  next()
})
```

### Frontend
Already added console.logs in:
- `frontend/src/context/AuthContext.jsx`
- All login pages

Check browser console for detailed logs.
