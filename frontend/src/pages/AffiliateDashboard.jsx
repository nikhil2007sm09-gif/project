import { useState, useEffect } from 'react'
import axios from '../utils/axios'

const AffiliateDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({ clicks: 0, sales: 0, commission: 0 })
  const [affiliateLink, setAffiliateLink] = useState('')
  const [affiliateCode, setAffiliateCode] = useState('')
  const [analytics, setAnalytics] = useState(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [generatedLink, setGeneratedLink] = useState('')
  const [recentClicks, setRecentClicks] = useState([])
  const [commissions, setCommissions] = useState([])

  useEffect(() => {
    fetchAffiliateData()
    if (activeTab === 'analytics') {
      fetchAnalytics()
    } else if (activeTab === 'links') {
      fetchProducts()
      fetchRecentClicks()
    } else if (activeTab === 'commissions') {
      fetchCommissions()
    }
  }, [activeTab])

  const fetchAffiliateData = async () => {
    try {
      const res = await axios.get('/api/affiliate/stats')
      setStats(res.data.stats)
      setAffiliateLink(res.data.affiliateLink)
      setAffiliateCode(res.data.affiliateCode)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products')
      setProducts(res.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchRecentClicks = async () => {
    try {
      const res = await axios.get('/api/affiliate/recent-clicks')
      setRecentClicks(res.data)
    } catch (error) {
      console.error('Error fetching clicks:', error)
    }
  }

  const fetchCommissions = async () => {
    try {
      const res = await axios.get('/api/affiliate/commissions')
      setCommissions(res.data)
    } catch (error) {
      console.error('Error fetching commissions:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true)
      const res = await axios.get('/api/affiliate/analytics')
      setAnalytics(res.data)
      setAffiliateLink(res.data.affiliateLink)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  const generateProductLink = (product) => {
    const baseUrl = window.location.origin
    const link = `${baseUrl}/products/${product._id}?ref=${affiliateCode}`
    setSelectedProduct(product)
    setGeneratedLink(link)
  }

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    alert('Link copied to clipboard!')
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteAccount = async () => {
    const confirmText = 'DELETE'
    const userInput = prompt(
      `⚠️ WARNING: This will permanently delete your affiliate account!\n\n` +
      `Your affiliate code will be removed from all orders (orders will remain).\n\n` +
      `Type "${confirmText}" to confirm deletion:`
    )
    
    if (userInput !== confirmText) {
      if (userInput !== null) {
        alert('Account deletion cancelled. Text did not match.')
      }
      return
    }
    
    try {
      await axios.delete('/api/auth/delete-account')
      alert('Your account has been permanently deleted.')
      // Logout and redirect
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Error deleting account. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Affiliate Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'links' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          🔗 Generate Links
        </button>
        <button
          onClick={() => setActiveTab('commissions')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'commissions' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          💰 Commissions
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'analytics' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          📈 Analytics
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'settings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          ⚙️ Settings
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Total Clicks</h3>
              <p className="text-4xl font-bold">{stats.clicks}</p>
              <p className="text-sm mt-2 opacity-80">Link visits</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Total Sales</h3>
              <p className="text-4xl font-bold">{stats.sales}</p>
              <p className="text-sm mt-2 opacity-80">Successful referrals</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Commission Earned</h3>
              <p className="text-4xl font-bold">₹{stats.commission.toLocaleString()}</p>
              <p className="text-sm mt-2 opacity-80">10% per sale</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Your Affiliate Link</h2>
            <p className="text-gray-600 mb-4">Share this link to earn 10% commission on every sale!</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={affiliateLink}
                readOnly
                className="flex-1 border rounded px-4 py-2 bg-gray-50 font-mono text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(affiliateLink)
                  alert('Link copied to clipboard!')
                }}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
              >
                📋 Copy Link
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'links' && (
        <div className="space-y-6">
          {/* General Affiliate Link */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Your General Affiliate Link
            </h2>
            <p className="mb-4 opacity-90">Share this link to earn 10% commission on all products!</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={affiliateLink}
                readOnly
                className="flex-1 rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 font-mono text-sm"
              />
              <button
                onClick={() => copyLink(affiliateLink)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold whitespace-nowrap transition"
              >
                📋 Copy
              </button>
            </div>
            <p className="mt-3 text-sm opacity-80">
              Your Code: <span className="font-bold text-lg">{affiliateCode}</span>
            </p>
          </div>

          {/* Product-Specific Links */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4">🎯 Generate Product-Specific Links</h3>
            <p className="text-gray-600 mb-6">Create custom affiliate links for specific products to track performance better</p>
            
            {/* Search Products */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="🔍 Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredProducts.map(product => {
                const productImage = (product.images && product.images.length > 0) 
                  ? product.images[0] 
                  : product.image

                return (
                  <div key={product._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                      {productImage && (
                        <img 
                          src={productImage} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h4 className="font-semibold text-sm mb-1 truncate">{product.name}</h4>
                    <p className="text-primary font-bold mb-3">₹{product.price}</p>
                    <button
                      onClick={() => generateProductLink(product)}
                      className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition"
                    >
                      Generate Link
                    </button>
                  </div>
                )
              })}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 py-8">No products found</p>
            )}
          </div>

          {/* Generated Link Display */}
          {generatedLink && selectedProduct && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Link Generated Successfully!
              </h3>
              <p className="text-gray-700 mb-3">
                Product: <span className="font-semibold">{selectedProduct.name}</span>
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 border border-green-300 rounded-lg px-4 py-3 bg-white font-mono text-sm"
                />
                <button
                  onClick={() => copyLink(generatedLink)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold whitespace-nowrap transition"
                >
                  📋 Copy Link
                </button>
              </div>
            </div>
          )}

          {/* Recent Clicks */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">👁️ Recent Clicks</h3>
            {recentClicks.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentClicks.map((click, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                    <div>
                      <p className="font-semibold">{click.product?.name || 'General Link'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(click.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      click.converted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {click.converted ? '✓ Converted' : 'Clicked'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No clicks yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div className="space-y-6">
          {/* Commission Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Total Earned</h3>
              <p className="text-3xl font-bold">₹{stats.commission.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Pending</h3>
              <p className="text-3xl font-bold">
                ₹{commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Approved</h3>
              <p className="text-3xl font-bold">
                ₹{commissions.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Paid</h3>
              <p className="text-3xl font-bold">
                ₹{commissions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Commission History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-6">💰 Commission History</h3>
            {commissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((commission, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">
                          {new Date(commission.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm font-mono">
                          {commission.order?._id?.slice(-8).toUpperCase() || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm font-bold text-green-600">
                          ₹{commission.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            commission.status === 'paid' ? 'bg-green-100 text-green-800' :
                            commission.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {commission.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No commissions yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {loadingAnalytics ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : analytics ? (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Commission</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">₹{analytics.overview.totalCommission.toLocaleString()}</p>
                  <p className="text-sm mt-2 opacity-80">All time earnings</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">This Month</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">₹{analytics.overview.thisMonthCommission.toLocaleString()}</p>
                  <p className="text-sm mt-2 opacity-80">
                    {analytics.overview.commissionGrowth > 0 ? '↑' : '↓'} {Math.abs(analytics.overview.commissionGrowth)}% vs last month
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Sales</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">{analytics.overview.totalSales}</p>
                  <p className="text-sm mt-2 opacity-80">{analytics.overview.recentOrders} in last 7 days</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Conversion Rate</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">{analytics.overview.conversionRate}%</p>
                  <p className="text-sm mt-2 opacity-80">Click to sale ratio</p>
                </div>
              </div>

              {/* Commission Trend */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6">Commission Trend (Last 7 Days)</h3>
                <div className="space-y-3">
                  {analytics.salesByDay.map((day, index) => {
                    const maxCommission = Math.max(...analytics.salesByDay.map(d => d.commission))
                    const percentage = maxCommission > 0 ? (day.commission / maxCommission) * 100 : 0
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <span className="text-gray-600">{day.orders} orders • ₹{day.commission.toLocaleString()} commission</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Customers & Recent Orders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Customers */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">🏆 Top Customers</h3>
                  {analytics.topCustomers.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.topCustomers.map((customer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                            <div>
                              <p className="font-semibold">{customer.customer.name}</p>
                              <p className="text-sm text-gray-600">{customer.orders} orders</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{customer.commission.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">commission</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No customers yet</p>
                  )}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">📦 Recent Orders</h3>
                  {analytics.recentOrders.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {analytics.recentOrders.map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                          <div>
                            <p className="font-semibold">{order.customer}</p>
                            <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{order.commission.toLocaleString()}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No orders yet</p>
                  )}
                </div>
              </div>

              {/* Affiliate Link Section */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">🔗 Your Affiliate Link</h3>
                <p className="mb-4 opacity-90">Share this link to earn 10% commission on every sale!</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={analytics.affiliateLink}
                    readOnly
                    className="flex-1 rounded px-4 py-2 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 font-mono text-sm"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(analytics.affiliateLink)
                      alert('Link copied to clipboard!')
                    }}
                    className="bg-white text-purple-600 px-6 py-2 rounded hover:bg-gray-100 font-semibold whitespace-nowrap"
                  >
                    📋 Copy
                  </button>
                </div>
                <p className="mt-3 text-sm opacity-80">
                  Your Code: <span className="font-bold">{analytics.affiliateCode}</span>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-600">
              No analytics data available
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <p className="text-gray-600 mb-6">Manage your affiliate account preferences and data.</p>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-600 mb-2">⚠️ Danger Zone</h3>
                <p className="text-gray-700 mb-4">
                  Once you delete your account, there is no going back. This action will:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Permanently delete your affiliate account</li>
                  <li>Remove your affiliate code from the system</li>
                  <li>Deactivate your affiliate link</li>
                  <li>Remove affiliate code from all orders (orders will remain for record keeping)</li>
                  <li>Delete your commission history</li>
                  <li>This action <strong>CANNOT be undone</strong></li>
                </ul>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete My Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AffiliateDashboard
