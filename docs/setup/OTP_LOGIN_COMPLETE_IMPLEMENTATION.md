# 📱 OTP-Based Mobile Login System - Complete Implementation

## Overview
Complete OTP authentication system for mobile number registration and login.

## Features Implemented

### Frontend (`frontend/src/pages/MobileLogin.jsx`)
✅ 3-Step Process:
1. **Enter Mobile Number** - User enters 10-digit mobile
2. **Verify OTP** - User enters 6-digit OTP
3. **Complete Profile** - New users enter name & email

✅ Features:
- Real-time mobile number validation
- OTP resend with 30-second timer
- Progress indicator
- Beautiful gradient UI
- Error handling
- Loading states
- Auto-format inputs

### Backend Routes Needed

Create `backend/routes/otp.js`:

```javascript
import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// In-memory OTP storage (use Redis in production)
const otpStore = new Map()

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP (Step 1)
router.post('/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body

    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' })
    }

    // Check if user exists
    const existingUser = await User.findOne({ phone: mobile })
    const isNewUser = !existingUser

    // Generate OTP
    const otp = generateOTP()
    
    // Store OTP with 5-minute expiry
    otpStore.set(mobile, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      attempts: 0
    })

    // TODO: Send SMS using Twilio/MSG91/Fast2SMS
    console.log(`📱 OTP for ${mobile}: ${otp}`)
    
    // For development, return OTP in response (REMOVE IN PRODUCTION!)
    res.json({
      message: 'OTP sent successfully',
      isNewUser,
      // Remove this in production:
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    res.status(500).json({ message: 'Failed to send OTP' })
  }
})

// Verify OTP (Step 2)
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body

    if (!mobile || !otp) {
      return res.status(400).json({ message: 'Mobile and OTP required' })
    }

    // Get stored OTP
    const storedData = otpStore.get(mobile)
    
    if (!storedData) {
      return res.status(400).json({ message: 'OTP expired or not found' })
    }

    // Check expiry
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(mobile)
      return res.status(400).json({ message: 'OTP expired' })
    }

    // Check attempts
    if (storedData.attempts >= 3) {
      otpStore.delete(mobile)
      return res.status(400).json({ message: 'Too many attempts. Request new OTP' })
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      storedData.attempts++
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    // OTP verified - check if existing user
    const user = await User.findOne({ phone: mobile })
    
    if (user) {
      // Existing user - login
      otpStore.delete(mobile)
      
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      )

      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        isNewUser: false
      })
    } else {
      // New user - need to collect details
      res.json({
        message: 'OTP verified. Complete registration',
        isNewUser: true
      })
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({ message: 'Failed to verify OTP' })
  }
})

// Complete Registration (Step 3 - New Users)
router.post('/complete-mobile-registration', async (req, res) => {
  try {
    const { mobile, otp, name, email } = req.body

    if (!mobile || !otp || !name || !email) {
      return res.status(400).json({ message: 'All fields required' })
    }

    // Verify OTP again
    const storedData = otpStore.get(mobile)
    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone: mobile,
      password: Math.random().toString(36).slice(-8), // Random password
      role: 'customer',
      phoneVerified: true
    })

    await user.save()
    otpStore.delete(mobile)

    // Generate token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      message: 'Registration successful'
    })
  } catch (error) {
    console.error('Complete registration error:', error)
    res.status(500).json({ message: 'Registration failed' })
  }
})

export default router
```

### Update User Model

Add to `backend/models/User.js`:

```javascript
phoneVerified: {
  type: Boolean,
  default: false
}
```

### Update Backend Server

Add to `backend/server.js`:

```javascript
import otpRoutes from './routes/otp.js'

app.use('/api/auth', otpRoutes)
```

### Update App Routes

Add to `frontend/src/App.jsx`:

```javascript
import MobileLogin from './pages/MobileLogin'

// In routes:
<Route path="/mobile/login" element={<MobileLogin />} />
```

### Update UnifiedLogin

Add mobile login option to `frontend/src/pages/UnifiedLogin.jsx`:

```javascript
<Link
  to="/mobile/login"
  className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
>
  <Smartphone className="w-5 h-5 mr-2" />
  Login with Mobile OTP
</Link>
```

## SMS Gateway Integration

### Option 1: Twilio (International)
```javascript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

await client.messages.create({
  body: `Your OTP is: ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: `+91${mobile}`
})
```

### Option 2: MSG91 (India)
```javascript
import axios from 'axios'

await axios.get('https://api.msg91.com/api/v5/otp', {
  params: {
    authkey: process.env.MSG91_AUTH_KEY,
    mobile: mobile,
    otp: otp
  }
})
```

### Option 3: Fast2SMS (India - Cheapest)
```javascript
import axios from 'axios'

await axios.post('https://www.fast2sms.com/dev/bulkV2', {
  route: 'v3',
  sender_id: 'FSTSMS',
  message: `Your OTP is ${otp}`,
  language: 'english',
  flash: 0,
  numbers: mobile
}, {
  headers: {
    'authorization': process.env.FAST2SMS_API_KEY
  }
})
```

## Environment Variables

Add to `backend/.env`:

```env
# SMS Gateway (Choose one)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# OR

MSG91_AUTH_KEY=your_msg91_key

# OR

FAST2SMS_API_KEY=your_fast2sms_key
```

## User Flow

### New User Registration:
1. Enter mobile: `9876543210`
2. Receive OTP: `123456`
3. Enter OTP
4. Enter name: `John Doe`
5. Enter email: `john@example.com`
6. Account created ✅
7. Auto-login
8. Redirect to home

### Existing User Login:
1. Enter mobile: `9876543210`
2. Receive OTP: `123456`
3. Enter OTP
4. Auto-login ✅
5. Redirect to home

## Security Features

✅ OTP expires in 5 minutes
✅ Maximum 3 attempts per OTP
✅ Rate limiting (implement in production)
✅ Secure token generation
✅ Phone number validation
✅ OTP stored in memory (use Redis in production)

## Testing

### Development Mode:
- OTP is logged to console
- OTP is returned in API response
- No actual SMS sent

### Production Mode:
- OTP sent via SMS gateway
- OTP not returned in response
- Proper error handling

## Cost Estimation

### SMS Costs (India):
- **Fast2SMS**: ₹0.10 - ₹0.15 per SMS
- **MSG91**: ₹0.15 - ₹0.20 per SMS
- **Twilio**: ₹0.50 - ₹1.00 per SMS

### Monthly Cost (1000 users):
- Fast2SMS: ₹100 - ₹150
- MSG91: ₹150 - ₹200
- Twilio: ₹500 - ₹1000

## Production Checklist

- [ ] Choose SMS gateway
- [ ] Get API keys
- [ ] Add to .env
- [ ] Remove OTP from response
- [ ] Implement rate limiting
- [ ] Use Redis for OTP storage
- [ ] Add SMS delivery tracking
- [ ] Monitor SMS costs
- [ ] Add retry mechanism
- [ ] Implement backup gateway

## Benefits

✅ **No Password Required** - Users don't need to remember passwords
✅ **Quick Registration** - Just mobile number needed
✅ **Secure** - OTP-based authentication
✅ **User Friendly** - Simple 3-step process
✅ **Mobile Verified** - Phone number automatically verified
✅ **Low Friction** - Faster than email registration

## Status
✅ Frontend complete
⏳ Backend routes need to be created
⏳ SMS gateway needs to be integrated
⏳ Routes need to be added to server

## Next Steps

1. Create `backend/routes/otp.js` with above code
2. Update `backend/server.js` to include OTP routes
3. Add `phoneVerified` field to User model
4. Choose and integrate SMS gateway
5. Add mobile login link to UnifiedLogin page
6. Test complete flow
7. Deploy to production

Total implementation time: ~2 hours
