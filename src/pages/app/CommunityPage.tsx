import { MessageCircle, Sparkles, Users, Heart } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/store/toastStore'

const threads = [
  { title: 'Tips for safer night shifts', replies: 128, tag: 'Safety' },
  { title: 'Tax filing for multi-platform gigs', replies: 342, tag: 'Finance' },
  { title: 'Burnout check-in thread — this week', replies: 89, tag: 'Wellness' },
]

export function CommunityPage() {
  const push = useToastStore((s) => s.push)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Community & support</h1>
          <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
            Peer groups, career resources, and AI-guided help — moderated with care.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-300" />
              <p className="font-semibold">Peer groups</p>
            </div>
            <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
              City-based circles for rides, delivery, and home services — share routes, not rivalry.
            </p>
            <Button className="mt-4 w-full" variant="outline" onClick={() => push({ kind: 'info', title: 'Join', message: 'Moderation + membership rules here.' })}>
              Browse groups
            </Button>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-300" />
              <p className="font-semibold">AI support</p>
            </div>
            <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
              Instant answers on payouts, savings, and benefits — escalates to humans when you need it.
            </p>
            <Button className="mt-4 w-full" onClick={() => push({ kind: 'info', title: 'AI chat', message: 'Use the floating assistant.' })}>
              Open assistant
            </Button>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-300" />
              <p className="font-semibold">Mental wellness</p>
            </div>
            <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
              Short grounding exercises, crisis lines, and opt-in check-ins — never performative, always optional.
            </p>
            <Button className="mt-4 w-full" variant="outline" onClick={() => push({ kind: 'success', title: 'Resources', message: 'Curated partner list (demo).' })}>
              View resources
            </Button>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-300" />
            <p className="font-semibold">Forum highlights</p>
          </div>
          <div className="mt-4 space-y-3">
            {threads.map((t) => (
              <div
                key={t.title}
                className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center light:border-slate-200 light:bg-slate-50"
              >
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-gp-muted">{t.replies} replies · {t.tag}</p>
                </div>
                <Button variant="ghost" className="text-xs" onClick={() => push({ kind: 'info', title: t.title, message: 'Forum thread stub.' })}>
                  Open
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}
