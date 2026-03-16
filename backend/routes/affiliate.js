import express from 'express'
import { authenticate } from '../middleware/auth.js'
import AffiliateLink from '../models/AffiliateLink.js'
import AffiliateClick from '../models/AffiliateClick.js'
import AffiliateCommission from '../models/AffiliateCommission.js'
import User from '../models/User.js'
import Order from '../models/Order.js'

const router = express.Router()

// Get affiliate stats
router.get('/stats', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'affiliate') {
      return res.status(403).json({ message: 'Access denied' })
    }

    // Get user's affiliate code
    const user = await User.findById(req.user._id)
    const affiliateCode = user.affiliateCode

    // Total clicks
    const totalClicks = await AffiliateClick.countDocuments({ affiliate: req.user._id })

    // Total sales (orders with this affiliate code)
    const totalSales = await Order.countDocuments({ affiliateCode })

    // Total commission
    const commissions = await AffiliateCommission.find({ affiliate: req.user._id })
    const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0)

    // Generate affiliate link
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const affiliateLink = `${baseUrl}?ref=${affiliateCode}`

    res.json({
      stats: {
        clicks: totalClicks,
        sales: totalSales,
        commission: totalCommission
      },
      affiliateLink,
      affiliateCode
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Track click (public route)
router.post('/track-click', async (req, res) => {
  try {
    const { affiliateCode, productId } = req.body
    const ipAddress = req.ip || req.socket.remoteAddress
    const userAgent = req.get('user-agent')

    // Find affiliate by code
    const affiliate = await User.findOne({ affiliateCode, role: 'affiliate' })
    
    if (!affiliate) {
      return res.status(404).json({ message: 'Invalid affiliate code' })
    }

    // Find or create affiliate link
    let link = await AffiliateLink.findOne({
      affiliate: affiliate._id,
      product: productId || null
    })

    if (!link) {
      link = new AffiliateLink({
        affiliate: affiliate._id,
        referralCode: affiliateCode,
        product: productId || null
      })
      await link.save()
    }

    // Create click record
    const click = new AffiliateClick({
      affiliateLink: link._id,
      affiliate: affiliate._id,
      product: productId || null,
      ipAddress,
      userAgent
    })
    
    await click.save()

    // Increment click count
    link.clicks += 1
    await link.save()

    res.json({ success: true })
  } catch (error) {
    console.error('Track click error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get commission history
router.get('/commissions', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'affiliate') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const commissions = await AffiliateCommission.find({ affiliate: req.user._id })
      .populate('order')
      .sort({ createdAt: -1 })
      .limit(50)

    res.json(commissions)
  } catch (error) {
    console.error('Get commissions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get recent clicks
router.get('/recent-clicks', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'affiliate') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const clicks = await AffiliateClick.find({ affiliate: req.user._id })
      .populate('product', 'name images')
      .sort({ createdAt: -1 })
      .limit(20)

    res.json(clicks)
  } catch (error) {
    console.error('Get recent clicks error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get analytics
router.get('/analytics', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'affiliate') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const user = await User.findById(req.user._id)
    const affiliateCode = user.affiliateCode

    // Get all commissions
    const commissions = await AffiliateCommission.find({ affiliate: req.user._id })
      .populate('order')

    // Calculate totals
    const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0)
    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)
    
    const thisMonthCommissions = commissions.filter(c => c.createdAt >= thisMonth)
    const thisMonthCommission = thisMonthCommissions.reduce((sum, c) => sum + c.amount, 0)

    // Last month for growth calculation
    const lastMonth = new Date(thisMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    const lastMonthCommissions = commissions.filter(c => 
      c.createdAt >= lastMonth && c.createdAt < thisMonth
    )
    const lastMonthCommission = lastMonthCommissions.reduce((sum, c) => sum + c.amount, 0)
    
    const commissionGrowth = lastMonthCommission > 0 
      ? Math.round(((thisMonthCommission - lastMonthCommission) / lastMonthCommission) * 100)
      : 0

    // Total sales
    const totalSales = await Order.countDocuments({ affiliateCode })
    
    // Recent orders (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentOrders = await Order.countDocuments({ 
      affiliateCode,
      createdAt: { $gte: sevenDaysAgo }
    })

    // Conversion rate
    const totalClicks = await AffiliateClick.countDocuments({ affiliate: req.user._id })
    const conversionRate = totalClicks > 0 ? Math.round((totalSales / totalClicks) * 100) : 0

    // Sales by day (last 7 days)
    const salesByDay = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const dayOrders = await Order.countDocuments({
        affiliateCode,
        createdAt: { $gte: date, $lt: nextDate }
      })
      
      const dayCommissions = commissions.filter(c => 
        c.createdAt >= date && c.createdAt < nextDate
      )
      const dayCommission = dayCommissions.reduce((sum, c) => sum + c.amount, 0)
      
      salesByDay.push({
        date: date.toISOString(),
        orders: dayOrders,
        commission: dayCommission
      })
    }

    // Top customers
    const orders = await Order.find({ affiliateCode })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
    
    const customerMap = {}
    orders.forEach(order => {
      if (order.user) {
        const userId = order.user._id.toString()
        if (!customerMap[userId]) {
          customerMap[userId] = {
            customer: order.user,
            orders: 0,
            commission: 0
          }
        }
        customerMap[userId].orders += 1
        const orderCommission = commissions.find(c => 
          c.order && c.order._id.toString() === order._id.toString()
        )
        if (orderCommission) {
          customerMap[userId].commission += orderCommission.amount
        }
      }
    })
    
    const topCustomers = Object.values(customerMap)
      .sort((a, b) => b.commission - a.commission)
      .slice(0, 5)

    // Recent orders with details
    const recentOrdersList = await Order.find({ affiliateCode })
      .sort({ createdAt: -1 })
      .limit(10)
    
    const recentOrdersWithCommission = recentOrdersList.map(order => {
      const commission = commissions.find(c => 
        c.order && c.order._id.toString() === order._id.toString()
      )
      return {
        customer: order.shippingAddress?.fullName || 'Guest',
        commission: commission ? commission.amount : 0,
        status: commission ? commission.status : 'pending',
        createdAt: order.createdAt
      }
    })

    // Generate affiliate link
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const affiliateLink = `${baseUrl}?ref=${affiliateCode}`

    res.json({
      overview: {
        totalCommission,
        thisMonthCommission,
        commissionGrowth,
        totalSales,
        recentOrders,
        conversionRate
      },
      salesByDay,
      topCustomers,
      recentOrders: recentOrdersWithCommission,
      affiliateLink,
      affiliateCode
    })
  } catch (error) {
    console.error('Get analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
