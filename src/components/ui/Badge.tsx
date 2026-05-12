import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'info'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        tone === 'neutral' && 'bg-white/10 text-gp-frost light:bg-slate-200 light:text-slate-800',
        tone === 'success' && 'bg-emerald-500/15 text-emerald-300 light:text-emerald-800',
        tone === 'warning' && 'bg-amber-500/15 text-amber-200 light:text-amber-900',
        tone === 'info' && 'bg-cyan-500/15 text-cyan-200 light:text-cyan-900',
        className,
      )}
    >
      {children}
    </span>
  )
}
