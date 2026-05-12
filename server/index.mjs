/**
 * Gigaplex API — Express entrypoint for JWT auth, RBAC, and demo datasets.
 * Run: `npm run server` (defaults to port 8787). Vite proxies /api → here in dev.
 */
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { buildDemoDataset } from './lib/seed.mjs'
import { authMiddleware, requireRole } from './middleware/auth.mjs'

const PORT = Number(process.env.PORT ?? 8787)
const JWT_SECRET = process.env.JWT_SECRET ?? 'gigaplex-dev-secret-change-me'

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }))
app.use(express.json())

const dataset = buildDemoDataset()

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'gigaplex-api', workers: dataset.workers.length })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email_and_password_required' })
  }
  const resolvedRole =
    role === 'admin' || String(email).includes('admin') ? 'admin' : 'worker'
  const token = jwt.sign(
    { sub: 'demo-user', email, role: resolvedRole },
    JWT_SECRET,
    { expiresIn: '12h' },
  )
  res.json({
    token,
    user: {
      id: resolvedRole === 'admin' ? 'admin-1' : 'worker-api',
      email,
      name: resolvedRole === 'admin' ? 'Ops Admin' : 'API Worker',
      role: resolvedRole,
      ratingAvg: 4.6,
      kycStatus: 'verified',
      createdAt: new Date().toISOString(),
    },
  })
})

app.get('/api/workers', authMiddleware(JWT_SECRET), (_req, res) => {
  res.json({ total: dataset.workers.length, items: dataset.workers.slice(0, 50) })
})

app.get('/api/workers/all', authMiddleware(JWT_SECRET), requireRole('admin'), (_req, res) => {
  res.json({ total: dataset.workers.length, items: dataset.workers })
})

app.get('/api/work-history', authMiddleware(JWT_SECRET), (_req, res) => {
  res.json({ items: dataset.workHistory.slice(0, 100) })
})

app.get('/api/payouts', authMiddleware(JWT_SECRET), (_req, res) => {
  res.json({ items: dataset.payouts.slice(0, 50) })
})

app.get('/api/ai/predictions/latest', authMiddleware(JWT_SECRET), (_req, res) => {
  res.json(dataset.aiPredictions[0])
})

app.listen(PORT, () => {
  console.log(`[gigaplex-api] listening on http://localhost:${PORT}`)
})
