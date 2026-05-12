import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Lock, ShieldCheck } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Button } from '@/components/ui/Button'
import { SAVINGS_RATE } from '@/lib/constants'
import { formatInr } from '@/lib/format'
import { generateEarnings } from '@/data/demoDataset'
import { useMemo } from 'react'
import { useToastStore } from '@/store/toastStore'

export function SavingsVaultPage() {
  const push = useToastStore((s) => s.push)
  const curve = useMemo(() => {
    let acc = 12000
    return Array.from({ length: 14 }).map((_, i) => {
      acc += 800 + (i % 4) * 120
      return { d: `D${i + 1}`, v: acc }
    })
  }, [])
  const lifetime = useMemo(() => generateEarnings(60).reduce((s, e) => s + e.savingsContribution, 0), [])

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Gigaplex Savings Vault</h1>
          <p className="mt-2 max-w-2xl text-sm text-gp-muted light:text-slate-600">
            Exactly {(SAVINGS_RATE * 100).toFixed(2)}% from every completed order is reserved automatically — your calm
            layer beneath volatile weeks.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard className="relative overflow-hidden lg:col-span-2" glow>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center justify-center py-10">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="flex h-36 w-36 items-center justify-center rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-blue-600/40 via-violet-600/30 to-cyan-500/30 shadow-[0_0_80px_rgba(34,211,238,0.25)]"
              >
                <Lock className="h-12 w-12 text-cyan-100" />
              </motion.div>
              <p className="mt-4 font-display text-3xl font-bold">{formatInr(24600)}</p>
              <p className="text-xs text-gp-muted">Vault balance · demo account</p>
              <p className="mt-1 text-xs text-gp-muted">Lifetime auto-saved: {formatInr(Math.round(lifetime))}</p>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Withdrawals</p>
            <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
              Available during emergencies, when leaving the platform, or after eligibility review — always human-in-the-loop.
            </p>
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => push({ kind: 'info', title: 'Withdrawal request', message: 'Queues compliance review.' })}
            >
              Request withdrawal
            </Button>
            <Button
              className="mt-2 w-full"
              onClick={() =>
                push({ kind: 'success', title: 'Emergency withdrawal', message: 'Fast-tracked to caring review.' })
              }
            >
              Emergency path
            </Button>
            <div className="mt-4 flex items-center gap-2 text-xs text-gp-muted">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Bank-grade encryption · segregated ledger (demo labels)
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Long-term projection</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={curve}>
                <defs>
                    <linearGradient id="sv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
              </defs>
              <XAxis dataKey="d" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => formatInr(v)}
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="v" stroke="#22d3ee" fill="url(#sv)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
