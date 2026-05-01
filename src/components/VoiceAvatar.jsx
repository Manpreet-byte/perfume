import { useState } from 'react'

export default function VoiceAvatar({ text }) {
  const [speaking, setSpeaking] = useState(false)

  const speak = () => {
    if (!('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.95
    utter.pitch = 1
    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  return (
    <div className="voice-avatar">
      <button className="voice-toggle" type="button" aria-label="Play voice assistant" onClick={speak}>
        <span className="avatar-circle" aria-hidden="true">🎙️</span>
        <span className="voice-label">{speaking ? 'Playing…' : 'Voice'}</span>
      </button>
    </div>
  )
}
