import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import { Share2, Copy, Check, ArrowLeft } from 'lucide-react'

const ProductShare = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [shareLinks, setShareLinks] = useState({})

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`/api/products/${id}`)
      setProduct(res.data)
      generateShareLinks(res.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      setError(error.response?.data?.message || 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const generateShareLinks = (prod) => {
    const productUrl = `${window.location.origin}/product/${prod._id}`
    const productName = prod.name
    const productPrice = prod.price
    const productImage = prod.images?.[0] || ''
    const text = `Check out ${productName} - ₹${productPrice}`

    setShareLinks({
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + productUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(text + '\n' + productUrl)}`,
      productUrl: productUrl
    })
  }

  const handleCopyLink = () => {
    if (shareLinks.productUrl) {
      navigator.clipboard.writeText(shareLinks.productUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleShare = (platform) => {
    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    )
  }

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'from-sky-400 to-sky-600',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-8.056 3.686c4.913 0 8.13 2.892 9.656 5.098 2.86-1.435 4.926-4.025 4.926-7.098 0-4.42-3.588-8-8-8z"/>
        </svg>
      ),
      color: 'from-cyan-400 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
      ),
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      id: 'email',
      name: 'Email',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6 md:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Product
        </button>

        {/* Product Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Product Image */}
            <div className="md:col-span-1">
              <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-purple-600">₹{product.price}</span>
                {product.category && (
                  <span className="px-3 md:px-4 py-1 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm font-semibold">
                    {product.category}
                  </span>
                )}
              </div>

              {product.stock !== undefined && (
                <div className="flex items-center gap-2">
                  <span className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
                    product.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Share2 className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Share This Product</h2>
          </div>

          {/* Share Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option.id)}
                className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 ${option.bgColor} group`}
              >
                <div className={`bg-gradient-to-br ${option.color} p-3 md:p-4 rounded-xl mb-2 md:mb-3 text-white group-hover:shadow-lg transition-all`}>
                  {option.icon}
                </div>
                <span className={`text-xs md:text-sm font-semibold ${option.textColor} text-center`}>
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          {/* Copy Link Section */}
          <div className="border-t pt-6 md:pt-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Or Copy Link</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={shareLinks.productUrl || ''}
                readOnly
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm md:text-base focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap text-sm md:text-base ${
                  copiedLink
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 md:w-5 h-4 md:h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 md:w-5 h-4 md:h-5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Tips */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">💡 Sharing Tips</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span>Share on WhatsApp to reach friends and family instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span>Post on social media to get more visibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span>Send via email for professional sharing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span>Copy the link to share anywhere you want</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductShare
