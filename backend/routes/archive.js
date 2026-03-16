import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import { archiveUserData, getArchivedUserData, searchArchivedUsers } from '../services/archiveService.js'
import ArchivedUser from '../models/ArchivedUser.js'
import ArchivedProduct from '../models/ArchivedProduct.js'
import ArchivedOrder from '../models/ArchivedOrder.js'

const router = express.Router()

// Get all archived users (admin only)
router.get('/users', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query
    
    let query = {}
    if (role) query.role = role
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    
    const users = await ArchivedUser.find(query)
      .sort({ deletedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('deletedBy', 'name email')
    
    const total = await ArchivedUser.countDocuments(query)
    
    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Get archived users error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get specific archived user with all data
router.get('/users/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params
    const data = await getArchivedUserData(id)
    res.json(data)
  } catch (error) {
    console.error('Get archived user data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Archive a specific user (admin only)
router.post('/users/:userId', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { userId } = req.params
    const { reason = 'Archived by admin' } = req.body
    
    const result = await archiveUserData(userId, req.user._id, reason)
    
    res.json({
      message: 'User archived successfully',
      result
    })
  } catch (error) {
    console.error('Archive user error:', error)
    res.status(500).json({ message: 'Error archiving user' })
  }
})

// Get archived products
router.get('/products', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, vendor } = req.query
    
    let query = {}
    if (vendor) query.vendor = vendor
    
    const products = await ArchivedProduct.find(query)
      .sort({ deletedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('vendor', 'name email')
      .populate('deletedBy', 'name email')
    
    const total = await ArchivedProduct.countDocuments(query)
    
    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Get archived products error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get archived orders
router.get('/orders', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, customer } = req.query
    
    let query = {}
    if (customer) query.customer = customer
    
    const orders = await ArchivedOrder.find(query)
      .sort({ deletedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('customer', 'name email')
      .populate('deletedBy', 'name email')
    
    const total = await ArchivedOrder.countDocuments(query)
    
    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Get archived orders error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get archive statistics
router.get('/stats', authenticate, authorize('admin'), async (req, res) => {
  try {
    const userStats = await ArchivedUser.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          totalActiveTime: { $sum: '$totalActiveTime' }
        }
      }
    ])
    
    const totalUsers = await ArchivedUser.countDocuments()
    const totalProducts = await ArchivedProduct.countDocuments()
    const totalOrders = await ArchivedOrder.countDocuments()
    
    const recentDeletions = await ArchivedUser.find()
      .sort({ deletedAt: -1 })
      .limit(10)
      .select('name email role deletedAt deletionReason')
    
    res.json({
      summary: {
        totalUsers,
        totalProducts,
        totalOrders
      },
      usersByRole: userStats,
      recentDeletions
    })
  } catch (error) {
    console.error('Get archive stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Permanently delete archived data (admin only - use with caution)
router.delete('/permanent/:type/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { type, id } = req.params
    const { confirm } = req.body
    
    if (confirm !== 'PERMANENTLY_DELETE') {
      return res.status(400).json({ 
        message: 'Confirmation required. Send { "confirm": "PERMANENTLY_DELETE" } in request body.' 
      })
    }
    
    let result
    switch (type) {
      case 'user':
        // Delete user and all related archived data
        const archivedUser = await ArchivedUser.findById(id)
        if (!archivedUser) {
          return res.status(404).json({ message: 'Archived user not found' })
        }
        
        await ArchivedProduct.deleteMany({ vendor: id })
        await ArchivedOrder.deleteMany({ customer: id })
        await ArchivedUser.findByIdAndDelete(id)
        
        result = { message: 'User and all related data permanently deleted' }
        break
        
      case 'product':
        await ArchivedProduct.findByIdAndDelete(id)
        result = { message: 'Product permanently deleted' }
        break
        
      case 'order':
        await ArchivedOrder.findByIdAndDelete(id)
        result = { message: 'Order permanently deleted' }
        break
        
      default:
        return res.status(400).json({ message: 'Invalid type' })
    }
    
    res.json(result)
  } catch (error) {
    console.error('Permanent delete error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router