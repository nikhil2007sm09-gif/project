import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Order from './models/Order.js'
import AffiliateCommission from './models/AffiliateCommission.js'
import AffiliateClick from './models/AffiliateClick.js'

dotenv.config()

const testAffiliateSystem = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('MongoDB connected')

    // Find affiliate user
    const affiliate = await User.findOne({ role: 'affiliate', approved: true })
    
    if (!affiliate) {
      console.log('❌ No approved affiliate found')
      process.exit(1)
    }

    console.log(`✅ Found affiliate: ${affiliate.email} (Code: ${affiliate.affiliateCode})`)

    // Check clicks
    const clicks = await AffiliateClick.countDocuments({ affiliate: affiliate._id })
    console.log(`📊 Total clicks: ${clicks}`)

    // Check orders with affiliate code
    const orders = await Order.find({ affiliateCode: affiliate.affiliateCode })
    console.log(`🛒 Orders with affiliate code: ${orders.length}`)

    // Check commissions
    const commissions = await AffiliateCommission.find({ affiliate: affiliate._id })
    const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0)
    console.log(`💰 Total commissions: ₹${totalCommission}`)

    // Generate test affiliate link
    const baseUrl = 'http://localhost:5173'
    const affiliateLink = `${baseUrl}?ref=${affiliate.affiliateCode}`
    console.log(`🔗 Affiliate link: ${affiliateLink}`)

    console.log('\n✅ Affiliate system test completed!')
    console.log('\n📝 Test Instructions:')
    console.log('1. Open the affiliate link in browser')
    console.log('2. Browse products and make a purchase')
    console.log('3. Check affiliate dashboard for updated stats')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Test error:', error)
    process.exit(1)
  }
}

testAffiliateSystem()