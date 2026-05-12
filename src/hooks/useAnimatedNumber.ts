import { useEffect, useRef, useState } from 'react'

/** Smooth count-up for dashboard metrics. */
export function useAnimatedNumber(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0)
  const fromRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      const eased = 1 - (1 - t) ** 3
      setValue(from + (target - from) * eased)
      if (t < 1) requestAnimationFrame(tick)
      else fromRef.current = target
    }

    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [target, durationMs])

  return value
}
