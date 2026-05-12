import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { sparklineWeek } from '@/data/demoDataset'
import { formatInr } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'

function Ring({ value, label, color }: { value: number; label: string; color: string }) {
  const deg = Math.round(value * 3.6)
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative h-20 w-20 rounded-full p-[3px]"
        style={{
          background: `conic-gradient(${color} ${deg}deg, rgba(255,255,255,0.08) 0)`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gp-matte light:bg-white">
          <span className="font-display text-sm font-bold">{value}</span>
        </div>
      </div>
      <p className="text-center text-[10px] uppercase tracking-wide text-gp-muted">{label}</p>
    </div>
  )
}

export function DashboardPage() {
  const total = useAnimatedNumber(428_930)
  const weekly = useAnimatedNumber(18_420)
  const monthly = useAnimatedNumber(72_800)
  const pending = useAnimatedNumber(6_200)
  const savings = useAnimatedNumber(24_600)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Command Center</h1>
          <p className="mt-1 text-sm text-gp-muted light:text-slate-600">
            Live snapshot across gigs, savings, and AI risk signals.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Total earnings', v: formatInr(total), sub: 'Lifetime · all platforms' },
            { title: 'This week', v: formatInr(weekly), sub: '+8.2% vs prior week' },
            { title: 'This month', v: formatInr(monthly), sub: 'On track vs AI forecast' },
            { title: 'Pending payouts', v: formatInr(pending), sub: '2 transfers clearing' },
          ].map((c) => (
            <GlassCard key={c.title} glow>
              <p className="text-xs text-gp-muted">{c.title}</p>
              <p className="mt-2 font-display text-2xl font-bold">{c.v}</p>
              <p className="mt-1 text-xs text-emerald-400/90">{c.sub}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Earnings pulse</p>
                <p className="font-display text-lg font-bold">7-day rhythm</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">Synced</span>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineWeek}>
                  <defs>
                    <linearGradient id="sp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => formatInr(v)}
                  />
                  <Area type="monotone" dataKey="v" stroke="#a78bfa" fill="url(#sp)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Scores</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Ring value={82} label="AI risk" color="#22d3ee" />
              <Ring value={76} label="Efficiency" color="#6366f1" />
              <Ring value={71} label="Rewards tier" color="#f472b6" />
              <Ring value={78} label="Fin. health" color="#34d399" />
            </div>
            <div className="mt-6 rounded-xl bg-white/5 p-3 text-xs text-gp-muted light:bg-slate-100 light:text-slate-700">
              <p className="font-semibold text-gp-frost light:text-gp-matte">Savings vault</p>
              <p className="mt-1 text-lg font-bold text-white light:text-gp-matte">{formatInr(savings)}</p>
              <p className="mt-1">Auto-save 2.75% on every completed order.</p>
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { k: 'Active platforms', v: '5 connected' },
            { k: 'Reward level', v: 'Gold · 4.7★' },
            { k: 'Next AI review', v: 'Tuesday · 09:30' },
          ].map((x) => (
            <motion.div key={x.k} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 420 }}>
              <GlassCard>
                <p className="text-xs text-gp-muted">{x.k}</p>
                <p className="mt-2 font-semibold">{x.v}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
