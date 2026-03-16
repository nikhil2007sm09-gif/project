import mongoose from 'mongoose'
import User from './models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const verifyLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')
    
    const email = 'mevents831@gmail.com'
    const password = 'amit123'
    
    const user = await User.findOne({ email })
    
    if (!user) {
      console.log('❌ User not found')
      process.exit(1)
    }
    
    console.log('\n✅ User Details:')
    console.log('Email:', user.email)
    console.log('Name:', user.name)
    console.log('Role:', user.role)
    console.log('Approved:', user.approved)
    console.log('Affiliate Code:', user.affiliateCode)
    
    // Test password
    const isMatch = await user.comparePassword(password)
    console.log('\n🔐 Password Verification:')
    console.log('Password "amit123":', isMatch ? '✅ CORRECT' : '❌ WRONG')
    
    if (isMatch) {
      console.log('\n🎉 LOGIN SUCCESSFUL!')
      console.log('\nYou can now login with:')
      console.log('Email: mevents831@gmail.com')
      console.log('Password: amit123')
      console.log('\nGo to: http://localhost:5173/affiliate-login')
    } else {
      console.log('\n❌ Password still not matching. There might be an issue.')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

verifyLogin()
