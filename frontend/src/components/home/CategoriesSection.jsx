import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'

const CategoriesSection = ({ categories }) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#f3f2ee] font-sans selection:bg-orange-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-black text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-md hover:shadow-orange-500/30 transition">
              EXPLORE COLLECTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-black tracking-wide">
              Shop by Category
            </span>
            <div className="h-1 w-20 mx-auto mt-3 rounded-full bg-gradient-to-r from-orange-400 to-black"></div>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover our carefully curated collections designed for every style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4 ">
          {categories.length > 0 ? (
            categories.slice(0, 4).map((category, index) => (
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
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end text-white">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-base sm:text-lg md:text-xl font-black mb-1 sm:mb-2 drop-shadow-lg">{category.name}</h3>
                      <p className="text-gray-200 text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1 hidden sm:block">
                        {category.description || 'Explore collection'}
                      </p>
                      <div className="inline-flex items-center text-xs font-bold bg-white text-orange-500 px-3 py-2 rounded-full border border-orange-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-black group-hover:text-white transition-all duration-300 shadow-md">
                        Shop
                        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Badge - Alternating colors */}
                  <div className={`absolute top-2 right-2 ${index % 3 === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
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
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              View All Categories
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default CategoriesSection
