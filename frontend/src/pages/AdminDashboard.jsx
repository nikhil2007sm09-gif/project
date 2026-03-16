import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'

const AdminDashboard = () => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex space-x-4 mb-8 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'analytics' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          📊 Analytics
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'approvals' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Pending Approvals
          {pendingApprovals.length > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {pendingApprovals.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Manage Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'orders' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'activity' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Vendor Activity
        </button>
        <Link
          to="/admin/categories"
          className="px-4 py-2 font-semibold text-gray-600 hover:text-primary whitespace-nowrap"
        >
          Categories
        </Link>
        <Link
          to="/admin/sizes"
          className="px-4 py-2 font-semibold text-gray-600 hover:text-primary whitespace-nowrap"
        >
          Sizes
        </Link>
        <Link
          to="/admin/colors"
          className="px-4 py-2 font-semibold text-gray-600 hover:text-primary whitespace-nowrap"
        >
          Colors
        </Link>
        <Link
          to="/admin/blogs"
          className="px-4 py-2 font-semibold text-gray-600 hover:text-primary whitespace-nowrap"
        >
          Blogs
        </Link>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 mb-2">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 mb-2">Total Products</h3>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
            </div>
          </div>

          {pendingApprovals.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-yellow-800 mb-2">⚠️ Action Required</h3>
              <p className="text-yellow-700">
                You have {pendingApprovals.length} pending approval{pendingApprovals.length > 1 ? 's' : ''}.
                <button
                  onClick={() => setActiveTab('approvals')}
                  className="ml-2 text-primary underline"
                >
                  Review now
                </button>
              </p>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
          {pendingApprovals.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No pending approvals</p>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map(user => (
                <div key={user._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.role === 'vendor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1">Email: {user.email}</p>
                      <p className="text-gray-500 text-sm">
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      
                      {user.businessDetails && (
                        <div className="mt-3 bg-gray-50 rounded p-3">
                          <h4 className="font-semibold mb-2">Business Details:</h4>
                          {user.businessDetails.businessName && (
                            <p className="text-sm">Business: {user.businessDetails.businessName}</p>
                          )}
                          {user.businessDetails.phone && (
                            <p className="text-sm">Phone: {user.businessDetails.phone}</p>
                          )}
                          {user.businessDetails.businessAddress && (
                            <p className="text-sm">Address: {user.businessDetails.businessAddress}</p>
                          )}
                          {user.businessDetails.gstNumber && (
                            <p className="text-sm">GST: {user.businessDetails.gstNumber}</p>
                          )}
                          {user.businessDetails.website && (
                            <p className="text-sm">Website: {user.businessDetails.website}</p>
                          )}
                          {user.businessDetails.socialMedia && (
                            <p className="text-sm">Social: {user.businessDetails.socialMedia}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2 capitalize">{user.role}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manage Products</h2>
            <button
              onClick={fetchProducts}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Refresh
            </button>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found</p>
              <p className="text-sm text-gray-500">Products added by vendors will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-2">Image</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Price</th>
                    <th className="text-left py-3 px-2">Stock</th>
                    <th className="text-left py-3 px-2">Vendor</th>
                    <th className="text-left py-3 px-2">Category</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-2">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
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
                      <td className="py-3 px-2">
                        <div className="max-w-xs">
                          <p className="font-semibold truncate">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate">{product.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="font-semibold text-primary">₹{product.price}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium">{product.vendor?.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{product.vendor?.email || ''}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                          {product.category || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          <Link
                            to={`/products/${product._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition inline-flex items-center"
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
                            className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 transition inline-flex items-center"
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Customer</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2">{order._id.slice(-8)}</td>
                    <td className="py-2">{order.user?.name || 'N/A'}</td>
                    <td className="py-2">₹{order.totalAmount}</td>
                    <td className="py-2 capitalize">{order.status}</td>
                    <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Vendor Activity Tracking</h2>
          <p className="text-gray-600 mb-6">Monitor vendor login sessions, active time, and activity history</p>
          
          {vendorsActivity.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No vendor activity data available</p>
          ) : (
            <div className="space-y-4">
              {vendorsActivity.map(vendor => (
                <div key={vendor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-lg">{vendor.name}</h3>
                        {vendor.isOnline && (
                          <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Online
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          vendor.approved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vendor.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">📧 {vendor.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded p-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Active Time</p>
                      <p className="font-semibold text-primary">{vendor.totalActiveTimeFormatted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Sessions</p>
                      <p className="font-semibold">{vendor.totalSessions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Login</p>
                      <p className="font-semibold text-sm">
                        {vendor.lastLoginAt ? new Date(vendor.lastLoginAt).toLocaleString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Logout</p>
                      <p className="font-semibold text-sm">
                        {vendor.lastLogoutAt ? new Date(vendor.lastLogoutAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {vendor.recentLogins && vendor.recentLogins.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">Recent Login History:</p>
                      <div className="space-y-1">
                        {vendor.recentLogins.map((login, index) => (
                          <div key={index} className="text-xs text-gray-600 flex justify-between items-center bg-white rounded px-2 py-1">
                            <span>
                              📅 {new Date(login.loginAt).toLocaleString()}
                            </span>
                            {login.duration && (
                              <span className="text-primary font-semibold">
                                ⏱️ {Math.floor(login.duration / 60)}m {login.duration % 60}s
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
  )
}

export default AdminDashboard
