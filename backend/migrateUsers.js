import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const migrateUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    // Find all users
    const users = await User.find({})
    console.log(`📊 Found ${users.length} users to migrate\n`)

    let migrated = 0
    let skipped = 0

    for (const user of users) {
      let needsUpdate = false
      
      // Add roles array if missing
      if (!user.roles || user.roles.length === 0) {
        user.roles = [user.role]
        needsUpdate = true
        console.log(`➕ Adding roles array to ${user.email}: [${user.role}]`)
      }
      
      // Set vendorApproved if vendor
      if (user.roles.includes('vendor') && user.vendorApproved === undefined) {
        user.vendorApproved = user.approved || false
        needsUpdate = true
        console.log(`➕ Setting vendorApproved for ${user.email}: ${user.vendorApproved}`)
      }
      
      // Set affiliateApproved if affiliate
      if (user.roles.includes('affiliate') && user.affiliateApproved === undefined) {
        user.affiliateApproved = user.approved || false
        needsUpdate = true
        console.log(`➕ Setting affiliateApproved for ${user.email}: ${user.affiliateApproved}`)
      }
      
      if (needsUpdate) {
        await user.save()
        migrated++
        console.log(`✅ Migrated: ${user.email}\n`)
      } else {
        skipped++
      }
    }

    console.log('\n📈 Migration Summary:')
    console.log(`✅ Migrated: ${migrated} users`)
    console.log(`⏭️  Skipped: ${skipped} users (already up to date)`)
    console.log(`📊 Total: ${users.length} users\n`)

  } catch (error) {
    console.error('❌ Migration error:', error)
  } finally {
    await mongoose.connection.close()
    console.log('✅ Database connection closed')
    process.exit(0)
  }
}

migrateUsers()
