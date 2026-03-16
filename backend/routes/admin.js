import express from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { sendVendorApprovalEmail, sendAffiliateApprovalEmail } from '../services/emailService.js'

const router = express.Router()

router.get('/stats', authenticate, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()
    const orders = await Order.find()
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/orders', authenticate, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/users', authenticate, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/pending-approvals', authenticate, authorize('admin'), async (req, res) => {
  try {
    const pendingUsers = await User.find({ 
      approved: false,
      role: { $in: ['vendor', 'affiliate'] }
    }).select('-password').sort({ createdAt: -1 })
    res.json(pendingUsers)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.patch('/approve-user/:userId', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { approved: true },
      { new: true }
    ).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    // Send approval email based on role
    if (user.role === 'vendor') {
      await sendVendorApprovalEmail(user.email, user.name)
    } else if (user.role === 'affiliate') {
      await sendAffiliateApprovalEmail(user.email, user.name, user.affiliateCode)
    }
    
    res.json({ message: 'User approved successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.patch('/reject-user/:userId', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json({ message: 'User rejected and deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all products (admin only)
router.get('/products', authenticate, authorize('admin'), async (req, res) => {
  try {
    const products = await Product.find()
      .populate('vendor', 'name email')
      .sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete product (admin only)
router.delete('/products/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all vendors with activity tracking (admin only)
router.get('/vendors-activity', authenticate, authorize('admin'), async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' })
      .select('name email approved lastLoginAt lastLogoutAt totalActiveTime currentSessionStart loginHistory')
      .sort({ lastLoginAt: -1 })
    
    const vendorsWithActivity = vendors.map(vendor => {
      const hours = Math.floor(vendor.totalActiveTime / 3600)
      const minutes = Math.floor((vendor.totalActiveTime % 3600) / 60)
      
      // Check if currently online
      const isOnline = vendor.currentSessionStart && !vendor.lastLogoutAt || 
                       (vendor.lastLogoutAt && vendor.currentSessionStart > vendor.lastLogoutAt)
      
      return {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        approved: vendor.approved,
        lastLoginAt: vendor.lastLoginAt,
        lastLogoutAt: vendor.lastLogoutAt,
        totalActiveTime: vendor.totalActiveTime,
        totalActiveTimeFormatted: `${hours}h ${minutes}m`,
        isOnline,
        totalSessions: vendor.loginHistory.length,
        recentLogins: vendor.loginHistory.slice(-5).reverse() // Last 5 logins
      }
    })
    
    res.json(vendorsWithActivity)
  } catch (error) {
    console.error('Error fetching vendor activity:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get detailed activity for a specific vendor (admin only)
router.get('/vendor-activity/:vendorId', authenticate, authorize('admin'), async (req, res) => {
  try {
    const vendor = await User.findOne({ _id: req.params.vendorId, role: 'vendor' })
      .select('name email approved lastLoginAt lastLogoutAt totalActiveTime currentSessionStart loginHistory')
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' })
    }
    
    const hours = Math.floor(vendor.totalActiveTime / 3600)
    const minutes = Math.floor((vendor.totalActiveTime % 3600) / 60)
    const seconds = vendor.totalActiveTime % 60
    
    const isOnline = vendor.currentSessionStart && !vendor.lastLogoutAt || 
                     (vendor.lastLogoutAt && vendor.currentSessionStart > vendor.lastLogoutAt)
    
    res.json({
      vendor: {
        name: vendor.name,
        email: vendor.email,
        approved: vendor.approved
      },
      isOnline,
      lastLoginAt: vendor.lastLoginAt,
      lastLogoutAt: vendor.lastLogoutAt,
      currentSessionStart: vendor.currentSessionStart,
      totalActiveTime: vendor.totalActiveTime,
      totalActiveTimeFormatted: `${hours}h ${minutes}m ${seconds}s`,
      loginHistory: vendor.loginHistory.reverse() // All sessions, newest first
    })
  } catch (error) {
    console.error('Error fetching vendor activity:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get analytics data (admin only)
router.get('/analytics', authenticate, authorize('admin'), async (req, res) => {
  try {
    // Get date ranges
    const now = new Date()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Total counts
    const totalUsers = await User.countDocuments()
    const totalCustomers = await User.countDocuments({ role: 'customer' })
    const totalVendors = await User.countDocuments({ role: 'vendor' })
    const totalAffiliates = await User.countDocuments({ role: 'affiliate' })
    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()

    // Revenue calculations
    const allOrders = await Order.find()
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    
    const thisMonthOrders = await Order.find({ createdAt: { $gte: thisMonth } })
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    
    const lastMonthOrders = await Order.find({ 
      createdAt: { $gte: lastMonth, $lte: lastMonthEnd } 
    })
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0)

    // Growth calculations
    const revenueGrowth = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
      : 0

    // Recent activity
    const recentUsers = await User.countDocuments({ createdAt: { $gte: last7Days } })
    const recentOrders = await Order.countDocuments({ createdAt: { $gte: last7Days } })
    const recentProducts = await Product.countDocuments({ createdAt: { $gte: last7Days } })

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { 
        $group: { 
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        } 
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      { $unwind: '$productInfo' }
    ])

    // Revenue by day (last 7 days)
    const revenueByDay = await Order.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // Category distribution
    const categoryStats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Vendor performance
    const vendorStats = await Product.aggregate([
      {
        $group: {
          _id: '$vendor',
          productCount: { $sum: 1 },
          totalStock: { $sum: '$stock' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'vendorInfo'
        }
      },
      { $unwind: '$vendorInfo' },
      { $sort: { productCount: -1 } },
      { $limit: 5 }
    ])

    res.json({
      overview: {
        totalUsers,
        totalCustomers,
        totalVendors,
        totalAffiliates,
        totalProducts,
        totalOrders,
        totalRevenue,
        thisMonthRevenue,
        lastMonthRevenue,
        revenueGrowth
      },
      recentActivity: {
        newUsers: recentUsers,
        newOrders: recentOrders,
        newProducts: recentProducts
      },
      ordersByStatus,
      topProducts,
      revenueByDay,
      categoryStats,
      vendorStats
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
