import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="brand-mark footer-brand">Golden River Perfumes</div>
        <p>Luxury fragrances with a modern, minimal sensibility.</p>
      </div>

      <div className="footer-links">
        <Link to="/about">Our Story</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-contact">
        <a href="mailto:hello@goldenriverperfumes.com">hello@goldenriverperfumes.com</a>
        <a href="tel:+911234567890">+91 12345 67890</a>
        <p>© 2026 Golden River Perfumes. All rights reserved.</p>
      </div>
    </footer>
  )
}