import { useState } from 'react'
import './App.css'
import PromptInput from './components/PromptInput'
import RewritePanel from './components/RewritePanel'
import ThemeToggle from './components/ThemeToggle'

const THEMES = ['light', 'grey', 'dark']

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('spr-theme') || 'light')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function cycleTheme() {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
    setTheme(next)
    localStorage.setItem('spr-theme', next)
  }

  async function handleRewrite(prompt) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div data-theme={theme} className="app">
      <header className="app-header">
        <span className="app-title">✨ Semantic Prompt Rewriter</span>
        <ThemeToggle theme={theme} onToggle={cycleTheme} />
      </header>
      <main className="app-grid">
        <PromptInput onSubmit={handleRewrite} loading={loading} />
        <RewritePanel result={result} loading={loading} error={error} />
      </main>
    </div>
  )
}
