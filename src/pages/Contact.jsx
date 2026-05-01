import ai from '../data/aiContent'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

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

  return (
    <PageTransition className="page contact-page">
      <section className="content-section contact-section">
        <motion.div className="section-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="section-label">Contact</p>
          <h2>Get in touch</h2>
          <p>Send us an enquiry and our team will reply shortly. For direct orders call +91 12345 67890.</p>
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
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button button-primary" type="submit">Enquire Now</button>
          {sent && <p className="form-note">Mail client opened. If nothing appears, copy the message and email us at hello@goldenriverperfume.com</p>}
        </motion.form>
      </section>
    </PageTransition>
  )
}
