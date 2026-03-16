import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import { CartContext } from '../context/CartContext'
import { getStoredAffiliateCode, trackAffiliateClick } from '../utils/affiliateTracker'
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, MessageCircle } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetchProduct()
    
    // Track affiliate click for product view
    const affiliateCode = getStoredAffiliateCode()
    if (affiliateCode) {
      trackAffiliateClick(affiliateCode, id)
    }
  }, [id])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-menu-container')) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showShareMenu])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`/api/products/${id}`)
      console.log('Product data:', res.data)
      setProduct(res.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      setError(error.response?.data?.message || 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    alert('Product added to cart!')
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const text = `Check out ${product.name} - ₹${product.price}`
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
      setShowShareMenu(false)
      return
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      setShowShareMenu(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Product</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md text-center">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-xl font-bold text-yellow-800 mb-2">Product Not Found</h2>
            <p className="text-yellow-600 mb-4">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
    ? [product.image] 
    : []

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
        <span className="mx-2">/</span>
        <button onClick={() => navigate('/products')} className="hover:text-primary">Products</button>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Main Image */}
          <div className="bg-gray-100 rounded-lg h-96 mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-200">
            {productImages.length > 0 ? (
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  console.error('Image load error:', productImages[selectedImageIndex])
                  e.target.style.display = 'none'
                  const parent = e.target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="text-center"><svg class="w-20 h-20 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-gray-400 text-lg">Image not available</span></div>'
                  }
                }}
              />
            ) : (
              <div className="text-center">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-lg">No Image Available</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`h-20 rounded overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-primary' : 'border-gray-300'
                  } hover:border-primary transition`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200 text-xs text-gray-400">Error</div>'
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold flex-1">{product.name}</h1>
            
            {/* Share Button */}
            <div className="relative ml-4 share-menu-container">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                title="Share Product"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500">
                    <p className="text-white font-semibold text-sm">Share this product</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-sky-50 rounded-lg transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-sky-500" />
                      <span className="text-gray-700 font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 font-medium">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      <span className="text-gray-700 font-medium">LinkedIn</span>
                    </button>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <LinkIcon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-medium">Copy Link</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <p className="text-3xl font-bold text-primary">₹{product.price}</p>
            {product.category && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            )}
          </div>
          
          {product.vendor && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">
                Sold by: <span className="font-semibold text-gray-900">{product.vendor.name}</span>
              </p>
            </div>
          )}
          
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Size:</label>
            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-primary text-white' : 'bg-white'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border rounded px-4 py-2 w-24"
            />
            <span className="ml-4 text-gray-600">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-8 py-3 rounded-md w-full md:w-auto ${
              product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-blue-700'
            } text-white`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
