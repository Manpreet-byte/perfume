import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/collection', label: 'Collection' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="topbar">
      <Link className="brand-mark" to="/">
        Golden River Perfumes
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}