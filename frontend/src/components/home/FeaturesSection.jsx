import { Truck, Shield, Award, Users } from 'lucide-react'

const FeaturesSection = () => {
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

  return (
    <section className="py-20 bg-[#f3f2ee] font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-black tracking-wide">
              Why Choose Us
            </span>
            {/* Underline Effect */}
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-gradient-to-r from-orange-400 to-black"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience shopping like never before with our premium services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#3F322C] rounded-3xl flex items-center justify-center text-white transform group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/30">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
