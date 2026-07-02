import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ProductCard/ProductCard'

const ProductsGrid = ({ 
  filteredProducts, 
  selectedCategory, 
  categories,
  error,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  getLikeCount,
  showFilters,
  onToggleFilters
}) => {
  const PRODUCTS_PER_PAGE = 12
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [filteredProducts.length])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to products section
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="lg:w-3/4">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4 md:mb-6">
        <button 
          onClick={onToggleFilters}
          className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 text-sm md:text-base"
        >
          <span className="text-lg">⚙️</span>
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">ℹ️</span>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Products Count and Selected Category */}
      <div className="text-center mb-8">
        {selectedCategory === 'all' ? (
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              All Products
            </h3>
            <p className="text-gray-600 font-medium">
              {filteredProducts.length} products found across all categories
            </p>
          </div>
        ) : selectedCategory ? (
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {categories.find(cat => cat._id === selectedCategory)?.name || 'Selected Category'}
            </h3>
            <p className="text-gray-600 font-medium">
              {filteredProducts.length} products found in this category
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Select a Category
            </h3>
            <p className="text-gray-600 font-medium">
              Click on any category above to view products
            </p>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard 
              key={product._id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist}
              getLikeCount={getLikeCount}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg font-medium">No products found</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 md:p-3 border border-gray-300 rounded-lg hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            title="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)

              if (!showPage && page !== 2 && page !== totalPages - 1) {
                return null
              }

              if (page === 2 && currentPage > 3 && totalPages > 4) {
                return (
                  <span key="dots-start" className="px-2 py-1">
                    ...
                  </span>
                )
              }

              if (page === totalPages - 1 && currentPage < totalPages - 2 && totalPages > 4) {
                return (
                  <span key="dots-end" className="px-2 py-1">
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-black text-white shadow-lg'
                      : 'border border-gray-300 text-gray-700 hover:border-black hover:text-black'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 md:p-3 border border-gray-300 rounded-lg hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            title="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductsGrid
