import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Truck, Clock, Package } from 'lucide-react'

// Add balloon animation styles
const balloonStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-100vh); }
  }
  
  @keyframes sway {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(15px); }
  }
  
  @keyframes pop {
    0% { 
      transform: scale(1); 
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
    }
    100% { 
      transform: scale(0); 
      opacity: 0;
    }
  }
  
  .balloon {
    animation: float 8s linear infinite, sway 3s ease-in-out infinite;
    cursor: pointer;
    transition: all 0.1s ease;
  }
  
  .balloon:hover {
    transform: scale(1.05);
  }
  
  .balloon.pop {
    animation: pop 0.5s ease-out forwards !important;
  }
`

const Balloon = ({ id, onPop, popped }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']
  const color = colors[id % colors.length]
  const left = (id * 14) + 5
  
  return (
    <div
      className={`balloon fixed ${popped ? 'pop' : ''}`}
      style={{
        left: `${left}%`,
        bottom: '-60px',
        width: '45px',
        height: '55px',
        backgroundColor: color,
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        zIndex: 10,
        boxShadow: `inset -2px -2px 5px rgba(0,0,0,0.2)`,
      }}
      onClick={() => !popped && onPop(id)}
      title="Click to pop!"
    >
      {/* String */}
      <div
        style={{
          position: 'absolute',
          bottom: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '35px',
          backgroundColor: '#999',
        }}
      />
      {/* Shine effect */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '12px',
          height: '12px',
          backgroundColor: 'rgba(255,255,255,0.4)',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}

const OrderSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [orderDetails, setOrderDetails] = useState(null)
  const [showRedirectScreen, setShowRedirectScreen] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)
  const [balloons, setBalloons] = useState([0, 1, 2, 3, 4, 5, 6])
  const [poppedBalloons, setPoppedBalloons] = useState(new Set())

  useEffect(() => {
    // Get order details from navigation state
    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails)
      
      // Show success page for 4 seconds, then show redirect screen
      const successTimer = setTimeout(() => {
        setShowRedirectScreen(true)
      }, 4000)
      
      return () => clearTimeout(successTimer)
    } else {
      // If no order details, redirect to products immediately
      navigate('/products')
    }
  }, [location, navigate])

  // Handle redirect countdown
  useEffect(() => {
    if (showRedirectScreen && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (showRedirectScreen && redirectCountdown === 0) {
      navigate('/products')
    }
  }, [showRedirectScreen, redirectCountdown, navigate])

  const handleBalloonPop = (id) => {
    setPoppedBalloons(prev => new Set([...prev, id]))
  }

  if (!orderDetails) {
    return null
  }

  // Redirect Screen with Animation
  if (showRedirectScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Side - Thank You Message */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center md:text-left order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                Thank you for your purchase!
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
                Your enrollment will be processed within 24 hours during working hours. We will notify you by email once enrolled.
              </p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - redirectCountdown) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-gray-600 font-semibold text-base md:text-lg">
                Redirecting...
              </p>
            </div>

            {/* Right Side - Delivery Illustration */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative w-full max-w-sm">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                  {/* Illustration Container */}
                  <div className="relative w-full h-64 md:h-72 flex items-center justify-center">
                    {/* Store Building */}
                    <div className="absolute right-0 top-0 w-24 md:w-32 h-24 md:h-32 bg-orange-100 rounded-lg border-4 border-orange-400 flex flex-col items-center justify-center shadow-lg">
                      <div className="text-lg md:text-2xl font-bold text-orange-700 mb-1 md:mb-2">STORE</div>
                      <div className="w-6 md:w-8 h-6 md:h-8 bg-orange-400 rounded mb-1 md:mb-2"></div>
                      <div className="flex gap-1 md:gap-2">
                        <div className="w-3 md:w-4 h-4 md:h-6 bg-orange-300 rounded"></div>
                        <div className="w-3 md:w-4 h-4 md:h-6 bg-orange-300 rounded"></div>
                      </div>
                    </div>

                    {/* Delivery Van */}
                    <div className="absolute left-0 bottom-8 md:bottom-12 w-32 md:w-40 h-16 md:h-20 bg-orange-400 rounded-lg border-4 border-orange-600 flex items-center justify-center relative shadow-lg">
                      {/* Van Cabin */}
                      <div className="absolute left-1 md:left-2 top-1 md:top-2 w-8 md:w-12 h-8 md:h-12 bg-orange-500 rounded-lg border-2 border-orange-700"></div>
                      
                      {/* Wheels */}
                      <div className="absolute bottom-0 left-3 md:left-4 w-4 md:w-6 h-4 md:h-6 bg-gray-800 rounded-full border-2 border-gray-900"></div>
                      <div className="absolute bottom-0 right-3 md:right-4 w-4 md:w-6 h-4 md:h-6 bg-gray-800 rounded-full border-2 border-gray-900"></div>
                      
                      {/* Packages in Van */}
                      <div className="flex gap-0.5 md:gap-1 ml-6 md:ml-8">
                        <div className="w-3 md:w-4 h-4 md:h-6 bg-yellow-300 rounded border border-yellow-600"></div>
                        <div className="w-3 md:w-4 h-4 md:h-6 bg-yellow-300 rounded border border-yellow-600"></div>
                        <div className="w-3 md:w-4 h-4 md:h-6 bg-yellow-300 rounded border border-yellow-600"></div>
                      </div>
                    </div>

                    {/* Delivery Person */}
                    <div className="absolute left-8 md:left-12 bottom-0 w-10 md:w-12 h-16 md:h-20 flex flex-col items-center">
                      {/* Head */}
                      <div className="w-3 md:w-4 h-3 md:h-4 bg-orange-200 rounded-full border-2 border-orange-400 mb-0.5 md:mb-1"></div>
                      {/* Body */}
                      <div className="w-5 md:w-6 h-5 md:h-6 bg-orange-500 rounded-sm border-2 border-orange-700 mb-0.5 md:mb-1"></div>
                      {/* Legs */}
                      <div className="flex gap-0.5 md:gap-1">
                        <div className="w-1 h-3 md:h-4 bg-gray-700"></div>
                        <div className="w-1 h-3 md:h-4 bg-gray-700"></div>
                      </div>
                    </div>
                  </div>

                  {/* Status Text */}
                  <div className="text-center mt-4 md:mt-6">
                    <p className="text-orange-600 font-bold text-base md:text-lg">Order on the way! 🚚</p>
                    <p className="text-gray-600 text-xs md:text-sm">Your package will arrive soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative overflow-hidden">
      {/* Balloon Animation Styles */}
      <style>{balloonStyles}</style>
      
      {/* Floating Balloons */}
      {balloons.map(id => (
        <Balloon 
          key={id} 
          id={id} 
          onPop={handleBalloonPop}
          popped={poppedBalloons.has(id)}
        />
      ))}
      
      <div className="container mx-auto max-w-2xl relative z-20">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Success Icon - Green Background */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-50"></div>
                <CheckCircle className="w-28 h-28 text-white relative z-10" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Order Placed Successfully! 🎉</h1>
            <p className="text-green-50 text-base md:text-lg">Thank you for your purchase!</p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-8">
            <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
              Your order has been confirmed and is being processed. You'll receive an email confirmation shortly.
            </p>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Order ID</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">#{orderDetails.orderId}</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-500">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-xl md:text-2xl font-bold text-pink-600">₹{orderDetails.totalAmount}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="text-lg md:text-xl font-semibold text-orange-600 capitalize">
                  {orderDetails.paymentMethod === 'demo' ? 'Demo Payment' : 'Razorpay'}
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 border-l-4 border-pink-500">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Delivery City</p>
                <p className="text-lg md:text-xl font-semibold text-pink-600">{orderDetails.city}</p>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-blue-50 rounded-lg p-5 md:p-6 mb-8 border border-blue-200">
              <h3 className="font-bold text-base md:text-lg text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                What Happens Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Order Confirmation Email</p>
                    <p className="text-xs md:text-sm text-gray-600">You'll receive an email with your order details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Order Processing</p>
                    <p className="text-xs md:text-sm text-gray-600">We'll prepare your items for shipment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Shipping & Delivery</p>
                    <p className="text-xs md:text-sm text-gray-600">Your order will be delivered in 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700">Fast Delivery</p>
                <p className="text-xs text-gray-500">3-5 Days</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                  <Package className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700">Easy Returns</p>
                <p className="text-xs text-gray-500">7 Days Policy</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
              <button
                onClick={() => navigate('/orders')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center text-sm md:text-base"
              >
                <Package className="w-5 h-5 mr-2" />
                Track Your Order
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition flex items-center justify-center text-sm md:text-base"
              >
                Continue Shopping
              </button>
            </div>

            {/* Back to Home Link */}
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xs md:text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info - Need Help Section */}
        <div className="mt-6 md:mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">❓</span>
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Support */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 md:p-6 border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white">
                    <span className="text-lg">📧</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-800 text-sm md:text-base mb-2">Contact Support</p>
                  <p className="text-xs md:text-sm text-gray-700 mb-1">
                    <span className="font-semibold">Email:</span> support@clothesshop.com
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    <span className="font-semibold">Phone:</span> +91 XXXX-XXXX-XX
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 md:p-6 border border-purple-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white">
                    <span className="text-lg">🔗</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-800 text-sm md:text-base mb-3">Quick Links</p>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-semibold cursor-pointer transition">
                      → View Order Status
                    </p>
                    <p className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-semibold cursor-pointer transition">
                      → Return Policy
                    </p>
                    <p className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-semibold cursor-pointer transition">
                      → Shipping Info
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
