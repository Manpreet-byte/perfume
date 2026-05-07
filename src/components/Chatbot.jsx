import { useState, useRef, useEffect } from 'react'
import VoiceAvatar from './VoiceAvatar'
import perfumes from '../data/perfumes'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello — I am the Golden River assistant. How can I help?' },
  ])
  const [input, setInput] = useState('')
  const [profile, setProfile] = useState({
    name: null,
    budget: null,
    category: null,
    occasion: null,
    notes: [],
  })

  const chatId = 'chatbot-window'
  const messagesRef = useRef(null)

  const pickOne = (items) => items[Math.floor(Math.random() * items.length)]

  const formatNotes = (notes = {}) => {
    const top = notes.top?.slice?.(0, 3)?.join(', ')
    const middle = notes.middle?.slice?.(0, 3)?.join(', ')
    const base = notes.base?.slice?.(0, 3)?.join(', ')
    const parts = []
    if (top) parts.push(`Top: ${top}`)
    if (middle) parts.push(`Heart: ${middle}`)
    if (base) parts.push(`Base: ${base}`)
    return parts.join(' • ')
  }

  const parseBudget = (text) => {
    // matches "₹4999", "4999", "under 5000", "below 5k"
    const normalized = text.replace(/,/g, '')
    const kMatch = normalized.match(/(?:under|below|upto|up to|around|approx)\s*₹?\s*(\d+(?:\.\d+)?)\s*k\b/i)
    if (kMatch) return Math.round(Number(kMatch[1]) * 1000)
    const match = normalized.match(/(?:under|below|upto|up to|around|approx|budget)\s*₹?\s*(\d{3,6})\b/i)
    if (match) return Number(match[1])
    const plain = normalized.match(/₹\s*(\d{3,6})\b/)
    if (plain) return Number(plain[1])
    return null
  }

  const parseCategory = (text) => {
    const t = text.toLowerCase()
    if (/(woody|wood|sandalwood|cedar|vetiver)/.test(t)) return 'woody'
    if (/(floral|rose|jasmine|orchid|peony)/.test(t)) return 'floral'
    if (/(fresh|aquatic|marine|citrus|summer|daytime)/.test(t)) return 'fresh'
    if (/(amber|vanilla|warm|spicy|cardamom|cinnamon)/.test(t)) return 'amber'
    if (/(oud|oriental|incense|resin|balsamic)/.test(t)) return 'oriental'
    if (/(musk|clean|skin scent|powdery)/.test(t)) return 'musk'
    return null
  }

  const parseOccasion = (text) => {
    const t = text.toLowerCase()
    if (/(office|work|daily|everyday)/.test(t)) return 'office'
    if (/(date|dinner|night|evening|party|club)/.test(t)) return 'night'
    if (/(wedding|festive|function|event)/.test(t)) return 'event'
    if (/(gym|sport|outdoor)/.test(t)) return 'active'
    return null
  }

  const extractNotes = (text) => {
    const t = text.toLowerCase()
    const candidates = [
      'vanilla', 'oud', 'rose', 'jasmine', 'citrus', 'bergamot', 'sandalwood', 'cedar',
      'musk', 'amber', 'leather', 'incense', 'patchouli', 'cardamom', 'cinnamon', 'tonka',
    ]
    return candidates.filter((n) => t.includes(n))
  }

  const findPerfumeByName = (text) => {
    const t = text.toLowerCase()
    return perfumes.find((p) => {
      const name = (p.name || '').toLowerCase()
      const slug = (p.slug || '').toLowerCase().replace(/-/g, ' ')
      return name && (t.includes(name) || t.includes(slug))
    })
  }

  const recommendPerfumes = ({ category, budget, notes, occasion }) => {
    let candidates = perfumes.slice()
    if (category) {
      candidates = candidates.filter((p) => (p.category || '').toLowerCase() === category)
    }
    if (notes?.length) {
      candidates = candidates.filter((p) => {
        const allNotes = [
          ...(p.notes?.top || []),
          ...(p.notes?.middle || []),
          ...(p.notes?.base || []),
          ...(p.shortDescription ? [p.shortDescription] : []),
          ...(p.description ? [p.description] : []),
        ]
          .join(' ')
          .toLowerCase()
        return notes.some((n) => allNotes.includes(n))
      })
    }
    if (budget) {
      candidates = candidates.filter((p) => {
        const numeric = Number(String(p.price || '').replace(/[^0-9]/g, ''))
        return Number.isFinite(numeric) ? numeric <= budget : true
      })
    }

    // If we filtered too hard, relax
    if (candidates.length === 0) candidates = perfumes.slice()

    // Light occasion heuristics
    if (occasion === 'night') {
      candidates = [...candidates].sort((a, b) => (b.slug?.includes('oud') ? 1 : 0) - (a.slug?.includes('oud') ? 1 : 0))
    } else if (occasion === 'office') {
      candidates = [...candidates].sort((a, b) => (a.category === 'fresh' ? -1 : 0) - (b.category === 'fresh' ? -1 : 0))
    }

    // pick up to 2 distinct suggestions
    const chosen = []
    const pool = [...candidates]
    while (chosen.length < 2 && pool.length) {
      chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
    }
    return chosen
  }

  function send() {
    if (!input.trim()) return
    const user = { from: 'user', text: input }
    setMessages((m) => [...m, user])
    setInput('')
    // Frontend-only assistant (no API calls / no server needed)
    const budget = parseBudget(input)
    const category = parseCategory(input)
    const occasion = parseOccasion(input)
    const notes = extractNotes(input)
    const mentionedPerfume = findPerfumeByName(input)
    setProfile((p) => ({
      ...p,
      budget: budget ?? p.budget,
      category: category ?? p.category,
      occasion: occasion ?? p.occasion,
      notes: Array.from(new Set([...(p.notes || []), ...notes])),
    }))

    setTimeout(() => {
      const reply = { from: 'bot', text: cannedReply(input, { budget, category, occasion, notes, mentionedPerfume }) }
      setMessages((m) => [...m, reply])
    }, 450)
  }

  useEffect(() => {
    // auto-scroll to bottom when messages change
    const el = messagesRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  function cannedReply(text, extracted = {}) {
    const t = text.toLowerCase()
    const { budget, category, occasion, notes, mentionedPerfume } = extracted

    if (/(hi|hello|hey|namaste)\b/.test(t)) {
      return pickOne([
        "Hi! Tell me what vibe you want (fresh / woody / floral / amber) and your budget — I’ll recommend 2 picks.",
        'Hello! Looking for something for office, date night, or a special event?',
        "Hey — want something clean and fresh, or warm and intense?",
      ])
    }

    if (/(thanks|thank you|thx)\b/.test(t)) {
      return pickOne([
        'Anytime. Want a second option with a different vibe?',
        'Glad to help — tell me your budget and I’ll narrow it down.',
        'You got it. Office-safe or statement scent?',
      ])
    }

    if (/(bye|goodbye|see you)\b/.test(t)) {
      return pickOne([
        'Bye! Come back anytime if you want a recommendation.',
        'See you — tell me “fresh/woody/floral/amber” next time and I’ll pick quickly.',
      ])
    }

    if (mentionedPerfume) {
      return [
        `${mentionedPerfume.name} (${mentionedPerfume.price}) — ${mentionedPerfume.shortDescription || mentionedPerfume.description || 'A signature from our collection.'}`,
        formatNotes(mentionedPerfume.notes),
        'Want it for daytime, office, or night?',
      ].filter(Boolean).join('\n')
    }

    if (t.includes('price') || t.includes('cost') || t.includes('budget')) {
      const under = budget ? ` under ₹${budget.toLocaleString('en-IN')}` : ''
      const picks = recommendPerfumes({ category: category || profile.category, budget: budget || profile.budget, notes: notes?.length ? notes : profile.notes, occasion: occasion || profile.occasion })
      const list = picks.map((p) => `• ${p.name} — ${p.price}`).join('\n')
      return pickOne([
        `Got it${under}. Here are a couple of picks:\n${list}\nWant fresh, woody, floral, or amber?`,
        `Sure${under}. Tell me “office” or “night” and I’ll tailor it — for now:\n${list}`,
      ])
    }

    if (t.includes('shipping') || t.includes('delivery')) {
      return pickOne([
        'We ship across India. If you share your city, I’ll give you an estimated delivery window.',
        'Delivery times vary by location — metro cities are usually faster. Which city should I check for?',
      ])
    }

    if (t.includes('buy') || t.includes('order') || t.includes('checkout')) {
      return pickOne([
        'Open the product, tap “Buy Now”, then checkout from your cart. Want me to recommend a best-seller first?',
        'Add your pick to cart, then hit Checkout. If you tell me your vibe + budget, I’ll pick the best match.',
      ])
    }

    if (/(recommend|suggest|pick|help me choose|which one|best)\b/.test(t) || category || occasion || (notes && notes.length)) {
      const merged = {
        category: category || profile.category,
        budget: budget || profile.budget,
        occasion: occasion || profile.occasion,
        notes: notes?.length ? notes : profile.notes,
      }
      const picks = recommendPerfumes(merged)
      const list = picks.map((p) => `• ${p.name} — ${p.price} (${p.shortDescription || 'signature pick'})`).join('\n')
      const followUps = []
      if (!merged.occasion) followUps.push('daytime / office / night?')
      if (!merged.budget) followUps.push('budget range (e.g., under ₹4000)?')
      if (!merged.category) followUps.push('fresh / woody / floral / amber?')
      return [
        `Based on what you said, here are 2 strong matches:\n${list}`,
        followUps.length ? `Quick question: ${followUps[0]}` : pickOne(['Want a third option that’s lighter, or one that’s more intense?', 'Do you prefer subtle or strong projection?']),
      ].join('\n')
    }

    if (/(long lasting|lasting|projection|sillage)\b/.test(t)) {
      return pickOne([
        'For longer-lasting performance, apply on moisturized skin and pulse points. Want a stronger “night” scent or an “office” scent?',
        'If you want stronger longevity, go for amber/oud styles. Tell me your budget and I’ll pick 2.',
      ])
    }

    return pickOne([
      'Tell me what you like: fresh, woody, floral, or amber — and your budget. I’ll recommend 2.',
      'What’s the occasion: office, date night, or daily wear?',
      'Do you like vanilla/amber warmth, or clean citrus/fresh vibes?',
    ])
  }

  return (
    <div className={`chatbot ${open ? 'open' : ''}`}>
      <div className="assistant-left">
        <button
          className="chat-toggle assistant-pill"
          type="button"
          aria-expanded={open}
          aria-controls={chatId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : 'Chat'}
        </button>
        {open && (
          <div id={chatId} className="chat-window glass-card" role="dialog" aria-label="Chat assistant">
            <div ref={messagesRef} className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.from}`}>{m.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder="Ask about products, shipping..."
                aria-label="Chat message input"
              />
              <button type="button" onClick={send} disabled={!input.trim()} aria-label="Send message">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
