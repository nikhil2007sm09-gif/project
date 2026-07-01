import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Users } from 'lucide-react'
import { AnimatedCounter } from '../common/AnimatedCounter'

const HeroSection = () => {
  return (
    <div className='bg-[#f3f2ee] font-sans selection:bg-orange-200'>
    <section className="relative text-gray-800 overflow-hidden ">
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
              className="group bg-white border-2 border-[#3F322C] text-[#3F322C] px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 inline-flex items-center justify-center shadow-lg"
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
    </div>
  )
}

export default HeroSection
