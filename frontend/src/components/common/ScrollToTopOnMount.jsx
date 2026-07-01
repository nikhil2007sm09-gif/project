import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTopOnMount = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top whenever route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant scroll, no animation
    })
  }, [pathname]) // Runs every time pathname changes

  return null // This component doesn't render anything
}

export default ScrollToTopOnMount
