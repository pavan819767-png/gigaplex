import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

/** Glassmorphism surface — core layout primitive. */
export function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-5 sm:p-6 relative overflow-hidden',
        glow && 'shadow-[0_0_60px_rgba(59,130,246,0.12)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
