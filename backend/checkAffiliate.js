import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const checkAffiliate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Find affiliate user
    const email = 'mevents831@gmail.com' // Change this to your affiliate email
    const affiliate = await User.findOne({ email, role: 'affiliate' })

    if (!affiliate) {
      console.log('❌ Affiliate user not found with email:', email)
      console.log('\nTry these steps:')
      console.log('1. Register as affiliate from frontend')
      console.log('2. Check if email is correct')
      console.log('3. Check database connection\n')
    } else {
      console.log('📧 Affiliate Found!')
      console.log('=====================================')
      console.log('Name:', affiliate.name)
      console.log('Email:', affiliate.email)
      console.log('Role:', affiliate.role)
      console.log('Approved:', affiliate.approved ? '✅ YES' : '❌ NO (Pending)')
      console.log('Affiliate Code:', affiliate.affiliateCode || 'Not set')
      console.log('Created:', affiliate.createdAt)
      console.log('=====================================\n')

      if (!affiliate.approved) {
        console.log('⚠️  Account is NOT approved yet!')
        console.log('Steps to approve:')
        console.log('1. Login as admin')
        console.log('2. Go to Admin Dashboard')
        console.log('3. Click "Pending Approvals" tab')
        console.log('4. Approve the affiliate\n')
      } else {
        console.log('✅ Account is approved! You can login now.\n')
        
        // Test password
        console.log('Testing password...')
        const testPassword = 'your-password-here' // Change this
        const isMatch = await affiliate.comparePassword(testPassword)
        console.log('Password test:', isMatch ? '✅ Correct' : '❌ Wrong password\n')
      }
    }

    // Show all affiliates
    const allAffiliates = await User.find({ role: 'affiliate' })
    console.log(`\n📊 Total Affiliates in Database: ${allAffiliates.length}`)
    allAffiliates.forEach((aff, index) => {
      console.log(`${index + 1}. ${aff.email} - ${aff.approved ? 'Approved ✅' : 'Pending ⏳'}`)
    })

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('\n✅ Database connection closed')
    process.exit(0)
  }
}

checkAffiliate()
