import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ai from '../data/aiContent'
import collections from '../data/collections'
import perfumes from '../data/perfumes'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'

export default function Home() {
  useEffect(() => {
    document.title = `Home — ${ai.brandName}`
    const m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', ai.homeIntro.slice(0, 150))
  }, []);
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -40])

  return (
    <PageTransition className="page home-page">
      <section className="hero-section large-hero">
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Premium fragrance house</p>
          <h1>{ai.brandName}</h1>
          <p className="hero-tagline">{ai.tagline}</p>
          <p className="hero-copy">{ai.homeIntro}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/collection">Shop Now</Link>
            <Link className="button button-secondary" to="/about">Explore Collection</Link>
          </div>
        </motion.div>
        <motion.div className="hero-visual" style={{ y }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <img src="https://storemzkr.com/cdn/shop/files/golden.png?v=1765804889&width=3840" alt="Luxury perfume" />
        </motion.div>
      </section>

      <section className="content-section collections-section">
        <div className="section-heading">
          <p className="section-label">Collections</p>
          <h2>Discover curated collections</h2>
        </div>

        <div className="collections-grid">
          {collections.map((c) => (
            <article key={c.slug} className="collection-card glass-card">
              <div className="cc-media">
                <img src={c.image} alt={c.title} />
              </div>
              <div className="cc-body">
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <a className="button button-secondary" href={`#/collection?cat=${c.slug}`}>Explore</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section featured-products">
        <div className="section-heading">
          <p className="section-label">Featured</p>
          <h2>Highlighted perfumes</h2>
        </div>
        <div className="featured-grid">
          {perfumes.slice(0, 6).map((p) => (
            <ProductCard key={p.slug} perfume={p} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
