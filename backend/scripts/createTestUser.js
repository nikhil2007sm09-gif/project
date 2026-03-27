import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const createTestUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('MongoDB connected')

    // Check if users exist
    const existingUsers = await User.find()
    console.log(`Found ${existingUsers.length} existing users`)

    // Create affiliate if doesn't exist
    const affiliateExists = await User.findOne({ email: 'affiliate@test.com' })
    if (!affiliateExists) {
      const affiliate = await User.create({
        name: 'Affiliate User',
        email: 'affiliate@test.com',
        password: 'affiliate123',
        role: 'affiliate',
        approved: true,
        affiliateCode: 'AFF123',
        businessDetails: {
          phone: '9876543210',
          website: 'https://example.com',
          socialMedia: 'Instagram: @testaffiliate'
        }
      })
      console.log('✅ Affiliate user created:', affiliate.email)
    } else {
      console.log('ℹ️  Affiliate user already exists')
    }

    // Create vendor if doesn't exist
    const vendorExists = await User.findOne({ email: 'vendor@test.com' })
    if (!vendorExists) {
      const vendor = await User.create({
        name: 'Vendor User',
        email: 'vendor@test.com',
        password: 'vendor123',
        role: 'vendor',
        approved: true,
        businessDetails: {
          businessName: 'Test Vendor Store',
          businessAddress: '123 Business Street',
          phone: '1234567890',
          gstNumber: 'GST123456'
        }
      })
      console.log('✅ Vendor user created:', vendor.email)
    } else {
      console.log('ℹ️  Vendor user already exists')
    }

    // Create admin if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@test.com' })
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin',
        approved: true
      })
      console.log('✅ Admin user created:', admin.email)
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    console.log('\n✅ Test users ready!')
    console.log('\nLogin Status:')
    console.log('✅ Admin: admin@test.com / admin123 (Can login)')
    console.log('✅ Customers: Any registered customer (Can login)')
    console.log('⏳ Vendor: vendor@test.com / vendor123 (Needs admin approval)')
    console.log('⏳ Affiliate: affiliate@test.com / affiliate123 (Needs admin approval)')
    console.log('\nNote: Vendors and Affiliates need admin approval before they can login.')

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createTestUsers()
