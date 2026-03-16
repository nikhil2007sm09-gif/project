import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, Shield, Star, TrendingUp, Award, Users, ArrowRight, Sparkles, Zap, Gift, Crown, Tag, Clock, CheckCircle } from 'lucide-react'
import axios from '../utils/axios'
import FashionApproach from '../components/FashionApproach'
import OfferSlide from './OfferSlider'




// Counter Animation Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime = null
          const startValue = 0
          const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = startValue + (endValue - startValue) * easeOutQuart
            
            setCount(currentCount)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [end, duration, hasAnimated])

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <span id={`counter-${end}`}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchCategories()
    fetchTrendingProducts()
  }, [])

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
      const res = await axios.get('/api/products?limit=8')
      setProducts(res.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Free shipping on orders above ₹999",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure & encrypted transactions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Authentic products guaranteed",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Always here to help you",
      color: "from-orange-500 to-red-500"
    }
  ]

  const offers = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Flash Sale",
      description: "Up to 70% OFF",
      badge: "Limited Time",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "New Arrivals",
      description: "Fresh Collection",
      badge: "Just Landed",
      color: "bg-gradient-to-br from-pink-400 to-purple-500"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Premium Brands",
      description: "Exclusive Deals",
      badge: "VIP Access",
      color: "bg-gradient-to-br from-indigo-400 to-blue-500"
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Best Sellers",
      description: "Top Rated Items",
      badge: "Trending",
      color: "bg-gradient-to-br from-green-400 to-teal-500"
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing quality and fast delivery! Loved the collection.",
      avatar: "PS"
    },
    {
      name: "Rahul Kumar",
      rating: 5,
      comment: "Best online shopping experience. Highly recommended!",
      avatar: "RK"
    },
    {
      name: "Sneha Patel",
      rating: 5,
      comment: "Great prices and excellent customer service.",
      avatar: "SP"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced & Fully Responsive */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 md:-top-40 -left-20 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-20 md:-right-40 w-48 h-48 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 md:-bottom-40 left-1/4 md:left-1/3 w-48 h-48 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating Elements - Hidden on mobile for cleaner look */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 bg-purple-200/30 backdrop-blur-sm rounded-2xl rotate-12"></div>
          </div>
          <div className="absolute top-40 right-20 animate-float animation-delay-2000">
            <div className="w-20 h-20 bg-pink-200/30 backdrop-blur-sm rounded-full"></div>
          </div>
          <div className="absolute bottom-32 left-1/4 animate-float animation-delay-4000">
            <div className="w-12 h-12 bg-blue-200/30 backdrop-blur-sm rounded-lg -rotate-12"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-28 lg:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-purple-100 backdrop-blur-md rounded-full px-3 sm:px-5 py-1.5 sm:py-2 mb-6 sm:mb-8 border border-purple-200 shadow-lg animate-fade-in">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-pulse text-purple-600" />
              <span className="text-xs sm:text-sm font-semibold text-purple-700">New Collection 2026 • Limited Edition</span>
            </div>
            
            {/* Main Heading - Responsive text sizes */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight animate-slide-up text-gray-900 px-2">
            Elevate Your Fashion
              <span className="block mt-1 sm:mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient">
                Style
              </span>
            </h1>
            
            {/* Subheading - Responsive text sizes */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-500 px-4">
           Discover premium clothing that defines your unique style. 
Shop the latest fashion collections with amazing deals and top quality.
            </p>
            
            {/* CTA Buttons - Responsive sizing */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 animate-fade-in animation-delay-1000 px-4">
              <Link 
                to="/products" 
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link 
                to="/blog" 
                className="group bg-white border-2 border-purple-300 text-purple-600 px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 inline-flex items-center justify-center"
              >
                <TrendingUp className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Explore Trends
              </Link>
            </div>
            
            {/* Stats - Responsive grid and sizing with Animated Counters */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-1500 px-2">
              <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  <AnimatedCounter end={50} duration={2000} suffix="K+" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Happy Customers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  <AnimatedCounter end={10} duration={2000} suffix="K+" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Premium Products</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  <AnimatedCounter end={4.9} duration={2000} decimals={1} />★
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider - Responsive height */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Offers Banner */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer, index) => (
              <Link
                key={index}
                to="/products"
                className="group relative overflow-hidden rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className={`absolute inset-0 ${offer.color}`}></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      {offer.icon}
                    </div>
                    <span className="text-xs font-bold bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {offer.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                  <p className="text-sm text-white/90">{offer.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience shopping like never before with our premium services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center hover:scale-105 transition-all duration-300">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center text-white transform group-hover:rotate-6 transition-all duration-300 shadow-xl group-hover:shadow-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Modern Design with Better Responsiveness */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                EXPLORE COLLECTIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-gray-800 px-4">Shop by Category</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Discover our carefully curated collections designed for every style
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-4 max-w-7xl mx-auto">
            {categories.length > 0 ? (
              categories.slice(0, 6).map((category, index) => (
                <Link 
                  key={category._id} 
                  to={`/products?category=${category.name}`}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="aspect-[3/4] relative">
                    {/* Image */}
                    <img 
                      src={category.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>
                    
                    {/* Decorative Pattern Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                      <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end text-white">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-base sm:text-lg md:text-xl font-black mb-1 sm:mb-2 drop-shadow-lg">{category.name}</h3>
                        <p className="text-gray-200 text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1 hidden sm:block">
                          {category.description || 'Explore collection'}
                        </p>
                        <div className="inline-flex items-center text-xs font-bold bg-white text-purple-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300 shadow-lg">
                          Shop
                          <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner Badge - Alternating colors */}
                    <div className={`absolute top-2 right-2 ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-green-400 to-teal-500' :
                      'bg-gradient-to-r from-pink-400 to-purple-500'
                    } text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse`}>
                      {index % 3 === 0 ? 'NEW' : index % 3 === 1 ? 'HOT' : 'SALE'}
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 md:col-span-4 lg:col-span-6 text-center py-16 sm:py-20">
                <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-gray-300" />
                <p className="text-gray-500 text-base sm:text-lg">No categories available yet</p>
              </div>
            )}
          </div>
          
          {categories.length > 6 && (
            <div className="text-center mt-8 sm:mt-12">
              <Link 
                to="/products" 
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                View All Categories
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <OfferSlide />


      {/* Fashion Approach Section */}
      <FashionApproach />

      {/* Shop by Style Section - Interactive Style Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-6 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              DISCOVER YOUR STYLE
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Shop by Style
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find your perfect look from our curated style collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Casual Style */}
            <Link 
              to="/products?style=casual"
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop"
                  alt="Casual Wear"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2">Casual Wear</h3>
                  <p className="text-sm text-white/90 mb-4">Comfortable everyday styles</p>
                  <div className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Formal Style */}
            <Link 
              to="/products?style=formal"
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop"
                  alt="Formal Wear"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2">Formal Wear</h3>
                  <p className="text-sm text-white/90 mb-4">Professional & elegant</p>
                  <div className="inline-flex items-center bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold group-hover:bg-gray-900 group-hover:text-white transition-all">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Party Style */}
            <Link 
              to="/products?style=party"
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop"
                  alt="Party Wear"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/50 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2">Party Wear</h3>
                  <p className="text-sm text-white/90 mb-4">Stand out in style</p>
                  <div className="inline-flex items-center bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-bold group-hover:bg-pink-600 group-hover:text-white transition-all">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Sports Style */}
            <Link 
              to="/products?style=sports"
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&auto=format&fit=crop"
                  alt="Sports Wear"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2">Sports Wear</h3>
                  <p className="text-sm text-white/90 mb-4">Active & athletic</p>
                  <div className="inline-flex items-center bg-white text-green-600 px-4 py-2 rounded-full text-sm font-bold group-hover:bg-green-600 group-hover:text-white transition-all">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* View All Styles Button */}
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-black text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              View All Collections
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 mb-4 shadow-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-2" />
              <span className="text-sm font-bold text-gray-700">5-Star Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
              Loved by Thousands
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our community of happy shoppers who trust us for quality and service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-lg mr-4 shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-500 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Verified Purchase
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Badges - Enhanced & Animated */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                  <AnimatedCounter end={50} duration={2500} suffix="K+" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-600">Happy Customers</div>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  <AnimatedCounter end={10} duration={2500} suffix="K+" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-600">Premium Products</div>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                  <AnimatedCounter end={4.9} duration={2500} decimals={1} />★
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 relative overflow-hidden">
        {/* Animated Background - Same as Hero */}
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 md:-top-40 -left-20 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-20 md:-right-40 w-48 h-48 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 md:-bottom-40 left-1/4 md:left-1/3 w-48 h-48 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-purple-100 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 border border-purple-200 shadow-lg">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-bounce text-purple-600" />
              <span className="font-bold text-sm sm:text-base text-purple-700">Special Offer • Limited Time Only</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight text-gray-900">
              Ready to Upgrade Your Wardrobe?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              Join 50,000+ fashion lovers and get exclusive access to new arrivals, special offers, and style tips
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4">
              <Link 
                to="/register" 
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-black text-base sm:text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Create Free Account
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link 
                to="/products" 
                className="group bg-white border-2 border-purple-300 text-purple-600 px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-black text-base sm:text-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 inline-flex items-center justify-center shadow-lg"
              >
                <ShoppingBag className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Start Shopping
              </Link>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-purple-600" />
                <div className="font-bold mb-1 text-gray-800 text-sm sm:text-base">Free Shipping</div>
                <div className="text-xs sm:text-sm text-gray-600">On orders above ₹999</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-purple-600" />
                <div className="font-bold mb-1 text-gray-800 text-sm sm:text-base">Easy Returns</div>
                <div className="text-xs sm:text-sm text-gray-600">30-day return policy</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-purple-600" />
                <div className="font-bold mb-1 text-gray-800 text-sm sm:text-base">Secure Payment</div>
                <div className="text-xs sm:text-sm text-gray-600">100% safe & encrypted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                <span className="text-2xl mr-2">💡</span>
                Frequently Asked Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
                Everything You Need to Know
              </h2>
              <p className="text-gray-600 text-lg">
                Find answers to common questions about shopping with us
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How can I track my order?",
                  answer: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for all unused items in original packaging. Simply contact our customer support team to initiate a return, and we'll guide you through the process."
                },
                {
                  question: "Do you offer free shipping?",
                  answer: "Yes! We offer free shipping on all orders above ₹999. For orders below this amount, standard shipping charges apply based on your location."
                },
                {
                  question: "How long does delivery take?",
                  answer: "Delivery typically takes 3-7 business days depending on your location. Metro cities usually receive orders within 3-4 days, while other areas may take 5-7 days."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and popular digital wallets. All transactions are 100% secure and encrypted."
                }
              ].map((faq, index) => (
                <details 
                  key={index}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        💡
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <svg 
                      className="w-6 h-6 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our customer support team is here to help you 24/7
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Contact Support
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    

      {/* Newsletter Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-white/30">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold">Exclusive Subscriber Benefits</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black mb-4">
                  Get 20% Off Your First Order!
                </h3>
                <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
                  Subscribe to our newsletter for exclusive deals, early access to sales, and style inspiration
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 px-6 py-4 rounded-full text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg"
                  />
                  <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-black hover:bg-gray-800 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105">
                    Subscribe Now
                  </button>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Exclusive Deals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Early Access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Style Tips</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Unsubscribe Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
