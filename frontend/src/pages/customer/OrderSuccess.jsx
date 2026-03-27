import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react'

const OrderSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showConfetti, setShowConfetti] = useState(true)
  const orderDetails = location.state?.orderDetails

  useEffect(() => {
    // Create confetti
    createConfetti()
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const createConfetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493']
    const confettiCount = 150

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'
        confetti.style.animationDelay = (Math.random() * 0.5) + 's'
        document.getElementById('confetti-container')?.appendChild(confetti)

        setTimeout(() => {
          confetti.remove()
        }, 5000)
      }, i * 30)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Confetti Container */}
      {showConfetti && <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50"></div>}

      <div className="container mx-auto px-4 py-16 relative z-10 justify-center items-center text-center">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center transform animate-bounce-in">
            {/* Success Icon with Animation */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
                <CheckCircle className="w-16 h-16 text-green-600 animate-check" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20"></div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
              🎉 Order Placed Successfully! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay">
              Thank you for your purchase! Your order has been confirmed.
            </p>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono font-bold text-lg text-primary">#{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-bold text-lg text-green-600">₹{orderDetails.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-semibold capitalize">{orderDetails.paymentMethod || 'Razorpay'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="font-semibold">{orderDetails.city}</p>
                  </div>
                </div>
              </div>
            )}

            {/* What's Next */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left animate-slide-up-delay">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold">Order Confirmation Email</p>
                    <p className="text-sm text-gray-600">You'll receive an email with your order details</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Order Processing</p>
                    <p className="text-sm text-gray-600">We'll prepare your items for shipping</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold">Shipping & Delivery</p>
                    <p className="text-sm text-gray-600">Your order will be delivered within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold transition transform hover:scale-105 shadow-lg"
              >
                <Truck className="w-5 h-5 mr-2" />
                Track Your Order
              </button>
              <button
                onClick={() => navigate('/products')}
                className="flex items-center justify-center bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg hover:bg-blue-50 font-semibold transition transform hover:scale-105 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-6 text-gray-600 hover:text-primary flex items-center justify-center mx-auto transition"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-delay-3">
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">Secure Payment</p>
              <p className="text-xs text-gray-600">100% Protected</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">Fast Delivery</p>
              <p className="text-xs text-gray-600">5-7 Business Days</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">Easy Returns</p>
              <p className="text-xs text-gray-600">7 Days Policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Confetti and Animations */}
      <style>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          z-index: 9999;
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes check {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-check {
          stroke-dasharray: 100;
          animation: check 0.6s ease-out 0.3s forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.3s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.5s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.7s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.6s ease-out 0.9s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.4s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.6s both;
        }
      `}</style>
    </div>
  )
}

export default OrderSuccess
