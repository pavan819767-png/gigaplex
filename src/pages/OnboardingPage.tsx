import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/cn'

const steps = ['Profile basics', 'Primary gigs', 'Payout destination', 'Safety preferences']

export function OnboardingPage() {
  const navigate = useNavigate()
  const setStep = useAuthStore((s) => s.setOnboardingStep)
  const step = useAuthStore((s) => s.onboardingStep)
  const [local, setLocal] = useState(step)

  return (
    <div className="mesh-bg flex min-h-screen items-center justify-center p-4">
      <GlassCard className="w-full max-w-lg" glow>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gp-muted">Onboarding</p>
        <h1 className="mt-2 font-display text-2xl font-bold">Let us personalize Gigaplex</h1>
        <div className="mt-6 flex gap-2">
          {steps.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setLocal(i)}
              className={cn(
                'flex-1 rounded-xl border px-2 py-2 text-[10px] font-semibold sm:text-xs',
                local === i
                  ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-100'
                  : 'border-white/10 bg-white/5 text-gp-muted light:border-slate-200 light:bg-slate-50',
              )}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gp-muted light:border-slate-200 light:bg-slate-50 light:text-slate-700">
          {local === 0 && <p>Tell us how you prefer to be paid and contacted — fields are wired in the full form.</p>}
          {local === 1 && <p>Connect at least one gig source to unlock forecasting accuracy.</p>}
          {local === 2 && <p>UPI / bank / wallet — encrypted at rest in production with PCI-aware flows.</p>}
          {local === 3 && <p>Emergency support sensitivity, quiet hours, and wellness check-ins.</p>}
        </div>
        <div className="mt-6 flex justify-between gap-2">
          <Button
            variant="ghost"
            disabled={local === 0}
            onClick={() => setLocal((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {local < steps.length - 1 ? (
            <Button onClick={() => setLocal((s) => s + 1)}>Continue</Button>
          ) : (
            <Button
              className="gap-2"
              onClick={() => {
                setStep(steps.length)
                navigate('/app/dashboard')
              }}
            >
              <Check className="h-4 w-4" /> Enter workspace
            </Button>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
