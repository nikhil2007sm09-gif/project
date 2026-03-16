import express from 'express'
import jwt from 'jsonwebtoken'
import Order from '../models/Order.js'
import User from '../models/User.js'
import AffiliateCommission from '../models/AffiliateCommission.js'
import { authenticate } from '../middleware/auth.js'
import { sendOrderConfirmationEmail } from '../services/emailService.js'

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

router.post('/', optionalAuth, async (req, res) => {
  try {
    const orderData = {
      ...req.body
    }
    
    // Add user ID only if logged in
    if (req.user) {
      orderData.user = req.user._id
    }
    
    // Handle affiliate tracking
    if (req.body.affiliateCode) {
      const affiliate = await User.findOne({ 
        affiliateCode: req.body.affiliateCode,
        role: 'affiliate',
        approved: true
      })
      
      if (affiliate) {
        orderData.affiliate = affiliate._id
        orderData.affiliateCode = req.body.affiliateCode
      }
    }
    
    const order = new Order(orderData)
    await order.save()
    
    // Create affiliate commission if applicable
    if (order.affiliate) {
      const commissionRate = 0.10 // 10% commission
      const commissionAmount = order.totalAmount * commissionRate
      
      const commission = new AffiliateCommission({
        affiliate: order.affiliate,
        order: order._id,
        amount: commissionAmount,
        status: 'pending'
      })
      
      await commission.save()
    }
    
    // Send order confirmation email
    const emailData = {
      customerName: req.body.shippingAddress?.fullName || (req.user ? req.user.name : 'Guest'),
      customerEmail: req.body.shippingAddress?.email || (req.user ? req.user.email : ''),
      orderId: order._id.toString().slice(-8).toUpperCase(),
      items: order.items,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      orderDate: order.createdAt
    }
    
    await sendOrderConfirmationEmail(emailData)
    
    res.status(201).json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
