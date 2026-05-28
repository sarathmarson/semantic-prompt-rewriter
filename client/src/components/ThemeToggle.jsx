const ICONS = { light: '☀️', grey: '🌥', dark: '🌙' }

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={`Theme: ${theme}`}
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.5)',
        color: '#fff',
        borderRadius: '6px',
        padding: '0.25rem 0.6rem',
        cursor: 'pointer',
        fontSize: '1rem',
        lineHeight: 1
      }}
    >
      {ICONS[theme]}
    </button>
  )
}
