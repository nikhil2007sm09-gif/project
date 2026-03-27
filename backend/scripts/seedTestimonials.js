import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Testimonial from './models/Testimonial.js'

dotenv.config()

const testimonials = [
  {
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Amazing quality and fast delivery! The clothes fit perfectly and the fabric is so comfortable. I've ordered multiple times and never been disappointed.",
    location: "Mumbai, Maharashtra",
    isActive: true,
    order: 1
  },
  {
    name: "Rahul Kumar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Best online shopping experience ever! The customer service is excellent and the return policy is very customer-friendly. Highly recommended!",
    location: "Delhi, India",
    isActive: true,
    order: 2
  },
  {
    name: "Sneha Patel",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Great prices and excellent customer service. The variety of clothes is amazing and the quality is top-notch. Will definitely shop again!",
    location: "Bangalore, Karnataka",
    isActive: true,
    order: 3
  },
  {
    name: "Arjun Singh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Love the trendy collection! The website is easy to navigate and the checkout process is smooth. Fast delivery and great packaging.",
    location: "Pune, Maharashtra",
    isActive: true,
    order: 4
  },
  {
    name: "Kavya Reddy",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Fantastic shopping experience! The clothes are exactly as shown in pictures. Great quality at affordable prices. Customer for life!",
    location: "Hyderabad, Telangana",
    isActive: true,
    order: 5
  },
  {
    name: "Vikram Joshi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Outstanding service and product quality! The delivery was super fast and the clothes exceeded my expectations. Highly satisfied!",
    location: "Chennai, Tamil Nadu",
    isActive: true,
    order: 6
  }
]

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop')
    console.log('Connected to MongoDB')

    // Clear existing testimonials
    await Testimonial.deleteMany({})
    console.log('Cleared existing testimonials')

    // Insert new testimonials
    await Testimonial.insertMany(testimonials)
    console.log('Testimonials seeded successfully!')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding testimonials:', error)
    process.exit(1)
  }
}

seedTestimonials()