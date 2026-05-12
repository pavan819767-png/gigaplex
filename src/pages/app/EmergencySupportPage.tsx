import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { HeartHandshake, Shield } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { generateSupportRequests } from '@/data/demoDataset'
import { formatInr } from '@/lib/format'
import { useToastStore } from '@/store/toastStore'

const weekCompare = [
  { w: 'W-4', you: 14200, threshold: 15000 },
  { w: 'W-3', you: 16800, threshold: 15000 },
  { w: 'W-2', you: 12100, threshold: 15000 },
  { w: 'W-1', you: 13900, threshold: 15000 },
]

export function EmergencySupportPage() {
  const push = useToastStore((s) => s.push)
  const requests = useMemo(() => generateSupportRequests(), [])
  const [amount, setAmount] = useState('5000')

  const stress = 62
  const eligibility = 78

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Gigaplex Emergency Support</p>
            <h1 className="font-display text-2xl font-bold">You are not alone in a slow week.</h1>
            <p className="mt-2 max-w-2xl text-sm text-gp-muted light:text-slate-600">
              Temporary bridge funds when your earnings dip below stability thresholds — reviewed with care, repaid with a
              plan that respects your dignity.
            </p>
          </div>
          <Badge tone="success" className="self-start">
            <Shield className="mr-1 inline h-3 w-3" />
            Safety-first reviews
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard glow>
            <p className="text-xs text-gp-muted">Financial stress meter</p>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500"
                style={{ width: `${stress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gp-muted">
              {stress < 70 ? 'Within manageable range — still eligible to talk to us.' : 'Elevated — prioritize rest and support.'}
            </p>
          </GlassCard>
          <GlassCard glow>
            <p className="text-xs text-gp-muted">Support eligibility score (AI-assisted)</p>
            <p className="mt-2 font-display text-4xl font-bold text-cyan-300">{eligibility}</p>
            <p className="text-xs text-gp-muted">Based on volatility, tenure, and repayment history.</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs text-gp-muted">Support wallet</p>
            <p className="mt-2 font-display text-2xl font-bold">{formatInr(3200)}</p>
            <p className="text-xs text-gp-muted">Active bridge balance · repayment plan on track</p>
          </GlassCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Weekly comparison</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekCompare}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.35} />
                  <XAxis dataKey="w" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="you" stackId="1" stroke="#38bdf8" fill="#38bdf833" />
                  <Area type="monotone" dataKey="threshold" stroke="#f472b6" fill="transparent" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-rose-300" />
              <p className="font-semibold">Request support</p>
            </div>
            <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
              AI pre-checks eligibility — a human confirms. No shame, no spam.
            </p>
            <label className="mt-4 block text-xs text-gp-muted" htmlFor="amt">
              Amount (₹)
            </label>
            <Input id="amt" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" />
            <label className="mt-3 block text-xs text-gp-muted" htmlFor="why">
              What happened?
            </label>
            <textarea
              id="why"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none ring-cyan-400/40 focus:ring-2 light:border-slate-200 light:bg-white"
              rows={3}
              placeholder="Optional — share only what you are comfortable with."
            />
            <Button
              className="mt-4 w-full"
              onClick={() =>
                push({
                  kind: 'success',
                  title: 'Request received (demo)',
                  message: 'Ops console routes this to human review.',
                })
              }
            >
              Submit for caring review
            </Button>
          </GlassCard>
        </div>

        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Approval tracker</p>
          <div className="mt-4 space-y-3">
            {requests.map((r) => (
              <div
                key={r.id}
                className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center light:border-slate-200 light:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-semibold">{formatInr(r.amountRequested)}</p>
                  <p className="text-xs text-gp-muted">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info">AI score {r.aiEligibilityScore}</Badge>
                  <Badge
                    tone={
                      r.status === 'approved'
                        ? 'success'
                        : r.status === 'rejected'
                          ? 'warning'
                          : 'neutral'
                    }
                  >
                    {r.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
