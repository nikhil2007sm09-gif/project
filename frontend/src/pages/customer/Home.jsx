import { useState, useEffect } from 'react'
import axios from '../../utils/axios'
import FashionApproach from '../../components/home/FashionApproach'
import OfferSlide from '../../components/home/OfferSlider'

import TeamSection from '../../components/home/TeamSection'

import CoinWalletAnimation from '../../components/common/coin'

// Home Page Section Components
import Hero from '../../components/home/Hero'
import FeaturesSection from '../../components/home/FeaturesSection'
import CategoriesSection from '../../components/home/CategoriesSection'


const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [sliders, setSliders] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchCategories()
    fetchTrendingProducts()
    fetchTestimonials()
    fetchSliders()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      } else {
        setTestimonials([
          {
            name: "Priya Sharma",
            rating: 5,
            review: "Amazing quality and fast delivery! Loved the collection.",
            image: "",
            location: "Mumbai"
          },
          {
            name: "Rahul Kumar", 
            rating: 5,
            review: "Best online shopping experience. Highly recommended!",
            image: "",
            location: "Delhi"
          },
          {
            name: "Sneha Patel",
            rating: 5,
            review: "Great prices and excellent customer service.",
            image: "",
            location: "Bangalore"
          },
          {
            name: "Arjun Singh",
            rating: 5,
            review: "Love the trendy collection! Fast delivery and great packaging.",
            image: "",
            location: "Pune"
          },
          {
            name: "Kavya Reddy",
            rating: 5,
            review: "Fantastic shopping experience! Great quality at affordable prices.",
            image: "",
            location: "Hyderabad"
          },
          {
            name: "Vikram Joshi",
            rating: 5,
            review: "Outstanding service and product quality! Highly satisfied!",
            image: "",
            location: "Chennai"
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTrendingProducts = async () => {
    try {
      const res = await axios.get('/api/products?limit=15')
      setProducts(res.data.products || res.data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchSliders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sliders')
      if (response.ok) {
        const data = await response.json()
        setSliders(data.slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching sliders:', error)
    }
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <Hero sliders={sliders} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

     
      {/* Features Section */}
      <FeaturesSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

    
      <OfferSlide />
   

      {/* Fashion Approach Section */}
      <FashionApproach />

      <TeamSection />
    
    </div>
  )
}

export default Home
