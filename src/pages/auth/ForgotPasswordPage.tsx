import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { useToastStore } from '@/store/toastStore'

export function ForgotPasswordPage() {
  const push = useToastStore((s) => s.push)
  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center p-4">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-center font-display text-2xl font-bold">Reset access</h1>
        <p className="mt-1 text-center text-sm text-gp-muted light:text-slate-600">
          We will email a secure link — demo mode shows a toast only.
        </p>
        <Input className="mt-6" type="email" placeholder="Work email" />
        <Button
          className="mt-4 w-full"
          onClick={() =>
            push({
              kind: 'success',
              title: 'Reset link sent (demo)',
              message: 'Connect transactional email provider for production.',
            })
          }
        >
          Send reset link
        </Button>
        <p className="mt-4 text-center text-xs">
          <Link to="/login" className="text-cyan-300 hover:underline">
            Back to sign in
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
