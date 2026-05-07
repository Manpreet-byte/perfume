import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ai from '../data/aiContent'
import perfumes from '../data/perfumes'
import images from '../data/images'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'
import SafeImage from '../components/SafeImage'
import { useCart } from '../contexts/CartContext'

export default function Home() {
  const { addItem } = useCart()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // idle | success
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSort, setFilterSort] = useState('all')

  useEffect(() => {
    document.title = `Home — ${ai.brandName}`
    const m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', ai.homeIntro.slice(0, 150))
  }, []);
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -40])

  const features = useMemo(() => ([
    { image: images[0], title: 'Premium Ingredients', description: 'Ethically sourced naturals and finest synthetics blended to perfection.' },
    { image: images[1], title: 'Sustainable Craft', description: 'Eco-conscious production with recyclable packaging and minimal environmental impact.' },
    { image: images[2], title: 'Long-lasting', description: 'Expert compositions designed for 8+ hours of luxurious fragrance presence.' },
    { image: images[3], title: 'Artistic Blends', description: 'Each scent tells a story, crafted by master perfumers with decades of expertise.' },
  ]), [])

  const testimonials = useMemo(() => ([
    { name: 'Priya S.', role: 'Fashion Enthusiast', rating: 5, quote: `Golden River's Royal Oud is my signature. The quality is unmatched at this price point.` },
    { name: 'Arjun K.', role: 'Luxury Collector', rating: 5, quote: `I've tried hundreds of perfumes. These are genuinely in the top tier. Phenomenal value.` },
    { name: 'Sophia M.', role: 'Wellness Expert', rating: 5, quote: 'The clean, artisanal approach resonates with my values. Truly a standout brand.' },
  ]), [])

  const clinicalStats = useMemo(() => ([
    { stat: '96%', description: 'Customers report 8+ hour fragrance longevity' },
    { stat: '98%', description: 'Would recommend to a friend or family member' },
    { stat: '100%', description: 'Natural ingredients, zero synthetic fillers' },
  ]), [])

  const certifications = useMemo(() => ([
    { name: 'Vegan', icon: '🌱' },
    { name: 'Cruelty-Free', icon: '✓' },
    { name: 'Sustainable', icon: '♻️' },
    { name: 'Paraben-Free', icon: 'PF' },
  ]), [])

  const featuredPerfumes = useMemo(() => perfumes.slice(0, 6), [])

  const allPerfumesFiltered = useMemo(() => {
    let filtered = perfumes
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        (p.notes && Array.isArray(p.notes) && p.notes.some(n => n.toLowerCase().includes(query)))
      )
    }
    if (filterSort === 'price-low') {
      filtered = [...filtered].sort((a, b) => parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, '')))
    } else if (filterSort === 'price-high') {
      filtered = [...filtered].sort((a, b) => parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, '')))
    }
    return filtered
  }, [searchQuery, filterSort])

  function handleNewsletterSubmit(e) {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterStatus('success')
    setNewsletterEmail('')
  }

  return (
    <PageTransition className="page home-page">
      <section className="hero-full">
        <div className="hero-full-stage">
          <img
            className="hero-full-image"
            src="https://eu.florislondon.com/cdn/shop/files/Second_Banner_Image_A_Rose_For....jpg?v=1752488230&width=1500"
            alt="Fragrance hero"
            loading="eager"
          />
          <h1 className="hero-full-headline">
            Unlock the power of <span>Fragrance</span>
          </h1>
        </div>

        <div className="brand-logos">
          <div className="logos-inner">
            <div className="brand-logo">Rolliage</div>
            <div className="brand-logo">QKE</div>
            <div className="brand-logo">KS</div>
            <div className="brand-logo">Maison</div>
            <div className="brand-logo">Lune</div>
          </div>
        </div>

        <div className="hero-categories">
          <Link to="/collection?gender=men" className="cat-tile cat-men">
            <div className="cat-caption">For Men</div>
            <div className="cat-cta">Shop Now</div>
          </Link>
          <Link to="/collection?gender=women" className="cat-tile cat-women">
            <div className="cat-caption">For Women</div>
            <div className="cat-cta">Shop Now</div>
          </Link>
        </div>
      </section>

      <section className="content-section featured-products">
        <div className="section-heading">
          <p className="section-label">Featured</p>
          <h2>Best sellers right now</h2>
        </div>

        <div className="browse-grid">
          {perfumes.slice(0, 3).map((perfume) => (
            <article key={perfume.slug} className="browse-product-card">
              <div className="browse-image-wrap">
                <SafeImage src={perfume.image} alt={perfume.name} className="browse-product-image" />
              </div>
              <div className="browse-product-info">
                <div className="browse-title-price">
                  <h3>{perfume.name}</h3>
                  <span className="browse-price">{perfume.price}</span>
                </div>
                <p className="browse-description">{perfume.shortDescription}</p>
                <div className="browse-actions">
                  <Link className="button button-primary button-small" to={`/collection/${perfume.slug}`}>
                    View Details
                  </Link>
                  <button className="button button-secondary button-small" onClick={() => addItem(perfume)}>
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="about-cta" style={{ justifyContent: 'center', marginTop: '1.25rem' }}>
          <Link className="button button-secondary" to="/collection">Explore more</Link>
        </div>
      </section>

      <section className="content-section why-us-section">
        <div className="section-heading">
          <p className="section-label">Our Promise</p>
          <h2>Why choose Golden River</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature, idx) => (
            <motion.article key={idx} className="feature-card glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
              <div className="feature-icon" aria-hidden="true">
                {feature.image ? <SafeImage src={feature.image} alt="" aria-hidden="true" loading="lazy" /> : null}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section story-section">
        <div className="split-layout">
          <motion.div className="section-copy" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2>Our Story</h2>
            <p>Golden River was born from a passion for creating fragrances that transcend trends. Founded by master perfumers and scent enthusiasts, our brand honors traditional perfumery techniques while embracing modern innovation.</p>
            <p>Every bottle tells a story of dedication, artistry, and an unwavering commitment to quality. We believe luxury shouldn't be compromised—which is why we've made it our mission to deliver premium fragrances at accessible prices.</p>
            <p>From intimate moments to grand celebrations, our scents become part of your personal narrative.</p>
            <div className="about-cta">
              <Link className="button button-secondary" to="/about">Read Our Story</Link>
            </div>
          </motion.div>
          <motion.div className="section-media" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <SafeImage src={images[3] || '/images/tf-black-orchid.jpg'} fallbackSrc="/images/tf-black-orchid.jpg" alt="Perfume bottle on a dark background" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="content-section ai-finder-section">
        <div className="split-layout">
          <motion.div className="section-copy" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="section-label">Scent Finder</p>
            <h2>AI-Powered Fragrance Discovery</h2>
            <p>Our proprietary scent algorithm analyzes your preferences—mood, season, occasion, and skin chemistry—to recommend your perfect fragrance in seconds.</p>
            <p>Based on 10,000+ customer data points and master perfumer insights, find your signature scent with precision.</p>
            <div className="about-cta">
              <Link className="button button-primary" to="/collection">Start Scent Quiz</Link>
            </div>
          </motion.div>
          <motion.div className="ai-stats" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="stat-box glass-card">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Data Points Analyzed</div>
            </div>
            <div className="stat-box glass-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Match Accuracy</div>
            </div>
            <div className="stat-box glass-card">
              <div className="stat-number">30s</div>
              <div className="stat-label">To Find Perfect Scent</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="content-section clinical-section">
        <div className="section-heading">
          <p className="section-label">Clinical Trust</p>
          <h2>Proven Efficacy</h2>
        </div>
        <div className="clinical-grid">
          {clinicalStats.map((item, idx) => (
            <motion.div key={idx} className="clinical-card glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
              <div className="clinical-stat">{item.stat}</div>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-section testimonials-section">
        <div className="section-heading">
          <p className="section-label">Loved by Many</p>
          <h2>What our customers say</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, idx) => (
            <motion.article key={idx} className="testimonial-card glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
              <div className="stars" style={{ marginBottom: '0.8rem' }}>
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p className="quote-mark">"</p>
              <p>{testimonial.quote}</p>
              <strong>{testimonial.name}</strong>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{testimonial.role}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section certifications-section">
        <div className="section-heading">
          <p className="section-label">Our Commitment</p>
          <h2>Certified & Verified</h2>
        </div>
        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <motion.div key={cert.name} className="cert-card glass-card" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
              <div className="cert-icon">{cert.icon}</div>
              <p>{cert.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-section promo-banner">
        <motion.div className="promo-content" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="promo-text">
            <p className="promo-label">Limited Time Offer</p>
            <h2>Get ₹500 off on your first purchase over ₹2,500</h2>
            <p>Use code: <strong>GOLDENRIVER500</strong></p>
          </div>
          <Link className="button button-primary" to="/collection">Shop Now</Link>
        </motion.div>
      </section>

      <section className="content-section newsletter-section">
        <motion.div className="newsletter-content" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2>Join Our Community</h2>
          <p>Get exclusive offers, new launches, and fragrance tips delivered to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button className="button button-primary" type="submit">
              Subscribe
            </button>
          </form>
          {newsletterStatus === 'success' ? (
            <p style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: '1rem' }}>Thanks — you&apos;re on the list.</p>
          ) : (
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '1rem' }}>We respect your privacy. Unsubscribe at any time.</p>
          )}
        </motion.div>
      </section>

      <section className="content-section cta-section">
        <motion.div className="cta-content" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2>Find Your Signature Scent</h2>
          <p>Explore our full collection and discover the fragrance that speaks to your story.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link className="button button-primary" to="/collection">Browse All Perfumes</Link>
            <Link className="button button-secondary" to="/contact">Get a Recommendation</Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
