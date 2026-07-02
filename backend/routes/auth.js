import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { sendVendorRegistrationEmail, sendCustomerWelcomeEmail, sendAffiliateRegistrationEmail } from '../services/emailService.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({ 
      name, 
      email, 
      password, 
      role: role || 'customer',
      approved: role === 'customer' || role === 'admin' // Only customers and admin are auto-approved
    })
    
    if (role === 'affiliate') {
      user.affiliateCode = Math.random().toString(36).substring(7).toUpperCase()
    }
    
    await user.save()

    // Send email notifications based on role
    if (role === 'vendor') {
      await sendVendorRegistrationEmail(email, name)
    } else if (role === 'affiliate') {
      await sendAffiliateRegistrationEmail(email, name, user.affiliateCode)
    } else {
      // Customer registration
      await sendCustomerWelcomeEmail(email, name)
    }

    // Don't send token - user must login manually
    if (role === 'vendor' || role === 'affiliate') {
      return res.status(201).json({
        message: 'Registration successful! Your account is pending admin approval. Check your email for details.',
        pending: true
      })
    }

    // Customer registration - no auto login
    res.status(201).json({
      message: 'Registration successful! Check your email for welcome message. Please login to continue.',
      success: true
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body

    console.log('🔐 Login attempt:', { email, userType })

    // Check if input is email or phone number
    const isPhone = /^\d{10}$/.test(email) // Check if it's a 10-digit number
    
    let user
    if (isPhone) {
      // Login with phone number
      user = await User.findOne({ phone: email })
      console.log('📱 Phone login attempt:', email)
    } else {
      // Login with email
      user = await User.findOne({ email })
      console.log('📧 Email login attempt:', email)
    }

    if (!user) {
      console.log('❌ User not found:', email)
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    console.log('✅ User found:', { email: user.email, role: user.role, approved: user.approved })

    if (userType && user.role !== userType) {
      console.log('❌ Role mismatch:', { expected: userType, actual: user.role })
      return res.status(400).json({ message: 'Invalid user type' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email)
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    console.log('✅ Password matched for:', email)

    // Check if vendor/affiliate is approved
    if ((user.role === 'vendor' || user.role === 'affiliate') && !user.approved) {
      console.log('⏳ Account pending approval:', email)
      return res.status(403).json({ 
        message: 'Your account is pending approval. Please wait for admin approval.',
        pending: true
      })
    }

    // Track login activity
    const loginTime = new Date()
    user.lastLoginAt = loginTime
    user.currentSessionStart = loginTime
    
    // Add to login history
    user.loginHistory.push({
      email: user.email,
      loginAt: loginTime,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    })

    // Keep only last 50 login records
    if (user.loginHistory.length > 50) {
      user.loginHistory = user.loginHistory.slice(-50)
    }

    await user.save()

    console.log('✅ Login successful for:', email)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        affiliateCode: user.affiliateCode
      }
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      affiliateCode: user.affiliateCode
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Logout route to track session duration
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Fetch user from database (req.user is from JWT, not Mongoose document)
    const user = await User.findById(req.user._id)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    const logoutTime = new Date()
    
    // Calculate session duration
    if (user.currentSessionStart) {
      const sessionDuration = Math.floor((logoutTime - user.currentSessionStart) / 1000) // in seconds
      user.totalActiveTime += sessionDuration
      
      // Update last login history entry with logout time and duration
      if (user.loginHistory.length > 0) {
        const lastLogin = user.loginHistory[user.loginHistory.length - 1]
        if (!lastLogin.logoutAt) {
          lastLogin.logoutAt = logoutTime
          lastLogin.duration = sessionDuration
        }
      }
    }
    
    user.lastLogoutAt = logoutTime
    user.currentSessionStart = null
    
    await user.save()
    
    res.json({ 
      message: 'Logged out successfully',
      sessionDuration: user.loginHistory.length > 0 ? user.loginHistory[user.loginHistory.length - 1].duration : 0
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user activity history (for admin or user themselves)
router.get('/activity/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params
    
    // Only admin or the user themselves can view activity
    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const user = await User.findById(userId).select('name email role lastLoginAt lastLogoutAt totalActiveTime loginHistory')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    // Format total active time
    const hours = Math.floor(user.totalActiveTime / 3600)
    const minutes = Math.floor((user.totalActiveTime % 3600) / 60)
    const seconds = user.totalActiveTime % 60
    
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      lastLoginAt: user.lastLoginAt,
      lastLogoutAt: user.lastLogoutAt,
      totalActiveTime: user.totalActiveTime,
      totalActiveTimeFormatted: `${hours}h ${minutes}m ${seconds}s`,
      loginHistory: user.loginHistory.slice(-20).reverse() // Last 20 sessions, newest first
    })
  } catch (error) {
    console.error('Activity fetch error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update user profile
router.put('/update-profile', authenticate, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body
    const userId = req.user._id

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' })
      }
      user.email = email
    }

    // Update fields
    if (name) user.name = name
    if (phone) user.phone = phone
    if (address) user.address = address

    await user.save()

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ message: 'Error updating profile' })
  }
})

// Delete account (vendor/affiliate/customer) - Archives all data
router.delete('/delete-account', authenticate, async (req, res) => {
  try {
    const userId = req.user._id
    const userRole = req.user.role
    const userEmail = req.user.email
    
    // Import archive service
    const { archiveUserData } = await import('../services/archiveService.js')
    
    // Archive all user data before deletion
    const archiveResult = await archiveUserData(userId, null, 'Self-deletion by user')
    
    res.json({ 
      message: 'Account deleted successfully. All data has been archived.',
      archived: true,
      summary: archiveResult.summary,
      deletedUser: {
        role: userRole,
        email: userEmail
      }
    })
  } catch (error) {
    console.error('Error deleting account:', error)
    res.status(500).json({ message: 'Error deleting account' })
  }
})

export default router
