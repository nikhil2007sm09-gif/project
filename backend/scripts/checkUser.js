import mongoose from 'mongoose'
import User from './models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')
    
    const email = 'mevents831@gmail.com'
    const user = await User.findOne({ email })
    
    if (user) {
      console.log('\n✅ User found:')
      console.log('Email:', user.email)
      console.log('Name:', user.name)
      console.log('Role:', user.role)
      console.log('Approved:', user.approved)
      console.log('AffiliateCode:', user.affiliateCode)
      console.log('Password Hash:', user.password.substring(0, 20) + '...')
    } else {
      console.log('\n❌ User not found with email:', email)
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

checkUser()
