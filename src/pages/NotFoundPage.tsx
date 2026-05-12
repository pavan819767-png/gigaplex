import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export function NotFoundPage() {
  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center p-6">
      <GlassCard className="max-w-md text-center">
        <p className="text-sm font-semibold text-cyan-300">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold">This view is not wired yet.</h1>
        <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
          The Gigaplex shell is live — this path is outside the product map.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Back home</Button>
        </Link>
      </GlassCard>
    </div>
  )
}
