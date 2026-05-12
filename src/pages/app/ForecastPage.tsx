import { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Brain, Map } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { heatmapCells, incomeTrend } from '@/data/demoDataset'
import { formatInr } from '@/lib/format'
import { cn } from '@/lib/cn'

export function ForecastPage() {
  const forecast = useMemo(
    () =>
      incomeTrend.map((row, i) => ({
        ...row,
        forecast: row.income * (0.92 + (i % 3) * 0.04),
      })),
    [],
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">AI Income Forecast</p>
          <h1 className="font-display text-2xl font-bold">See the week before it arrives.</h1>
          <p className="mt-2 max-w-2xl text-sm text-gp-muted light:text-slate-600">
            Demand, seasonality, weather, and traffic signals fused into a calm forecast — with alerts before low-income
            windows hit.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <GlassCard className="xl:col-span-2" glow>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-cyan-300" />
              <p className="font-semibold">Forecast timeline</p>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.35} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
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
                  <Line type="monotone" dataKey="income" stroke="#38bdf8" strokeWidth={2} dot={false} name="Actual" />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#c084fc"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="AI forecast"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Low-income alerts</p>
            <ul className="mt-3 space-y-3 text-sm text-gp-muted light:text-slate-600">
              <li className="rounded-xl bg-amber-500/10 p-3 text-amber-100">
                Demand for food delivery may drop next Tuesday.
              </li>
              <li className="rounded-xl bg-emerald-500/10 p-3 text-emerald-100">
                Weekend ride demand likely to increase by 23%.
              </li>
              <li className="rounded-xl bg-cyan-500/10 p-3 text-cyan-100">
                Suggested savings target: ₹5,000.
              </li>
            </ul>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-gp-muted light:border-slate-200 light:bg-slate-50">
              Budget planner: shift 3 hours to Saturday evening to neutralize the Tuesday dip.
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-violet-300" />
            <p className="font-semibold">Gig opportunity heatmap</p>
          </div>
          <p className="mt-1 text-xs text-gp-muted">Neighborhood demand composite (demo grid).</p>
          <div
            className="mt-4 grid gap-1"
            style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
          >
            {heatmapCells.map((c) => (
              <div
                key={c.id}
                className={cn(
                  'aspect-square rounded-md border border-white/5',
                  'bg-gradient-to-br from-blue-600/20 to-cyan-400/30',
                )}
                style={{ opacity: 0.35 + c.demand }}
                title={`Demand ${Math.round(c.demand * 100)}%`}
              />
            ))}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
