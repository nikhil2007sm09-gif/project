import express from 'express'
import Product from '../models/Product.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const products = await Product.find(filter).populate('vendor', 'name')
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendor', 'name')
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', authenticate, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const { images, image, ...productData } = req.body
    
    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.category) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }
    
    const product = new Product({
      ...productData,
      images: images || [],
      image: image || (images && images[0]) || '',
      vendor: req.user._id
    })
    
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ 
      message: 'Error saving product', 
      error: error.message 
    })
  }
})

router.put('/:id', authenticate, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const { images, image, ...productData } = req.body
    
    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.category) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }
    
    const updateData = {
      ...productData,
      images: images || [],
      image: image || (images && images[0]) || ''
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    res.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ 
      message: 'Error updating product', 
      error: error.message 
    })
  }
})

router.delete('/:id', authenticate, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Like/Unlike product endpoints
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const productId = req.params.id
    const userId = req.user._id
    
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    // Check if user already liked this product
    const alreadyLiked = product.likedBy.includes(userId)
    
    if (alreadyLiked) {
      return res.status(400).json({ message: 'Product already liked' })
    }
    
    // Add user to likedBy array and increment likes count
    product.likedBy.push(userId)
    product.likes += 1
    
    await product.save()
    
    res.json({ 
      message: 'Product liked successfully',
      likes: product.likes,
      isLiked: true
    })
  } catch (error) {
    console.error('Error liking product:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id/like', authenticate, async (req, res) => {
  try {
    const productId = req.params.id
    const userId = req.user._id
    
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    // Check if user has liked this product
    const likedIndex = product.likedBy.indexOf(userId)
    
    if (likedIndex === -1) {
      return res.status(400).json({ message: 'Product not liked yet' })
    }
    
    // Remove user from likedBy array and decrement likes count
    product.likedBy.splice(likedIndex, 1)
    product.likes = Math.max(0, product.likes - 1)
    
    await product.save()
    
    res.json({ 
      message: 'Product unliked successfully',
      likes: product.likes,
      isLiked: false
    })
  } catch (error) {
    console.error('Error unliking product:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user's liked products
router.get('/user/liked', authenticate, async (req, res) => {
  try {
    const userId = req.user._id
    const likedProducts = await Product.find({ likedBy: userId }).populate('vendor', 'name')
    res.json(likedProducts)
  } catch (error) {
    console.error('Error fetching liked products:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/vendor/my-products', authenticate, authorize('vendor'), async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Vendor analytics endpoint
router.get('/vendor/analytics', authenticate, authorize('vendor'), async (req, res) => {
  try {
    const vendorId = req.user._id
    
    // Import Order model
    const Order = (await import('../models/Order.js')).default
    
    // Get vendor's products
    const products = await Product.find({ vendor: vendorId })
    const productIds = products.map(p => p._id)
    
    // Total products and stock
    const totalProducts = products.length
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
    const lowStockProducts = products.filter(p => p.stock < 10).length
    
    // Get all orders containing vendor's products
    const orders = await Order.find({
      'items.product': { $in: productIds }
    })
    
    // Calculate revenue and sales
    let totalRevenue = 0
    let totalSales = 0
    const productSales = {}
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (productIds.some(id => id.equals(item.product))) {
          const revenue = item.price * item.quantity
          totalRevenue += revenue
          totalSales += item.quantity
          
          const productId = item.product.toString()
          if (!productSales[productId]) {
            productSales[productId] = { quantity: 0, revenue: 0 }
          }
          productSales[productId].quantity += item.quantity
          productSales[productId].revenue += revenue
        }
      })
    })
    
    // Get date ranges
    const now = new Date()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    // Recent activity
    const recentOrders = await Order.countDocuments({
      'items.product': { $in: productIds },
      createdAt: { $gte: last7Days }
    })
    
    const thisMonthOrders = await Order.find({
      'items.product': { $in: productIds },
      createdAt: { $gte: thisMonth }
    })
    
    let thisMonthRevenue = 0
    thisMonthOrders.forEach(order => {
      order.items.forEach(item => {
        if (productIds.some(id => id.equals(item.product))) {
          thisMonthRevenue += item.price * item.quantity
        }
      })
    })
    
    // Top selling products
    const topProducts = Object.entries(productSales)
      .map(([productId, data]) => {
        const product = products.find(p => p._id.toString() === productId)
        return {
          product: product ? {
            _id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            images: product.images
          } : null,
          quantity: data.quantity,
          revenue: data.revenue
        }
      })
      .filter(item => item.product)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
    
    // Sales by day (last 7 days)
    const salesByDay = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const startOfDay = new Date(date.setHours(0, 0, 0, 0))
      const endOfDay = new Date(date.setHours(23, 59, 59, 999))
      
      const dayOrders = await Order.find({
        'items.product': { $in: productIds },
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      })
      
      let dayRevenue = 0
      let daySales = 0
      dayOrders.forEach(order => {
        order.items.forEach(item => {
          if (productIds.some(id => id.equals(item.product))) {
            dayRevenue += item.price * item.quantity
            daySales += item.quantity
          }
        })
      })
      
      salesByDay.push({
        date: startOfDay.toISOString().split('T')[0],
        revenue: dayRevenue,
        sales: daySales,
        orders: dayOrders.length
      })
    }
    
    // Category distribution
    const categoryStats = {}
    products.forEach(product => {
      const category = product.category || 'Uncategorized'
      if (!categoryStats[category]) {
        categoryStats[category] = { count: 0, stock: 0 }
      }
      categoryStats[category].count++
      categoryStats[category].stock += product.stock
    })
    
    const categoryDistribution = Object.entries(categoryStats)
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.count - a.count)
    
    res.json({
      overview: {
        totalProducts,
        totalStock,
        lowStockProducts,
        totalRevenue,
        totalSales,
        thisMonthRevenue,
        recentOrders
      },
      topProducts,
      salesByDay,
      categoryDistribution
    })
  } catch (error) {
    console.error('Error fetching vendor analytics:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
