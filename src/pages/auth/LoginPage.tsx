import { Link, useNavigate } from 'react-router-dom'
import { Chrome, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'

export function LoginPage() {
  const navigate = useNavigate()
  const demoLogin = useAuthStore((s) => s.demoLogin)
  const push = useToastStore((s) => s.push)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center p-4">
      <GlassCard className="w-full max-w-md" glow>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gp-muted">
          Gigaplex
        </p>
        <h1 className="mt-2 text-center font-display text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-gp-muted light:text-slate-600">
          Sign in to your worker workspace.
        </p>
        <div className="mt-6 space-y-3">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            className="flex-1 gap-2"
            variant="outline"
            onClick={() => push({ kind: 'info', title: 'Google sign-in', message: 'Wire OAuth in production.' })}
          >
            <Chrome className="h-4 w-4" /> Google
          </Button>
          <Button
            className="flex-1 gap-2"
            variant="outline"
            onClick={() => push({ kind: 'info', title: 'Phone OTP', message: 'Connect Firebase Auth / Twilio Verify.' })}
          >
            <Phone className="h-4 w-4" /> Phone OTP
          </Button>
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            demoLogin('worker')
            push({ kind: 'success', title: 'Signed in', message: 'Demo session — connect JWT API when ready.' })
            navigate('/app/dashboard')
          }}
        >
          Continue (demo worker)
        </Button>
        <Button
          variant="ghost"
          className="mt-2 w-full text-xs text-gp-muted"
          onClick={() => {
            demoLogin('admin')
            push({ kind: 'success', title: 'Admin session', message: 'Elevated role for console preview.' })
            navigate('/app/admin')
          }}
        >
          Admin preview login
        </Button>
        <p className="mt-4 text-center text-xs text-gp-muted">
          <Link to="/forgot-password" className="underline hover:text-white light:hover:text-gp-matte">
            Forgot password?
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-gp-muted">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-cyan-300 hover:underline">
            Create account
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
