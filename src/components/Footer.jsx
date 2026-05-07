import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" >
      <div className="footer-content">
        <div className="footer-column footer-brand-col">
          <div className="brand-mark footer-brand">Golden River</div>
          <p className="footer-tagline">Luxury fragrances crafted with precision and care.</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
              📷
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
              f
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok">
              ♫
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
              ▶
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4 className="footer-col-title">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/collection">Browse Collection</Link></li>
            <li><Link to="/collection">Best Sellers</Link></li>
            <li><a href="#/collection">Gift Sets</a></li>
            <li><a href="#/collection">New Arrivals</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-col-title">Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="#contact">FAQs</a></li>
            <li><a href="#shipping">Shipping & Returns</a></li>
            <li><a href="#track">Track Order</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Golden River</Link></li>
            <li><a href="#quality">Quality Promise</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press & Media</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Golden River Perfumes. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
          <span>•</span>
          <a href="#accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  )
}