import { Users, ShoppingBag, TrendingUp, Award } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: '50K+', label: 'Happy Customers', color: 'from-blue-500 to-blue-600' },
    { icon: <ShoppingBag className="w-8 h-8" />, value: '10K+', label: 'Products', color: 'from-orange-500 to-orange-600' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '500+', label: 'Vendors', color: 'from-green-500 to-green-600' },
    { icon: <Award className="w-8 h-8" />, value: '99%', label: 'Satisfaction', color: 'from-purple-500 to-purple-600' }
  ]

  return (
    <div className="bg-[#f3f2ee] font-sans selection:bg-orange-200  py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl 
font-extrabold mb-6 px-4 text-center tracking-wide">

            <span className="bg-clip-text text-transparent 
            bg-gradient-to-r from-orange-400 via-orange-500 to-[#3F322C]">
              Our Achievements
            </span>

            <div className="h-1 w-28 mx-auto mt-3 
            rounded-full bg-gradient-to-r 
            from-orange-400 via-orange-500 to-[#3F322C] 
            shadow-md">
            </div>

          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Trusted by millions of customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-[#3F322C]">
                {stat.value}
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsSection
