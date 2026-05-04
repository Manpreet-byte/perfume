import ai from '../data/aiContent'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import images from '../data/images'
import emailIcon from '../assets/icons/email.svg'
import phoneIcon from '../assets/icons/phone.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import locationIcon from '../assets/icons/location.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import facebookIcon from '../assets/icons/facebook.svg'
import tiktokIcon from '../assets/icons/tiktok.svg'
import youtubeIcon from '../assets/icons/youtube.svg'

export default function Contact() {
  useEffect(() => {
    document.title = `Contact — ${ai.brandName}`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', 'Get in touch with Golden River Perfume — inquiries, stockists, and bespoke orders.');
  }, []);
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const message = form.get('message')
    // Mailto fallback
    const subject = encodeURIComponent('Enquiry from ' + name)
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')
    window.location.href = `mailto:hello@goldenriverperfume.com?subject=${subject}&body=${body}`
    setSent(true)
    e.currentTarget.reset()
  }

  const contactChannels = [
    { image: emailIcon, title: 'Email', desc: 'hello@goldenriverperfume.com', action: 'mailto:hello@goldenriverperfume.com' },
    { image: phoneIcon, title: 'Phone', desc: '+91 12345 67890', action: 'tel:+911234567890' },
    { image: whatsappIcon, title: 'WhatsApp', desc: 'Chat with us live', action: 'https://wa.me/911234567890' },
    { image: locationIcon, title: 'Visit', desc: 'Mumbai, India', action: '#' },
  ]

  const locations = [
    { city: 'Mumbai', address: '123 Perfume Lane, Fort, Mumbai 400001', hours: 'Mon-Sat: 11am-7pm', phone: '+91 22 1234 5678' },
    { city: 'Bangalore', address: '456 Fragrance Street, Indiranagar, Bangalore 560038', hours: 'Tue-Sun: 12pm-8pm', phone: '+91 80 1234 5678' },
    { city: 'Delhi', address: '789 Scent Avenue, Khan Market, New Delhi 110003', hours: 'Mon-Sat: 10am-6pm', phone: '+91 11 1234 5678' },
  ]

  const socialLinks = [
    { name: 'Instagram', image: instagramIcon, url: 'https://instagram.com/goldenriverperfume' },
    { name: 'Facebook', image: facebookIcon, url: 'https://facebook.com/goldenriverperfume' },
    { name: 'TikTok', image: tiktokIcon, url: 'https://tiktok.com/@goldenriverperfume' },
    { name: 'YouTube', image: youtubeIcon, url: 'https://youtube.com/@goldenriverperfume' },
  ]

  const faqs = [
    { q: 'How long does delivery take?', a: 'Standard delivery within India takes 5-7 business days. Express delivery (2-3 days) is available in metro areas.' },
    { q: 'Can I visit a store?', a: 'Yes! We have boutique stores in Mumbai, Bangalore, and Delhi. Check store hours and schedule a visit.' },
    { q: 'Do you offer gift wrapping?', a: 'Absolutely. Premium gift wrapping is complimentary on orders above ₹5,000.' },
    { q: 'Can I order samples?', a: 'Yes, sample sets of 5 fragrances are available for ₹499. Perfect for discovery.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. COD available in select areas.' },
    { q: 'Is there a loyalty program?', a: 'Yes! Join our VIP club to earn points, get early access to launches, and exclusive discounts.' },
  ]

  return (
    <PageTransition className="page contact-page">
      <section className="contact-hero">
        <motion.div className="contact-hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="section-label">Get in Touch</p>
          <h1>We'd love to hear from you</h1>
          <p>Have questions, need recommendations, or want to collaborate? Reach out to us through any channel.</p>
        </motion.div>
      </section>

      <section className="content-section contact-channels">
        <div className="section-heading">
          <p className="section-label">Contact Us</p>
          <h2>Multiple ways to reach us</h2>
        </div>
        <div className="channels-grid">
          {contactChannels.map((channel, idx) => (
            <motion.a
              key={channel.title}
              href={channel.action}
              className="channel-card glass-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <div className="channel-icon">
                {channel.image ? <img src={channel.image} alt={channel.title} loading="lazy" /> : null}
              </div>
              <h3>{channel.title}</h3>
              <p>{channel.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="content-section split-layout">
        <motion.div className="section-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="section-label">Direct Message</p>
          <h2>Send us an enquiry</h2>
          <p>Fill out the form and our team will respond within 24 hours. For urgent matters, call us directly.</p>
        </motion.div>

        <motion.form className="contact-form glass-card" onSubmit={handleSubmit} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <label>
            Name
            <input name="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Subject
            <input name="subject" placeholder="e.g., Custom fragrance, Wholesale inquiry" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button button-primary" type="submit">Send Message</button>
          {sent && <p className="form-note">✓ Mail client opened. Your message is being sent.</p>}
        </motion.form>
      </section>

      <section className="content-section contact-locations">
        <div className="section-heading">
          <p className="section-label">Locations</p>
          <h2>Visit our boutique stores</h2>
        </div>
        <div className="locations-grid">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.city}
              className="location-card glass-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <h3>📍 {loc.city}</h3>
              <p className="location-address">{loc.address}</p>
              <div className="location-detail">
                <strong>Hours:</strong> {loc.hours}
              </div>
              <div className="location-detail">
                <strong>Phone:</strong> <a href={`tel:${loc.phone}`}>{loc.phone}</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="content-section contact-social">
        <div className="section-heading">
          <p className="section-label">Follow Us</p>
          <h2>Join our community on social media</h2>
        </div>
        <div className="social-links-grid">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="social-link-card glass-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
            >
              <span className="social-icon">{social.image ? <img src={social.image} alt={social.name} loading="lazy" /> : social.icon}</span>
              <p>{social.name}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="content-section contact-faq">
        <div className="section-heading">
          <p className="section-label">FAQ</p>
          <h2>Common questions</h2>
        </div>
        <div className="faq-items-grid">
          {faqs.map((item, idx) => (
            <motion.details
              key={item.q}
              className="glass-card faq-item"
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

      <section className="content-section contact-newsletter">
        <motion.div className="newsletter-card glass-card" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for new launches, exclusive offers, and fragrance tips.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="button button-primary">Subscribe</button>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
