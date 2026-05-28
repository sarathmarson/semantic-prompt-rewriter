# ✨ Semantic Prompt Rewriter

A React + Vite web app that sends any AI prompt to Claude and returns a semantically improved version with a structured explanation of what changed and why. No keyword scoring — Claude actually understands the meaning of your prompt.

Third in a trilogy: [prompt-quality-checker](https://github.com/SarathMarson7/prompt-quality-checker-) · [ai-trust-chat](https://github.com/sarathmarson/ai-trust-chat) · **semantic-prompt-rewriter**

---

## What It Does

Paste any AI prompt into the left panel and click **✨ Rewrite**. Claude returns:

- **Rewritten prompt** — semantically clear, specific, and well-structured
- **Explanation** — one or two sentences on the core problem with the original
- **Why it changed** — 3–5 named, concrete improvements

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- An [Anthropic API key](https://console.anthropic.com)

### 1. Clone

```bash
git clone https://github.com/sarathmarson/semantic-prompt-rewriter.git
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

Open `.env` and add:
```
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Start

```bash
npm run dev
```

Opens at `http://localhost:5173`. Both the Vite frontend and Express API proxy start together.

---

## CI / CD

| Workflow | Trigger | Steps |
|---|---|---|
| `ci.yml` | Every push and PR | `npm ci` → `npm run build` |
| `release.yml` | Tag `v*.*.*` | `npm ci` → `npm run build` → deploy to GitHub Pages |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI components |
| Vite 5 | Dev server and production bundler |
| Express | Local API proxy — keeps API key server-side |
| @anthropic-ai/sdk | Claude Haiku model integration |
| CSS Custom Properties | Light / Grey / Dark themes |
| GitHub Actions | CI and release automation |
| GitHub Pages | Static hosting (frontend only) |
