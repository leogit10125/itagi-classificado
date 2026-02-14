// src/components/AdsCarousel/AdsCarousel.jsx
import { useRef, useEffect, useState, useCallback } from "react"
import AdCard from "../AdCard/AdCard"
import "./AdsCarousel.css"

function AdsCarousel({ ads = [] }) {  // ← RECEBE ADS COMO PROP
  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const getCardWidth = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel) return 240
    
    const card = carousel.querySelector(".ad-card")
    if (card) {
      const style = window.getComputedStyle(card)
      const marginRight = parseInt(style.marginRight) || 0
      return card.offsetWidth + marginRight
    }
    return 240
  }, [])

  const scrollToIndex = useCallback((index) => {
    const carousel = carouselRef.current
    if (!carousel) return
    
    const cardWidth = getCardWidth()
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    })
    setActiveIndex(index)
  }, [getCardWidth])

  useEffect(() => {
    if (ads.length === 0) return
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        
        if (nextIndex < ads.length) {
          scrollToIndex(nextIndex)
          return nextIndex
        } else {
          scrollToIndex(0)
          return 0
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [scrollToIndex, ads.length])

  if (ads.length === 0) {
    return null
  }

  return (
    <section className="carousel-section">
      <div className="carousel" ref={carouselRef}>
        {ads.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>

      <div className="carousel-dots">
        {ads.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default AdsCarousel