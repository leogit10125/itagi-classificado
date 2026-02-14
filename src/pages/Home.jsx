// src/pages/Home.jsx
import { useState, useEffect } from "react"
import Hero from "../components/Hero/Hero"
import Categories from "../components/Categories/Categories"
import AdsCarousel from "../components/AdsCarousel/AdsCarousel"
import AdCard from "../components/AdCard/AdCard"
import { mockAds } from "../data/mockAds"
import "./Home.css"

function Home() {
  const [featuredAds, setFeaturedAds] = useState([])
  const [recentAds, setRecentAds] = useState([])

  useEffect(() => {
    // Pega TODOS os anúncios para o carrossel
    const featured = mockAds
    
    // Pega os 8 mais recentes para a grade
    const recent = [...mockAds].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 8)

    setFeaturedAds(featured)
    setRecentAds(recent)
  }, [])

  return (
    <>
      <Hero />
      <Categories />
      
      <section className="home-section">
        <div className="container">
          <h2 className="section-title">🔥 Destaques da semana</h2>
          <AdsCarousel ads={featuredAds} />
        </div>
      </section>

      <section className="home-section bg-light">
        <div className="container">
          <h2 className="section-title">📦 Anúncios recentes</h2>
          <div className="ads-grid">
            {recentAds.map(ad => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home