import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ai from '../data/aiContent'
import perfumes from '../data/perfumes'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'

function Filters({ value, onChange }) {
  return (
    <div className="filters-bar">
      <input className="filters-search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search perfumes, notes, or ingredients" />
      <div className="filters-actions">
        <select onChange={(e) => onChange(value, e.target.value)} defaultValue="all">
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

  return (
    <PageTransition className="page products-page">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Collection</p>
          <h2>Designer perfumes curated for you</h2>
        </div>

        <Filters value={query} onChange={(v, cat) => { setQuery(v); if (cat) setCategory(cat) }} />

        <div className="product-grid">
          {filtered.map((perfume) => (
            <motion.div key={perfume.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45 }}>
              <ProductCard perfume={perfume} />
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
