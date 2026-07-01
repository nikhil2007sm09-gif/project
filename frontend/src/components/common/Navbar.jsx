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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const closeUserMenu = () => {
    setUserMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu()
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  return (
    <nav className=" backdrop-blur-md  sticky top-0 z-50 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
        <div className="flex items-center justify-between p-4">
      {/* Logo Container */}
      <div className="w-48 h-auto"> 
        <img 
          src={ElvoraLogo} 
          alt="Elvora Fashion Logo" 
          className="object-contain w-full h-full"
        />
      </div>
    </div>
          
          {/* Desktop Menu */}
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
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart Icon */}
            <button 
              onClick={() => cart.length > 0 ? openCartDrawer() : null} 
              className="relative p-2 hover:bg-purple-50 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-yellow-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>
            
            {/* User Menu - Desktop */}
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
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-purple-100 py-2 animate-fade-in overflow-hidden">
                    <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                      <p className="text-sm text-gray-600">Signed in as</p>
                      <p className="font-bold text-gray-800 truncate">{user.name}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2.5 hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium"
                      onClick={closeUserMenu}
                    >
                      👤 Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2.5 hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium"
                      onClick={closeUserMenu}
                    >
                      📦 Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        className="block px-4 py-2.5 hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium"
                        onClick={closeUserMenu}
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    {user.role === 'vendor' && (
                      <Link 
                        to="/vendor/dashboard" 
                        className="block px-4 py-2.5 hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium"
                        onClick={closeUserMenu}
                      >
                        🏪 Vendor Panel
                      </Link>
                    )}
                    {user.role === 'affiliate' && (
                      <Link 
                        to="/affiliate/dashboard" 
                        className="block px-4 py-2.5 hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium"
                        onClick={closeUserMenu}
                      >
                        💼 Affiliate Panel
                      </Link>
                    )}
                    <div className="border-t border-purple-100 my-1"></div>
                    <button 
                      onClick={() => {
                        logout()
                        closeUserMenu()
                      }} 
                      className="block w-full text-left px-4 py-2.5 hover:bg-red-50 transition-all duration-200 text-red-600 font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
       <Link
  to="/login"
  className="hidden md:inline-flex items-center bg-gradient-to-r from-[#DB8B37] to-black text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:bg-black-400 hover:text-white hover:shadow-xl transition-all duration-300 font-bold text-sm lg:text-base hover:scale-105"
>
  Login
</Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-purple-50 rounded-full transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-100 py-4 space-y-1 bg-gradient-to-b from-purple-50/50 to-white rounded-b-2xl">
            {/* Cart Button - Mobile */}
            <button 
              onClick={() => {
                if (cart.length > 0) {
                  openCartDrawer()
                }
                closeMobileMenu()
              }}
              className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
            >
              <span className="flex items-center gap-2">
                🛒 Shopping Cart
                {cart.length > 0 && (
                  <span className="bg-purple-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </span>
            </button>
            
            {/* Navigation Links */}
            <Link 
              to="/" 
              className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
              onClick={closeMobileMenu}
            >
              🏠 Home
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
              onClick={closeMobileMenu}
            >
              ℹ️ About
            </Link>
            <Link 
              to="/products" 
              className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
              onClick={closeMobileMenu}
            >
              🛍️ Products
            </Link>
            <Link 
              to="/blog" 
              className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
              onClick={closeMobileMenu}
            >
              📝 Blog
            </Link>
            <Link 
              to="/contact" 
              className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
              onClick={closeMobileMenu}
            >
              📞 Contact
            </Link>

            {/* User Menu - Mobile */}
            {user ? (
              <>
                <div className="border-t border-purple-200 my-2 mx-2"></div>
                <div className="px-4 py-3 mx-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Logged in as</p>
                      <p className="font-bold text-gray-800">{user.name}</p>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
                  onClick={closeMobileMenu}
                >
                  👤 Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
                  onClick={closeMobileMenu}
                >
                  📦 Orders
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
                    onClick={closeMobileMenu}
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}
                {user.role === 'vendor' && (
                  <Link 
                    to="/vendor/dashboard" 
                    className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
                    onClick={closeMobileMenu}
                  >
                    🏪 Vendor Panel
                  </Link>
                )}
                {user.role === 'affiliate' && (
                  <Link 
                    to="/affiliate/dashboard" 
                    className="block px-4 py-2.5 hover:bg-purple-100 rounded-lg transition-all duration-200 text-gray-700 hover:text-purple-600 font-semibold mx-2"
                    onClick={closeMobileMenu}
                  >
                    💼 Affiliate Panel
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout()
                    closeMobileMenu()
                  }} 
                  className="block w-full text-left px-4 py-2.5 hover:bg-red-100 rounded-lg transition-all duration-200 text-red-600 font-semibold mx-2"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-purple-200 my-2 mx-2"></div>
                <Link 
                  to="/login" 
                  className="block mx-4  bg-gradient-to-r from-[#DB8B37] to-black text-white  px-4 py-3 rounded-full hover:shadow-xl transition-all duration-300 text-center font-bold"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
