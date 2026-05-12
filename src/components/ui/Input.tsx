import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gp-frost outline-none ring-cyan-400/40 placeholder:text-gp-muted focus:ring-2 light:border-slate-200 light:bg-white light:text-gp-matte',
        className,
      )}
      {...props}
    />
  )
}
