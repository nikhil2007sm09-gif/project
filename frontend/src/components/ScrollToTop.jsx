import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#45342B] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <style>{`
        @media (max-width: 768px) {
          .fixed.bottom-8.right-8 {
            bottom: 1.5rem;
            right: 1.5rem;
            padding: 0.75rem;
          }

          .fixed.bottom-8.right-8 svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
      `}</style>
    </>
  )
}

export default ScrollToTop
