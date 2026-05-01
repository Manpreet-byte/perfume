import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ai from '../data/aiContent'
import PageTransition from '../components/PageTransition'

export default function About() {
  useEffect(() => {
    document.title = `About — ${ai.brandName}`
    const m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', ai.aboutIntro.slice(0, 150))
  }, []);

  const values = [
    {
      title: 'Composition-first perfumery',
      copy: 'Every formula starts with balance: a clear opening, a defined heart, and a lingering base that stays elegant from first spray to dry-down.',
    },
    {
      title: 'Mindful sourcing',
      copy: 'We prioritize responsibly sourced materials and partners that value traceability, safety, and consistent quality.',
    },
    {
      title: 'Designed to be gifted',
      copy: 'Minimal, premium packaging with tactile details—built to look luxurious on a vanity and feel special in-hand.',
    },
  ]

  const faqs = [
    { q: 'How long do your fragrances last?', a: 'Longevity depends on skin type and climate, but our blends are designed to project cleanly and wear beautifully throughout the day.' },
    { q: 'Are your perfumes unisex?', a: 'Yes. We design by mood and character, not gender—choose the scent that feels most like you.' },
    { q: 'How should I store my perfume?', a: 'Keep bottles away from direct sunlight and heat. A cool, dry place helps preserve the top notes and overall clarity.' },
  ]

  return (
    <PageTransition className="page about-page">
      <section className="content-section split-layout">
        <motion.div className="section-media glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <img src="https://cdn.shopify.com/s/files/1/0629/1154/5552/files/perfume-bottles-surrounded-by-flowers_480x480.jpg?v=1723280049" alt="Perfume bottles surrounded by flowers" loading="lazy" />
        </motion.div>
        <motion.div className="section-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="section-label">Our Story</p>
          <h2>{ai.aboutHeading}</h2>
          <p>{ai.aboutParagraph1}</p>
          <p>{ai.aboutParagraph2}</p>
          <div className="about-cta">
            <Link className="button button-primary" to="/collection">Explore Collection</Link>
            <Link className="button button-secondary" to="/contact">Talk to Us</Link>
          </div>
        </motion.div>
      </section>

      <section className="content-section about-highlights">
        <div className="section-heading">
          <p className="section-label">What We Believe</p>
          <h2>Luxury, distilled into details</h2>
          <p className="section-subcopy">{ai.aboutIntro}</p>
        </div>

        <div className="about-gallery">
          <div className="glass-card about-gallery-item">
            <img src="https://static.vecteezy.com/system/resources/previews/056/778/264/non_2x/perfume-bottle-with-smoke-on-silk-background-closeup-luxury-perfume-bottle-photo.jpeg" alt="Fragrance bottle close-up" loading="lazy" />
          </div>
          <div className="glass-card about-gallery-item">
            <img src="https://thumbs.dreamstime.com/b/arabic-luxury-perfume-oils-display-shopping-mall-dubai-u-e-57957894.jpg" alt="Perfume on a luxury counter" loading="lazy" />
          </div>
        </div>

        <div className="about-stats">
          <div className="glass-card about-stat">
            <p className="about-stat-kicker">Focus</p>
            <p className="about-stat-value">Clean silhouettes</p>
            <p className="about-stat-copy">Modern compositions with a polished signature and a smooth dry-down.</p>
          </div>
          <div className="glass-card about-stat">
            <p className="about-stat-kicker">Craft</p>
            <p className="about-stat-value">Layered notes</p>
            <p className="about-stat-copy">Top, heart, base—built for clarity, depth, and steady projection.</p>
          </div>
          <div className="glass-card about-stat">
            <p className="about-stat-kicker">Finish</p>
            <p className="about-stat-value">Gift-ready</p>
            <p className="about-stat-copy">Packaging that looks premium, feels tactile, and elevates the ritual.</p>
          </div>
        </div>
      </section>

      <section className="content-section about-values">
        <div className="section-heading">
          <p className="section-label">Principles</p>
          <h2>How we create</h2>
        </div>

        <div className="feature-grid about-value-grid">
          {values.map((v, idx) => (
            <motion.article
              key={v.title}
              className="glass-card about-value-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
            >
              <h3>{v.title}</h3>
              <p>{v.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section about-faq">
        <div className="section-heading">
          <p className="section-label">FAQ</p>
          <h2>Quick answers</h2>
        </div>
        <div className="about-faq-grid">
          {faqs.map((item, idx) => (
            <motion.details
              key={item.q}
              className="glass-card about-faq-item"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
            >
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </motion.details>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
