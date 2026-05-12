import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  loading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-50',
        variant === 'primary' &&
          'bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25',
        variant === 'ghost' &&
          'bg-white/5 text-gp-frost hover:bg-white/10 light:bg-slate-900/5 light:text-gp-matte light:hover:bg-slate-900/10',
        variant === 'outline' &&
          'border border-white/15 bg-transparent text-gp-frost hover:border-cyan-400/50 light:border-slate-300 light:text-gp-matte',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-500',
        className,
      )}
      {...props}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
