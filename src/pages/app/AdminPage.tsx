import { Shield, AlertTriangle, Wallet, PiggyBank, Activity } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Badge } from '@/components/ui/Badge'
import { generateWorkers } from '@/data/demoDataset'

export function AdminPage() {
  const workers = generateWorkers(124).slice(0, 10)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <Shield className="h-8 w-8 text-violet-300" />
          <div>
            <h1 className="font-display text-2xl font-bold">Admin console</h1>
            <p className="mt-1 text-sm text-gp-muted light:text-slate-600">
              Workers, fraud signals, support approvals, payouts, savings, and AI monitors — production RBAC enforced server-side.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'Active workers', value: '184k+', icon: Activity, tone: 'success' as const },
            { label: 'Fraud flags', value: '37', icon: AlertTriangle, tone: 'warning' as const },
            { label: 'Open support', value: '128', icon: Shield, tone: 'info' as const },
            { label: 'Pending payouts', value: '₹2.1Cr', icon: Wallet, tone: 'neutral' as const },
            { label: 'Vault AUM', value: '₹31.8Cr', icon: PiggyBank, tone: 'success' as const },
          ].map((m) => (
            <GlassCard key={m.label} glow>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gp-muted">{m.label}</p>
                <m.icon className="h-4 w-4 text-gp-muted" />
              </div>
              <p className="mt-2 font-display text-xl font-bold">{m.value}</p>
              <Badge tone={m.tone} className="mt-2">
                Live
              </Badge>
            </GlassCard>
          ))}
        </div>

        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Worker management (sample)</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-gp-muted light:border-slate-200">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Rating</th>
                  <th className="py-2">KYC</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((w) => (
                  <tr key={w.id} className="border-b border-white/5 hover:bg-white/[0.03] light:border-slate-100">
                    <td className="py-2 font-medium">{w.name}</td>
                    <td className="py-2 text-xs text-gp-muted">{w.email}</td>
                    <td className="py-2">{w.ratingAvg.toFixed(1)}★</td>
                    <td className="py-2">
                      <Badge tone={w.kycStatus === 'verified' ? 'success' : 'warning'}>{w.kycStatus}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
