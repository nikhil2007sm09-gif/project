import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Category from './models/Category.js'
import Blog from './models/Blog.js'

dotenv.config()

const seedBlogData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('MongoDB connected')

    // Find admin user
    const admin = await User.findOne({ role: 'admin' })
    if (!admin) {
      console.error('❌ Admin user not found. Please run npm run create-users first')
      process.exit(1)
    }

    console.log('✅ Admin user found:', admin.email)

    // Clear existing data
    await Category.deleteMany({})
    await Blog.deleteMany({})
    console.log('🗑️  Cleared existing categories and blogs')

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Fashion Tips',
        slug: 'fashion-tips',
        description: 'Latest fashion trends and styling tips',
        active: true
      },
      {
        name: 'Style Guide',
        slug: 'style-guide',
        description: 'Complete style guides for every occasion',
        active: true
      },
      {
        name: 'News',
        slug: 'news',
        description: 'Latest news from fashion industry',
        active: true
      }
    ])

    console.log('✅ Created', categories.length, 'categories')

    // Create sample blogs
    const blogs = await Blog.insertMany([
      {
        title: 'Top 10 Fashion Trends for 2026',
        slug: 'top-10-fashion-trends-for-2026',
        content: `Fashion is constantly evolving, and 2026 is no exception. Here are the top 10 trends you need to know:

1. Sustainable Fashion - Eco-friendly materials are taking center stage
2. Bold Colors - Vibrant hues are making a comeback
3. Oversized Silhouettes - Comfort meets style
4. Vintage Revival - 90s fashion is back
5. Tech-Integrated Clothing - Smart fabrics and wearable tech
6. Gender-Neutral Fashion - Breaking traditional boundaries
7. Minimalist Aesthetics - Less is more
8. Statement Accessories - Bold jewelry and bags
9. Athleisure Evolution - Sporty meets chic
10. Artisanal Craftsmanship - Handmade and unique pieces

Stay ahead of the curve with these exciting trends!`,
        excerpt: 'Discover the hottest fashion trends that will dominate 2026',
        category: categories[0]._id,
        author: admin._id,
        published: true,
        tags: ['trends', 'fashion', '2026']
      },
      {
        title: 'How to Build a Capsule Wardrobe',
        slug: 'how-to-build-a-capsule-wardrobe',
        content: `A capsule wardrobe is a collection of essential items that don't go out of style. Here's how to build one:

Step 1: Assess Your Lifestyle
Consider your daily activities and dress code requirements.

Step 2: Choose Your Color Palette
Stick to neutral colors that mix and match easily.

Step 3: Select Quality Basics
Invest in well-made pieces that will last.

Step 4: Add Statement Pieces
Include a few trendy items to keep things interesting.

Step 5: Maintain and Update
Regularly review and refresh your wardrobe.

A capsule wardrobe simplifies your life and ensures you always look put-together!`,
        excerpt: 'Learn how to create a versatile and timeless wardrobe',
        category: categories[1]._id,
        author: admin._id,
        published: true,
        tags: ['wardrobe', 'style', 'minimalism']
      },
      {
        title: 'Sustainable Fashion: Why It Matters',
        slug: 'sustainable-fashion-why-it-matters',
        content: `The fashion industry is one of the largest polluters in the world. Here's why sustainable fashion matters:

Environmental Impact:
- Reduces water pollution
- Decreases carbon emissions
- Minimizes textile waste

Social Responsibility:
- Fair wages for workers
- Safe working conditions
- Ethical production practices

How You Can Help:
- Buy from sustainable brands
- Choose quality over quantity
- Recycle and upcycle clothing
- Support local artisans

Together, we can make fashion more sustainable!`,
        excerpt: 'Understanding the importance of sustainable fashion choices',
        category: categories[2]._id,
        author: admin._id,
        published: true,
        tags: ['sustainable', 'eco-friendly', 'ethical']
      }
    ])

    console.log('✅ Created', blogs.length, 'sample blogs')

    console.log('\n📝 Sample Data Created:')
    console.log('Categories:', categories.map(c => c.name).join(', '))
    console.log('Blogs:', blogs.map(b => b.title).join(', '))
    console.log('\n✅ You can now view blogs at: http://localhost:3000/blog')
    console.log('✅ Manage blogs at: http://localhost:3000/admin/blogs')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

seedBlogData()
