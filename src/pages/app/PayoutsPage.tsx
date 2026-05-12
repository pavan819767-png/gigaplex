import { motion } from 'framer-motion'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { generatePayouts } from '@/data/demoDataset'
import { formatInr } from '@/lib/format'
import { useMemo } from 'react'
import { useToastStore } from '@/store/toastStore'

export function PayoutsPage() {
  const push = useToastStore((s) => s.push)
  const payouts = useMemo(() => generatePayouts(40), [])
  const breakdown = useMemo(() => {
    const m = { UPI: 0, Bank: 0, Wallet: 0 }
    for (const p of payouts) m[p.method] += p.amount
    return Object.entries(m).map(([name, value]) => ({ name, value }))
  }, [payouts])

  const COLORS = ['#38bdf8', '#a78bfa', '#34d399']

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Payout history</h1>
          <p className="text-sm text-gp-muted light:text-slate-600">
            Timeline, methods, receipts, and tax-aware summaries.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Income breakdown</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {breakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => formatInr(v)}
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-gp-muted">
              Estimated tax set-aside this quarter: <span className="font-semibold text-white light:text-gp-matte">{formatInr(18200)}</span> — connect your CA workflow.
            </p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Monthly summary</p>
            <p className="mt-3 font-display text-3xl font-bold">{formatInr(72400)}</p>
            <p className="text-xs text-emerald-400">+6.1% vs last month</p>
            <div className="mt-4 space-y-2 text-sm text-gp-muted">
              <p>Completed transfers: 12</p>
              <p>Pending: 2</p>
              <p>Failed (retry scheduled): 0</p>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-3">
          {payouts.slice(0, 12).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <GlassCard className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-gp-muted">{new Date(p.createdAt).toLocaleString()}</p>
                  <p className="font-display text-xl font-bold">{formatInr(p.amount)}</p>
                  <p className="text-xs text-gp-muted">Ref {p.reference}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info">{p.method}</Badge>
                  <Badge tone={p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'neutral'}>
                    {p.status}
                  </Badge>
                  <Button
                    variant="outline"
                    className="text-xs"
                    onClick={() =>
                      push({ kind: 'info', title: 'Receipt', message: `Download stub for ${p.reference}` })
                    }
                  >
                    Receipt
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
