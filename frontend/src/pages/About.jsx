import { Link } from 'react-router-dom'
import { ShoppingBag, Users, TrendingUp, Award, Heart, Shield, Zap, Globe, Star, CheckCircle, Truck, CreditCard, ArrowRight, Sparkles, Quote, ThumbsUp, Package, Headphones, Clock, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import Story from "../img/clothe-ourstory-image.jpg";
import { motion } from "framer-motion";
import AboutSection from './About1';

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

    const element = document.getElementById(`counter-about-${end}`)
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
    <span id={`counter-about-${end}`}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

const About = () => {
  const whyChooseUs = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Secure Shopping',
      description: 'Your data and payments are protected with bank-level encryption and security.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly with real-time tracking and updates.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <RefreshCw className="w-7 h-7" />,
      title: 'Easy Returns',
      description: 'Hassle-free 30-day return policy. Not satisfied? Get your money back.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you with any questions.',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Fashion Vendor',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
      quote: 'This platform transformed my small boutique into a thriving online business. The support team is amazing!',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Happy Customer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      quote: 'Best shopping experience ever! Fast delivery, quality products, and excellent customer service.',
      rating: 5
    },
    {
      name: 'Anjali Patel',
      role: 'Affiliate Marketer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      quote: 'The affiliate program is transparent and rewarding. I\'ve been earning consistently for over a year now.',
      rating: 5
    }
  ]

  const achievements = [
    { icon: <Package className="w-8 h-8" />, value: '1M+', label: 'Orders Delivered', color: 'from-blue-500 to-cyan-500' },
    { icon: <ThumbsUp className="w-8 h-8" />, value: '4.9/5', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' },
    { icon: <Globe className="w-8 h-8" />, value: '15+', label: 'Countries', color: 'from-green-500 to-emerald-500' },
    { icon: <Headphones className="w-8 h-8" />, value: '24/7', label: 'Support', color: 'from-purple-500 to-pink-500' }
  ]
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: '50K+', label: 'Happy Customers', color: 'from-blue-500 to-blue-600' },
    { icon: <ShoppingBag className="w-8 h-8" />, value: '10K+', label: 'Products', color: 'from-orange-500 to-orange-600' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '500+', label: 'Vendors', color: 'from-green-500 to-green-600' },
    { icon: <Award className="w-8 h-8" />, value: '99%', label: 'Satisfaction', color: 'from-purple-500 to-purple-600' }
  ]

  const values = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We go above and beyond to ensure you have the best shopping experience.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Trust & Security',
      description: 'Shop with confidence. Your data is protected with industry-leading security measures.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping to get your products to you as quickly as possible.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Global Reach',
      description: 'Connecting vendors and customers worldwide with seamless international shipping.',
      color: 'bg-green-100 text-green-600'
    }
  ]

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Curated selection of high-quality products'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Verified Vendors',
      description: 'All sellers are thoroughly vetted'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Shipping',
      description: 'On orders above ₹999'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Multiple payment options available'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Visionary leader with 15+ years in e-commerce'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Tech innovator building scalable solutions'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Creative strategist driving brand growth'
    },
    {
      name: 'David Kim',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'Logistics expert ensuring smooth operations'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize e-commerce' },
    { year: '2021', title: '1000+ Vendors', description: 'Reached our first major milestone' },
    { year: '2022', title: 'International Expansion', description: 'Expanded to 10+ countries' },
    { year: '2023', title: '50K+ Customers', description: 'Built a thriving community' }
  ]

 const sections = [
  {
    title: "Our Journey ",
    text: "Founded in 2020, we built a platform where vendors grow, affiliates earn, and customers discover amazing products.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978", 
  },
  {
    title: "Our Growth ",
    text: "From a small team to thousands of vendors and millions of users, we’ve built a powerful ecosystem.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", 
  },
  {
    title: "Our Mission ",
    text: "We aim to empower entrepreneurs, reward affiliates, and deliver the best experience.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", 
  },
];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced Like Home Page */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 md:-top-40 -left-20 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-20 md:-right-40 w-48 h-48 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 md:-bottom-40 left-1/4 md:left-1/3 w-48 h-48 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating Elements - Hidden on mobile */}
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
          <div className="inline-flex items-center 
bg-gradient-to-r from-orange-100 to-orange-50 
backdrop-blur-md rounded-full 
px-4 sm:px-6 py-2 sm:py-3 
mb-6 sm:mb-8 
border border-orange-300 
shadow-md hover:shadow-orange-400/30 
transition-all duration-300">

  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 
  text-orange-500 animate-pulse" />

  <span className="text-sm sm:text-base font-bold 
  bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 to-[#3F322C] tracking-wide">
    Our Story • Since 2020
  </span>

</div>
            
            {/* Main Heading - Responsive */}
           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
font-black mb-4 sm:mb-6 leading-tight animate-slide-up px-2">

  <span className="text-[#3F322C]">
    Building the Future
  </span>

  <span className="block mt-1 sm:mt-2 
  bg-clip-text text-transparent 
  bg-gradient-to-r from-[#E1A154] via-[#E1A154] to-[#E1A154] 
  animate-gradient">
    of E-Commerce
  </span>

</h1>
            {/* Subheading - Responsive */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-500 px-4">
              Connecting vendors, affiliates, and customers in one seamless marketplace. 
              We're revolutionizing online shopping with innovation and trust.
            </p>
            
            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 animate-fade-in animation-delay-1000 px-4">
           <Link 
  to="/products" 
  className="group relative 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 
  rounded-full font-bold text-base sm:text-lg 
  hover:shadow-2xl hover:shadow-orange-500/30 
  transition-all duration-300 
  inline-flex items-center justify-center overflow-hidden"
>
  <span className="relative z-10 flex items-center">
    Shop Now
    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
  </span>

  <div className="absolute inset-0 
  bg-gradient-to-r from-orange-500 to-[#2b221d] 
  opacity-0 group-hover:opacity-100 
  transition-opacity duration-300">
  </div>
</Link>
              <Link 
                to="/vendor/register" 
                className="group bg-white border-2 border[#3F322C] text[#3F322C] px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 inline-flex items-center justify-center shadow-lg"
              >
                <Users className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Join as Vendor
              </Link>
            </div>
            
            {/* Stats - Responsive with Animated Counters */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-1500 px-2">
              <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D68F37] to-[#D68F37]">
                  <AnimatedCounter end={50} duration={2000} suffix="K+" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Happy Customers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D68F37] to-[#D68F37]">
                  <AnimatedCounter end={500} duration={2000} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Trusted Vendors</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D68F37] to-[#D68F37]">
                  <AnimatedCounter end={99} duration={2000} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider - Responsive */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
           <div className="inline-block mb-4">
  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  text-white text-xs sm:text-sm font-black 
  px-4 sm:px-5 py-2 
  rounded-full shadow-lg 
  hover:shadow-orange-500/30 
  transition-all duration-300 tracking-wider">
    OUR JOURNEY
  </span>
</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center">

  <span className="bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] tracking-wide">
    Our Story
  </span>

  <div className="h-1 w-20 mx-auto mt-3 
  rounded-full bg-gradient-to-r 
  from-orange-400 to-[#3F322C]"></div>

</h2>
           
          </div>

 <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-10 via-white to-purple-10 dark:from-gray-200 dark:via-gray-200 dark:to-gray-200 transition-all duration-500">

  <div className="space-y-20">

    {sections.map((item, index) => {
      const isReverse = index % 2 !== 0;

      return (
        <div
          key={index}
          className="grid md:grid-cols-5 gap-10 items-center w-full"
        >

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`md:col-span-3 ${
              isReverse ? "md:order-2" : ""
            } bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/30`}
          >
           <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-4 tracking-wide">

  <span className="bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  drop-shadow-sm">
    {item.title}
  </span>

</h2>

<div className="w-24 h-1.5 
bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
mb-6 rounded-full shadow-md"></div>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              {item.text}
            </p>

            {/* <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300">
              Explore More →
            </button> */}
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`md:col-span-2 relative ${
              isReverse ? "md:order-1" : ""
            }`}
          >
            <div className="relative group">

              {/* Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

              {/* Image */}
              <img
                src={item.img}
                alt=""
                className="relative rounded-3xl w-full h-[260px] sm:h-[320px] object-cover shadow-2xl transform group-hover:scale-105 transition duration-500"
              />
            </div>
          </motion.div>

        </div>
      );
    })}

  </div>
</section>
        </div>
      </div>

      {/* Why Choose Us - Enhanced */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  text-white text-xs sm:text-sm font-black 
  px-4 sm:px-5 py-2 
  rounded-full shadow-lg 
  hover:shadow-orange-500/30 
  transition-all duration-300 tracking-wider">
    WHY US
  </span>
</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center">

  <span className="bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] tracking-wide">
    Why Shop With Us?
  </span>

  <div className="h-1 w-24 mx-auto mt-3 
  rounded-full bg-gradient-to-r 
  from-orange-400 via-orange-500 to-[#3F322C] shadow-md">
  </div>

</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto items-center">
            {/* Left Side - Image */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="Shopping Experience"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 border-2 sm:border-4 border-purple-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-black to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">100%</p>
                    <p className="text-xs sm:text-sm text-gray-600">Verified</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Benefits */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-x-2 border border-purple-100"
                >
                 {/* Icon */}
  <div className="w-14 h-14 flex items-center justify-center 
  rounded-xl 
  bg-gradient-to-r from-orange-400 to-[#3F322C] 
  text-white shadow-md">
    {item.icon}
  </div>

                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gradient-to-br from-bl
      ue-50 via-purple-50 to-pink-50 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
<div className="inline-block mb-4">
  <span className="bg-white 
  text-xs sm:text-sm font-bold 
  px-4 sm:px-5 py-2 
  rounded-full shadow-lg 
  border border-orange-300 
  hover:shadow-orange-300/40 
  transition-all duration-300">

    <span className="bg-clip-text text-transparent 
    bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
    tracking-wide">
      WHY CHOOSE US
    </span>

  </span>
</div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

  <span className="bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  drop-shadow-sm">
    What Makes Us Special
  </span>

  <div className="h-1 w-28 mx-auto mt-3 
  rounded-full bg-gradient-to-r 
  from-orange-400 via-orange-500 to-[#3F322C] 
  shadow-md">
  </div>

</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                 <div className="flex-shrink-0 
w-10 h-10 sm:w-12 sm:h-12 
bg-gradient-to-br from-orange-400 via-orange-500 to-[#3F322C] 
rounded-xl flex items-center justify-center 
text-white shadow-lg 
hover:shadow-orange-400/40 
transition-all duration-300">

  {feature.icon}

</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base md:text-lg">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  text-white text-xs sm:text-sm font-bold 
  px-3 sm:px-4 py-1.5 sm:py-2 
  rounded-full shadow-lg tracking-wide">
    MILESTONES
  </span>
</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

  <span className="bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  drop-shadow-sm">
    Our Journey
  </span>

  <div className="h-1 w-24 mx-auto mt-3 
  rounded-full bg-gradient-to-r 
  from-orange-400 via-orange-500 to-[#3F322C] 
  shadow-md">
  </div>

</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Key milestones in our growth story
            </p>
          </div>

       <div className="max-w-7xl mx-auto px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {milestones.map((milestone, index) => (
      <div
        key={index}
        className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 
        shadow-md hover:shadow-2xl 
        hover:shadow-orange-200 
        transition-all duration-500 
        border border-orange-100 
        hover:-translate-y-3"
      >
        
        {/* Year Badge */}
        <div className="absolute -top-5 left-6 
        bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
        text-white px-5 py-1.5 
        rounded-full text-sm font-semibold 
        shadow-lg group-hover:scale-105 transition">
          {milestone.year}
        </div>

        {/* Content */}
        <div className="mt-8">
          
          <h3 className="text-xl font-bold mb-3 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-orange-400 to-[#3F322C]">
            {milestone.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            {milestone.description}
          </p>

        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl 
        bg-gradient-to-r 
        from-orange-400/0 to-[#3F322C]/0 
        group-hover:from-orange-400/10 
        group-hover:to-[#3F322C]/10 
        transition duration-500">
        </div>

{/* Line Connector */}
{index < milestones.length - 1 && (
  <div
    className="hidden lg:block absolute 
    top-1/2 left-full 
    -translate-y-1/2 
    w-20 h-[3px] 
    bg-gradient-to-r from-orange-400 to-[#3F322C]"
  ></div>
)}
      </div>
    ))}
  </div>
</div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
         <div className="inline-block mb-4">
  <span className="bg-gradient-to-r 
  from-orange-400 via-orange-500 to-[#3F322C] 
  text-white text-xs sm:text-sm font-bold 
  px-3 sm:px-4 py-1.5 sm:py-2 
  rounded-full shadow-lg tracking-wide">
    OUR VALUES
  </span>
</div>
         <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

  <span className="bg-clip-text text-transparent 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  drop-shadow-sm">
    What We Stand For
  </span>

  <div className="h-1 w-28 mx-auto mt-3 
  rounded-full bg-gradient-to-r 
  from-orange-400 via-orange-500 to-[#3F322C] 
  shadow-md">
  </div>

</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
              >
               <div className="inline-flex items-center justify-center 
w-16 h-16 sm:w-20 sm:h-20 
rounded-2xl 
bg-gradient-to-br from-orange-400 via-orange-500 to-[#3F322C] 
mb-4 sm:mb-6 shadow-lg 
text-white 
hover:shadow-orange-300/40 
transition-all duration-300">

  {value.icon}

</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
           <div className="inline-block mb-4">
  <span className="
    bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C]
    text-white
    text-xs sm:text-sm font-bold
    px-4 sm:px-6 py-2
    rounded-full
    shadow-lg
    border border-orange-300/40
    backdrop-blur-md
    hover:scale-105
    transition-all duration-300">
    
    ACHIEVEMENTS

  </span>
</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

  <span className="
    bg-clip-text text-transparent 
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C] 
    drop-shadow-sm">
    
    Our Impact

  </span>

  <div className="
    h-1 w-24 mx-auto mt-3 
    rounded-full 
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C] 
    shadow-md">
  </div>

</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div className="group bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-purple-100 hover:shadow-2xl">
             <div className="
inline-flex items-center justify-center 
w-14 h-14 sm:w-16 sm:h-16 
rounded-full 
bg-gradient-to-br from-orange-400 via-orange-500 to-[#3F322C] 
text-white 
mb-4 
shadow-lg 
group-hover:scale-110 
group-hover:shadow-orange-400/40
transition-all duration-300">

  <Package className="w-7 h-7 sm:w-8 sm:h-8" />

</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                <AnimatedCounter end={1} duration={2500} suffix="M+" />
              </h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm">Orders Delivered</p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-purple-100 hover:shadow-2xl">
             <div className="
inline-flex items-center justify-center 
w-14 h-14 sm:w-16 sm:h-16 
rounded-full 
bg-gradient-to-br from-orange-400 via-orange-500 to-[#3F322C] 
text-white 
mb-4 
shadow-lg 
group-hover:scale-110 
group-hover:shadow-orange-400/40
transition-all duration-300">

  <ThumbsUp className="w-7 h-7 sm:w-8 sm:h-8" />

</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                <AnimatedCounter end={4.9} duration={2500} decimals={1} />/5
              </h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm">Average Rating</p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-purple-100 hover:shadow-2xl">
              <div className="
inline-flex items-center justify-center 
w-14 h-14 sm:w-16 sm:h-16 
rounded-full 
bg-gradient-to-br from-orange-400 via-orange-500 to-[#3F322C] 
text-white 
mb-4 
shadow-lg 
group-hover:scale-110 
group-hover:shadow-orange-400/40
transition-all duration-300">

  <Globe className="w-7 h-7 sm:w-8 sm:h-8" />

</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                <AnimatedCounter end={15} duration={2500} suffix="+" />
              </h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm">Countries</p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 border border-purple-100 hover:shadow-2xl">
              <div className="
inline-flex items-center justify-center 
w-14 h-14 sm:w-16 sm:h-16 
rounded-full 
bg-gradient-to-br from-orange-400 via-orange-500 to-[#3F322C] 
text-white 
mb-4 
shadow-lg 
group-hover:scale-110 
group-hover:shadow-orange-400/40
transition-all duration-300">

  <Headphones className="w-7 h-7 sm:w-8 sm:h-8" />

</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">24/7</h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
           <div className="inline-block mb-4">
  <span className="
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C]
    text-white
    text-xs sm:text-sm
    font-bold
    px-4 sm:px-6
    py-2
    rounded-full
    border border-orange-300/40
    shadow-lg
    backdrop-blur-md
    hover:scale-105
    transition-all duration-300">
    
    TESTIMONIALS

  </span>
</div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

  <span className="
    bg-clip-text text-transparent 
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C] 
    drop-shadow-sm">
    
    What People Say

  </span>

  <div className="
    h-1 w-28 mx-auto mt-3 
    rounded-full 
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C] 
    shadow-md">
  </div>

</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Real stories from our amazing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-purple-100 shadow-lg"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg">{testimonial.name}</h4>
                    <p className="text-purple-600 text-xs sm:text-sm font-semibold">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-purple-200" />
                </div>
                
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  <AboutSection />
      {/* Team Section */}
      {/* <div className="bg-white py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                OUR TEAM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-4 sm:mb-6 px-4">Meet Our Team</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              The passionate people behind our success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-3 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-48 h-48 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-20 w-48 h-48 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
        <div className="
inline-flex items-center 
bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C]
rounded-full 
px-4 sm:px-6 py-2.5
mb-6 sm:mb-8 
shadow-lg 
border border-orange-300/40
backdrop-blur-md
text-white
hover:scale-105
transition-all duration-300">

  <Sparkles className="w-4 h-4 mr-2 animate-pulse text-white" />

  <span className="text-xs sm:text-sm font-semibold">
    Join Us Today
  </span>

</div>
          
         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

  <span className="
    bg-clip-text text-transparent 
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C] 
    drop-shadow-sm">
    
    Join Our Growing Community

  </span>

  <div className="
    h-1 w-32 mx-auto mt-3 
    rounded-full 
    bg-gradient-to-r 
    from-orange-400 via-orange-500 to-[#3F322C] 
    shadow-md">
  </div>

</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
            Whether you're a vendor, affiliate, or customer, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
           <Link
  to="/vendor/register"
  className="group relative 
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C] 
  text-white 
  px-6 sm:px-8 py-3.5 sm:py-4 
  rounded-full 
  font-bold text-base sm:text-lg 
  hover:shadow-orange-400/40 
  hover:scale-105
  transition-all duration-300 
  inline-flex items-center justify-center 
  overflow-hidden"
>
  <span className="relative z-10 flex items-center">
    Start Selling
    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
  </span>

  <div className="
    absolute inset-0 
    bg-gradient-to-r from-orange-500 to-[#3F322C] 
    opacity-0 group-hover:opacity-100 
    transition-opacity duration-300">
  </div>
</Link>
           <Link
  to="/affiliate/register"
  className="
  group relative
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C]
  text-white
  px-6 sm:px-8 py-3.5 sm:py-4
  rounded-full
  font-bold text-base sm:text-lg
  hover:scale-105
  transition-all duration-300
  inline-flex items-center justify-center
  shadow-lg overflow-hidden"
>
  <span className="relative z-10">Become an Affiliate</span>
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#3F322C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
</Link>

<Link
  to="/register"
  className="
  group relative
  bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C]
  text-white
  px-6 sm:px-8 py-3.5 sm:py-4
  rounded-full
  font-bold text-base sm:text-lg
  hover:scale-105
  transition-all duration-300
  inline-flex items-center justify-center
  shadow-lg overflow-hidden"
>
  <span className="relative z-10">Shop Now</span>
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#3F322C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
</Link>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default About
