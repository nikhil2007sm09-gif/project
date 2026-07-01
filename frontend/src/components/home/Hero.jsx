import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedCounter } from '../../components/common/AnimatedCounter'

const Hero = ({ sliders, currentSlide, setCurrentSlide }) => {
  useEffect(() => {
    if (sliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [sliders.length, setCurrentSlide])

  return (
    <section className="relative  text-gray-800 overflow-hidden bg-[#f3f2ee] font-sans selection:bg-orange-200">
      {/* Animated Background */}
      <div className="absolute inset-0  opacity-50"></div>

      {/* Floating Elements - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 backdrop-blur-sm rounded-2xl rotate-12"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float animation-delay-2000">
          <div className="w-20 h-20 backdrop-blur-sm rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float animation-delay-4000">
          <div className="w-12 h-12 backdrop-blur-sm rounded-lg -rotate-12"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F7EDE5] rounded-full px-4 py-1.5 border border-[#EADFD6] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9A46C]" />
            <span className="text-sm font-medium text-[#3A2E2A]">
              New Collection 2026 • Limited Edition
            </span>
          </div>

          {/* Main Heading - Responsive text sizes */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight animate-slide-up text-[#3F322C] px-2">
            Elevate Your Fashion
            <span className="inline-block leading-[1.2] align-middle bg-clip-text text-transparent bg-gradient-to-r from-[#E1A154] via-[#E1A154] to-[#E1A154]">
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
              className="group relative bg-gradient-to-r from-[#DB8B37] to-black text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Shop Collection
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-black-700 to-white-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/blog"
              className="group bg-white border-2 border-[#9A9591]-300 text-[#9A9591]-600 px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 inline-flex items-center justify-center"
            >
              <span className="mr-2">📈</span>
              Explore Trends
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-1500 px-2">
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-[#D68F37] ">
                <AnimatedCounter end={50} duration={2000} suffix="K+" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700">Happy Customers</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-[#D68F37]">
                <AnimatedCounter end={10} duration={2000} suffix="K+" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700">Premium Products</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 bg-clip-text text-transparent bg-[#D68F37]">
                <AnimatedCounter end={4.9} duration={2000} decimals={1} />★
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider - Responsive height */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
        </svg>
      </div> */}
    </section>
  )
}

export default Hero
