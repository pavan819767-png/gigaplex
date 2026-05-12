import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { demoFinancialHealth } from '@/data/demoDataset'

export function FinancialHealthPage() {
  const s = demoFinancialHealth()
  const radar = [
    { k: 'Stability', v: s.stability },
    { k: 'Burnout risk', v: 100 - s.burnoutRisk },
    { k: 'Low volatility', v: 100 - s.incomeVolatility },
    { k: 'Savings', v: s.savingsConsistency },
    { k: 'Low debt risk', v: 100 - s.debtRisk },
    { k: 'Emergency prep', v: s.emergencyPreparedness },
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">AI Financial Health Engine</h1>
          <p className="mt-2 max-w-2xl text-sm text-gp-muted light:text-slate-600">
            A holistic view — not a score to shame you, but a map to steadier weeks.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard glow>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Composite radar</p>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar} cx="50%" cy="50%" outerRadius="80%">
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="k" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Radar name="You" dataKey="v" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.35} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard>
              <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">AI insights</p>
              <ul className="mt-3 space-y-2 text-sm text-gp-muted light:text-slate-600">
                <li>Your income volatility improved 9 pts after stabilizing weekend blocks.</li>
                <li>Burnout risk is moderate — add two no-gig mornings this week.</li>
                <li>Emergency buffer is 63% of recommended 45-day runway.</li>
              </ul>
            </GlassCard>
            <GlassCard>
              <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Personalized plan</p>
              <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-gp-muted light:text-slate-600">
                <li>Route 10% of peak-day earnings to vault automatically.</li>
                <li>Shift 2 hours from Monday lunch to Sunday dinner window.</li>
                <li>Book a free wellness check-in via Rewards (Platinum preview).</li>
              </ol>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
