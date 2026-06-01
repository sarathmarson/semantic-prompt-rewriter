import { useState } from 'react'

export default function RewritePanel({ result, loading, error, onRetry }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result?.rewritten ?? '')
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable (non-HTTPS or permission denied)
    }
  }

  if (loading) {
    return (
      <>
        <div className="zone">
          <span className="zone-label">Rewritten</span>
          <div className="skeleton skeleton-line" style={{ width: '90%' }} />
          <div className="skeleton skeleton-line" style={{ width: '75%' }} />
          <div className="skeleton skeleton-line" style={{ width: '85%' }} />
          <div className="skeleton skeleton-line" style={{ width: '60%' }} />
        </div>
        <div className="zone">
          <span className="zone-label">Why It Changed</span>
          <div className="skeleton skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton skeleton-line" style={{ width: '65%' }} />
          <div className="skeleton skeleton-line" style={{ width: '70%' }} />
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className="zone">
          <span className="zone-label">Rewritten</span>
          <div className="error-msg">⚠️ {error}</div>
          <button className="btn-retry" onClick={onRetry} type="button">↺ Try again</button>
        </div>
        <div className="zone">
          <span className="zone-label">Why It Changed</span>
          <div className="empty-state">—</div>
        </div>
      </>
    )
  }

  if (!result) {
    return (
      <>
        <div className="zone">
          <span className="zone-label">Rewritten</span>
          <div className="empty-state">Your improved prompt will appear here</div>
        </div>
        <div className="zone">
          <span className="zone-label">Why It Changed</span>
          <div className="empty-state">Changes will be listed here</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="zone">
        <span className="zone-label">Rewritten</span>
        <textarea className="rewritten-text" value={result.rewritten} readOnly />
        <div className="rewritten-meta">
          <span className="word-count">{result.rewritten.trim().split(/\s+/).filter(Boolean).length} words</span>
          <button className="btn-copy" onClick={handleCopy} type="button">
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>
      <div className="zone">
        <span className="zone-label">Why It Changed</span>
        {result.explanation && (
          <p className="explanation">{result.explanation}</p>
        )}
        <ul className="changes-list">
          {(result.changes ?? []).map((change, i) => (
            <li key={i}>{change}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
