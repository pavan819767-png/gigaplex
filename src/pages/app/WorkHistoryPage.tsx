import { useMemo, useState } from 'react'
import { Download, Search } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { PageTransition } from '@/components/layout/PageTransition'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { generateWorkHistory } from '@/data/demoDataset'
import { formatInr } from '@/lib/format'
import { useToastStore } from '@/store/toastStore'
import type { WorkHistoryRow } from '@/types'

const PAGE = 8

export function WorkHistoryPage() {
  const push = useToastStore((s) => s.push)
  const data = useMemo(() => generateWorkHistory(220), [])
  const [q, setQ] = useState('')
  const [platform, setPlatform] = useState<string>('all')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const okP = platform === 'all' || r.platform === platform
      const okQ =
        q.trim() === '' ||
        r.jobId.toLowerCase().includes(q.toLowerCase()) ||
        r.workType.toLowerCase().includes(q.toLowerCase())
      return okP && okQ
    })
  }, [data, q, platform])

  const slice = filtered.slice(page * PAGE, page * PAGE + PAGE)
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))

  const weekly = useMemo(() => {
    const map = new Map<string, number>()
    for (const r of data.slice(0, 80)) {
      map.set(r.date.slice(0, 10), (map.get(r.date.slice(0, 10)) ?? 0) + r.hoursWorked)
    }
    return [...map.entries()]
      .slice(0, 7)
      .map(([name, hours]) => ({ name: name.slice(5), hours: Math.round(hours * 10) / 10 }))
  }, [data])

  const income = useMemo(() => {
    const map = new Map<string, number>()
    for (const r of data.slice(0, 60)) {
      map.set(r.date.slice(0, 7), (map.get(r.date.slice(0, 7)) ?? 0) + r.earnings)
    }
    return [...map.entries()].map(([m, inc]) => ({ m, inc }))
  }, [data])

  const bestCat = useMemo(() => {
    const map = new Map<string, number>()
    for (const r of data) {
      map.set(r.workType, (map.get(r.workType) ?? 0) + r.earnings)
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
  }, [data])

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Work history</h1>
          <p className="text-sm text-gp-muted light:text-slate-600">
            Premium ledger with export-ready rows and smart insights.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Weekly productivity</p>
            <div className="mt-3 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.35} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="hours" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="text-xs font-semibold uppercase tracking-wide text-gp-muted">Insights</p>
            <p className="mt-3 text-sm text-gp-muted light:text-slate-600">
              Best performing category: <span className="font-semibold text-white light:text-gp-matte">{bestCat}</span>
            </p>
            <p className="mt-2 text-sm text-gp-muted light:text-slate-600">
              Income trend (sample window) visualized beside the ledger for reviewer clarity.
            </p>
            <div className="mt-4 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={income}>
                  <XAxis dataKey="m" hide />
                  <Tooltip
                    formatter={(v: number) => formatInr(v)}
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="inc" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gp-muted" />
              <Input className="pl-10" placeholder="Search job ID or work type" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <select
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm light:border-slate-200 light:bg-white"
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value)
                setPage(0)
              }}
            >
              <option value="all">All platforms</option>
              <option>Uber</option>
              <option>Swiggy</option>
              <option>Zomato</option>
              <option>Urban Company</option>
              <option>Fiverr</option>
              <option>Upwork</option>
              <option>Amazon Flex</option>
            </select>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const csv = toCsv(filtered)
                  download('gigaplex-work-history.csv', csv)
                  push({ kind: 'success', title: 'Exported CSV', message: `${filtered.length} rows.` })
                }}
              >
                <Download className="h-4 w-4" /> CSV
              </Button>
              <Button
                variant="ghost"
                className="text-xs"
                onClick={() => push({ kind: 'info', title: 'PDF export', message: 'Wire headless PDF renderer.' })}
              >
                PDF
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-gp-muted light:border-slate-200">
                  {['Job ID', 'Platform', 'Work type', 'Date', 'Hours', 'Dist / tasks', 'Earnings', 'Rating', 'Status'].map(
                    (h) => (
                      <th key={h} className="px-2 py-2 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {slice.map((r: WorkHistoryRow) => (
                  <tr key={r.jobId} className="border-b border-white/5 hover:bg-white/[0.03] light:border-slate-100">
                    <td className="px-2 py-2 font-mono text-xs">{r.jobId}</td>
                    <td className="px-2 py-2">{r.platform}</td>
                    <td className="px-2 py-2">{r.workType}</td>
                    <td className="px-2 py-2">{r.date}</td>
                    <td className="px-2 py-2">{r.hoursWorked}</td>
                    <td className="px-2 py-2">{r.distanceOrTasks}</td>
                    <td className="px-2 py-2 font-semibold">{formatInr(r.earnings)}</td>
                    <td className="px-2 py-2">{r.rating ?? '—'}</td>
                    <td className="px-2 py-2">
                      <Badge tone={r.status === 'completed' ? 'success' : r.status === 'disputed' ? 'warning' : 'neutral'}>
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gp-muted">
            <span>
              Page {page + 1} / {pages} · {filtered.length} rows
            </span>
            <div className="flex gap-2">
              <Button variant="outline" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                Prev
              </Button>
              <Button variant="outline" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}

function toCsv(rows: WorkHistoryRow[]) {
  const header = [
    'jobId',
    'platform',
    'workType',
    'date',
    'hoursWorked',
    'distanceOrTasks',
    'earnings',
    'rating',
    'status',
  ]
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      [
        r.jobId,
        r.platform,
        r.workType,
        r.date,
        r.hoursWorked,
        `"${r.distanceOrTasks}"`,
        r.earnings,
        r.rating ?? '',
        r.status,
      ].join(','),
    )
  }
  return lines.join('\n')
}

function download(name: string, body: string) {
  const blob = new Blob([body], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}
