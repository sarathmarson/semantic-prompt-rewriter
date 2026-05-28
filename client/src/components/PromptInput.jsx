import { useState } from 'react'

const SAMPLES = {
  Weak: 'write something about dogs',
  Medium: 'write a blog post about dogs and their benefits as pets for families',
  Strong: 'You are a veterinarian. Write a 300-word blog post aimed at first-time dog owners explaining the top 3 health benefits of owning a dog. Use a friendly tone and include one concrete tip per benefit. Format as three short paragraphs with bold headings.'
}

export default function PromptInput({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('')

  const words = prompt.trim() ? prompt.trim().split(/\s+/).length : 0

  return (
    <div className="zone">
      <span className="zone-label">Your Prompt</span>
      <textarea
        className="prompt-textarea"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Paste or type your AI prompt here..."
        disabled={loading}
      />
      <span className="word-count">{words} words · {prompt.length} chars</span>
      <div className="sample-pills">
        <span className="pill-label">Try:</span>
        {Object.entries(SAMPLES).map(([label, text]) => (
          <button key={label} className="pill" onClick={() => setPrompt(text)}>
            {label}
          </button>
        ))}
      </div>
      <button
        className="btn-rewrite"
        onClick={() => onSubmit(prompt)}
        disabled={!prompt.trim() || loading}
      >
        {loading ? 'Rewriting…' : '✨ Rewrite'}
      </button>
    </div>
  )
}
