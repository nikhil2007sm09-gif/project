import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')
    
    const email = 'mevents831@gmail.com'
    const newPassword = 'amit123'
    
    const user = await User.findOne({ email })
    
    if (!user) {
      console.log('❌ User not found')
      process.exit(1)
    }
    
    console.log('\n✅ User found:')
    console.log('Email:', user.email)
    console.log('Role:', user.role)
    console.log('Current Approved:', user.approved)
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    
    // Ensure affiliate code is in correct format
    if (user.role === 'affiliate' && !user.affiliateCode) {
      user.affiliateCode = 'AFF-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    } else if (user.affiliateCode && !user.affiliateCode.startsWith('AFF-')) {
      user.affiliateCode = 'AFF-' + user.affiliateCode
    }
    
    // Ensure approved
    user.approved = true
    
    await user.save()
    
    console.log('\n✅ Password reset successful!')
    console.log('New Password:', newPassword)
    console.log('Affiliate Code:', user.affiliateCode)
    console.log('Approved:', user.approved)
    console.log('\n🎉 You can now login with:')
    console.log('Email:', email)
    console.log('Password:', newPassword)
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

resetPassword()
