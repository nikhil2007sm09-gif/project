import { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { migrateGuestWishlist } from '../utils/wishlistUtils'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me')
      console.log('User data:', res.data)
      setUser(res.data)
    } catch (error) {
      console.error('Fetch user error:', error)
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password, userType = 'customer') => {
    try {
      const res = await api.post('/auth/login', { email, password, userType })
      localStorage.setItem('token', res.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      setUser(res.data.user)
      
      // Migrate guest wishlist to user account
      setTimeout(() => {
        migrateGuestWishlist()
      }, 1000)
      
      return res.data
    } catch (error) {
      console.error('Login error:', error.response?.data)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData)
      localStorage.setItem('token', res.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      setUser(res.data.user)
      return res.data
    } catch (error) {
      console.error('Register error:', error.response?.data)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Call logout endpoint to track session
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout tracking error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('guestWishlist') // Clear guest wishlist on logout
      delete api.defaults.headers.common['Authorization']
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
