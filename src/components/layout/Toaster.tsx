import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/cn'

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto glass flex items-start gap-3 rounded-xl p-4 text-sm shadow-xl',
            t.kind === 'success' && 'border-emerald-500/30',
            t.kind === 'error' && 'border-rose-500/30',
            t.kind === 'info' && 'border-cyan-500/30',
          )}
        >
          {t.kind === 'success' && <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />}
          {t.kind === 'error' && <AlertCircle className="mt-0.5 h-5 w-5 text-rose-400" />}
          {t.kind === 'info' && <Info className="mt-0.5 h-5 w-5 text-cyan-400" />}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gp-frost light:text-gp-matte">{t.title}</p>
            {t.message && (
              <p className="mt-0.5 text-xs text-gp-muted light:text-slate-600">{t.message}</p>
            )}
          </div>
          <button
            type="button"
            className="text-xs text-gp-muted hover:text-gp-frost"
            onClick={() => dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}
