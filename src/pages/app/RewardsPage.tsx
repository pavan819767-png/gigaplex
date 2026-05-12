import { useEffect, useMemo, useState } from 'react'
import { Gift, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { generateRewards } from '@/data/demoDataset'
import { MIN_REWARD_STARS } from '@/lib/constants'
import { useToastStore } from '@/store/toastStore'

const tiers = [
  { stars: '3★', name: 'Bronze', perks: ['Grocery coupons'] },
  { stars: '4★', name: 'Silver', perks: ['Fuel discounts', 'Mobile recharge cashback'] },
  { stars: '4.5★', name: 'Gold', perks: ['Insurance discounts', 'Partner offers'] },
  { stars: '5★', name: 'Platinum', perks: ['Exclusive healthcare', 'Priority support', 'Premium rewards'] },
]

export function RewardsPage() {
  const push = useToastStore((s) => s.push)
  const coupons = useMemo(() => generateRewards(), [])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">Gigaplex Rewards Center</p>
          <h1 className="font-display text-2xl font-bold">Your ratings unlock real-world relief.</h1>
          <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
            Minimum {MIN_REWARD_STARS}★ to unlock benefits — climb tiers as your service excellence compounds.
          </p>
        </div>

        <GlassCard glow>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gp-muted">Your live rating</p>
              <p className="mt-1 flex items-center gap-2 font-display text-3xl font-bold">
                4.7 <Star className="h-7 w-7 text-amber-300" />
              </p>
              <p className="text-xs text-gp-muted">Gold track · keep 90-day rolling average above 4.5★</p>
            </div>
            <div className="w-full max-w-xs">
              <p className="text-xs text-gp-muted">Progress to Platinum</p>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-300 via-fuchsia-400 to-cyan-300" />
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t) => (
            <GlassCard key={t.name}>
              <Badge tone="info">{t.stars}</Badge>
              <p className="mt-3 font-display text-lg font-bold">{t.name}</p>
              <ul className="mt-2 list-inside list-disc text-xs text-gp-muted">
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {coupons.map((c) => {
            const ms = new Date(c.expiresAt).getTime() - now
            const ok = ms > 0
            const hh = ok ? Math.floor(ms / 3600000) : 0
            const mm = ok ? Math.floor((ms % 3600000) / 60000) : 0
            const ss = ok ? Math.floor((ms % 60000) / 1000) : 0
            return (
              <motion.div key={c.id} whileHover={{ scale: 1.01 }}>
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge tone="warning">{c.tier}</Badge>
                      <p className="mt-2 font-semibold">{c.title}</p>
                      <p className="text-xs text-gp-muted">{c.valueLabel}</p>
                    </div>
                    <Gift className="h-6 w-6 text-violet-300" />
                  </div>
                  <p className="mt-3 font-mono text-xs text-cyan-200">
                    {ok ? `Expires in ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : 'Expired'}
                  </p>
                  <Button
                    className="mt-4 w-full"
                    disabled={c.claimed}
                    onClick={() =>
                      push({
                        kind: 'success',
                        title: c.claimed ? 'Already claimed' : 'Coupon claimed (demo)',
                        message: 'Partner redemption APIs integrate here.',
                      })
                    }
                  >
                    {c.claimed ? 'Redeemed' : 'Claim coupon'}
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
