import { useEffect } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ai from '../data/aiContent'
import perfumes from '../data/perfumes'
import PageTransition from '../components/PageTransition'
import { useCart } from '../contexts/CartContext'
import SafeImage from '../components/SafeImage'

export default function ProductDetail() {
  const { slug } = useParams()
  const perfume = perfumes.find((item) => item.slug === slug)

  const { addItem } = useCart()

  useEffect(() => {
    if (perfume) {
      document.title = `${perfume.name} — ${ai.brandName}`
      const m = document.querySelector('meta[name="description"]')
      if (m) m.setAttribute('content', perfume.description)
    }
  }, [perfume])

  if (!perfume) return <Navigate to="/collection" replace />

  return (
    <PageTransition className="page product-detail-page">
      <section className="content-section split-layout product-detail-layout">
        <motion.div className="section-media glass-card product-detail-visual" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SafeImage src={perfume.image} alt={perfume.name} />
        </motion.div>

        <motion.div className="section-copy product-detail-copy" initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}>
          <p className="section-label">Signature Collection</p>
          <h2>{perfume.name}</h2>
          <p>{perfume.description}</p>

          <div className="detail-notes">
            <div>
              <span>Top Notes</span>
              <p>{perfume.notes.top.join(', ')}</p>
            </div>
            <div>
              <span>Middle Notes</span>
              <p>{perfume.notes.middle.join(', ')}</p>
            </div>
            <div>
              <span>Base Notes</span>
              <p>{perfume.notes.base.join(', ')}</p>
            </div>
          </div>

          <div className="product-detail-buy">
            <strong>{perfume.price}</strong>
            <div className="hero-actions">
                <button className="button button-primary" type="button" onClick={() => addItem(perfume)}>
                  Add to Cart
                </button>
              <Link className="button button-secondary" to="/collection">
                Back to Collection
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
