import express from 'express'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Optional authentication - allows guest checkout
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
    } catch (error) {
      // Invalid token, but continue as guest
      req.user = null
    }
  } else {
    req.user = null
  }
  
  next()
}

// Check if Razorpay is configured
const isRazorpayConfigured = 
  process.env.RAZORPAY_KEY_ID && 
  process.env.RAZORPAY_KEY_ID !== 'test_key' &&
  process.env.RAZORPAY_KEY_SECRET && 
  process.env.RAZORPAY_KEY_SECRET !== 'test_secret'

let razorpay = null

if (isRazorpayConfigured) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
}

// Create Razorpay order
router.post('/create-order', optionalAuth, async (req, res) => {
  try {
    const { amount } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' })
    }

    // If Razorpay not configured, return mock order for testing
    if (!isRazorpayConfigured) {
      console.log('⚠️ Razorpay not configured. Using test mode.')
      return res.json({
        id: `order_test_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        key_id: 'rzp_test_demo',
        test_mode: true,
        message: 'Test mode - No real payment will be processed'
      })
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: req.user ? {
        userId: req.user._id.toString(),
        userName: req.user.name
      } : {
        guestCheckout: true
      }
    }

    const order = await razorpay.orders.create(options)
    
    res.json({
      ...order,
      key_id: process.env.RAZORPAY_KEY_ID,
      test_mode: false
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    res.status(500).json({ 
      message: 'Payment order creation failed', 
      error: error.message,
      details: 'Please check your Razorpay API keys in .env file'
    })
  }
})

// Verify Razorpay payment
router.post('/verify', optionalAuth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    // If test mode, auto-verify
    if (razorpay_order_id.startsWith('order_test_')) {
      console.log('✅ Test mode payment verified')
      return res.json({ 
        success: true, 
        message: 'Test payment verified successfully',
        paymentId: razorpay_payment_id || `pay_test_${Date.now()}`,
        orderId: razorpay_order_id,
        test_mode: true
      })
    }

    if (!isRazorpayConfigured) {
      return res.status(400).json({ 
        success: false, 
        message: 'Razorpay not configured' 
      })
    }

    // Create signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature === expectedSign) {
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        test_mode: false
      })
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid signature' 
      })
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Payment verification failed',
      error: error.message
    })
  }
})

// Get payment details
router.get('/payment/:paymentId', authenticate, async (req, res) => {
  try {
    if (!isRazorpayConfigured) {
      return res.status(400).json({ 
        message: 'Razorpay not configured' 
      })
    }

    const payment = await razorpay.payments.fetch(req.params.paymentId)
    res.json(payment)
  } catch (error) {
    console.error('Fetch payment error:', error)
    res.status(500).json({ 
      message: 'Error fetching payment details',
      error: error.message
    })
  }
})

export default router
