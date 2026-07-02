import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'
import { getStoredAffiliateCode } from '../../utils/affiliateTracker'
import { CreditCard, Smartphone, Building2, Wallet, Shield, Truck, CheckCircle } from 'lucide-react'

const Checkout = () => {
  const { cart, getTotal, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Address, 2: Payment
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  })

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.pincode || !formData.phone) {
      alert('Please fill all shipping details')
      return false
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return false
    }
    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      alert('Please enter valid 6-digit pincode')
      return false
    }
    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      alert('Please enter valid 10-digit phone number')
      return false
    }
    return true
  }

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create Razorpay order
      const orderRes = await axios.post('/api/payment/create-order', {
        amount: getTotal() + 50
      })

      // Check if test mode
      if (orderRes.data.test_mode) {
        // Test mode - Skip Razorpay and directly create order
        const confirmTest = window.confirm(
          '⚠️ TEST MODE - Demo Payment\n\n' +
          'Razorpay is not configured with real keys.\n' +
          'This will create a test order without actual payment processing.\n\n' +
          'In production, real payment gateway will be used.\n\n' +
          'Click OK to proceed with demo order.'
        )

        if (!confirmTest) {
          setLoading(false)
          return
        }

        try {
          // Get affiliate code from session storage if exists
          const affiliateCode = getStoredAffiliateCode()
          
          // Create order directly
          const orderResponse = await axios.post('/api/orders', {
            items: cart,
            shippingAddress: formData,
            totalAmount: getTotal() + 50,
            paymentId: `demo_${Date.now()}`,
            orderId: orderRes.data.id,
            paymentMethod: 'demo',
            paymentStatus: 'completed',
            affiliateCode: affiliateCode || undefined
          })
          
          clearCart()
          navigate('/order-success', {
            state: {
              orderDetails: {
                orderId: orderResponse.data._id.slice(-8).toUpperCase(),
                totalAmount: orderResponse.data.totalAmount,
                paymentMethod: 'demo',
                city: formData.city
              }
            }
          })
        } catch (error) {
          console.error('Order creation error:', error)
          alert('❌ Error placing order: ' + (error.response?.data?.message || error.message))
        } finally {
          setLoading(false)
        }
        return
      }

      // Real Razorpay payment
      const options = {
        key: orderRes.data.key_id,
        amount: orderRes.data.amount,
        currency: 'INR',
        name: 'ClothesShop',
        description: 'Fashion Shopping',
        image: '/logo.png',
        order_id: orderRes.data.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        method: {
          netbanking: true,
          card: true,
          wallet: true,
          upi: true,
          paylater: true,
          cardless_emi: true
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: 'All payment methods',
                instruments: [
                  {
                    method: 'upi',
                    flows: ['collect', 'qr', 'intent']
                  },
                  {
                    method: 'card'
                  },
                  {
                    method: 'netbanking'
                  },
                  {
                    method: 'wallet'
                  }
                ]
              }
            },
            sequence: ['block.banks'],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        theme: {
          color: '#3B82F6'
        },
        handler: async function (response) {
          try {
            // Verify payment
            const verifyRes = await axios.post('/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })

            if (verifyRes.data.success) {
              // Get affiliate code from session storage if exists
              const affiliateCode = getStoredAffiliateCode()
              
              // Create order in database
              const orderResponse = await axios.post('/api/orders', {
                items: cart,
                shippingAddress: formData,
                totalAmount: getTotal() + 50,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                paymentMethod: 'razorpay',
                paymentStatus: 'completed',
                affiliateCode: affiliateCode || undefined
              })
              
              clearCart()
              navigate('/order-success', {
                state: {
                  orderDetails: {
                    orderId: orderResponse.data._id.slice(-8).toUpperCase(),
                    totalAmount: orderResponse.data.totalAmount,
                    paymentMethod: 'razorpay',
                    city: formData.city
                  }
                }
              })
            } else {
              alert('❌ Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Order creation error:', error)
            alert('❌ Error placing order: ' + (error.response?.data?.message || error.message))
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            alert('Payment cancelled. Your cart items are still saved.')
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        setLoading(false)
        alert('❌ Payment failed: ' + response.error.description + '\n\nPlease try again.')
      })
      
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('❌ Payment initialization failed: ' + (error.response?.data?.message || error.message))
      setLoading(false)
    }
  }

  // Guest checkout allowed - no login required

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart first</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold w-full"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = 50
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-300'}`}>
                {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-24 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              /* Step 1: Shipping Address */
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-primary" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Order confirmation will be sent to this email</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Address *</label>
                    <textarea
                      name="address"
                      placeholder="House No, Building Name, Street, Area"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="6-digit pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        maxLength="6"
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleContinueToPayment}
                    className="w-full bg-primary text-white px-6 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg mt-6 transition"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Payment Method */
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-primary" />
                    Payment Method
                  </h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary hover:underline text-sm"
                  >
                    ← Edit Address
                  </button>
                </div>

                {/* Shipping Address Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">Delivering to:</p>
                  <p className="font-medium">{formData.address}</p>
                  <p className="text-sm text-gray-600">{formData.city}, {formData.state} - {formData.pincode}</p>
                  <p className="text-sm text-gray-600">Phone: {formData.phone}</p>
                </div>

                {/* Payment Options */}
                <div className="space-y-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-gray-700">Available options:</h3>
                  
                  {/* Main Payment Methods */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Cards */}
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer border border-blue-200">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-bold text-base text-gray-800 mb-1">Cards</span>
                      <span className="text-sm text-gray-600">Credit/Debit</span>
                    </div>
                    
                    {/* UPI */}
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer border border-purple-200">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-bold text-base text-gray-800 mb-1">UPI</span>
                      <span className="text-sm text-gray-600">All UPI Apps</span>
                    </div>
                    
                    {/* Netbanking */}
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer border border-green-200">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-bold text-base text-gray-800 mb-1">Netbanking</span>
                      <span className="text-sm text-gray-600">All Banks</span>
                    </div>
                    
                    {/* Wallets */}
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all cursor-pointer border border-orange-200">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                        <Wallet className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-bold text-base text-gray-800 mb-1">Wallets</span>
                      <span className="text-sm text-gray-600">Paytm, PhonePe</span>
                    </div>
                  </div>

                  {/* Popular UPI Apps */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                    <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center">
                      <Smartphone className="w-4 h-4 mr-2 text-purple-600" />
                      Popular UPI Apps
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                      {/* PhonePe */}
                      <div className="flex flex-col items-center p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-purple-100">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-2 shadow-md">
                          <span className="text-white font-bold text-lg">Pe</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">PhonePe</span>
                      </div>
                      
                      {/* Google Pay */}
                      <div className="flex flex-col items-center p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-blue-100">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mb-2 shadow-md">
                          <span className="text-white font-bold text-lg">G</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">Google Pay</span>
                      </div>
                      
                      {/* Paytm */}
                      <div className="flex flex-col items-center p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-blue-100">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-2 shadow-md">
                          <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">Paytm</span>
                      </div>
                      
                      {/* BHIM */}
                      <div className="flex flex-col items-center p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-orange-100">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-2 shadow-md">
                          <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">BHIM</span>
                      </div>
                      
                      {/* Amazon Pay */}
                      <div className="flex flex-col items-center p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-yellow-100">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-2 shadow-md">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">Amazon</span>
                      </div>
                      
                      {/* WhatsApp Pay */}
                      <div className="flex flex-col items-center p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer border border-green-100">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-2 shadow-md">
                          <span className="text-white font-bold text-lg">W</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  {/* Razorpay Badge */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary mr-2" />
                      <span className="font-semibold text-gray-700">Powered by Razorpay - 100% Secure Payment</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `🔒 Pay ₹${total} Securely`
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>100% Secure Payment • SSL Encrypted</span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
                {cart.map(item => {
                  const displayImage = (item.images && item.images.length > 0) 
                    ? item.images[0] 
                    : item.image

                  return (
                    <div key={`${item._id}-${item.size}`} className="flex items-center space-x-3 pb-3 border-b">
                      <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                        {displayImage && (
                          <img 
                            src={displayImage} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t-2">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>7 days easy return policy</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>100% secure payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
