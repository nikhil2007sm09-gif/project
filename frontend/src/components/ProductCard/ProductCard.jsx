import { Heart, Eye, ShoppingCart, Share2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, onQuickView, onAddToCart, onToggleWishlist, isInWishlist, getLikeCount }) => {
  return (
    <div 
      key={product._id} 
      className="group bg-white rounded-lg md:rounded-xl lg:rounded-2xl  transition-all duration-500 overflow-hidden border border-gray-100 "
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/400x300?text=Product+Image'} 
          alt={product.name}
          className="w-full h-32 sm:h-36 md:h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-xs font-medium shadow-md">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => onToggleWishlist(product)}
            className="bg-white/95 backdrop-blur-sm p-1.5 md:p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 relative group/btn"
            title={isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-3 h-3 md:w-4 md:h-4 transition-colors ${
              isInWishlist(product._id) 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 hover:text-red-500'
            }`} />
            <div className="absolute -top-1 -left-1 bg-red-500 text-white text-[8px] md:text-[10px] font-medium rounded-full min-w-[16px] md:min-w-[18px] h-4 md:h-[18px] flex items-center justify-center px-1">
              {getLikeCount(product)}
            </div>
          </button>
          <button 
            onClick={() => onQuickView(product)}
            className="bg-white/95 backdrop-blur-sm p-1.5 md:p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 relative group/btn"
            title="Quick View"
          >
            <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-600 hover:text-blue-500" />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white/95 backdrop-blur-sm p-1.5 md:p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 relative group/btn"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 hover:text-green-500" />
          </button>
          <Link
            to={`/product/${product._id}/share`}
            className="bg-white/95 backdrop-blur-sm p-1.5 md:p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 relative group/btn"
            title="Share Product"
          >
            <Share2 className="w-3 h-3 md:w-4 md:h-4 text-gray-600 hover:text-purple-500" />
          </Link>
        </div>
        
        {/* Stock Badge - Bottom Right */}
        <div className="absolute bottom-2 right-2">
          {product.stock > 0 ? (
            <span className="bg-green-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-[10px] md:text-xs font-medium shadow-md">
              {product.stock} left
            </span>
          ) : (
            <span className="bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-[10px] md:text-xs font-medium shadow-md">
              Out of Stock
            </span>
          )}
        </div>

        {/* Like Count Badge - Bottom Left */}
        <div className="absolute bottom-2 left-2">
          <div className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-1 shadow-md">
            <Heart className="w-3 h-3 fill-white" />
            <span className="text-[10px] md:text-xs font-medium">
              {getLikeCount(product)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {/* Category */}
        <div className="mb-2 md:mb-3">
          <span className="inline-block bg-[#DFA126] text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold shadow-md transition-all duration-300">
            {product.category || 'Product'}
          </span>
        </div>

        <h3 className="text-sm sm:text-base md:text-lg font-bold bg-clip-text text-transparent bg-black line-clamp-2">
          {product.name}
        </h3>

        {/* Rating and Likes */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating || 4.5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
              ({product.reviews || 0})
            </span>
          </div>
          
          <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full">
            <Heart className={`w-3 h-3 ${isInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-red-400'}`} />
            <span className="text-[10px] sm:text-xs font-bold text-red-600">
              {getLikeCount(product)}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <span className="text-sm sm:text-lg md:text-2xl font-extrabold bg-clip-text text-transparent bg-[#F3B328]">
            ₹{product.price}
          </span>

          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-gray-400 line-through text-[10px] sm:text-xs md:text-sm">
                ₹{product.originalPrice}
              </span>

              <span className="text-[10px] sm:text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        
        <Link 
          to={`/product/${product._id}`}
          className="group/link relative block w-full bg-[#DFA126] text-white py-1.5 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg md:rounded-xl text-center font-medium shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 text-xs sm:text-sm md:text-base"
        >
          <span className="relative z-10">
            View Details
          </span>

          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#3F322C] opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
