import express from 'express'
import User from '../models/User.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import AffiliateCommission from '../models/AffiliateCommission.js'

const router = express.Router()

// Get public statistics for footer
router.get('/public', async (req, res) => {
  try {
    console.log('Fetching public stats...')
    
    // Get total customers (approved users with customer role)
    const totalCustomers = await User.countDocuments({ 
      role: 'customer',
      approved: true 
    })

    // Get total completed orders
    const totalOrders = await Order.countDocuments({ 
      paymentStatus: 'completed' 
    })

    // Get total products
    const totalProducts = await Product.countDocuments()

    // Calculate average rating (using likes as a proxy for rating)
    const products = await Product.find({}, 'likes')
    const totalLikes = products.reduce((sum, product) => sum + (product.likes || 0), 0)
    const averageRating = products.length > 0 ? Math.min(5, Math.max(4, (totalLikes / products.length) * 0.1 + 4)) : 4.8

    // Get recent orders for delivery time calculation
    const recentOrders = await Order.find({ 
      paymentStatus: 'completed',
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    }).sort({ createdAt: -1 }).limit(100)

    // Calculate average delivery time (mock calculation based on recent orders)
    const averageDeliveryHours = recentOrders.length > 0 ? 24 : 24 // You can implement real delivery tracking

    // Get newsletter subscribers count (mock for now)
    const newsletterSubscribers = Math.floor(totalCustomers * 0.6) // 60% of customers subscribed

    // Get total affiliate commissions
    const totalCommissions = await AffiliateCommission.countDocuments()

    // Get active vendors and affiliates
    const activeVendors = await User.countDocuments({ role: 'vendor', approved: true })
    const activeAffiliates = await User.countDocuments({ role: 'affiliate', approved: true })

    const statsData = {
      customers: totalCustomers,
      orders: totalOrders,
      products: totalProducts,
      rating: parseFloat(averageRating.toFixed(1)),
      deliveryHours: averageDeliveryHours,
      newsletterSubscribers,
      commissions: totalCommissions,
      // Additional stats
      activeVendors,
      activeAffiliates,
      // Growth metrics (last 30 days vs previous 30 days)
      growth: {
        customers: await calculateGrowth('customer'),
        orders: await calculateOrderGrowth(),
        products: await calculateProductGrowth()
      },
      // Timestamp for cache busting
      timestamp: new Date().toISOString(),
      // Server status
      serverStatus: 'online'
    }

    console.log('Stats data prepared:', statsData)
    res.json(statsData)
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ 
      message: 'Error fetching statistics',
      // Fallback stats
      customers: 1250,
      orders: 3400,
      products: 850,
      rating: 4.8,
      deliveryHours: 24,
      newsletterSubscribers: 750,
      commissions: 120,
      activeVendors: 25,
      activeAffiliates: 45,
      growth: {
        customers: 15,
        orders: 25,
        products: 10
      },
      timestamp: new Date().toISOString(),
      serverStatus: 'fallback'
    })
  }
})

// Helper function to calculate user growth
async function calculateGrowth(role) {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)

    const currentPeriod = await User.countDocuments({
      role,
      approved: true,
      createdAt: { $gte: thirtyDaysAgo }
    })

    const previousPeriod = await User.countDocuments({
      role,
      approved: true,
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    })

    if (previousPeriod === 0) return 100
    return Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100)
  } catch (error) {
    return 15 // Default growth percentage
  }
}

// Helper function to calculate order growth
async function calculateOrderGrowth() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)

    const currentPeriod = await Order.countDocuments({
      paymentStatus: 'completed',
      createdAt: { $gte: thirtyDaysAgo }
    })

    const previousPeriod = await Order.countDocuments({
      paymentStatus: 'completed',
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    })

    if (previousPeriod === 0) return 100
    return Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100)
  } catch (error) {
    return 25 // Default growth percentage
  }
}

// Helper function to calculate product growth
async function calculateProductGrowth() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)

    const currentPeriod = await Product.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    })

    const previousPeriod = await Product.countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    })

    if (previousPeriod === 0) return 100
    return Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100)
  } catch (error) {
    return 10 // Default growth percentage
  }
}

export default router