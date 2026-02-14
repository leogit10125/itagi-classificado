// src/pages/Anunciar.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Anunciar.css"

function Anunciar() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    category: "vendas",
    price: "",
    description: "",
    location: "Itagi",
    name: "",
    phone: "",
    email: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você vai enviar para o backend depois
    console.log("Anúncio enviado:", formData)
    alert("Anúncio enviado com sucesso! (modo demonstração)")
    navigate("/")
  }

  return (
    <div className="anunciar-page">
      <div className="container">
        <h1>Criar novo anúncio</h1>
        <p className="subtitle">Preencha os dados abaixo para publicar seu anúncio</p>

        <form onSubmit={handleSubmit} className="anunciar-form">
          <div className="form-group">
            <label>Título do anúncio *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: iPhone 13 Pro 256GB"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="vendas">Vendas</option>
              <option value="servicos">Serviços</option>
              <option value="imoveis">Imóveis</option>
              <option value="empregos">Empregos</option>
              <option value="veiculos">Veículos</option>
              <option value="eletronicos">Eletrônicos</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preço *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ex: 3500"
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva seu produto ou serviço com detalhes..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Localização *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Centro, Itagi"
              required
            />
          </div>

          <h3>Dados de contato</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Seu nome *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: João Silva"
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(73) 99999-9999"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="joao@email.com"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate("/")}>
              Cancelar
            </button>
            <button type="submit" className="btn-enviar">
              Publicar anúncio
            </button>
          </div>

          <p className="form-note">* Campos obrigatórios</p>
        </form>
      </div>
    </div>
  )
}

export default Anunciar