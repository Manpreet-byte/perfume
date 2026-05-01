import { useState } from 'react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello — I am the Golden River assistant. How can I help?' },
  ])
  const [input, setInput] = useState('')

  const chatId = 'chatbot-window'

  function send() {
    if (!input.trim()) return
    const user = { from: 'user', text: input }
    setMessages((m) => [...m, user])
    setInput('')
    // Simple canned responses for demo
    setTimeout(() => {
      const reply = { from: 'bot', text: cannedReply(input) }
      setMessages((m) => [...m, reply])
    }, 700)
  }

  function cannedReply(text) {
    const t = text.toLowerCase()
    if (t.includes('price') || t.includes('cost')) return 'Most signature bottles start from ₹1999 — which product interests you?'
    if (t.includes('shipping')) return 'We ship nationwide. Delivery times vary by location.'
    if (t.includes('buy') || t.includes('order')) return 'Use the Buy Now button on the product page or contact us directly.'
    return 'I can help with product info, pricing, and availability. Which product would you like to know about?'
  }

  return (
    <div className={`chatbot ${open ? 'open' : ''}`}>
      <button
        className="chat-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={chatId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '✕' : 'Chat'}
      </button>
      {open && (
        <div id={chatId} className="chat-window glass-card" role="dialog" aria-label="Chat assistant">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>{m.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about products, shipping..." />
            <button type="button" onClick={send}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
