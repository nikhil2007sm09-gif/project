import { Link } from 'react-router-dom'
import { User, Store, Users, ArrowLeft } from 'lucide-react'

const UnifiedLogin = () => {
  const loginOptions = [
    {
      to: "/customer/login",
      title: "Customer",
      desc: "Shop for premium products",
      icon: User,
      colorClass: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      to: "/vendor/login",
      title: "Vendor",
      desc: "Manage your storefront & products",
      icon: Store,
      colorClass: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      to: "/affiliate/login",
      title: "Affiliate",
      desc: "Promote products & earn commissions",
      icon: Users,
      colorClass: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50 flex items-center justify-center px-4 py-16 antialiased">
      <div className="max-w-5xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Choose Login Type
          </h1>
          <p className="text-base text-slate-500 max-w-md mx-auto">
            Please select your account type to proceed to your personalized dashboard.
          </p>
        </div>
        
        {/* Cards Grid (Ab 3 cards ke liye grid properly responsive hai) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {loginOptions.map((option, idx) => {
            const IconComponent = option.icon
            return (
              <Link
                key={idx}
                to={option.to}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 p-8 text-center transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-between overflow-hidden"
              >
                {/* Top decorative gradient bar on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${option.colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="flex flex-col items-center">
                  {/* Icon Wrapper */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${option.bgColor} rounded-2xl mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    <IconComponent className={`w-8 h-8 ${option.textColor}`} />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-slate-900 transition-colors">
                    {option.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {option.desc}
                  </p>
                </div>

                <span className={`text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 ${option.textColor} group-hover:bg-opacity-0 group-hover:text-black transition-all duration-300 relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:${option.colorClass} before:-z-10 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity`}>
                  Login Now &rarr;
                </span>
              </Link>
            )
          })}
        </div>

        {/* Register Section */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/80 p-8 text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-slate-600 font-medium mb-5">Don't have an account yet?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow"
            >
              Customer Signup
            </Link>
            <Link
              to="/vendor/register"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow"
            >
              Vendor Signup
            </Link>
            <Link
              to="/affiliate/register"
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-sm hover:shadow"
            >
              Affiliate Signup
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            to="/" 
            className="text-slate-500 hover:text-slate-800 font-medium text-sm inline-flex items-center gap-2 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home Website
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default UnifiedLogin