import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
import { Package, Truck, CheckCircle, Clock, XCircle, Eye } from 'lucide-react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/my-orders')
      setOrders(res.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start shopping and your orders will appear here</p>
          <Link 
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="space-y-4">
          {orders.map(order => {
            const orderDate = new Date(order.createdAt)
            const deliveryDate = new Date(orderDate)
            deliveryDate.setDate(deliveryDate.getDate() + 7)

            return (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-mono text-sm font-semibold">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div>
                      <p className="text-sm text-gray-600">Placed on</p>
                      <p className="font-medium">{orderDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-lg text-primary">₹{order.totalAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="font-semibold capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, idx) => {
                      const displayImage = (item.images && item.images.length > 0) 
                        ? item.images[0] 
                        : item.image

                      return (
                        <div key={idx} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                            {displayImage && (
                              <img 
                                src={displayImage} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">Size: {item.size} • Quantity: {item.quantity}</p>
                            <p className="text-sm font-semibold text-primary mt-1">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Shipping Address */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Truck className="w-4 h-4 mr-2 text-primary" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                          <p>PIN: {order.shippingAddress.pincode}</p>
                          <p>Phone: {order.shippingAddress.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Order Timeline</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span>Order Placed - {orderDate.toLocaleDateString('en-IN')}</span>
                          </div>
                          {order.status === 'processing' && (
                            <div className="flex items-center text-yellow-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>Processing your order</span>
                            </div>
                          )}
                          {order.status === 'shipped' && (
                            <div className="flex items-center text-blue-600">
                              <Truck className="w-4 h-4 mr-2" />
                              <span>Out for delivery</span>
                            </div>
                          )}
                          {order.status === 'delivered' && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span>Delivered successfully</span>
                            </div>
                          )}
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <div className="flex items-center text-gray-400">
                              <Package className="w-4 h-4 mr-2" />
                              <span>Expected by {deliveryDate.toLocaleDateString('en-IN')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  {order.paymentId && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        Payment ID: <span className="font-mono">{order.paymentId}</span>
                        {order.paymentMethod && (
                          <span className="ml-4">Method: <span className="font-semibold capitalize">{order.paymentMethod}</span></span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Orders
