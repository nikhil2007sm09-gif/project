import { useState, useEffect } from 'react'

const AnimatedCounter = ({ end, duration = 2000, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime = null
          const startValue = 0
          const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = startValue + (endValue - startValue) * easeOutQuart

            setCount(currentCount)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [end, duration, hasAnimated])

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <span id={`counter-${end}`}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

export default AnimatedCounter
export { AnimatedCounter }
