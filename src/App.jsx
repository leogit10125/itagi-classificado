// src/App.jsx
import { Routes, Route } from "react-router-dom"
import Menu from "./components/Menu/Menu"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import AdDetail from "./pages/AdDetail"
import Anunciar from "./pages/Anunciar"
import SearchResults from "./pages/SearchResults"  // ← IMPORTAR

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:slug" element={<CategoryPage />} />
        <Route path="/anuncio/:id" element={<AdDetail />} />
        <Route path="/anunciar" element={<Anunciar />} />
        <Route path="/buscar" element={<SearchResults />} />  {/* ← NOVA ROTA */}
      </Routes>
    </>
  )
}

export default App