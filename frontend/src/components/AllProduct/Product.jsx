import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Eye, Filter, Search, X, ChevronDown, Share2 } from 'lucide-react'
import { CartContext } from '../../context/CartContext'
import { generateShareLinks, getStoredAffiliateCode } from '../../utils/affiliateTracker'
import FurnitureSection from '../../pages/customer/Vedio'
import AutoGuide from '../AutoGuider/AutoGuide'
import ProductCard from '../ProductCard/ProductCard'
import FilterSidebar from './FilterSidebar'
import ProductsGrid from './ProductsGrid'

export default function Product() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('name')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [shareModal, setShareModal] = useState({ show: false, product: null })
  
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
    loadUserLikedProducts()
  }, [selectedCategory])

  // Load user's liked products from API
  const loadUserLikedProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('http://localhost:5000/api/products/user/liked', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const likedProducts = await response.json()
        setWishlist(likedProducts)
      }
    } catch (error) {
      console.error('Error loading liked products:', error)
    }
  }

  const fetchSliders = async () => {
    try {
      console.log('Fetching sliders...')
      const response = await fetch('http://localhost:5000/api/sliders')
      if (response.ok) {
        const data = await response.json()
        console.log('Sliders fetched:', data)
        setSliders(data.slice(0, 4)) // Limit to 4 sliders
      } else {
        console.error('Failed to fetch sliders, status:', response.status)
      }
    } catch (error) {
      console.error('Error fetching sliders:', error)
    }
  }

  const fetchPopularProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=15')
      if (response.ok) {
        const data = await response.json()
        setPopularProducts(data.slice(0, 15)) // Limit to 15 products
      }
    } catch (error) {
      console.error('Error fetching popular products:', error)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch categories first
      let categoriesData = []
      try {
        const categoriesResponse = await fetch('http://localhost:5000/api/categories')
        if (categoriesResponse.ok) {
          categoriesData = await categoriesResponse.json()
          setCategories(categoriesData)
        } else {
          throw new Error('Categories API not available')
        }
      } catch (error) {
        console.log('Categories API not available, using default categories')
        categoriesData = [
          { _id: 'mens-formal-shirts', name: 'mens formal shirts', icon: '👔', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
          { _id: 'jeans', name: 'Jeans', icon: '👖', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop' },
          { _id: 'women-dress-western', name: 'Women dress western', icon: '👗', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=150&fit=crop' },
          { _id: 'mens-casual-shirts-full-sleeve', name: 'mens casual shirts full sleeve', icon: '👕', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop' },
          { _id: 'mens-casual-shirts', name: 'mens casual shirts', icon: '👔', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop' },
          { _id: 'men-pants', name: 'Men pants', icon: '👖', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&h=150&fit=crop' },
          { _id: 'suits', name: 'Suits', icon: '🤵', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=150&h=150&fit=crop' },
          { _id: 'kurtas-kurtis', name: 'Kurtas & Kurtis', icon: '🥻', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=150&h=150&fit=crop' },
          { _id: 't-shirt', name: 'T-Shirt', icon: '👕', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop' },
          { _id: 'shirt', name: 'Shirt', icon: '👔', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop' }
        ]
        setCategories(categoriesData)
      }

      // Fetch products with category filter
      if (selectedCategory === 'all' || !selectedCategory) {
        let productsUrl = 'http://localhost:5000/api/products'
        console.log('Fetching all products:', productsUrl)

        try {
          const productsResponse = await fetch(productsUrl)
          if (productsResponse.ok) {
            const productsData = await productsResponse.json()
            console.log('All products fetched:', productsData.length)
            setProducts(productsData)
            setError('')
          } else {
            throw new Error('Products API not available')
          }
        } catch (error) {
          console.log('Products API not available, using sample data')
          setError('Backend not connected. Showing sample data.')
          
          const allDummyProducts = [
            {
              _id: '1',
              name: 'Premium Cotton T-Shirt',
              price: 999,
              originalPrice: 1299,
              images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
              category: 'T-Shirt',
              stock: 10,
              description: 'Comfortable premium cotton t-shirt',
              rating: 4.5,
              reviews: 128
            },
            {
              _id: '2',
              name: 'Designer Denim Jeans',
              price: 2499,
              originalPrice: 3499,
              images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'],
              category: 'Jeans',
              stock: 15,
              description: 'Stylish designer jeans',
              rating: 4.3,
              reviews: 67
            },
            {
              _id: '3',
              name: 'Casual Summer Dress',
              price: 1799,
              originalPrice: 2299,
              images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop'],
              category: 'Women dress western',
              stock: 12,
              description: 'Light and comfortable summer dress',
              rating: 4.6,
              reviews: 94
            },
            {
              _id: '4',
              name: 'Formal Business Shirt',
              price: 1299,
              originalPrice: 1699,
              images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'],
              category: 'mens formal shirts',
              stock: 8,
              description: 'Professional formal shirt for business',
              rating: 4.7,
              reviews: 156
            },
            {
              _id: '5',
              name: 'Casual Full Sleeve Shirt',
              price: 899,
              originalPrice: 1199,
              images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'],
              category: 'mens casual shirts full sleeve',
              stock: 20,
              description: 'Comfortable casual full sleeve shirt',
              rating: 4.4,
              reviews: 73
            },
            {
              _id: '6',
              name: 'Men Formal Pants',
              price: 1599,
              originalPrice: 1999,
              images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop'],
              category: 'Men pants',
              stock: 18,
              description: 'Formal pants for office wear',
              rating: 4.5,
              reviews: 89
            },
            {
              _id: '7',
              name: 'Business Suit',
              price: 4999,
              originalPrice: 6999,
              images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop'],
              category: 'Suits',
              stock: 5,
              description: 'Premium business suit',
              rating: 4.8,
              reviews: 45
            },
            {
              _id: '8',
              name: 'Traditional Kurta',
              price: 1199,
              originalPrice: 1599,
              images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop'],
              category: 'Kurtas & Kurtis',
              stock: 25,
              description: 'Traditional ethnic kurta',
              rating: 4.6,
              reviews: 112
            },
            {
              _id: '9',
              name: 'Casual Shirt',
              price: 799,
              originalPrice: 999,
              images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'],
              category: 'mens casual shirts',
              stock: 30,
              description: 'Comfortable casual shirt',
              rating: 4.2,
              reviews: 98
            },
            {
              _id: '10',
              name: 'Cotton Shirt',
              price: 899,
              originalPrice: 1199,
              images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'],
              category: 'Shirt',
              stock: 22,
              description: 'Pure cotton comfortable shirt',
              rating: 4.3,
              reviews: 76
            },
            {
              _id: '11',
              name: 'Blue Denim Jeans',
              price: 1999,
              originalPrice: 2499,
              images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'],
              category: 'Jeans',
              stock: 25,
              description: 'Classic blue denim jeans',
              rating: 4.4,
              reviews: 89
            },
            {
              _id: '12',
              name: 'White Formal Shirt',
              price: 1199,
              originalPrice: 1499,
              images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'],
              category: 'mens formal shirts',
              stock: 15,
              description: 'Classic white formal shirt',
              rating: 4.6,
              reviews: 134
            }
          ]
          
          setProducts(allDummyProducts)
        }
      } else if (selectedCategory && selectedCategory !== 'all') {
        const selectedCategoryObj = categoriesData.find(cat => cat._id === selectedCategory)
        const categoryName = selectedCategoryObj ? selectedCategoryObj.name : selectedCategory
        
        console.log('Selected category ID:', selectedCategory)
        console.log('Selected category name:', categoryName)
        
        let productsUrl = `http://localhost:5000/api/products?category=${encodeURIComponent(categoryName)}`
        console.log('API URL:', productsUrl)

        try {
          const productsResponse = await fetch(productsUrl)
          if (productsResponse.ok) {
            const productsData = await productsResponse.json()
            setProducts(productsData)
            setError('')
          } else {
            throw new Error('Products API not available')
          }
        } catch (error) {
          console.log('Products API not available, using sample data')
          setError('Backend not connected. Showing sample data.')
          
          const allDummyProducts = [
            {
              _id: '1',
              name: 'Premium Cotton T-Shirt',
              price: 999,
              originalPrice: 1299,
              images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
              category: 'T-Shirt',
              stock: 10,
              description: 'Comfortable premium cotton t-shirt',
              rating: 4.5,
              reviews: 128,
              likes: 0
            },
            {
              _id: '2',
              name: 'Designer Denim Jeans',
              price: 2499,
              originalPrice: 3499,
              images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'],
              category: 'Jeans',
              stock: 15,
              description: 'Stylish designer jeans',
              rating: 4.3,
              reviews: 67,
              likes: 0
            }
          ]

          const filteredDummyProducts = allDummyProducts.filter(product => 
            product.category === categoryName
          )
          
          console.log('Filtered products for category:', categoryName, filteredDummyProducts.length)
          setProducts(filteredDummyProducts)
        }
      } else {
        setProducts([])
      }
      
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error loading data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  // Filter products based on search and price
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesPrice
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  const handleCategoryClick = (categoryId) => {
    console.log('Category clicked:', categoryId)
    setSelectedCategory(categoryId)
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Slider functionality
  const slides = [
    {
      title: "✨ Discover Amazing Products",
      subtitle: "Find the perfect items for your lifestyle. Quality products at unbeatable prices.",
      bg: "from-purple-600 via-pink-600 to-orange-500",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      title: "🛍️ Shop Latest Collection",
      subtitle: "Explore our newest arrivals and trending products. Limited time offers available.",
      bg: "from-blue-600 via-purple-600 to-pink-500",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      title: "🎯 Best Deals & Offers",
      subtitle: "Don't miss out on incredible savings. Up to 70% off on selected items.",
      bg: "from-green-600 via-teal-600 to-blue-500",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      title: "🚀 Fast & Free Delivery",
      subtitle: "Get your favorite products delivered to your doorstep. Free shipping on orders above ₹999.",
      bg: "from-orange-600 via-red-600 to-pink-500",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop&crop=center"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Load wishlist from localStorage and API
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      // Logged in user - load from API
      loadUserLikedProducts()
    } else {
      // Guest user - load from localStorage
      const savedWishlist = localStorage.getItem('guestWishlist')
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist))
        } catch (error) {
          console.error('Error parsing guest wishlist:', error)
          setWishlist([])
        }
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes (for guest users only)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('guestWishlist', JSON.stringify(wishlist))
    }
  }, [wishlist])
  // Handle adding/removing from wishlist
  const toggleWishlist = async (product) => {
    try {
      const token = localStorage.getItem('token')
      
      if (token) {
        // Logged in user - use API
        const isInWishlist = wishlist.some(item => item._id === product._id)
        const method = isInWishlist ? 'DELETE' : 'POST'
        const url = `http://localhost:5000/api/products/${product._id}/like`
        
        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          
          if (isInWishlist) {
            setWishlist(wishlist.filter(item => item._id !== product._id))
            showNotification(`${product.name} removed from wishlist!`, 'info')
          } else {
            setWishlist([...wishlist, product])
            showNotification(`${product.name} added to wishlist!`, 'success')
          }

          setProducts(prevProducts => 
            prevProducts.map(p => 
              p._id === product._id 
                ? { ...p, likes: data.likes, isLiked: data.isLiked }
                : p
            )
          )
        } else {
          const errorData = await response.json()
          showNotification(errorData.message || 'Error updating like status', 'error')
        }
      } else {
        // Guest user - use localStorage
        const isInWishlist = wishlist.some(item => item._id === product._id)
        
        if (isInWishlist) {
          const newWishlist = wishlist.filter(item => item._id !== product._id)
          setWishlist(newWishlist)
          localStorage.setItem('guestWishlist', JSON.stringify(newWishlist))
          showNotification(`${product.name} removed from wishlist!`, 'info')
        } else {
          const newWishlist = [...wishlist, product]
          setWishlist(newWishlist)
          localStorage.setItem('guestWishlist', JSON.stringify(newWishlist))
          showNotification(`${product.name} added to wishlist!`, 'success')
        }
        
        // Update local product likes count (visual feedback only)
        setProducts(prevProducts => 
          prevProducts.map(p => 
            p._id === product._id 
              ? { 
                  ...p, 
                  likes: isInWishlist ? (p.likes || 1) - 1 : (p.likes || 0) + 1,
                  isLiked: !isInWishlist
                }
              : p
          )
        )
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      showNotification('Error updating like status', 'error')
    }
  }

  // Get like count for a product
  const getLikeCount = (product) => {
    return product.likes || 0
  }

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId)
  }

  // Handle adding to cart
  const handleAddToCart = (product) => {
    addToCart(product, 1, 'M')
    showNotification(`${product.name} added to cart!`, 'success')
  }

  // Handle quick view
  const handleQuickView = (product) => {
    navigate(`/product/${product._id}`)
  }

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' })
    }, 3000)
  }

  // Handle share
  // Updated category options for sidebar filter
  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: '🌟' },
    ...categories.map(cat => ({
      value: cat._id,
      label: cat.name,
      icon: cat.icon || '📦'
    }))
  ]
  const team = [
  {
    name: "Faizan Ayubi",
    role: "Co-Founder & CEO",
    desc: "A supportive team is the foundation of a successful company. At Trackier, we foster an environment where respect, collaboration, and growth come naturally.",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Udit Verma",
    role: "Co-Founder & CMO",
    desc: "Understanding ‘why’ before taking action helps us serve our customers better. We strive to anticipate their needs and deliver solutions that exceed expectations.",
    img: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Mukul Kaushik",
    role: "Chief Revenue Officer",
    desc: "A growth mindset is essential in today’s fast paced world. We encourage our team to keep learning, adapting, and striving for excellence this is a my .",
    img: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Abhay Chauhan",
    role: "Chief Technology Officer",
    desc: "Technology should make work easier, not complicated. At Trackier, we focus on building reliable systems that help teams work faster and smarter this is my rhe.",
    img: "https://randomuser.me/api/portraits/men/50.jpg"
  }
];


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="text-center relative z-10">
          {/* Main Loading Animation */}
          <div className="relative mb-8">
            {/* Outer Ring */}
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mb-4 relative">
              <div className="absolute inset-2 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-full"></div>
            </div>
            
            {/* Inner Pulsing Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
            </div>
            
            {/* Floating Dots */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-1000"></div>
            <div className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-2000"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce animation-delay-3000"></div>
          </div>

          {/* Loading Text with Animation */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Loading Amazing Products
            </h2>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
            </div>
            <p className="text-gray-600 font-medium animate-fade-in">
              Preparing the best deals for you...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          @keyframes loading-bar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animate-loading-bar {
            animation: loading-bar 3s ease-in-out infinite;
          }
          
          .animate-fade-in {
            animation: fade-in 2s ease-in-out infinite alternate;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Auto Guide */}
      <AutoGuide page="product" />
      
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : notification.type === 'info'
            ? 'bg-blue-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {notification.type === 'success' ? '✅' : notification.type === 'info' ? 'ℹ️' : '❌'}
            </span>
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Floating Wishlist Counter */}
      {wishlist.length > 0 && (
        <div className="fixed bottom-4 left-4 z-40 bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition-colors cursor-pointer">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm AL">{wishlist.length}</span>
              <span className="text-[10px] opacity-90">Liked</span>
            </div>
          </div>
        </div>
      )}



      {/* Hero Slider - Enhanced Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ffffff 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0 relative overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
            >
              {/* Background Image with Parallax Effect */}
              <div 
                className="absolute inset-0 transform scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.4) contrast(1.2)'
                }}
              ></div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-blue-900/80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Animated Particles */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-300/40 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
              </div>

              <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 lg:py-24 flex items-center justify-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
                <div className="text-center text-white max-w-5xl mx-auto">
                  {/* Main Title */}
                  <div className="mb-8 md:mb-12">
                    <div className="inline-block mb-6">
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text text-sm md:text-base font-bold tracking-wider uppercase">
                        Premium Collection
                      </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight relative">
                      <span className="relative inline-block">
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text blur-sm">
                          {slide.title}
                        </span>
                        <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                          {slide.title}
                        </span>
                      </span>
                    </h1>
                  </div>

                  {/* Subtitle */}
                  <div className="mb-10 md:mb-16">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-gray-200 max-w-4xl mx-auto">
                      <span className="relative inline-block px-8 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
                        {slide.subtitle}
                      </span>
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                      onClick={() => {
                        const productsSection = document.getElementById('products-section')
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg md:text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Shop Now
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    </button>
                    
                    <button 
                      onClick={() => {
                        const productsSection = document.getElementById('products-section')
                        if (productsSection) {
                          productsSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="group px-8 py-4 md:px-12 md:py-5 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-semibold text-lg md:text-xl rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        Explore Collection
                        <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Indicator */}
              <div className="absolute bottom-8 left-8 text-white/60 text-sm font-medium">
                {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-12 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full' 
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
              }`}
            >
              {currentSlide === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2 group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Category Circles Section */}
      <div className="mb-6 md:mb-12 py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
            <p className="text-xs md:text-sm lg:text-base text-gray-600">Explore products by category</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8 px-2 md:px-4">
            {/* All Categories Button */}
            <button
              onClick={() => handleCategoryClick('all')}
              className="group flex flex-col items-center w-[70px] sm:w-[80px] md:w-[120px] lg:w-[140px]"
            >
              <div className="relative mb-2 md:mb-4">
                <div className="absolute -top-3 sm:-top-4 md:-top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-1.5 py-0.5 sm:px-2 md:px-4 md:py-1.5 rounded-full text-[7px] sm:text-[8px] md:text-xs font-bold shadow-lg z-10 whitespace-nowrap">
                  <span className="block">All Categories</span>
                </div>
                
                <div className="relative p-0.5 md:p-1 bg-white rounded-full shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-sm md:blur-md lg:blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-24 lg:w-32 md:h-24 lg:h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop" 
                      alt="All Categories"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<span class="text-lg sm:text-xl md:text-4xl lg:text-5xl">🌟</span>'
                      }}
                    />
                  </div>
                </div>
              </div>
            </button>
            {/* Category Circles */}
            {categories.slice(0, 10).map((category, index) => {
              const gradients = [
                'from-blue-400 to-blue-500',
                'from-green-400 to-green-500',
                'from-purple-400 to-purple-500',
                'from-pink-400 to-pink-500',
                'from-orange-400 to-orange-500',
                'from-teal-400 to-teal-500',
                'from-red-400 to-red-500',
                'from-indigo-400 to-indigo-500',
                'from-yellow-400 to-yellow-500',
                'from-cyan-400 to-cyan-500'
              ]
              
              return (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className="group flex flex-col items-center w-[70px] sm:w-[80px] md:w-[120px] lg:w-[140px]"
                >
                  <div className="relative mb-2 md:mb-4">
                    <div className="absolute -top-3 sm:-top-4 md:-top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-1.5 py-0.5 sm:px-2 md:px-4 md:py-1.5 rounded-full text-[7px] sm:text-[8px] md:text-xs font-bold shadow-lg z-10 whitespace-nowrap">
                      <span className="block truncate max-w-[60px] sm:max-w-[70px] md:max-w-none">
                        {category.name.length > (typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15) ? 
                          category.name.substring(0, typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15) + '...' : 
                          category.name}
                      </span>
                    </div>
                    
                    <div className="relative p-0.5 md:p-1 bg-white rounded-full shadow-xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full blur-sm md:blur-md lg:blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                      
                      <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-24 lg:w-32 md:h-24 lg:h-32 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 overflow-hidden`}>
                        {category.image ? (
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = `<span class="text-lg sm:text-xl md:text-4xl lg:text-5xl">${category.icon}</span>`
                            }}
                          />
                        ) : (
                          <span className="text-lg sm:text-xl md:text-4xl lg:text-5xl">{category.icon}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 md:py-8" id="products-section">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filter Sidebar - Now Sticky */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onCategoryChange={setSelectedCategory}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {/* Products Grid with Pagination */}
          <ProductsGrid
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            categories={categories}
            error={error}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onToggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            getLikeCount={getLikeCount}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
        </div>

        {/* Popular Products Section with Slider */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg font-bold text-lg">
                <span className="bg-white text-black px-2 py-1 rounded mr-2 text-sm font-bold">Popular</span>
                Products
              </div>
              
              {/* Slider Navigation */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    const isMobile = window.innerWidth < 768;
                    const maxSlides = isMobile ? Math.min(products.length, 12) : Math.ceil(Math.min(products.length, 12) / 4);
                    setCurrentPopularSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    const isMobile = window.innerWidth < 768;
                    const maxSlides = isMobile ? Math.min(products.length, 12) : Math.ceil(Math.min(products.length, 12) / 4);
                    setCurrentPopularSlide((prev) => (prev + 1) % maxSlides);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Products Slider */}
            <div className="relative overflow-hidden mb-8">
              {/* Mobile Slider (1 product per slide) */}
              <div className="block md:hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentPopularSlide * 100}%)` }}
                >
                  {products.slice(0, 12).map((product, index) => (
                    <div key={product._id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer" onClick={() => handleQuickView(product)}>
                        <div className="relative">
                          <img 
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center'} 
                            alt={product.name}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Live Badge */}
                          <div className="absolute top-2 left-2">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                              🔴 LIVE
                            </span>
                          </div>
                          
                          {/* Discount Badge */}
                          {product.originalPrice && product.originalPrice > product.price && (
                            <div className="absolute top-2 right-2">
                              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          {/* Star Rating */}
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({product.reviews || 0})</span>
                          </div>
                          
                          {/* Product Name */}
                          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm hover:text-blue-600 transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                          
                          {/* Price */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-blue-500 font-bold text-lg">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-gray-400 line-through text-sm">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          {/* Add to Cart Button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Slider (4 products per slide) */}
              <div className="hidden md:block">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentPopularSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(Math.min(products.length, 12) / 4) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-4 gap-6">
                        {products.slice(slideIndex * 4, Math.min((slideIndex + 1) * 4, 12)).map((product, index) => (
                          <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer" onClick={() => handleQuickView(product)}>
                            <div className="relative">
                              <img 
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center'} 
                                alt={product.name}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                              />
                              
                              {/* Live Badge */}
                              <div className="absolute top-2 left-2">
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                                  🔴 LIVE
                                </span>
                              </div>
                              
                              {/* Discount Badge */}
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="absolute top-2 right-2">
                                  <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="p-4">
                              {/* Star Rating */}
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                                <span className="text-sm text-gray-500 ml-1">({product.reviews || 0})</span>
                              </div>
                              
                              {/* Product Name */}
                              <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm hover:text-[#0B2239] transition-colors cursor-pointer">
                                {product.name}
                              </h3>
                              
                              {/* Price */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-black font-bold text-lg">
                                  ₹{product.price}
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <span className="text-gray-400 line-through text-sm">
                                    ₹{product.originalPrice}
                                  </span>
                                )}
                              </div>
                              
                              {/* Add to Cart Button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
                                className="w-full bg-[#0B2239] hover:bg-[#0B2239] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {/* Fill empty slots if needed for desktop */}
                        {products.slice(slideIndex * 4, Math.min((slideIndex + 1) * 4, 12)).length < 4 && slideIndex < 3 && 
                          Array.from({ length: 4 - products.slice(slideIndex * 4, Math.min((slideIndex + 1) * 4, 12)).length }).map((_, emptyIndex) => (
                            <div key={`empty-${emptyIndex}`} className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-100">
                              <div className="relative">
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-4xl">📦</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-gray-300" />
                                  ))}
                                </div>
                                <h3 className="font-medium text-gray-500 mb-2 text-sm">
                                  More products coming soon...
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-gray-400 font-bold text-lg">₹999</span>
                                </div>
                                <button className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg text-sm cursor-not-allowed">
                                  Coming Soon
                                </button>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {/* Mobile Dots (12 dots for 12 products) */}
              <div className="block md:hidden">
                {Array.from({ length: Math.min(products.length, 12) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPopularSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 mx-1 ${
                      currentPopularSlide === index 
                        ? 'bg-blue-500 scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              {/* Desktop Dots (3 dots for 3 slides) */}
              <div className="hidden md:flex gap-2">
                {Array.from({ length: Math.ceil(Math.min(products.length, 12) / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPopularSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPopularSlide === index 
                        ? 'bg-blue-500 scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* View All Products Button */}
            <div className="text-center">
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products-section')
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                View all Products
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Products Section - Enhanced Design */}
        {filteredProducts.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  ✨ Discover Amazing Products
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Handpicked collections just for you. Find the perfect products across different categories.
                </p>
              </div>

              {/* Three Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Column 1: More reasons to shop */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">More reasons to shop</h3>
                  </div>
                  <div className="space-y-6">
                    {products.slice(0, 4).map((product, index) => (
                      <div key={product._id} className="bg-white rounded-xl p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100"
                           onClick={() => handleQuickView(product)}>
                        <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">NEW</div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.parentElement.innerHTML = '<span class="text-2xl">🛍️</span>'
                                }}
                              />
                            ) : (
                              <span className="text-2xl">🛍️</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-bold text-sm line-clamp-2">{product.name}</h4>
                            <p className="text-gray-600 text-xs">by {product.category}</p>
                            <div className="text-[] font-bold text-lg mt-1">₹{product.price}</div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="text-gray-400 text-xs line-through">₹{product.originalPrice}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Fallback if not enough products */}
                    {products.length < 4 && Array.from({ length: Math.max(0, 4 - products.length) }).map((_, index) => (
                      <div key={`fallback-1-${index}`} className="bg-white rounded-xl p-4 relative overflow-hidden shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🛍️</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-bold text-sm">More products coming soon!</h4>
                            <p className="text-gray-600 text-xs">Stay tuned for updates</p>
                            <div className="text-[#131929] font-bold text-lg mt-1">₹999</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: In focus */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">In focus</h3>
                  <div className="space-y-4">
                    {/* Live Products */}
                    {products.slice(4, 8).map((product, index) => (
                      <div key={product._id} className="bg-white rounded-xl p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg border border-gray-100"
                           onClick={() => handleQuickView(product)}>
                        <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">NEW</div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.parentElement.innerHTML = '<span class="text-2xl">🛍️</span>'
                                }}
                              />
                            ) : (
                              <span className="text-2xl">🛍️</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-bold text-sm line-clamp-2">{product.name}</h4>
                            <p className="text-gray-600 text-xs">by {product.category}</p>
                            <div className="text-[#131929] font-bold text-lg mt-1">₹{product.price}</div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="text-gray-400 text-xs line-through">₹{product.originalPrice}</div>
                            )}
                          </div>
                        </div>
                        {/* Stock info for second product */}
                        {index === 1 && (
                          <div className="mt-2 bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">
                            Stock - {product.stock} items left
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Fallback if not enough products */}
                    {products.length < 8 && Array.from({ length: Math.max(0, 4 - (products.length - 4)) }).map((_, index) => (
                      <div key={`fallback-2-${index}`} className="bg-white rounded-xl p-4 relative overflow-hidden shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🛍️</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-bold text-sm">More products coming soon!</h4>
                            <p className="text-gray-600 text-xs">Stay tuned for updates</p>
                            <div className="text-[#131929]font-bold text-lg mt-1">₹999</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Recommended for you */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Recommended for you</h3>
                  <div className="space-y-4">
                    {/* Live Products */}
                    {products.slice(8, 12).map((product, index) => (
                      <div key={product._id} className="bg-white rounded-xl p-4 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg border border-gray-100"
                           onClick={() => handleQuickView(product)}>
                        <div className="absolute top-1 right-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">NEW</div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.parentElement.innerHTML = '<span class="text-2xl">🛍️</span>'
                                }}
                              />
                            ) : (
                              <span className="text-2xl">🛍️</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-bold text-sm line-clamp-2">{product.name}</h4>
                            <p className="text-gray-600 text-xs">by {product.category}</p>
                            <div className="text-[#131929] font-bold text-lg mt-1">₹{product.price}</div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="text-gray-400 text-xs line-through">₹{product.originalPrice}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Fallback if not enough products */}
                    {products.length < 12 && Array.from({ length: Math.max(0, 4 - (products.length - 8)) }).map((_, index) => (
                      <div key={`fallback-3-${index}`} className="bg-white rounded-xl p-4 relative overflow-hidden shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🛍️</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-bold text-sm">More products coming soon!</h4>
                            <p className="text-gray-600 text-xs">Stay tuned for updates</p>
                            <div className="text-[#131929] font-bold text-lg mt-1">₹999</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {shareModal.show && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Share Product</h3>
                <button
                  onClick={() => setShareModal({ show: false, product: null })}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {shareModal.product && (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={shareModal.product.images?.[0] || 'https://via.placeholder.com/60x60'} 
                      alt={shareModal.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">{shareModal.product.name}</h4>
                      <p className="text-purple-600 font-bold text-sm">₹{shareModal.product.price}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleShareLink('whatsapp', shareModal.product)}
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </button>
                    
                    <button
                      onClick={() => handleShareLink('facebook', shareModal.product)}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    
                    <button
                      onClick={() => handleShareLink('twitter', shareModal.product)}
                      className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </button>
                    
                    <button
                      onClick={() => handleShareLink('copy', shareModal.product)}
                      className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Link
                    </button>
                  </div>
                  
                  {getStoredAffiliateCode() && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs text-green-700">
                        <span className="font-medium">🎯 Affiliate Link:</span> This link includes your referral code for commission tracking!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}



        <FurnitureSection/>


      </div>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider-orange::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      
    
    </div>
  )
}