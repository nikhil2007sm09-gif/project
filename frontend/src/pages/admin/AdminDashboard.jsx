import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import { 
  LayoutDashboard, 
  BarChart3, 
  UserCheck, 
  Package, 
  Users, 
  ShoppingCart, 
  Activity,
  Grid,
  Palette,
  Ruler,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  UserPlus,
  LogOut,
  X
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [pendingApprovals, setPendingApprovals] = useState([])
  const [products, setProducts] = useState([])
  const [vendorsActivity, setVendorsActivity] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [analytics, setAnalytics] = useState(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  useEffect(() => {
    fetchDashboardData()
    fetchProducts()
    if (activeTab === 'activity') {
      fetchVendorsActivity()
    }
    if (activeTab === 'analytics') {
      fetchAnalytics()
    }
  }, [activeTab])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes, usersRes, pendingRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/orders'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/pending-approvals')
      ])
      setStats(statsRes.data)
      setOrders(ordersRes.data)
      setUsers(usersRes.data)
      setPendingApprovals(pendingRes.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/admin/products')
      setProducts(res.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchVendorsActivity = async () => {
    try {
      const res = await axios.get('/api/admin/vendors-activity')
      setVendorsActivity(res.data)
    } catch (error) {
      console.error('Error fetching vendor activity:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true)
      const res = await axios.get('/api/admin/analytics')
      setAnalytics(res.data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await axios.delete(`/api/admin/products/${productId}`)
      alert('Product deleted successfully!')
      fetchProducts()
      fetchDashboardData() // Refresh stats
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting product')
    }
  }

  const handleApprove = async (userId) => {
    try {
      await axios.patch(`/api/admin/approve-user/${userId}`)
      alert('User approved successfully!')
      fetchDashboardData()
    } catch (error) {
      alert('Error approving user')
    }
  }

  const handleReject = async (userId) => {
    if (!confirm('Are you sure you want to reject this user? This will delete their account.')) {
      return
    }
    try {
      await axios.patch(`/api/admin/reject-user/${userId}`)
      alert('User rejected successfully!')
      fetchDashboardData()
    } catch (error) {
      alert('Error rejecting user')
    }
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'approvals', label: 'Approvals', icon: UserCheck, badge: pendingApprovals.length },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'activity', label: 'Activity', icon: Activity }
  ]

  const quickLinks = [
    { to: '/admin/team', label: 'Team', icon: Users },
    { to: '/admin/categories', label: 'Categories', icon: Grid },
    { to: '/admin/sizes', label: 'Sizes', icon: Ruler },
    { to: '/admin/colors', label: 'Colors', icon: Palette },
    { to: '/admin/blogs', label: 'Blogs', icon: FileText },
    { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { to: '/admin/sliders', label: 'Sliders', icon: ImageIcon }
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Left Sidebar - Desktop & Mobile */}
      <aside className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-72' : 'w-20'
      } ${mobileSidebarOpen ? 'flex' : 'hidden lg:flex'} flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Clothes<span className="text-gray-800">Shop</span>
                </h1>
              </Link>
            ) : (
              <Link to="/" className="flex justify-center group w-full">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-7 h-7 text-white" />
                </div>
              </Link>
            )}
            {/* Mobile Close Button */}
            {mobileSidebarOpen && (
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Toggle Button - Desktop Only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-50"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 p-4">
          {/* Main Navigation */}
          <div className="space-y-2 mb-6">
            {sidebarOpen && (
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Navigation</p>
              </div>
            )}
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    // Close mobile sidebar on tab click
                    if (window.innerWidth < 1024) {
                      setMobileSidebarOpen(false)
                    }
                  }}
                  className={`w-full flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <div className={`flex items-center ${sidebarOpen ? 'space-x-3' : ''}`}>
                    <div className={`p-2 rounded-lg ${
                      activeTab === item.id 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-br from-blue-100 to-purple-100'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {sidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
                  </div>
                  {sidebarOpen && item.badge > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === item.id 
                        ? 'bg-white text-blue-600' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {!sidebarOpen && item.badge > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Quick Links */}
          {sidebarOpen && (
            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Quick Access</p>
              </div>
              <div className="space-y-1 mt-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-200 group"
                    >
                      <div className="p-1.5 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-white group-hover:to-white rounded-lg transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="border-t-2 border-gray-200 pt-4 mt-4">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'} px-4 py-3 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl`}
              title={!sidebarOpen ? 'Logout' : ''}
            >
              <div className="p-2 bg-white/20 rounded-lg">
                <LogOut className="w-5 h-5" />
              </div>
              {sidebarOpen && <span className="font-semibold text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar - Floating Button */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform z-50"
      >
        {mobileSidebarOpen ? <X className="w-6 h-6" /> : <LayoutDashboard className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 p-4 md:p-8 ${
        sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              {(() => {
                const currentItem = menuItems.find(item => item.id === activeTab)
                const Icon = currentItem?.icon || LayoutDashboard
                return (
                  <>
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {currentItem?.label || 'Dashboard'}
                      </h2>
                      <p className="text-gray-500 text-xs md:text-sm">Manage your e-commerce platform</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 hover:rotate-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8" />
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 mb-1">Total Users</h3>
                  <p className="text-5xl font-bold mb-2">{stats.totalUsers}</p>
                  <div className="flex items-center text-xs opacity-80">
                    <UserPlus className="w-3 h-3 mr-1" />
                    <span>All registered users</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 hover:rotate-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Package className="w-8 h-8" />
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 mb-1">Total Products</h3>
                  <p className="text-5xl font-bold mb-2">{stats.totalProducts}</p>
                  <div className="flex items-center text-xs opacity-80">
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    <span>Active listings</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 hover:rotate-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 mb-1">Total Orders</h3>
                  <p className="text-5xl font-bold mb-2">{stats.totalOrders}</p>
                  <div className="flex items-center text-xs opacity-80">
                    <Activity className="w-3 h-3 mr-1" />
                    <span>Completed orders</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 hover:rotate-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <DollarSign className="w-8 h-8" />
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 mb-1">Total Revenue</h3>
                  <p className="text-5xl font-bold mb-2">₹{stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center text-xs opacity-80">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    <span>All time earnings</span>
                  </div>
                </div>
              </div>
            </div>

            {pendingApprovals.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-xl p-6 mb-8 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-yellow-900 text-lg mb-1">⚠️ Action Required</h3>
                    <p className="text-yellow-800 mb-3">
                      You have {pendingApprovals.length} pending approval{pendingApprovals.length > 1 ? 's' : ''} waiting for review.
                    </p>
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition inline-flex items-center"
                    >
                      Review Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {loadingAnalytics ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mx-auto relative">
                    <div className="absolute inset-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Loading Admin Analytics
                </h3>
                <p className="text-gray-600">Gathering platform insights...</p>
                <div className="flex items-center justify-center space-x-1 mt-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          ) : analytics ? (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Revenue</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">₹{analytics.overview.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm mt-2 opacity-80">All time earnings</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">This Month</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">₹{analytics.overview.thisMonthRevenue.toLocaleString()}</p>
                  <p className="text-sm mt-2 opacity-80">
                    {analytics.overview.revenueGrowth > 0 ? '↑' : '↓'} {Math.abs(analytics.overview.revenueGrowth)}% vs last month
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Orders</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">{analytics.overview.totalOrders}</p>
                  <p className="text-sm mt-2 opacity-80">{analytics.recentActivity.newOrders} in last 7 days</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Users</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">{analytics.overview.totalUsers}</p>
                  <p className="text-sm mt-2 opacity-80">{analytics.recentActivity.newUsers} new this week</p>
                </div>
              </div>

              {/* User Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Customers
                  </h3>
                  <p className="text-4xl font-bold text-blue-600">{analytics.overview.totalCustomers}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {((analytics.overview.totalCustomers / analytics.overview.totalUsers) * 100).toFixed(1)}% of total users
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    Vendors
                  </h3>
                  <p className="text-4xl font-bold text-purple-600">{analytics.overview.totalVendors}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {((analytics.overview.totalVendors / analytics.overview.totalUsers) * 100).toFixed(1)}% of total users
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                    Affiliates
                  </h3>
                  <p className="text-4xl font-bold text-pink-600">{analytics.overview.totalAffiliates}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {((analytics.overview.totalAffiliates / analytics.overview.totalUsers) * 100).toFixed(1)}% of total users
                  </p>
                </div>
              </div>

              {/* Revenue Chart (Last 7 Days) */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6">Revenue Trend (Last 7 Days)</h3>
                <div className="space-y-3">
                  {analytics.revenueByDay.map((day, index) => {
                    const maxRevenue = Math.max(...analytics.revenueByDay.map(d => d.revenue))
                    const percentage = (day.revenue / maxRevenue) * 100
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{new Date(day._id).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <span className="text-gray-600">{day.orders} orders • ₹{day.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Products & Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">🏆 Top Selling Products</h3>
                  <div className="space-y-3">
                    {analytics.topProducts.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                          <div>
                            <p className="font-semibold">{item.productInfo.name}</p>
                            <p className="text-sm text-gray-600">{item.totalSold} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{item.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">📦 Products by Category</h3>
                  <div className="space-y-3">
                    {analytics.categoryStats.map((cat, index) => {
                      const maxCount = Math.max(...analytics.categoryStats.map(c => c.count))
                      const percentage = (cat.count / maxCount) * 100
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{cat._id || 'Uncategorized'}</span>
                            <span className="text-gray-600">{cat.count} products</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Vendor Performance */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">👥 Top Vendors by Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-4">Rank</th>
                        <th className="text-left py-3 px-4">Vendor Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Products</th>
                        <th className="text-left py-3 px-4">Total Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.vendorStats.map((vendor, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="text-xl font-bold text-gray-400">#{index + 1}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold">{vendor.vendorInfo.name}</td>
                          <td className="py-3 px-4 text-gray-600">{vendor.vendorInfo.email}</td>
                          <td className="py-3 px-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              {vendor.productCount}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              {vendor.totalStock}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">📊 Orders by Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analytics.ordersByStatus.map((status, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{status.count}</p>
                      <p className="text-sm text-gray-600 mt-1 capitalize">{status._id}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-600">
              No analytics data available
            </div>
          )}
        </div>
      )}

        {activeTab === 'approvals' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Pending Approvals</h2>
              <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-semibold">
                {pendingApprovals.length} Pending
              </span>
            </div>
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-green-100 rounded-full mb-4">
                  <UserCheck className="w-12 h-12 text-green-600" />
                </div>
                <p className="text-gray-600 text-lg">No pending approvals</p>
                <p className="text-gray-500 text-sm mt-2">All users have been reviewed</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map(user => (
                  <div key={user._id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-r from-white to-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-800">{user.name}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              user.role === 'vendor' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                            }`}>
                              {user.role.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-gray-700 flex items-center">
                            <span className="font-semibold mr-2">📧 Email:</span> {user.email}
                          </p>
                          <p className="text-gray-600 flex items-center text-sm">
                            <span className="font-semibold mr-2">📅 Registered:</span> 
                            {new Date(user.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        
                        {user.businessDetails && (
                          <div className="mt-4 bg-white rounded-xl p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Business Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {user.businessDetails.businessName && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">Business:</span> {user.businessDetails.businessName}
                                </p>
                              )}
                              {user.businessDetails.phone && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">Phone:</span> {user.businessDetails.phone}
                                </p>
                              )}
                              {user.businessDetails.gstNumber && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">GST:</span> {user.businessDetails.gstNumber}
                                </p>
                              )}
                              {user.businessDetails.website && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">Website:</span> {user.businessDetails.website}
                                </p>
                              )}
                              {user.businessDetails.businessAddress && (
                                <p className="text-sm text-gray-700 col-span-2">
                                  <span className="font-semibold">Address:</span> {user.businessDetails.businessAddress}
                                </p>
                              )}
                              {user.businessDetails.socialMedia && (
                                <p className="text-sm text-gray-700 col-span-2">
                                  <span className="font-semibold">Social:</span> {user.businessDetails.socialMedia}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-6">
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
                        >
                          <UserCheck className="w-5 h-5 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

          {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Users ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Name</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Email</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Role</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Activity</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'vendor' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'affiliate' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.approved ? '✓ Approved' : '⏳ Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {(user.role === 'vendor' || user.role === 'affiliate') && (
                          <div className="flex items-center space-x-2">
                            {user.isOnline ? (
                              <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                                Online
                              </span>
                            ) : (
                              <span className="flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                                Offline
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
              <button
                onClick={fetchProducts}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                <Activity className="w-5 h-5 mr-2" />
                Refresh
              </button>
            </div>
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-purple-100 rounded-full mb-4">
                  <Package className="w-12 h-12 text-purple-600" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No products found</p>
                <p className="text-sm text-gray-500">Products added by vendors will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Image</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Name</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Price</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Stock</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Vendor</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Category</th>
                      <th className="text-left py-4 px-3 font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all">
                      <td className="py-4 px-3">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center shadow-md">
                          {(product.images && product.images.length > 0) || product.image ? (
                            <img 
                              src={product.images?.[0] || product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.parentElement.innerHTML = '<span class="text-xs text-gray-400">No Image</span>'
                              }}
                            />
                          ) : (
                            <span className="text-xs text-gray-400">No Image</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <div className="max-w-xs">
                          <p className="font-bold text-gray-800 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate mt-1">{product.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-bold text-green-600 text-lg">₹{product.price}</span>
                      </td>
                      <td className="py-4 px-3">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div>
                          <p className="font-semibold text-gray-800">{product.vendor?.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{product.vendor?.email || ''}</p>
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                          {product.category || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex space-x-2">
                          <Link
                            to={`/products/${product._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg inline-flex items-center font-medium"
                            title="View product details"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg inline-flex items-center font-medium"
                            title="Delete product"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Order ID</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Customer</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Amount</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 font-mono text-sm text-gray-600">#{order._id.slice(-8)}</td>
                      <td className="py-4 px-4 font-medium text-gray-800">{order.user?.name || 'N/A'}</td>
                      <td className="py-4 px-4 font-bold text-green-600">₹{order.totalAmount}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Vendor Activity Tracking</h2>
              <p className="text-gray-600">Monitor vendor login sessions, active time, and activity history</p>
            </div>
            
            {vendorsActivity.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-blue-100 rounded-full mb-4">
                  <Activity className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-gray-600 text-lg">No vendor activity data available</p>
              </div>
            ) : (
              <div className="space-y-6">
                {vendorsActivity.map(vendor => (
                  <div key={vendor.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all bg-gradient-to-r from-white to-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {vendor.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-800">{vendor.name}</h3>
                            <p className="text-gray-600 text-sm">📧 {vendor.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {vendor.isOnline && (
                            <span className="flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                              Online Now
                            </span>
                          )}
                          <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                            vendor.approved ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white'
                          }`}>
                            {vendor.approved ? '✓ Approved' : '⏳ Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl p-4 border border-gray-200 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-semibold">Total Active Time</p>
                        <p className="font-bold text-blue-600 text-lg">{vendor.totalActiveTimeFormatted}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-semibold">Total Sessions</p>
                        <p className="font-bold text-purple-600 text-lg">{vendor.totalSessions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-semibold">Last Login</p>
                        <p className="font-semibold text-sm text-gray-700">
                          {vendor.lastLoginAt ? new Date(vendor.lastLoginAt).toLocaleString() : 'Never'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 font-semibold">Last Logout</p>
                        <p className="font-semibold text-sm text-gray-700">
                          {vendor.lastLogoutAt ? new Date(vendor.lastLogoutAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {vendor.recentLogins && vendor.recentLogins.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-700 mb-3 font-bold flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Recent Login History
                        </p>
                        <div className="space-y-2">
                          {vendor.recentLogins.map((login, index) => (
                            <div key={index} className="text-sm text-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 py-3 border border-blue-100">
                              <span className="flex items-center">
                                <span className="font-semibold mr-2">📅</span>
                                {new Date(login.loginAt).toLocaleString()}
                              </span>
                              {login.duration && (
                                <span className="text-blue-600 font-bold flex items-center">
                                  <span className="mr-1">⏱️</span>
                                  {Math.floor(login.duration / 60)}m {login.duration % 60}s
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
