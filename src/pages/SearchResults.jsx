// src/pages/SearchResults.jsx
import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import AdCard from "../components/AdCard/AdCard"
import { mockAds } from "../data/mockAds"
import "./SearchResults.css"

function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    
    // Simular delay de busca
    setTimeout(() => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      // Busca em vários campos
      const searchResults = mockAds.filter(ad => {
        const searchTerm = query.toLowerCase()
        return (
          ad.title.toLowerCase().includes(searchTerm) ||
          ad.description.toLowerCase().includes(searchTerm) ||
          ad.categoryName.toLowerCase().includes(searchTerm) ||
          ad.location.toLowerCase().includes(searchTerm)
        )
      })

      setResults(searchResults)
      setLoading(false)
    }, 300)
  }, [query])

  return (
    <div className="search-results-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; 
          <span>Busca por: "{query}"</span>
        </div>

        <div className="search-header">
          <h1>Resultados da busca</h1>
          <p className="search-info">
            {loading ? "Buscando..." : `${results.length} anúncios encontrados`}
          </p>
        </div>

        {loading ? (
          <div className="loading">Carregando resultados...</div>
        ) : (
          <>
            {results.length === 0 ? (
              <div className="no-results">
                <p>Nenhum anúncio encontrado para "{query}"</p>
                <p>Sugestões:</p>
                <ul>
                  <li>Verifique a ortografia</li>
                  <li>Tente termos mais genéricos</li>
                  <li>Navegue por categorias</li>
                </ul>
                <Link to="/" className="btn-primary">
                  Voltar para página inicial
                </Link>
              </div>
            ) : (
              <div className="results-grid">
                {results.map(ad => (
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

export default SearchResults