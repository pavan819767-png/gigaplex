import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 light:from-slate-200 light:via-slate-100 light:to-slate-200',
        className,
      )}
    />
  )
}
