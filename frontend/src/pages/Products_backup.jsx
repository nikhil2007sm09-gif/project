// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Heart, Share2, ShoppingCart, Star, Filter, X } from 'lucide-react'

// const Products = () => {
//   const [products, setProducts] = useState([])
//   const [categories, setCategories] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [showFilters, setShowFilters] = useState(false)
//   const [filters, setFilters] = useState({
//     category: '',
//     minPrice: 0,
//     maxPrice: 10000,
//     sortBy: 'name'
//   })

//   useEffect(() => {
//     fetchProducts()
//     fetchCategories()
//   }, [filters])

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('http://localhost:5000/api/products')
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const data = await response.json()
//       setProducts(data)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       setError('Failed to load products. Please check if the backend server is running.')
//       // Set some dummy products for testing
//       setProducts([
//         {
//           _id: '1',
//           name: 'Premium Cotton T-Shirt',
//           price: 999,
//           originalPrice: 1299,
//           images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'],
//           category: { name: 'Fashion' },
//           stock: 10,
//           sizes: ['S', 'M', 'L', 'XL'],
//           colors: [{ name: 'Red', value: '#FF0000' }, { name: 'Blue', value: '#0000FF' }]
//         },
//         {
//           _id: '2',
//           name: 'Wireless Headphones',
//           price: 1499,
//           originalPrice: 1999,
//           images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'],
//           category: { name: 'Electronics' },
//           stock: 5,
//           sizes: ['One Size'],
//           colors: [{ name: 'Black', value: '#000000' }]
//         },
//         {
//           _id: '3',
//           name: 'Designer Jeans',
//           price: 2499,
//           originalPrice: 3499,
//           images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop'],
//           category: { name: 'Fashion' },
//           stock: 15,
//           sizes: ['28', '30', '32', '34'],
//           colors: [{ name: 'Blue', value: '#0066CC' }]
//         },
//         {
//           _id: '4',
//           name: 'Smart Watch',
//           price: 3999,
//           originalPrice: 4999,
//           images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'],
//           category: { name: 'Electronics' },
//           stock: 8,
//           sizes: ['38mm', '42mm'],
//           colors: [{ name: 'Silver', value: '#C0C0C0' }]
//         }
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/categories')
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const data = await response.json()
//       setCategories(data)
//     } catch (error) {
//       console.error('Error fetching categories:', error)
//       // Set some dummy categories for testing
//       setCategories([
//         { _id: '1', name: 'Fashion', color: '#FF6B6B' },
//         { _id: '2', name: 'Electronics', color: '#4ECDC4' },
//         { _id: '3', name: 'Home & Garden', color: '#45B7D1' },
//         { _id: '4', name: 'Sports', color: '#96CEB4' }
//       ])
//     }
//   }

//   const filteredProducts = products.filter(product => {
//     if (filters.category && product.category?.name !== filters.category) return false
//     if (product.price < filters.minPrice || product.price > filters.maxPrice) return false
//     return true
//   }).sort((a, b) => {
//     switch (filters.sortBy) {
//       case 'price-low': return a.price - b.price
//       case 'price-high': return b.price - a.price
//       case 'name': return a.name.localeCompare(b.name)
//       default: return 0
//     }
//   })

//   const handleShare = (product) => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: `Check out this amazing product: ${product.name}`,
//         url: window.location.origin + `/products/${product._id}`
//       })
//     } else {
//       navigator.clipboard.writeText(window.location.origin + `/products/${product._id}`)
//       alert('Product link copied to clipboard!')
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
//       {/* Hero Slider */}
//       <div className="relative h-96 overflow-hidden">
//         <div 
//           className="flex transition-transform duration-500 ease-in-out h-full"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {heroSlides.map((slide) => (
//             <div key={slide.id} className="min-w-full h-full relative">
//               <img 
//                 src={slide.image} 
//                 alt={slide.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
//                   <p className="text-xl">{slide.subtitle}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Navigation Arrows */}
//         <button 
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-800" />
//         </button>
//         <button 
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
//         >
//           <ChevronRight className="w-6 h-6 text-gray-800" />
//         </button>
        
//         {/* Dots */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all ${
//                 currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

      // {/* Category Circles */}
      // <div className="container mx-auto px-4 py-12">
      //   <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
      //     Shop by Category
      //   </h2>
      //   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
      //     {categories.map((category) => (
      //       <div 
      //         key={category._id}
      //         className="text-center group cursor-pointer"
      //         onClick={() => setFilters(prev => ({ ...prev, category: category.name }))}
      //       >
      //         <div 
      //           className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
      //           style={{ 
      //             background: `linear-gradient(135deg, ${category.color || '#FF6B6B'}, ${category.color || '#FF6B6B'}80)` 
      //           }}
      //         >
      //           <span className="text-white font-bold text-lg">
      //             {category.name.charAt(0)}
      //           </span>
      //         </div>
      //         <p className="font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
      //           {category.name}
      //         </p>
      //       </div>
      //     ))}
      //   </div>

//         {/* Filters and Products */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters */}
//           <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">Filters</h3>
//                 <button 
//                   onClick={() => setShowFilters(false)}
//                   className="lg:hidden"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
              
//               {/* Category Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                 <select 
//                   value={filters.category}
//                   onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map(category => (
//                     <option key={category._id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price Range */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
//                 <div className="space-y-3">
//                   <input
//                     type="range"
//                     min="0"
//                     max="10000"
//                     value={filters.maxPrice}
//                     onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                   />
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>₹{filters.minPrice}</span>
//                     <span>₹{filters.maxPrice}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Sort By */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//                 <select 
//                   value={filters.sortBy}
//                   onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="name">Name</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               <button 
//                 onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 10000, sortBy: 'name' })}
//                 className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="lg:w-3/4" id="products-grid">
//             {/* Mobile Filter Button */}
//             <div className="lg:hidden mb-6">
//               <button 
//                 onClick={() => setShowFilters(true)}
//                 className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md"
//               >
//                 <Filter className="w-5 h-5" />
//                 Filters
//               </button>
//             </div>

//             {error && (
//               <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6">
//                 {error}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredProducts.map((product) => (
//                 <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//                   <div className="relative">
//                     <img 
//                       src={product.images?.[0] || 'https://via.placeholder.com/300x300'} 
//                       alt={product.name}
//                       className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
                    
//                     {/* Badges */}
//                     <div className="absolute top-3 left-3 flex flex-col gap-2">
//                       {product.originalPrice && product.originalPrice > product.price && (
//                         <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
//                           {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
//                         </span>
//                       )}
//                       {product.stock < 5 && product.stock > 0 && (
//                         <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
//                           Low Stock
//                         </span>
//                       )}
//                       {product.stock === 0 && (
//                         <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
//                           Out of Stock
//                         </span>
//                       )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors">
//                         <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
//                       </button>
//                       <button 
//                         onClick={() => handleShare(product)}
//                         className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
//                       >
//                         <Share2 className="w-4 h-4 text-gray-600 hover:text-blue-500" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     <div className="mb-2">
//                       <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//                         {product.category?.name || 'Uncategorized'}
//                       </span>
//                     </div>

//                     <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
//                       {product.name}
//                     </h3>

//                     {/* Rating */}
//                     <div className="flex items-center gap-1 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       ))}
//                       <span className="text-sm text-gray-600 ml-1">(4.5)</span>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center gap-2 mb-4">
//                       <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
//                         ₹{product.price}
//                       </span>
//                       {product.originalPrice && product.originalPrice > product.price && (
//                         <span className="text-gray-500 line-through text-lg">
//                           ₹{product.originalPrice}
//                         </span>
//                       )}
//                     </div>

//                     {/* Sizes and Colors */}
//                     {product.sizes && product.sizes.length > 0 && (
//                       <div className="mb-3">
//                         <p className="text-sm text-gray-600 mb-1">Sizes:</p>
//                         <div className="flex gap-1 flex-wrap">
//                           {product.sizes.slice(0, 3).map((size, index) => (
//                             <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
//                               {size}
//                             </span>
//                           ))}
//                           {product.sizes.length > 3 && (
//                             <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
//                               +{product.sizes.length - 3}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {product.colors && product.colors.length > 0 && (
//                       <div className="mb-4">
//                         <p className="text-sm text-gray-600 mb-1">Colors:</p>
//                         <div className="flex gap-1 flex-wrap">
//                           {product.colors.slice(0, 4).map((color, index) => (
//                             <div key={index} className="flex items-center gap-1">
//                               <div 
//                                 className="w-4 h-4 rounded-full border border-gray-300"
//                                 style={{ backgroundColor: color.value || color }}
//                               ></div>
//                               <span className="text-xs text-gray-600">{color.name || color}</span>
//                             </div>
//                           ))}
//                           {product.colors.length > 4 && (
//                             <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex gap-2">
//                       <Link 
//                         to={`/products/${product._id}`}
//                         className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-center font-medium"
//                       >
//                         View Details
//                       </Link>
//                       <button 
//                         className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
//                         disabled={product.stock === 0}
//                       >
//                         <ShoppingCart className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {filteredProducts.length === 0 && !loading && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <ShoppingCart className="w-16 h-16 mx-auto" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
//                 <p className="text-gray-500">Try adjusting your filters or check back later.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recommended Products Section */}
//         <div className="mb-24 md:mb-32">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
//             Recommended for you
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* More reasons to shop */}
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">More reasons to shop</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {products.slice(0, 4).map((product, index) => (
//                   <div key={`more-${product._id}`} className="relative rounded-xl overflow-hidden group">
//                     <div className={`h-32 bg-gradient-to-br ${
//                       index === 0 ? 'from-green-400 to-green-600' :
//                       index === 1 ? 'from-orange-400 to-orange-600' :
//                       index === 2 ? 'from-red-400 to-red-600' :
//                       'from-blue-400 to-blue-600'
//                     } p-4 flex flex-col justify-between`}>
//                       <div className="absolute top-2 right-2">
//                         <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//                           NEW
//                         </span>
//                       </div>
//                       <div className="mt-auto">
//                         <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">{product.name}</h4>
//                         <p className="text-orange-300 font-bold text-lg">₹{product.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* In focus */}
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">In focus</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {products.slice(4, 8).map((product, index) => (
//                   <div key={`focus-${product._id}`} className="relative rounded-xl overflow-hidden group">
//                     <div className={`h-32 bg-gradient-to-br ${
//                       index === 0 ? 'from-purple-400 to-purple-600' :
//                       index === 1 ? 'from-pink-400 to-pink-600' :
//                       index === 2 ? 'from-indigo-400 to-indigo-600' :
//                       'from-teal-400 to-teal-600'
//                     } p-4 flex flex-col justify-between`}>
//                       <div className="absolute top-2 right-2">
//                         <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//                           NEW
//                         </span>
//                       </div>
//                       <div className="mt-auto">
//                         <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">{product.name}</h4>
//                         <p className="text-orange-300 font-bold text-lg">₹{product.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recommended for you */}
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended for you</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {products.slice(0, 4).map((product, index) => (
//                   <div key={`recommended-${product._id}`} className="relative rounded-xl overflow-hidden group">
//                     <div className={`h-32 bg-gradient-to-br ${
//                       index === 0 ? 'from-yellow-400 to-yellow-600' :
//                       index === 1 ? 'from-rose-400 to-rose-600' :
//                       index === 2 ? 'from-cyan-400 to-cyan-600' :
//                       'from-emerald-400 to-emerald-600'
//                     } p-4 flex flex-col justify-between`}>
//                       <div className="absolute top-2 right-2">
//                         <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//                           NEW
//                         </span>
//                       </div>
//                       <div className="mt-auto">
//                         <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">{product.name}</h4>
//                         <p className="text-orange-300 font-bold text-lg">₹{product.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Popular Products Section */}
//         <div className="mb-24 md:mb-32">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
//               Popular Products
//             </h2>
//             <button 
//               onClick={() => document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })}
//               className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               View All Products
//             </button>
//           </div>
          
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {products.slice(0, 4).map((product) => (
//                 <div key={`popular-${product._id}`} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
//                   <div className="relative">
//                     <img 
//                       src={product.images?.[0] || 'https://via.placeholder.com/300x200'} 
//                       alt={product.name}
//                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute top-3 left-3">
//                       <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg">
//                         NEW
//                       </span>
//                     </div>
//                     <div className="absolute top-3 right-3 flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       ))}
//                     </div>
//                     <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800">
//                       ZARA
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
//                     <div className="flex items-center justify-between">
//                       <span className="text-lg font-bold text-orange-600">₹{product.price}</span>
//                       <Link 
//                         to={`/products/${product._id}`}
//                         className="text-sm text-orange-600 hover:text-orange-700 font-medium"
//                       >
//                         View →
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #f97316, #ec4899);
//           cursor: pointer;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//         }
        
//         .slider::-moz-range-thumb {
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #f97316, #ec4899);
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//         }
        
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Products