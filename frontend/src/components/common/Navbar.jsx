import { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import ElvoraLogo from '../../assets/images/logo5.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { cart, openCartDrawer } = useContext(CartContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // स्क्रॉल बिहेवियर के लिए स्टेट्स
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)
  const closeUserMenu = () => setUserMenuOpen(false)

  // 1. बाहर क्लिक करने पर यूजर मेनू बंद करने का लॉजिक
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu()
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  // 2. स्क्रॉल करने पर नेवबार छुपाने और दिखाने का लॉजिक
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // अगर मोबाइल मेनू खुला है, तो नेवबार को न छुपाएं
      if (mobileMenuOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // नीचे स्क्रॉल करने पर छुपाएं (कम से कम 80px स्क्रॉल होने के बाद)
        setIsVisible(false);
      } else {
        // ऊपर स्क्रॉल करने पर दिखाएं
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    // यहाँ हमने `transition-transform duration-300` और `translate-y` क्लासेस जोड़ी हैं ताकि स्मूथ एनीमेशन मिले
    <nav className={`backdrop-blur-md bg-white/80 sticky top-0 z-50 border-b border-gray-100 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="w-36 sm:w-44 md:w-48 h-auto block">
              <img 
                src={ElvoraLogo} 
                alt="Elvora Fashion Logo" 
                className="object-contain w-full h-full"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link to="/" className="px-3 lg:px-4 py-2 rounded-full text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 font-semibold text-sm lg:text-base">
              Home
            </Link>
            <Link to="/about" className="px-3 lg:px-4 py-2 rounded-full text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 font-semibold text-sm lg:text-base">
              About
            </Link>
            <Link to="/products" className="px-3 lg:px-4 py-2 rounded-full text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 font-semibold text-sm lg:text-base">
              Products
            </Link>
            <Link to="/blog" className="px-3 lg:px-4 py-2 rounded-full text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 font-semibold text-sm lg:text-base">
              Blog
            </Link>
            <Link to="/contact" className="px-3 lg:px-4 py-2 rounded-full text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 font-semibold text-sm lg:text-base">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart Icon */}
            <button 
              onClick={() => cart.length > 0 ? openCartDrawer() : null} 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-pink-500 to-yellow-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-lg animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>
            
            {/* User Menu - Desktop Only */}
            {user ? (
              <div className="hidden md:block relative" ref={userMenuRef}>
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full hover:bg-purple-50 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate text-gray-700 group-hover:text-purple-600 font-semibold text-sm lg:text-base">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-700 group-hover:text-purple-600 transition-all duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-purple-100 py-2 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="font-bold text-gray-800 truncate">{user.name}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-purple-50 transition-all text-gray-700 hover:text-purple-600 font-medium" onClick={closeUserMenu}>👤 Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-purple-50 transition-all text-gray-700 hover:text-purple-600 font-medium" onClick={closeUserMenu}>📦 Orders</Link>
                    {user.role === 'admin' && <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-purple-50 transition-all text-gray-700 hover:text-purple-600 font-medium" onClick={closeUserMenu}>⚙️ Admin Panel</Link>}
                    {user.role === 'vendor' && <Link to="/vendor/dashboard" className="block px-4 py-2 hover:bg-purple-50 transition-all text-gray-700 hover:text-purple-600 font-medium" onClick={closeUserMenu}>🏪 Vendor Panel</Link>}
                    {user.role === 'affiliate' && <Link to="/affiliate/dashboard" className="block px-4 py-2 hover:bg-purple-50 transition-all text-gray-700 hover:text-purple-600 font-medium" onClick={closeUserMenu}>💼 Affiliate Panel</Link>}
                    <div className="border-t border-purple-100 my-1"></div>
                    <button onClick={() => { logout(); closeUserMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-red-50 transition-all text-red-600 font-medium">🚪 Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center bg-gradient-to-r from-[#DB8B37] to-black text-white px-5 py-2 rounded-full hover:shadow-xl transition-all duration-300 font-bold text-sm lg:text-base hover:scale-105"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            
            {/* Navigation Links */}
            <Link to="/" className="block px-4 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold transition-all" onClick={closeMobileMenu}>🏠 Home</Link>
            <Link to="/about" className="block px-4 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold transition-all" onClick={closeMobileMenu}>ℹ️ About</Link>
            <Link to="/products" className="block px-4 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold transition-all" onClick={closeMobileMenu}>🛍️ Products</Link>
            <Link to="/blog" className="block px-4 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold transition-all" onClick={closeMobileMenu}>📝 Blog</Link>
            <Link to="/contact" className="block px-4 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold transition-all" onClick={closeMobileMenu}>📞 Contact</Link>

            {/* Cart Option inside Mobile Menu */}
            <button 
              onClick={() => { if (cart.length > 0) openCartDrawer(); closeMobileMenu(); }}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 font-semibold transition-all"
            >
              <span className="flex items-center gap-2">🛒 Shopping Cart</span>
              {cart.length > 0 && (
                <span className="bg-yellow-600 text-white rounded-full px-2.5 py-0.5 text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Auth section for mobile */}
            {user ? (
              <div className="pt-4 mt-2 border-t border-gray-100">
                <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-2 flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Logged in as</p>
                    <p className="font-bold text-gray-800 truncate text-sm">{user.name}</p>
                  </div>
                </div>
                
                <div className="space-y-0.5">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-purple-50 rounded-lg text-gray-700 font-medium text-sm transition-all" onClick={closeMobileMenu}>👤 Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-purple-50 rounded-lg text-gray-700 font-medium text-sm transition-all" onClick={closeMobileMenu}>📦 Orders</Link>
                  {user.role === 'admin' && <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-purple-50 rounded-lg text-gray-700 font-medium text-sm transition-all" onClick={closeMobileMenu}>⚙️ Admin Panel</Link>}
                  {user.role === 'vendor' && <Link to="/vendor/dashboard" className="block px-4 py-2 hover:bg-purple-50 rounded-lg text-gray-700 font-medium text-sm transition-all" onClick={closeMobileMenu}>🏪 Vendor Panel</Link>}
                  {user.role === 'affiliate' && <Link to="/affiliate/dashboard" className="block px-4 py-2 hover:bg-purple-50 rounded-lg text-gray-700 font-medium text-sm transition-all" onClick={closeMobileMenu}>💼 Affiliate Panel</Link>}
                  <button onClick={() => { logout(); closeMobileMenu(); }} className="block w-full text-left px-4 py-2.5 hover:bg-red-50 rounded-lg text-red-600 font-semibold text-sm transition-all mt-1">🚪 Logout</button>
                </div>
              </div>
            ) : (
              <div className="pt-4 mt-2 border-t border-gray-100">
                <Link 
                  to="/login" 
                  className="block w-full bg-gradient-to-r from-[#DB8B37] to-black text-white px-4 py-2.5 rounded-full text-center font-bold shadow-md transition-all active:scale-95"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;