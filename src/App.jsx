import { AnimatePresence } from 'framer-motion'
import { HashRouter, Navigate, Route, Routes, useLocation, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import Chatbot from './components/Chatbot'
import VoiceAvatar from './components/VoiceAvatar'
import CartDrawer from './components/CartDrawer'
import { CartProvider, useCart } from './contexts/CartContext'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Products />} />
        <Route path="/collection/:slug" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  function Header({ onOpen }) {
    const { count } = useCart()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
      setMobileOpen(false)
    }, [location.pathname])

    return (
      <header className="topbar">
        <div className="topbar-inner grid-topbar">
          <button className={`hamburger ${mobileOpen ? 'open' : ''}`} aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((s) => !s)}>
            <span />
            <span />
            <span />
          </button>

          <NavLink to="/" className="brand-mark logo" onClick={() => setMobileOpen(false)} aria-label="Golden River Perfumes">
            <img src="/images/brand-logo.jpg" alt="Golden River Perfumes" />
          </NavLink>

          <nav className={`nav-left ${mobileOpen ? 'open' : ''}`} aria-label="Primary">
            <NavLink to="/" end onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
            <NavLink to="/collection" onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Collection</NavLink>
            <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
          </nav>

          <div className="nav-right">
            <div className="search-wrap">
              <input className="search-input" placeholder="Search" aria-label="Search" />
            </div>
            <button className="icon cart" aria-label="Cart" onClick={onOpen}>
              🛒{count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>
        </div>

        {mobileOpen && <button className="nav-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      </header>
    )
  }

  return (
    <HashRouter>
      <CartProvider>
        <div className="site-shell">
          <Header onOpen={() => setCartOpen(true)} />

          <AnimatedRoutes />

          <footer className="footer">
            <div>
              <div className="brand-mark footer-brand">Golden River Perfumes</div>
              <p>Luxury fragrances with a modern, minimal sensibility.</p>
            </div>

            <div className="footer-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </div>

            <div className="footer-contact">
              <a href="mailto:hello@goldenriverperfume.com">hello@goldenriverperfume.com</a>
              <a href="tel:+911234567890">+91 12345 67890</a>
              <p>© 2026 Golden River Perfumes. All rights reserved.</p>
            </div>
          </footer>

          <div className="ai-assistant-dock" aria-label="AI Shopping Assistants">
            <div className="ai-assistant-label">AI Shopping Assistants</div>
            <div className="ai-assistant-actions">
              <Chatbot />
              <VoiceAvatar text={'Welcome to Golden River Perfume. How can I assist you today?'} />
            </div>
          </div>

          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </CartProvider>
    </HashRouter>
  )
}
