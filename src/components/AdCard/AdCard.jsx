// src/components/AdCard/AdCard.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AdCard.css"

function AdCard({ 
  id,
  title, 
  price, 
  priceFormatted,
  image = "https://placehold.co/600x400/cccccc/white?text=Sem+Imagem",
  location = "Itagi",
  featured = false,
  views = 0,
  category,
  onClick
}) {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleClick = () => {
    if (onClick) {
      onClick(id)
    } else {
      navigate(`/anuncio/${id}`)
    }
  }

  // Imagem de fallback caso a original não carregue
  const imageSrc = imageError 
    ? "https://placehold.co/600x400/cccccc/white?text=Imagem+Indisponível" 
    : image

  return (
    <div 
      className={`ad-card ${featured ? 'featured' : ''}`} 
      onClick={handleClick}
    >
      <div className="ad-card-image-container">
        <img 
          src={imageSrc}
          alt={title}
          onError={handleImageError}
          loading="lazy"
        />
        {featured && (
          <span className="ad-card-badge">🌟 Destaque</span>
        )}
      </div>

      <div className="ad-card-content">
        <h3 className="ad-card-title">{title}</h3>
        
        <div className="ad-card-price-container">
          <span className="ad-card-price">{priceFormatted || price}</span>
          {views > 0 && (
            <span className="ad-card-views">👁️ {views}</span>
          )}
        </div>

        <div className="ad-card-footer">
          <span className="ad-card-location">📍 {location}</span>
        </div>
      </div>
    </div>
  )
}

export default AdCard