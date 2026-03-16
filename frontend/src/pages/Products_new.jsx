// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Heart, Share2, ShoppingCart, Star, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react'

// const Products = () => {
//   const [products, setProducts] = useState([])
//   const [categories, setCategories] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [showFilters, setShowFilters] = useState(false)
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [filters, setFilters] = useState({
//     category: '',
//     minPrice: 0,
//     maxPrice: 10000,
//     sortBy: 'name'
//   })

//   // Hero slider images
//   const heroSlides = [
//     {
//       id: 1,
//       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
//       title: 'New Collection 2024',
//       subtitle: 'Discover the latest trends in fashion',
//       buttonText: 'Shop Now'
//     },
//     {
//       id: 2,
//       image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
//       title: 'Summer Sale',
//       subtitle: 'Up to 50% off on selected items',
//       buttonText: 'Explore Deals'
//     },
//     {
//       id: 3,
//       image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop',
//       title: 'Premium Quality',
//       subtitle: 'Crafted with care and attention to detail',
//       buttonText: 'View Products'
//     }
//   ]

//   // Course data for the new section
//   const courseData = {
//     "More reasons to shop": [
//       {
//         id: 1,
//         title: "Certificate Course in Advanced Excel",
//         author: "By New Modular Course",
//         price: "₹4,500",
//         originalPrice: "₹6,000",
//         image: "/api/placeholder/120/120",
//         bgColor: "bg-green-600"
//       }
//     ]
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
//   }

//   // Auto-play slider
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextSlide()
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [currentSlide])

// export default Products