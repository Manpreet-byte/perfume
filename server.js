// server.js
// Minimal Express server: /api/assistant returns mock reply or proxies to OpenAI when OPENAI_API_KEY set

const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
app.use(express.json())

app.post('/api/assistant', async (req, res) => {
  const message = (req.body?.message || '').toString().trim()
  if (!message) return res.status(400).json({ error: 'Missing message' })

  const key = process.env.OPENAI_API_KEY
  if (!key) {
    // simple canned logic for dev
    const t = message.toLowerCase()
    let reply = 'I can help with product info, pricing, and availability.'
    if (t.includes('price')||t.includes('cost')) reply = 'Most signature bottles start from ₹1999.'
    else if (t.includes('shipping')) reply = 'We ship nationwide — delivery times vary by location.'
    return res.json({ reply })
  }

  try {
    // Proxy to OpenAI Chat Completions (adjust as needed)
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // change to a model you have access to
        messages: [
          { role: 'system', content: 'You are a helpful shopping assistant for a premium perfume brand.' },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
      }),
    })
    if (!resp.ok) {
      const text = await resp.text()
      console.error('OpenAI error', resp.status, text)
      return res.status(502).json({ reply: 'AI provider error' })
    }
    const data = await resp.json()
    const reply = data?.choices?.[0]?.message?.content || 'Sorry, no reply from AI.'
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reply: 'Assistant error' })
  }
})

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log('Assistant server listening on', port))