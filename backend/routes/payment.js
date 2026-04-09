import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'

const router = express.Router()

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Check if Razorpay is configured with real keys
const isRazorpayConfigured = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || ''
  const keySecret = process.env.RAZORPAY_KEY_SECRET || ''
  
  // Check if keys are real (not placeholder values)
  const isRealKeyId = keyId && !keyId.includes('your_key') && keyId.startsWith('rzp_')
  const isRealKeySecret = keySecret && !keySecret.includes('your_key') && keySecret.length > 20
  
  return isRealKeyId && isRealKeySecret
}

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' })
    }

    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      return res.json({
        test_mode: true,
        id: `order_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR'
      })
    }

    // Create order with Razorpay
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    res.json({
      test_mode: false,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ message: 'Failed to create order', error: error.message })
  }
})

// Verify Payment
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment details' })
    }

    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      return res.json({
        success: true,
        message: 'Payment verified (test mode)'
      })
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expectedSignature === razorpay_signature) {
      res.json({
        success: true,
        message: 'Payment verified successfully'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      })
    }
  } catch (error) {
    console.error('Verify payment error:', error)
    res.status(500).json({ message: 'Failed to verify payment', error: error.message })
  }
})

export default router
