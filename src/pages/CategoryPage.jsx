// src/pages/CategoryPage.jsx
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdCard from "../components/AdCard/AdCard"
import { mockAds, categories } from "../data/mockAds"
import "./CategoryPage.css"

function CategoryPage() {
  const { slug } = useParams()
  const [categoryAds, setCategoryAds] = useState([])
  const [category, setCategory] = useState(null)
  const [sortBy, setSortBy] = useState("recent")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    
    // Simulando chamada API
    setTimeout(() => {
      const cat = categories.find(c => c.slug === slug)
      setCategory(cat)

      let filtered = mockAds.filter(ad => ad.category === slug)
      
      // Ordenação
      if (sortBy === "recent") {
        filtered = filtered.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
      } else if (sortBy === "priceAsc") {
        filtered = filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy === "priceDesc") {
        filtered = filtered.sort((a, b) => b.price - a.price)
      }

      setCategoryAds(filtered)
      setLoading(false)
    }, 500)
  }, [slug, sortBy])

  if (!category) {
    return <div>Carregando...</div>
  }

  return (
    <div className="category-page">
      <div className="container">
        {/* Cabeçalho da categoria */}
        <div className="category-header">
          <div className="category-title">
            <span className="category-icon">{category.icon}</span>
            <h1>{category.name}</h1>
            <span className="category-count">{category.count} anúncios</span>
          </div>

          <div className="category-filters">
            <label>Ordenar por:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Mais recentes</option>
              <option value="priceAsc">Menor preço</option>
              <option value="priceDesc">Maior preço</option>
            </select>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; 
          <span>{category.name}</span>
        </div>

        {/* Lista de anúncios */}
        {loading ? (
          <div className="loading">Carregando anúncios...</div>
        ) : (
          <>
            {categoryAds.length === 0 ? (
              <div className="no-ads">
                <p>Nenhum anúncio encontrado nesta categoria.</p>
                <Link to="/anunciar" className="btn-primary">
                  Seja o primeiro a anunciar!
                </Link>
              </div>
            ) : (
              <div className="ads-grid">
                {categoryAds.map(ad => (
                  <AdCard key={ad.id} {...ad} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryPage