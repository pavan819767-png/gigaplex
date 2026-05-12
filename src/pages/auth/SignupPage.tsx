import { Link, useNavigate } from 'react-router-dom'
import { Fingerprint, Chrome, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'

export function SignupPage() {
  const navigate = useNavigate()
  const demoLogin = useAuthStore((s) => s.demoLogin)
  const push = useToastStore((s) => s.push)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center p-4">
      <GlassCard className="w-full max-w-md" glow>
        <h1 className="text-center font-display text-2xl font-bold">Create your Gigaplex ID</h1>
        <p className="mt-1 text-center text-sm text-gp-muted light:text-slate-600">
          One account for savings, support, and AI guidance.
        </p>
        <div className="mt-6 space-y-3">
          <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Create password" />
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-500/5 p-3 text-xs text-gp-muted">
          <div className="flex items-center gap-2 font-semibold text-cyan-200">
            <Fingerprint className="h-4 w-4" />
            Aadhaar / ID verification
          </div>
          <p className="mt-1">
            KYC UI is ready — connect your identity provider and document capture pipeline for production.
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => push({ kind: 'info', title: 'Google', message: 'OAuth placeholder.' })}
          >
            <Chrome className="h-4 w-4" /> Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => push({ kind: 'info', title: 'Phone OTP', message: 'SMS OTP placeholder.' })}
          >
            <Phone className="h-4 w-4" /> Phone
          </Button>
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            demoLogin('worker')
            push({ kind: 'success', title: 'Account ready (demo)', message: 'Complete onboarding next.' })
            navigate('/onboarding')
          }}
        >
          Continue
        </Button>
        <p className="mt-4 text-center text-xs text-gp-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-300 hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
