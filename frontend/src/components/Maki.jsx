import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Maki = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [position, setPosition] = useState({ x: 150, y: 150 })
  const [rotation, setRotation] = useState(0)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [isFlying, setIsFlying] = useState(true)
  const animationRef = useRef(null)
  const location = useLocation()

  // Messages for different pages
  const pageMessages = {
    '/': 'Welcome to our store! 🏠',
    '/products': 'Check out our amazing products! 🛍️',
    '/cart': 'Ready to checkout? 🛒',
    '/checkout': 'Almost there! Complete your order 💳',
    '/order-success': 'Yay! Order placed successfully! 🎉',
    '/about': 'Learn more about us! 📖',
    '/contact': 'Need help? Contact us! 📞',
    '/blog': 'Read our latest articles! 📝',
    '/profile': 'Manage your profile here! 👤',
    '/orders': 'Track your orders! 📦',
  }

  // Realistic flying animation - smooth curved path like real butterfly
  useEffect(() => {
    if (!isFlying) return

    let startTime = Date.now()
    let startPos = { ...position }
    let targetPos = { x: 0, y: 0 }
    let duration = 0

    const getNewTarget = () => {
      const maxX = window.innerWidth - 200
      const maxY = window.innerHeight - 200
      
      targetPos = {
        x: Math.max(150, Math.random() * maxX),
        y: Math.max(150, Math.random() * maxY)
      }
      
      const distance = Math.sqrt(
        Math.pow(targetPos.x - startPos.x, 2) + 
        Math.pow(targetPos.y - startPos.y, 2)
      )
      
      duration = Math.max(2000, Math.min(5000, distance * 3))
      startTime = Date.now()
      startPos = { ...position }
      
      // Calculate rotation based on direction
      const angle = Math.atan2(targetPos.y - startPos.y, targetPos.x - startPos.x)
      setRotation(angle * (180 / Math.PI))
    }

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease-in-out for smooth movement
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      
      // Add sine wave for realistic butterfly zigzag pattern
      const zigzag = Math.sin(progress * Math.PI * 4) * 30
      
      const newX = startPos.x + (targetPos.x - startPos.x) * easeProgress
      const newY = startPos.y + (targetPos.y - startPos.y) * easeProgress + zigzag
      
      setPosition({ x: newX, y: newY })
      
      if (progress >= 1) {
        getNewTarget()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    getNewTarget()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isFlying])

  // Show message when page changes
  useEffect(() => {
    const path = location.pathname
    const msg = pageMessages[path] || pageMessages[Object.keys(pageMessages).find(key => path.startsWith(key))] || 'Hello! 👋'
    
    setMessage(msg)
    setShowMessage(true)
    
    const timer = setTimeout(() => {
      setShowMessage(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 animate-bounce"
        title="Show Flying Butterfly"
      >
        <span className="text-4xl animate-pulse">🦋</span>
      </button>
    )
  }

  return (
    <>
      <div 
        className="fixed z-50 pointer-events-none will-change-transform"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          transition: 'none'
        }}
      >
        {showMessage && (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 pointer-events-none"
               style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}>
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl shadow-2xl px-5 py-3 relative animate-float">
              <p className="text-sm font-bold whitespace-nowrap drop-shadow-lg">
                {message}
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-500"></div>
            </div>
          </div>
        )}

        <div className="relative pointer-events-auto">
          <div className="relative" style={{ width: '80px', height: '80px' }}>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 animate-wing-left"
                 style={{
                   width: '35px',
                   height: '45px',
                   background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #8e44ad 100%)',
                   borderRadius: '50% 0% 50% 0%',
                   boxShadow: '0 0 20px rgba(255, 107, 157, 0.6)',
                   transformOrigin: 'right center'
                 }}>
              <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>
            </div>
            
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 animate-wing-right"
                 style={{
                   width: '35px',
                   height: '45px',
                   background: 'linear-gradient(225deg, #ff6b9d 0%, #c44569 50%, #8e44ad 100%)',
                   borderRadius: '0% 50% 0% 50%',
                   boxShadow: '0 0 20px rgba(255, 107, 157, 0.6)',
                   transformOrigin: 'left center'
                 }}>
              <div className="absolute inset-2 bg-gradient-to-bl from-white/40 to-transparent rounded-full"></div>
            </div>
            
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                 style={{
                   width: '8px',
                   height: '40px',
                   background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)',
                   borderRadius: '10px',
                   boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                 }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="absolute w-1 h-4 bg-gray-800 rounded-full transform -rotate-45 origin-bottom"></div>
                <div className="absolute w-1 h-4 bg-gray-800 rounded-full transform rotate-45 origin-bottom"></div>
              </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-2 h-2 bg-pink-400 rounded-full animate-sparkle-1" 
                   style={{ top: '10%', left: '20%' }}></div>
              <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-sparkle-2" 
                   style={{ top: '30%', right: '20%' }}></div>
              <div className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-sparkle-3" 
                   style={{ bottom: '20%', left: '30%' }}></div>
              <div className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full animate-sparkle-4" 
                   style={{ bottom: '30%', right: '30%' }}></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
          
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2"
               style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}>
            <button
              onClick={() => setIsFlying(!isFlying)}
              className="w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-xl flex items-center justify-center text-sm font-bold hover:scale-110 transition-all hover:shadow-2xl"
              title={isFlying ? "Pause Flying" : "Start Flying"}
            >
              {isFlying ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="w-9 h-9 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-xl flex items-center justify-center text-sm font-bold hover:scale-110 transition-all hover:shadow-2xl"
              title="Hide Butterfly"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wing-left {
          0%, 100% { transform: translateY(-50%) rotateY(0deg); }
          50% { transform: translateY(-50%) rotateY(-25deg); }
        }
        
        @keyframes wing-right {
          0%, 100% { transform: translateY(-50%) rotateY(0deg); }
          50% { transform: translateY(-50%) rotateY(25deg); }
        }
        
        @keyframes sparkle-1 {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1) translateY(-10px); }
        }
        
        @keyframes sparkle-2 {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1) translateY(-8px); }
        }
        
        @keyframes sparkle-3 {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1) translateY(-12px); }
        }
        
        @keyframes sparkle-4 {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1) translateY(-6px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-wing-left {
          animation: wing-left 0.15s ease-in-out infinite;
        }
        
        .animate-wing-right {
          animation: wing-right 0.15s ease-in-out infinite;
        }
        
        .animate-sparkle-1 {
          animation: sparkle-1 1.5s ease-in-out infinite;
        }
        
        .animate-sparkle-2 {
          animation: sparkle-2 1.8s ease-in-out infinite 0.2s;
        }
        
        .animate-sparkle-3 {
          animation: sparkle-3 1.6s ease-in-out infinite 0.4s;
        }
        
        .animate-sparkle-4 {
          animation: sparkle-4 2s ease-in-out infinite 0.6s;
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default Maki
