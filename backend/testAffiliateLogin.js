import mongoose from 'mongoose'
import User from './models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')
    
    const email = 'mevents831@gmail.com'
    const password = 'amit123' // Replace with actual password
    
    const user = await User.findOne({ email })
    
    if (!user) {
      console.log('❌ User not found')
      process.exit(1)
    }
    
    console.log('\n✅ User found:')
    console.log('Email:', user.email)
    console.log('Role:', user.role)
    console.log('Approved:', user.approved)
    
    // Test password
    const isMatch = await user.comparePassword(password)
    console.log('\nPassword test with "amit123":', isMatch ? '✅ MATCH' : '❌ NO MATCH')
    
    // Try common passwords
    const testPasswords = ['amit123', 'Amit123', 'amit@123', '123456', 'password']
    console.log('\nTrying common passwords:')
    for (const pwd of testPasswords) {
      const match = await user.comparePassword(pwd)
      if (match) {
        console.log(`✅ Password "${pwd}" WORKS!`)
      }
    }
    
    // Update affiliate code to proper format if needed
    if (user.affiliateCode && !user.affiliateCode.startsWith('AFF-')) {
      const newCode = 'AFF-' + user.affiliateCode
      user.affiliateCode = newCode
      await user.save()
      console.log('\n✅ Updated affiliate code to:', newCode)
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

testLogin()
