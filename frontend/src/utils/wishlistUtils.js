// Wishlist utility functions

// Migrate guest wishlist to user account after login
export const migrateGuestWishlist = async () => {
  try {
    const token = localStorage.getItem('token')
    const guestWishlist = localStorage.getItem('guestWishlist')
    
    if (token && guestWishlist) {
      const wishlistItems = JSON.parse(guestWishlist)
      
      // Send each item to the API to like it for the logged-in user
      for (const product of wishlistItems) {
        try {
          await fetch(`http://localhost:5000/api/products/${product._id}/like`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        } catch (error) {
          console.error('Error migrating wishlist item:', error)
        }
      }
      
      // Clear guest wishlist after migration
      localStorage.removeItem('guestWishlist')
      console.log('Guest wishlist migrated to user account')
    }
  } catch (error) {
    console.error('Error migrating guest wishlist:', error)
  }
}

// Get combined wishlist count (for display purposes)
export const getWishlistCount = () => {
  const token = localStorage.getItem('token')
  
  if (token) {
    // For logged-in users, the count should come from the API
    // This is handled in the component state
    return 0
  } else {
    // For guest users, get from localStorage
    const guestWishlist = localStorage.getItem('guestWishlist')
    if (guestWishlist) {
      try {
        return JSON.parse(guestWishlist).length
      } catch (error) {
        return 0
      }
    }
    return 0
  }
}

// Check if product is in guest wishlist
export const isInGuestWishlist = (productId) => {
  const guestWishlist = localStorage.getItem('guestWishlist')
  if (guestWishlist) {
    try {
      const wishlistItems = JSON.parse(guestWishlist)
      return wishlistItems.some(item => item._id === productId)
    } catch (error) {
      return false
    }
  }
  return false
}