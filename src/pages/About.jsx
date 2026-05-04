import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ai from '../data/aiContent'
import PageTransition from '../components/PageTransition'
import SafeImage from '../components/SafeImage'

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
    { q: 'Do you offer samples?', a: 'Yes! Sample sets and discovery kits are available. Perfect for finding your signature scent before committing to a full bottle.' },
    { q: 'Are your fragrances vegan and cruelty-free?', a: 'Yes. All our fragrances are 100% vegan and never tested on animals. We partner with ethical suppliers.' },
    { q: "What's your return policy?", a: 'We offer 30-day returns on unopened products. Opened fragrances can be exchanged within 14 days if unsatisfied.' },
  ]

  const timeline = [
    { year: '2018', title: 'The Beginning', desc: 'Golden River was founded by a collective of master perfumers with 50+ years of combined expertise.' },
    { year: '2019', title: 'First Launch', desc: 'Debuted with 6 signature collections, each designed to evoke emotion and memory.' },
    { year: '2021', title: 'Sustainability Focus', desc: 'Transitioned to 100% recyclable packaging and ethical ingredient sourcing.' },
    { year: '2023', title: 'Global Reach', desc: 'Expanded to 15+ countries with boutique retailers and online presence.' },
    { year: '2024', title: 'Awards Recognition', desc: 'Received "Best Indie Fragrance Brand" from International Perfume Society.' },
    { year: '2025', title: 'Innovation', desc: 'Launched bespoke fragrance creation service and limited-edition collaborations.' },
  ]

  const team = [
    {
      name: 'Aisha Patel',
      role: 'Master Perfumer & Founder',
      bio: '30 years in luxury fragrance, trained in Grasse.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yyAZTQqTzX_FtrCl6WjmI57C31cYROwTzQ&s',
    },
    {
      name: 'Ravi Singh',
      role: 'Head of Sourcing',
      bio: 'Ethical supplier relationships across 20+ countries.',
      image: 'https://cmscritic.com/ms-content/uploads/2025/12/ravi-singh.jpg',
    },
    {
      name: 'Sophia Desai',
      role: 'Creative Director',
      bio: 'Brand storyteller and packaging innovator.',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQGI9T81_J7epg/profile-displayphoto-scale_200_200/B56ZnVJzEbI0AY-/0/1760217740762?e=2147483647&v=beta&t=EaO8VDf99KX77aMQ0DMS1SiuV9Ng8Xm0KG8a3tu4hL8',
    },
  ]

  return (
    <PageTransition className="page about-page">
      <section className="content-section split-layout">
        <motion.div className="section-media glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SafeImage
            src="https://cdn.shopify.com/s/files/1/0629/1154/5552/files/perfume-bottles-surrounded-by-flowers_480x480.jpg?v=1723280049"
            fallbackSrc="/images/about-luxury.svg"
            alt="Perfume bottles surrounded by flowers"
            loading="lazy"
          />
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

      <section className="content-section about-timeline">
        <div className="section-heading">
          <p className="section-label">Timeline</p>
          <h2>Our journey so far</h2>
        </div>
        <div className="timeline-container">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.year}
              className="timeline-item glass-card"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-section about-team">
        <div className="section-heading">
          <p className="section-label">People</p>
          <h2>Meet the craftspeople behind Golden River</h2>
        </div>
        <div className="team-grid">
          {team.map((member, idx) => (
            <motion.article
              key={member.name}
              className="glass-card team-member"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
                  <div className="member-avatar">
                {member.image ? (
                  <SafeImage src={member.image} fallbackSrc="/ai-images/ai-placeholder.svg" alt={member.name} loading="lazy" />
                ) : (
                  <div className="avatar-placeholder">{member.name.charAt(0)}</div>
                )}
                  </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section about-commitment">
        <div className="section-heading">
          <p className="section-label">Our Commitment</p>
          <h2>Sustainability & Ethics</h2>
        </div>
        <div className="commitment-grid">
          <motion.div className="commitment-card glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3>🌱 Sustainable Sourcing</h3>
            <p>We partner with farmers and suppliers who practice sustainable agriculture and fair trade. Every ingredient is traceable and responsibly harvested.</p>
          </motion.div>
          <motion.div className="commitment-card glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h3>♻️ Zero Waste Packaging</h3>
            <p>100% recyclable bottles and packaging. We're working towards carbon neutrality by 2026 and offset all shipping emissions.</p>
          </motion.div>
          <motion.div className="commitment-card glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3>💚 Community Support</h3>
            <p>1% of all profits go to environmental conservation projects and fragrance education programs in underserved communities.</p>
          </motion.div>
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
