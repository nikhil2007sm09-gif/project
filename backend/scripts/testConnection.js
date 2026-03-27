import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const testConnection = async () => {
  try {
    console.log('🔄 Testing database connection...')
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('✅ MongoDB connected successfully')

    console.log('🔄 Checking products in database...')
    const productCount = await Product.countDocuments()
    console.log(`📦 Found ${productCount} products in database`)

    if (productCount === 0) {
      console.log('⚠️  No products found. You may need to run: node seedData.js')
    } else {
      console.log('✅ Products are available in database')
      const sampleProducts = await Product.find().limit(3)
      console.log('📋 Sample products:')
      sampleProducts.forEach(product => {
        console.log(`  - ${product.name} (₹${product.price})`)
      })
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n💡 Troubleshooting:')
    console.log('1. Make sure MongoDB is running')
    console.log('2. Check your .env file for correct MONGODB_URI')
    console.log('3. Run: node seedData.js to add sample data')
    process.exit(1)
  }
}

testConnection()