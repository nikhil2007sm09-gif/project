import { Star, CheckCircle, Truck, CreditCard } from 'lucide-react'

const FeaturesGridSection = () => {
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

  return (
    <div className=" py-16 sm:py-20 bg-[#f3f2ee] font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4 ">
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
  )
}

export default FeaturesGridSection
