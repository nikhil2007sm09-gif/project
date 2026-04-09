import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Product from '../models/Product.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('MongoDB connected')

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin',
      approved: true
    })

    // Create vendor user (approved)
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

    // Create affiliate user (approved)
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

    // Create customer user
    const customer = await User.create({
      name: 'Customer User',
      email: 'customer@test.com',
      password: 'customer123',
      role: 'customer',
      approved: true
    })

    // Create pending vendor for testing approval
    await User.create({
      name: 'Pending Vendor',
      email: 'pending.vendor@test.com',
      password: 'vendor123',
      role: 'vendor',
      approved: false,
      businessDetails: {
        businessName: 'Pending Store',
        businessAddress: '456 Pending Street',
        phone: '5555555555'
      }
    })

    // Create pending affiliate for testing approval
    await User.create({
      name: 'Pending Affiliate',
      email: 'pending.affiliate@test.com',
      password: 'affiliate123',
      role: 'affiliate',
      approved: false,
      affiliateCode: 'PENDING123',
      businessDetails: {
        phone: '4444444444',
        website: 'https://pending.com'
      }
    })

    // Create sample products
    const products = [
      {
        name: 'Men Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt for men',
        price: 499,
        category: 'men',
        stock: 50,
        vendor: vendor._id
      },
      {
        name: 'Women Floral Dress',
        description: 'Beautiful floral dress for women',
        price: 1299,
        category: 'women',
        stock: 30,
        vendor: vendor._id
      },
      {
        name: 'Kids Denim Jeans',
        description: 'Stylish denim jeans for kids',
        price: 799,
        category: 'kids',
        stock: 40,
        vendor: vendor._id
      },
      {
        name: 'Men Formal Shirt',
        description: 'Premium formal shirt for men',
        price: 899,
        category: 'men',
        stock: 25,
        vendor: vendor._id
      },
      {
        name: 'Women Casual Top',
        description: 'Trendy casual top for women',
        price: 599,
        category: 'women',
        stock: 35,
        vendor: vendor._id
      }
    ]

    await Product.insertMany(products)

    console.log('✅ Data seeded successfully!')
    console.log('\nTest Users (Approved):')
    console.log('Admin: admin@test.com / admin123')
    console.log('Vendor: vendor@test.com / vendor123')
    console.log('Affiliate: affiliate@test.com / affiliate123')
    console.log('Customer: customer@test.com / customer123')
    console.log('\nPending Approval (for testing):')
    console.log('Pending Vendor: pending.vendor@test.com / vendor123')
    console.log('Pending Affiliate: pending.affiliate@test.com / affiliate123')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
