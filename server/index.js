import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a prompt engineering expert. The user will give you a rough AI prompt.
Your task:
1. Rewrite it to be semantically clear, specific, and well-structured.
2. Return ONLY valid JSON with these exact keys:
   - "rewritten": the improved prompt (string)
   - "explanation": one or two sentences explaining the core problem with the original (string)
   - "changes": array of 3-5 strings, each naming one specific improvement made

Do not include any text outside the JSON object.`

app.post('/api/rewrite', async (req, res) => {
  const { prompt } = req.body
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'prompt is required' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }]
    })

    const raw = message.content[0].text
    const data = JSON.parse(raw)

    if (!data.rewritten || !data.explanation || !Array.isArray(data.changes)) {
      throw new Error('Unexpected response shape from Claude')
    }

    res.json(data)
  } catch (err) {
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: 'Claude returned invalid JSON. Try again.' })
    }
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on :${PORT}`))
