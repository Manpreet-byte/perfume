import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ai from '../data/aiContent'
import perfumes from '../data/perfumes'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'
import woodyIcon from '../assets/icons/woody.svg'
import floralIcon from '../assets/icons/floral.svg'
import freshIcon from '../assets/icons/fresh.svg'
import amberIcon from '../assets/icons/amber.svg'

function Filters({ query, category, onQueryChange, onCategoryChange }) {
  return (
    <div className="filters-bar">
      <input
        className="filters-search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search perfumes, notes, or ingredients"
      />
      <div className="filters-actions">
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">All</option>
          <option value="woody">Woody</option>
          <option value="floral">Floral</option>
          <option value="fresh">Fresh</option>
          <option value="amber">Amber</option>
        </select>
      </div>
    </div>
  )
}

export default function Products() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    document.title = `Collection — ${ai.brandName}`
    const m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', 'Explore our curated collection of luxury fragrances.')
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return perfumes.filter((p) => {
      if (category !== 'all') {
        const catMap = {
          woody: ['oud', 'cedar', 'sandalwood', 'patchouli'],
          floral: ['rose', 'jasmine', 'peony'],
          fresh: ['bergamot', 'lemon', 'grapefruit', 'sea'],
          amber: ['amber', 'tonka', 'vanilla'],
        }
        const needles = catMap[category] || []
        const foundNote = needles.some((n) => p.description.toLowerCase().includes(n))
        if (!foundNote) return false
      }

      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        Object.values(p.notes).flat().some((n) => n.toLowerCase().includes(q))
      )
    })
  }, [query, category])

  const priceRanges = [
    { range: 'Under ₹2,500', count: perfumes.filter(p => parseInt(p.price.replace(/[₹,]/g, '')) < 2500).length },
    { range: '₹2,500 - ₹4,000', count: perfumes.filter(p => { const pr = parseInt(p.price.replace(/[₹,]/g, '')); return pr >= 2500 && pr < 4000 }).length },
    { range: '₹4,000 - ₹6,000', count: perfumes.filter(p => { const pr = parseInt(p.price.replace(/[₹,]/g, '')); return pr >= 4000 && pr < 6000 }).length },
    { range: 'Above ₹6,000', count: perfumes.filter(p => parseInt(p.price.replace(/[₹,]/g, '')) >= 6000).length },
  ]

  const collectionTypes = [
    { key: 'woody', name: 'Woody', desc: 'Deep, earthy, and sophisticated', image: woodyIcon },
    { key: 'floral', name: 'Floral', desc: 'Elegant, romantic, and timeless', image: floralIcon },
    { key: 'fresh', name: 'Fresh', desc: 'Crisp, vibrant, and uplifting', image: freshIcon },
    { key: 'amber', name: 'Amber', desc: 'Warm, sensual, and luxurious', image: amberIcon },
  ]

  return (
    <PageTransition className="page products-page">
      <section className="content-section collection-hero">
        <motion.div className="collection-hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="section-label">Collection</p>
          <h1>Designer perfumes curated for you</h1>
          <p>Each fragrance is a journey—crafted to evoke emotion, memory, and individuality. Explore our collection of luxury scents.</p>
        </motion.div>
      </section>

      <section className="content-section collection-categories">
        <div className="section-heading">
          <p className="section-label">Explore by Type</p>
          <h2>Find your fragrance profile</h2>
        </div>
        <div className="collection-types-grid">
          {collectionTypes.map((type, idx) => (
            <motion.button
              key={type.name}
              type="button"
              className={`collection-type-card glass-card ${category === type.key ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              onClick={() => {
                setCategory(type.key)
                setQuery('')
                document.querySelector('.filters-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <div className="type-icon">
                <img src={type.image} alt="" aria-hidden="true" loading="lazy" />
              </div>
              <h3>{type.name}</h3>
              <p>{type.desc}</p>
              <span className="type-cta">Shop {type.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Browse</p>
          <h2>All fragrances ({filtered.length})</h2>
        </div>

        <Filters
          query={query}
          category={category}
          onQueryChange={(v) => setQuery(v)}
          onCategoryChange={(cat) => setCategory(cat)}
        />

        <div className="products-info">
          <p>Showing {filtered.length} fragrance{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="product-grid">
          {filtered.length > 0 ? (
            filtered.map((perfume) => (
              <motion.div key={perfume.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }}>
                <ProductCard perfume={perfume} />
              </motion.div>
            ))
          ) : (
            <motion.div className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <p>No fragrances match your search. Try adjusting your filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="content-section collection-price-guide">
        <div className="section-heading">
          <p className="section-label">Price Guide</p>
          <h2>Find fragrances in your budget</h2>
        </div>
        <div className="price-ranges">
          {priceRanges.map((item, idx) => (
            <motion.div
              key={item.range}
              className="price-range-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <div className="price-count">{item.count}</div>
              <p className="price-label">{item.range}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-section collection-cta">
        <motion.div className="collection-cta-content" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2>Can't decide?</h2>
          <p>Take our fragrance quiz or schedule a personalized consultation with our scent specialists.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <a href="#/contact" className="button button-primary">Get Recommendation</a>
            <a href="#/collection" className="button button-secondary">View All</a>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
