import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { sendOTP } from '../services/smsService.js'

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

    // Send SMS
    const smsResult = await sendOTP(mobile, otp)
    
    res.json({
      message: 'OTP sent successfully',
      isNewUser,
      // Return OTP only in development mode
      ...(smsResult.otp && { otp: smsResult.otp })
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
      return res.status(400).json({ message: 'OTP expired or not found. Please request a new OTP.' })
    }

    // Check expiry
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(mobile)
      return res.status(400).json({ message: 'OTP expired. Please request a new OTP.' })
    }

    // Check attempts
    if (storedData.attempts >= 3) {
      otpStore.delete(mobile)
      return res.status(400).json({ message: 'Too many attempts. Please request a new OTP.' })
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      storedData.attempts++
      return res.status(400).json({ message: `Invalid OTP. ${3 - storedData.attempts} attempts remaining.` })
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
        isNewUser: false,
        message: 'Login successful'
      })
    } else {
      // New user - need to collect details
      res.json({
        message: 'OTP verified. Please complete your registration.',
        isNewUser: true,
        tempToken: mobile // Temporary identifier
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
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Verify OTP again
    const storedData = otpStore.get(mobile)
    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP. Please start again.' })
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered. Please use a different email.' })
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone: mobile })
    if (existingPhone) {
      return res.status(400).json({ message: 'Mobile number already registered.' })
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone: mobile,
      password: Math.random().toString(36).slice(-8) + 'Aa1!', // Random secure password
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
      message: 'Registration successful! Welcome to ClothesShop.'
    })
  } catch (error) {
    console.error('Complete registration error:', error)
    res.status(500).json({ message: 'Registration failed. Please try again.' })
  }
})

export default router
