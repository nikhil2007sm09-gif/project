import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1, size = 'M') => {
    const existingItem = cart.find(item => item._id === product._id && item.size === size)
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === product._id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity, size }])
    }
    // Auto-open cart drawer when item is added
    setIsCartDrawerOpen(true)
  }

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item._id === productId && item.size === size)))
  }

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
    } else {
      setCart(cart.map(item =>
        item._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true)
  }

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false)
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotal,
      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer
    }}>
      {children}
    </CartContext.Provider>
  )
}
