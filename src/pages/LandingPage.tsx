import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Gift,
  HeartHandshake,
  PiggyBank,
  Shield,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { trustStats } from '@/data/demoDataset'
import { formatCompact } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
import { useUiStore } from '@/store/uiStore'

const heroChart = [
  { t: 'Mon', v: 3200 },
  { t: 'Tue', v: 4100 },
  { t: 'Wed', v: 3600 },
  { t: 'Thu', v: 5200 },
  { t: 'Fri', v: 6100 },
  { t: 'Sat', v: 7800 },
  { t: 'Sun', v: 6900 },
]

const features = [
  {
    title: 'Unified Gig Dashboard',
    desc: 'Every platform, payout, and shift — one calm command center.',
    icon: BarChart3,
  },
  {
    title: 'AI Income Prediction',
    desc: 'Demand, weather, and traffic signals distilled into forecasts you can plan around.',
    icon: Brain,
  },
  {
    title: 'Emergency Support Fund',
    desc: 'Human-speed assistance when your week drops below stability.',
    icon: HeartHandshake,
  },
  {
    title: 'Auto Savings Vault',
    desc: '2.75% auto-reserved from completed work — frictionless safety net.',
    icon: PiggyBank,
  },
  {
    title: 'Rewards & Coupons',
    desc: 'Unlock partner benefits as your ratings climb — Bronze to Platinum.',
    icon: Gift,
  },
  {
    title: 'Work Analytics',
    desc: 'Hours, distance, tasks, and earnings — export-ready for taxes and growth.',
    icon: Zap,
  },
  {
    title: 'Financial Health Tracking',
    desc: 'Volatility, burnout risk, and preparedness — explained, not judged.',
    icon: Shield,
  },
  {
    title: 'Smart Career Guidance',
    desc: 'Where to invest your next hour for compounding career upside.',
    icon: Sparkles,
  },
]

export function LandingPage() {
  const theme = useUiStore((s) => s.theme)
  const toggleTheme = useUiStore((s) => s.toggleTheme)
  const workers = useAnimatedNumber(trustStats.workers)

  return (
    <div className="mesh-bg min-h-screen text-gp-frost light:text-gp-matte">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="font-display text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Gigaplex
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-xl p-2 text-gp-muted hover:bg-white/10 hover:text-white light:hover:bg-slate-200 light:hover:text-gp-matte"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="rounded-xl px-3 py-2 text-sm font-medium text-gp-muted hover:text-white light:hover:text-gp-matte"
          >
            Sign in
          </Link>
          <Link to="/signup">
            <Button className="rounded-xl px-4 py-2 text-sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
              <Bot className="h-3.5 w-3.5" />
              Securing the Future of Gig Workers.
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              One Workspace for{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                Every Gig Worker.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gp-muted sm:text-lg">
              Track work, predict income, build savings, unlock rewards, and secure your future with
              AI-powered financial protection.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button className="gap-2 rounded-2xl px-6 py-3 text-base">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="rounded-2xl px-6 py-3 text-base">
                  Watch Demo
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Workers', v: `${formatCompact(workers)}+` },
                { label: 'Payouts (₹)', v: `₹${formatCompact(trustStats.payouts)}` },
                { label: 'Savings (₹)', v: `₹${formatCompact(trustStats.savings)}` },
                { label: 'Emergency (₹)', v: `₹${formatCompact(trustStats.emergency)}` },
              ].map((s) => (
                <GlassCard key={s.label} className="p-4" glow>
                  <p className="text-xs text-gp-muted">{s.label}</p>
                  <p className="mt-1 font-display text-lg font-bold">{s.v}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotateX: 12, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative perspective-[1200px]"
          >
            <div className="relative rotate-x-6 transform-gpu rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_40px_120px_rgba(59,130,246,0.25)] sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-gp-muted">Live earnings pulse</p>
                  <p className="font-display text-2xl font-bold">₹6,420</p>
                  <p className="text-xs text-emerald-400">+12.4% vs last week</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 h-40 w-full sm:h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={heroChart}>
                    <defs>
                      <linearGradient id="fillHero" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" stroke="#64748b" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: '#0f172a',
                        border: '1px solid rgba(148,163,184,0.2)',
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="v" stroke="#38bdf8" fill="url(#fillHero)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <GlassCard className="p-3">
                  <p className="text-[10px] uppercase tracking-wide text-gp-muted">AI assistant</p>
                  <p className="mt-1 text-xs text-gp-frost">“Weekend demand +23% in your zone.”</p>
                </GlassCard>
                <GlassCard className="p-3">
                  <p className="text-[10px] uppercase tracking-wide text-gp-muted">Risk score</p>
                  <p className="mt-1 text-xs text-gp-frost">Stable trajectory · low volatility</p>
                </GlassCard>
              </div>
            </div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 hidden h-24 w-24 rounded-3xl bg-gradient-to-br from-violet-500/40 to-cyan-400/30 blur-2xl lg:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="border-y border-white/10 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gp-muted">
            Trusted at scale
          </p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold sm:text-3xl">
            Real payouts. Real savings. Real emergency relief.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: 'Workers onboarded', v: `${formatCompact(trustStats.workers)}+` },
              { k: 'Payouts processed', v: `₹${formatCompact(trustStats.payouts)}` },
              { k: 'Savings generated', v: `₹${formatCompact(trustStats.savings)}` },
              { k: 'Emergency funds', v: `₹${formatCompact(trustStats.emergency)}` },
            ].map((item) => (
              <GlassCard key={item.k} className="text-center" glow>
                <p className="text-xs text-gp-muted">{item.k}</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{item.v}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Everything your gig career needs.</h2>
          <p className="mt-3 text-gp-muted">
            Premium, minimal, and fast — the operating system for gig workers.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <GlassCard className="group h-full transition hover:-translate-y-1 hover:border-cyan-400/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/40 to-cyan-500/30 text-cyan-200 transition group-hover:scale-105">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-gp-muted">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-gp-muted">
        <p className="font-display text-sm font-semibold text-white">Gigaplex</p>
        <p className="mt-1">Gig workers deserve financial security, stability, and a future.</p>
      </footer>
    </div>
  )
}
