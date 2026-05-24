// src/hooks/useScrollReveal.js
import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean `inView`.
 * Attach ref to a DOM element to detect when it enters viewport.
 */
export function useScrollReveal(options = {}) {
  const ref     = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Once revealed, stop observing
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
