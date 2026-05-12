/**
 * JWT verification + role-based access for admin routes.
 * In production: rotate secrets, short TTL, refresh tokens, and issuer checks.
 */
import jwt from 'jsonwebtoken'

export function authMiddleware(secret) {
  return (req, res, next) => {
    const header = req.headers.authorization
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) {
      return res.status(401).json({ error: 'missing_bearer_token' })
    }
    try {
      req.user = jwt.verify(token, secret)
      next()
    } catch {
      return res.status(401).json({ error: 'invalid_token' })
    }
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'forbidden' })
    }
    next()
  }
}
