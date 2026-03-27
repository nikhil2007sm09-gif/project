import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Slider from './models/Slider.js'

dotenv.config()

const seedSliders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')

    // Clear existing sliders
    await Slider.deleteMany({})
    console.log('Cleared existing sliders')

    // Hero sliders
    const heroSliders = [
      {
        title: "✨ Discover Amazing Products",
        subtitle: "Find the perfect items for your lifestyle. Quality products at unbeatable prices.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center",
        buttonText: "Shop Now",
        buttonLink: "/products",
        isActive: true,
        order: 1,
        type: "hero"
      },
      {
        title: "🛍️ Shop Latest Collection",
        subtitle: "Explore our newest arrivals and trending products. Limited time offers available.",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center",
        buttonText: "Explore Collection",
        buttonLink: "/products",
        isActive: true,
        order: 2,
        type: "hero"
      },
      {
        title: "🎯 Best Deals & Offers",
        subtitle: "Don't miss out on incredible savings. Up to 70% off on selected items.",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&h=1080&fit=crop&crop=center",
        buttonText: "Shop Deals",
        buttonLink: "/products",
        isActive: true,
        order: 3,
        type: "hero"
      },
      {
        title: "🚀 Fast & Free Delivery",
        subtitle: "Get your favorite products delivered to your doorstep. Free shipping on orders above ₹999.",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop&crop=center",
        buttonText: "Start Shopping",
        buttonLink: "/products",
        isActive: true,
        order: 4,
        type: "hero"
      }
    ]

    // Popular Products sliders
    const popularSliders = [
      {
        title: "🔥 Popular Products",
        subtitle: "Most loved items by our customers. Trending now with amazing reviews.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        buttonText: "View Popular",
        buttonLink: "/products",
        isActive: true,
        order: 1,
        type: "popular"
      }
    ]

    // Featured sliders
    const featuredSliders = [
      {
        title: "✨ Discover Amazing Products",
        subtitle: "Handpicked collections just for you. Find the perfect products across different categories.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        buttonText: "Discover More",
        buttonLink: "/products",
        isActive: true,
        order: 1,
        type: "featured"
      }
    ]

    // Insert all sliders
    const allSliders = [...heroSliders, ...popularSliders, ...featuredSliders]
    await Slider.insertMany(allSliders)

    console.log(`✅ Successfully seeded ${allSliders.length} sliders`)
    console.log(`   - ${heroSliders.length} Hero sliders`)
    console.log(`   - ${popularSliders.length} Popular sliders`)
    console.log(`   - ${featuredSliders.length} Featured sliders`)

  } catch (error) {
    console.error('❌ Error seeding sliders:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

seedSliders()