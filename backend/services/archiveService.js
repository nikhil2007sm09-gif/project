import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import AffiliateClick from '../models/AffiliateClick.js'
import AffiliateCommission from '../models/AffiliateCommission.js'
import ArchivedUser from '../models/ArchivedUser.js'
import ArchivedProduct from '../models/ArchivedProduct.js'
import ArchivedOrder from '../models/ArchivedOrder.js'

export const archiveUserData = async (userId, deletedBy = null, reason = 'User deletion') => {
  try {
    console.log(`🗄️ Starting archive process for user: ${userId}`)
    
    // Get user data
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    
    const archiveData = {
      totalProducts: 0,
      totalOrders: 0,
      totalCommissions: 0,
      totalClicks: 0
    }
    
    // 1. Archive user's products (if vendor)
    if (user.role === 'vendor') {
      const products = await Product.find({ vendor: userId })
      console.log(`📦 Found ${products.length} products to archive`)
      
      for (const product of products) {
        // Calculate sales data
        const orders = await Order.find({ 'items.product': product._id })
        const totalSold = orders.reduce((sum, order) => {
          const item = order.items.find(item => item.product.toString() === product._id.toString())
          return sum + (item ? item.quantity : 0)
        }, 0)
        
        const totalRevenue = orders.reduce((sum, order) => {
          const item = order.items.find(item => item.product.toString() === product._id.toString())
          return sum + (item ? item.price * item.quantity : 0)
        }, 0)
        
        const lastOrder = orders.sort((a, b) => b.createdAt - a.createdAt)[0]
        
        // Create archived product
        await ArchivedProduct.create({
          originalProductId: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          images: product.images,
          sizes: product.sizes,
          colors: product.colors,
          stock: product.stock,
          likes: product.likes,
          vendor: null, // Will be set after user is archived
          vendorEmail: user.email,
          vendorName: user.name,
          deletedBy,
          deletionReason: reason,
          salesData: {
            totalSold,
            totalRevenue,
            lastSoldAt: lastOrder ? lastOrder.createdAt : null
          }
        })
      }
      
      archiveData.totalProducts = products.length
      // Delete original products
      await Product.deleteMany({ vendor: userId })
      console.log(`✅ Archived ${products.length} products`)
    }
    
    // 2. Archive user's orders (if customer)
    if (user.role === 'customer') {
      const orders = await Order.find({ customer: userId })
      console.log(`🛒 Found ${orders.length} orders to archive`)
      
      for (const order of orders) {
        await ArchivedOrder.create({
          originalOrderId: order._id,
          orderNumber: order.orderNumber,
          customer: null, // Will be set after user is archived
          customerEmail: user.email,
          customerName: user.name,
          customerPhone: user.phone,
          items: order.items,
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          razorpayOrderId: order.razorpayOrderId,
          razorpayPaymentId: order.razorpayPaymentId,
          status: order.status,
          affiliateCode: order.affiliateCode,
          affiliateCommission: order.affiliateCommission,
          deletedBy,
          deletionReason: reason,
          originalCreatedAt: order.createdAt,
          originalUpdatedAt: order.updatedAt
        })
      }
      
      archiveData.totalOrders = orders.length
      // Delete original orders
      await Order.deleteMany({ customer: userId })
      console.log(`✅ Archived ${orders.length} orders`)
    }
    
    // 3. Archive affiliate data (if affiliate)
    if (user.role === 'affiliate') {
      // Archive commissions
      const commissions = await AffiliateCommission.find({ affiliate: userId })
      archiveData.totalCommissions = commissions.length
      
      // Archive clicks
      const clicks = await AffiliateClick.find({ affiliate: userId })
      archiveData.totalClicks = clicks.length
      
      // Remove affiliate references from orders (keep orders but remove affiliate link)
      await Order.updateMany(
        { affiliateCode: user.affiliateCode },
        { $unset: { affiliateCode: "", affiliateCommission: "" } }
      )
      
      // Delete affiliate data
      await AffiliateCommission.deleteMany({ affiliate: userId })
      await AffiliateClick.deleteMany({ affiliate: userId })
      
      console.log(`✅ Archived ${commissions.length} commissions and ${clicks.length} clicks`)
    }
    
    // 4. Archive the user
    const archivedUser = await ArchivedUser.create({
      originalUserId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      approved: user.approved,
      affiliateCode: user.affiliateCode,
      businessDetails: user.businessDetails,
      lastLoginAt: user.lastLoginAt,
      lastLogoutAt: user.lastLogoutAt,
      totalActiveTime: user.totalActiveTime,
      currentSessionStart: user.currentSessionStart,
      loginHistory: user.loginHistory,
      deletedBy,
      deletionReason: reason,
      relatedData: {
        productsCount: archiveData.totalProducts,
        ordersCount: archiveData.totalOrders,
        commissionsCount: archiveData.totalCommissions,
        clicksCount: archiveData.totalClicks
      }
    })
    
    // 5. Update archived products and orders to reference archived user
    if (user.role === 'vendor') {
      await ArchivedProduct.updateMany(
        { vendorEmail: user.email },
        { vendor: archivedUser._id }
      )
    }
    
    if (user.role === 'customer') {
      await ArchivedOrder.updateMany(
        { customerEmail: user.email },
        { customer: archivedUser._id }
      )
    }
    
    // 6. Delete the original user
    await User.findByIdAndDelete(userId)
    
    console.log(`✅ User archived successfully: ${user.email}`)
    console.log(`📊 Archive summary:`, archiveData)
    
    return {
      success: true,
      archivedUser: archivedUser._id,
      summary: archiveData
    }
    
  } catch (error) {
    console.error('❌ Archive error:', error)
    throw error
  }
}

export const getArchivedUserData = async (archivedUserId) => {
  try {
    const archivedUser = await ArchivedUser.findById(archivedUserId)
    if (!archivedUser) {
      throw new Error('Archived user not found')
    }
    
    const products = await ArchivedProduct.find({ vendor: archivedUserId })
    const orders = await ArchivedOrder.find({ customer: archivedUserId })
    
    return {
      user: archivedUser,
      products,
      orders,
      summary: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
      }
    }
  } catch (error) {
    console.error('❌ Get archived data error:', error)
    throw error
  }
}

export const searchArchivedUsers = async (query = {}) => {
  try {
    const users = await ArchivedUser.find(query)
      .sort({ deletedAt: -1 })
      .limit(100)
    
    return users
  } catch (error) {
    console.error('❌ Search archived users error:', error)
    throw error
  }
}