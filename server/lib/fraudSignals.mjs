/**
 * Fraud prevention heuristics (demo stubs).
 * Production: graph features, velocity checks, device fingerprint, chargeback hooks.
 */
export function scorePayoutRisk({ amount, recentCount, deviceTrust }) {
  let score = 0
  if (amount > 50000) score += 15
  if (recentCount > 8) score += 20
  if (deviceTrust < 0.4) score += 35
  return Math.min(100, score)
}
