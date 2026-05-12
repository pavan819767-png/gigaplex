import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { useUiStore } from '@/store/uiStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/cn'

const seedMessages = [
  {
    role: 'assistant' as const,
    text: 'Demand for food delivery may soften next Tuesday based on weather and local events.',
  },
  {
    role: 'assistant' as const,
    text: 'Weekend ride demand in your zone is trending +23%. Consider shifting 2 hours earlier on Friday.',
  },
  {
    role: 'assistant' as const,
    text: 'Suggested savings target this month: ₹5,000 — you are 64% of the way there.',
  },
]

export function AIAssistantFab() {
  const open = useUiStore((s) => s.aiPanelOpen)
  const setOpen = useUiStore((s) => s.setAiPanelOpen)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(seedMessages)

  return (
    <>
      <button
        type="button"
        aria-label="Open Gigaplex AI assistant"
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 text-white shadow-2xl shadow-blue-500/30 ring-2 ring-white/10 transition hover:scale-105 sm:bottom-6 sm:right-6',
          open && 'pointer-events-none opacity-0',
        )}
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-4 right-4 z-50 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-white/10 bg-gp-matte/95 shadow-2xl backdrop-blur-2xl light:border-slate-200 light:bg-white/95"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 light:border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold">Gigaplex AI</span>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 hover:bg-white/10 light:hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-xl px-3 py-2',
                    m.role === 'assistant'
                      ? 'bg-white/5 text-gp-frost light:bg-slate-100 light:text-gp-matte'
                      : 'ml-6 bg-gradient-to-r from-blue-600/40 to-violet-600/40 text-white',
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-white/10 p-3 light:border-slate-200"
              onSubmit={(e) => {
                e.preventDefault()
                if (!input.trim()) return
                setMessages((prev) => [
                  ...prev,
                  { role: 'user' as const, text: input.trim() },
                  {
                    role: 'assistant' as const,
                    text: 'This is a demo assistant. Wire this panel to your model endpoint in production.',
                  },
                ])
                setInput('')
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about income, savings, gigs…"
                className="py-2 text-xs"
              />
              <Button type="submit" className="shrink-0 px-3 py-2 text-xs">
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
