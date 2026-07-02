# Vendor Activity Tracking System

## Overview
Complete activity tracking system for vendors that monitors login sessions, active time, and detailed activity history. All data is automatically saved to MongoDB.

## Features Implemented

### 1. User Model Updates
Added activity tracking fields to User model:
- `lastLoginAt` - Last login timestamp
- `lastLogoutAt` - Last logout timestamp  
- `totalActiveTime` - Total time spent active (in seconds)
- `currentSessionStart` - Current session start time
- `loginHistory` - Array of login sessions with details:
  - Email used for login
  - Login timestamp
  - Logout timestamp
  - Session duration
  - IP address
  - User agent (browser info)

### 2. Backend Routes

#### Login Tracking (`POST /api/auth/login`)
- Automatically records login time
- Saves email, IP address, and browser info
- Adds detailed console logs for debugging
- Keeps last 50 login records per user

#### Logout Tracking (`POST /api/auth/logout`)
- Calculates session duration
- Updates total active time
- Records logout timestamp
- Returns session duration

#### Activity History (`GET /api/auth/activity/:userId`)
- View detailed activity for any user
- Shows formatted total active time
- Returns last 20 sessions
- Access control: admin or user themselves

#### Admin Vendor Activity (`GET /api/admin/vendors-activity`)
- Lists all vendors with activity summary
- Shows online/offline status
- Total active time formatted (hours/minutes)
- Recent 5 logins per vendor
- Sorted by last login time

#### Detailed Vendor Activity (`GET /api/admin/vendor-activity/:vendorId`)
- Complete activity history for specific vendor
- All login sessions with full details
- Current session information
- Online status indicator

### 3. Frontend Updates

#### AuthContext
- Updated logout function to call backend endpoint
- Tracks session duration on logout
- Graceful error handling

#### Admin Dashboard - New "Vendor Activity" Tab
- Beautiful card-based layout
- Real-time online status indicator (green pulse)
- Activity metrics:
  - Total active time (hours/minutes)
  - Total sessions count
  - Last login/logout timestamps
- Recent login history with durations
- Color-coded approval status
- Responsive design

## How It Works

### Login Flow
1. Vendor logs in
2. System records:
   - Login timestamp
   - Email used
   - IP address
   - Browser information
3. Creates new session entry
4. Sets `currentSessionStart`

### Active Session
- Session remains active until logout
- `currentSessionStart` indicates active session
- Admin can see "Online" status

### Logout Flow
1. Vendor clicks logout
2. System calculates session duration
3. Updates `totalActiveTime`
4. Records logout timestamp
5. Clears `currentSessionStart`

### Admin Monitoring
1. Admin opens "Vendor Activity" tab
2. Sees all vendors with activity data
3. Can view:
   - Who is currently online
   - Total time each vendor has been active
   - Recent login history
   - Session durations

## Usage

### For Vendors
No action needed - tracking is automatic!
- Login and logout normally
- Activity is tracked automatically
- All data saved to MongoDB

### For Admins
1. Login as admin
2. Go to Admin Dashboard
3. Click "Vendor Activity" tab
4. View all vendor activity data

### Testing
```bash
# Backend must be running
cd backend
npm start

# Login as vendor
# Do some work
# Logout
# Login as admin
# Check "Vendor Activity" tab
```

## Data Persistence
- All activity data stored in MongoDB
- Survives server restarts
- Historical data preserved
- Last 50 sessions kept per user

## Console Logs
Enhanced login debugging with detailed logs:
- 🔐 Login attempt
- ✅ User found
- ✅ Password matched
- ⏳ Pending approval
- ❌ Various error states

## Benefits
1. **Admin Monitoring** - Track vendor engagement
2. **Activity Analytics** - Understand usage patterns
3. **Session Management** - See who's online
4. **Historical Data** - Review past activity
5. **Debugging** - Detailed logs for troubleshooting

## Security
- Only admin can view all vendor activity
- Users can only view their own activity
- IP addresses and user agents logged for security
- Sensitive data (passwords) never logged

## Future Enhancements
- Export activity reports
- Activity charts and graphs
- Email notifications for inactive vendors
- Session timeout warnings
- Activity-based analytics dashboard
