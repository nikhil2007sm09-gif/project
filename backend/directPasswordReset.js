import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')
    
    const email = 'mevents831@gmail.com'
    const newPassword = 'amit123'
    
    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    // Direct update without triggering pre-save hook
    const result = await mongoose.connection.collection('users').updateOne(
      { email },
      { 
        $set: { 
          password: hashedPassword,
          approved: true,
          affiliateCode: 'AFF-ZUSMD'
        } 
      }
    )
    
    if (result.matchedCount === 0) {
      console.log('❌ User not found')
      process.exit(1)
    }
    
    console.log('\n✅ Password reset successful!')
    console.log('Email:', email)
    console.log('New Password:', newPassword)
    console.log('\n🎉 You can now login with:')
    console.log('Email: mevents831@gmail.com')
    console.log('Password: amit123')
    console.log('\nGo to: http://localhost:5173/affiliate-login')
    
    // Verify the password works
    const User = (await import('./models/User.js')).default
    const user = await User.findOne({ email })
    const isMatch = await user.comparePassword(newPassword)
    console.log('\n🔐 Verification:', isMatch ? '✅ Password works!' : '❌ Still not working')
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

resetPassword()
