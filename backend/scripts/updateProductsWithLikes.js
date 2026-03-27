import mongoose from 'mongoose'
import Product from './models/Product.js'
import dotenv from 'dotenv'

dotenv.config()

const updateProductsWithLikes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
    console.log('Connected to MongoDB')

    // Update all existing products to have likes: 0 and empty likedBy array
    const result = await Product.updateMany(
      { 
        $or: [
          { likes: { $exists: false } },
          { likedBy: { $exists: false } }
        ]
      },
      { 
        $set: { 
          likes: 0,
          likedBy: []
        }
      }
    )

    console.log(`Updated ${result.modifiedCount} products with likes fields`)

    // Get all products to verify
    const products = await Product.find({}, 'name likes likedBy')
    console.log('\nProducts after update:')
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.likes} likes, ${product.likedBy.length} users liked`)
    })

    await mongoose.disconnect()
    console.log('\nDisconnected from MongoDB')
    console.log('✅ Products updated successfully!')

  } catch (error) {
    console.error('Error updating products:', error)
    process.exit(1)
  }
}

updateProductsWithLikes()