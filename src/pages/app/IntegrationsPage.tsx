import { useState } from 'react'
import { Link2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PLATFORMS } from '@/lib/constants'
import { formatInr } from '@/lib/format'
import { useToastStore } from '@/store/toastStore'

function pseudo(platform: string, i: number) {
  const base = (platform.length + i * 17) % 7
  return {
    earnings: 4200 + base * 900,
    jobs: 1 + (base % 4),
    rating: 3.8 + (base % 15) / 10,
    hours: 12 + base * 2,
    payout: `${5 + (base % 3)}d ago`,
    connected: base % 4 !== 0,
  }
}

export function IntegrationsPage() {
  const push = useToastStore((s) => s.push)
  const [syncing, setSyncing] = useState<string | null>(null)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Gig integrations</h1>
            <p className="text-sm text-gp-muted light:text-slate-600">
              Connect accounts to unlock forecasting, savings, and emergency signals.
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => push({ kind: 'info', title: 'Sync all', message: 'Queue background sync jobs.' })}
          >
            <RefreshCw className="h-4 w-4" /> Sync all
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLATFORMS.map((platform, i) => {
            const d = pseudo(platform, i)
            return (
              <motion.div key={platform} layout whileHover={{ y: -3 }}>
                <GlassCard glow className="h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-lg font-bold">{platform}</p>
                      <Badge tone={d.connected ? 'success' : 'warning'}>
                        {d.connected ? 'Connected' : 'Disconnected'}
                      </Badge>
                    </div>
                    <Link2 className="h-5 w-5 text-gp-muted" />
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-gp-muted">Week earnings</dt>
                      <dd className="font-semibold">{formatInr(d.earnings)}</dd>
                    </div>
                    <div>
                      <dt className="text-gp-muted">Active jobs</dt>
                      <dd className="font-semibold">{d.jobs}</dd>
                    </div>
                    <div>
                      <dt className="text-gp-muted">Rating</dt>
                      <dd className="font-semibold">{d.rating.toFixed(1)}★</dd>
                    </div>
                    <div>
                      <dt className="text-gp-muted">Weekly hours</dt>
                      <dd className="font-semibold">{d.hours}h</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-gp-muted">Last payout</dt>
                      <dd className="font-semibold">{d.payout}</dd>
                    </div>
                  </dl>
                  <Button
                    className="mt-4 w-full"
                    variant={d.connected ? 'outline' : 'primary'}
                    loading={syncing === platform}
                    onClick={() => {
                      setSyncing(platform)
                      window.setTimeout(() => {
                        setSyncing(null)
                        push({ kind: 'success', title: `${platform}`, message: 'Sync completed (demo).' })
                      }, 900)
                    }}
                  >
                    {d.connected ? 'Reconnect / sync' : 'Connect account'}
                  </Button>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
