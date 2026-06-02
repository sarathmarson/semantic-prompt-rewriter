# ✨ Semantic Prompt Rewriter

A React + Vite web app that sends any AI prompt to an LLM and returns a semantically improved version with a structured explanation of what changed and why. No keyword scoring — the model actually understands the meaning of your prompt.

Third in a trilogy: [prompt-quality-checker](https://github.com/SarathMarson7/prompt-quality-checker-) · [ai-trust-chat](https://github.com/sarathmarson/ai-trust-chat) · **semantic-prompt-rewriter**

---

## Screenshots

### Before and After — Weak Prompt Rewritten

The left panel shows your original prompt. After clicking **✨ Rewrite**, the center panel shows the improved version and the right panel lists exactly what changed and why.

> Screenshots coming soon — run locally to see the full UI.

---

## What It Does

Paste any AI prompt into the left panel and click **✨ Rewrite**. The model returns:

- **Rewritten prompt** — semantically clear, specific, and well-structured
- **Explanation** — one or two sentences on the core problem with the original
- **Why it changed** — 3–5 named, concrete improvements

The app runs locally — your API key never leaves your machine.

---

## The Trilogy

Each project in this series teaches a different way to think about AI prompts:

| Project | Approach | What it teaches |
|---|---|---|
| [prompt-quality-checker](https://github.com/SarathMarson7/prompt-quality-checker-) | Regex heuristics | Is my prompt structurally well-formed? |
| [ai-trust-chat](https://github.com/sarathmarson/ai-trust-chat) | Live system prompt manipulation | How do AI trust levels change behaviour? |
| **semantic-prompt-rewriter** | Real AI semantic understanding | What does my prompt actually mean to an AI? |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A free [Groq API key](https://console.groq.com) — no credit card required

### 1. Clone

```bash
git clone https://github.com/SarathMarson7/semantic-prompt-rewriter.git
cd semantic-prompt-rewriter
```

### 2. Install

```bash
npm install
```

### 3. Set your API key

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
GROQ_API_KEY=gsk_your_key_here
```

Get your free key at [console.groq.com](https://console.groq.com) → API Keys → Create API Key.

### 4. Start

```bash
npm run dev
```

Opens at `http://localhost:5173`. The Vite frontend and Express API server start together.

---

## Project Structure

```
semantic-prompt-rewriter/
├── client/                     # React frontend (Vite root)
│   ├── index.html
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Theme state, fetch logic, three-zone layout
│       ├── App.css             # CSS custom properties — light / grey / dark themes
│       └── components/
│           ├── PromptInput.jsx # Left zone: textarea, word count, sample pills, Rewrite button
│           ├── RewritePanel.jsx# Center + right zones: rewritten prompt, explanation, changes list
│           └── ThemeToggle.jsx # ☀️ / 🌥 / 🌙 theme switcher
├── server/
│   └── index.js               # Express proxy — Groq SDK, POST /api/rewrite
├── .github/
│   └── workflows/
│       ├── ci.yml             # npm ci → npm run build on every push / PR
│       └── release.yml        # Deploy client/dist/ to GitHub Pages on v*.*.* tag
├── vite.config.js             # root: 'client', API proxy to :3001, GitHub Pages base path
├── package.json
├── .env.example               # Template — copy to .env and add your key
└── .gitignore                 # .env is excluded — never committed
```

---

## How It Works

```
Browser (localhost:5173)
    │
    │  POST /api/rewrite { prompt: "explain machine learning" }
    ▼
Express server (localhost:3001)
    │
    │  Groq SDK → llama-3.3-70b-versatile
    │  System prompt: "Return only JSON: { rewritten, explanation, changes[] }"
    ▼
Groq API
    │
    │  { "rewritten": "...", "explanation": "...", "changes": [...] }
    ▼
Express → Browser
    │
    ▼
RewritePanel renders result
```

The Express server acts as a proxy so the `GROQ_API_KEY` is never exposed to the browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend + backend together (development) |
| `npm run build` | Build frontend to `dist/` (production) |
| `npm run preview` | Preview the production build locally |
| `npm start` | Start the Express server only |

---

## CI / CD

| Workflow | Trigger | Steps |
|---|---|---|
| `ci.yml` | Every push and PR | `npm ci` → `npm run build` |
| `release.yml` | Tag `v*.*.*` | `npm ci` → `npm run build` → deploy to GitHub Pages |

### Deploy a new version

```bash
git tag v1.x.x
git push origin v1.x.x
```

> **Note:** The live GitHub Pages URL hosts the static frontend only. Rewriting prompts requires running locally with a valid `GROQ_API_KEY`.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI components |
| Vite 5 | Dev server and production bundler |
| Express | Local API proxy — keeps API key server-side |
| groq-sdk | Llama 3.3 70B model integration (free tier) |
| CSS Custom Properties | Light / Grey / Dark themes |
| GitHub Actions | CI and release automation |
| GitHub Pages | Static hosting (frontend only) |

---

## Troubleshooting

**Rewrite button does nothing / network error**

Two servers must run simultaneously: Vite on `:5173` and Express on `:3001`. `npm run dev` starts both. If port `3001` is taken:

```bash
# macOS / Linux
lsof -ti:3001 | xargs kill

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**`GROQ_API_KEY` not found**

Ensure `.env` is at the repo root (not inside `client/` or `server/`) and that you copied from `.env.example`, not renamed it.

---

## License

MIT — see [LICENSE](LICENSE) for details.
