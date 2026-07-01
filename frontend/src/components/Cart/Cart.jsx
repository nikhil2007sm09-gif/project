import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { CartContext } from '../../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-primary hover:underline">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          {cart.map(item => {
            // Get display image from images array or fallback to image field
            const displayImage = (item.images && item.images.length > 0) 
              ? item.images[0] 
              : item.image

            return (
              <div key={`${item._id}-${item.size}`} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center">
                <div className="w-24 h-24 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {displayImage ? (
                    <img 
                      src={displayImage} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-primary font-bold">₹{item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, item.size, parseInt(e.target.value))}
                    className="border rounded px-2 py-1 w-16"
                  />
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹50</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{getTotal() + 50}</span>
              </div>
            </div>
            <Link to="/checkout" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 block text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
