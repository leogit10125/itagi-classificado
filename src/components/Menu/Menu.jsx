import { useState, useEffect } from "react"
import "./Menu.css"

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Detectar mudança de tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setIsOpen(false) // Fecha menu em desktop
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="menu">
      <div className="menu-container">
        {/* Logo */}
        <div className="menu-logo">
          <a href="/">
            <h1>Itagi</h1>
            <span>Classificados</span>
          </a>
        </div>

        {/* Hamburger Button (visível só no mobile) */}
        {isMobile && (
          <button 
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Menu Items */}
        
        <ul className={`menu-items ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
          <li><a href="/" onClick={closeMenu}>Home</a></li>
          <li><a href="/categoria/vendas" onClick={closeMenu}>Vendas</a></li>
          <li><a href="/categoria/servicos" onClick={closeMenu}>Serviços</a></li>
          <li><a href="/categoria/imoveis" onClick={closeMenu}>Imóveis</a></li>
          <li><a href="/categoria/empregos" onClick={closeMenu}>Empregos</a></li>
          <li><a href="/categoria/veiculos" onClick={closeMenu}>Veículos</a></li>
          <li><a href="/categoria/eletronicos" onClick={closeMenu}>Eletrônicos</a></li>
          <li className="menu-button">
           <a href="/anunciar" className="btn-anunciar" onClick={closeMenu}>
           </a>
           
          </li>
        </ul>
      </div>

      {/* Overlay para mobile quando menu está aberto */}
      {isMobile && isOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  )
}

export default Menu