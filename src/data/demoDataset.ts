/**
 * Deterministic demo dataset for investor-ready UI.
 * Generates 120+ synthetic workers and related records without shipping huge JSON.
 */
import { SAVINGS_RATE } from '@/lib/constants'
import type { PlatformName } from '@/lib/constants'
import type {
  AiPrediction,
  EarningRecord,
  FinancialHealthScores,
  PayoutRecord,
  RewardCoupon,
  SupportRequest,
  User,
  WorkHistoryRow,
} from '@/types'

function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const firstNames = [
  'Aisha',
  'Rohan',
  'Priya',
  'Diego',
  'Yuki',
  'Amara',
  'Liam',
  'Sofia',
  'Arjun',
  'Nia',
  'Omar',
  'Elena',
  'Kwame',
  'Mei',
  'Jonas',
]
const lastNames = [
  'Khan',
  'Verma',
  'Patel',
  'Silva',
  'Tanaka',
  'Hassan',
  'Nguyen',
  'Garcia',
  'Okafor',
  'Kim',
  'Andersen',
  'Rossi',
]

const platforms: PlatformName[] = [
  'Uber',
  'Swiggy',
  'Zomato',
  'Urban Company',
  'Fiverr',
  'Upwork',
  'Amazon Flex',
]

export function generateWorkers(count = 124): User[] {
  const rand = mulberry32(42)
  const out: User[] = []
  for (let i = 0; i < count; i++) {
    const fn = firstNames[Math.floor(rand() * firstNames.length)]
    const ln = lastNames[Math.floor(rand() * lastNames.length)]
    out.push({
      id: `w-${i + 1}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@demo.gigaplex`,
      name: `${fn} ${ln}`,
      role: 'worker',
      phone: `+91 •••• ••${String(Math.floor(rand() * 90 + 10)).padStart(2, '0')}`,
      ratingAvg: Math.round((3 + rand() * 2) * 10) / 10,
      kycStatus: rand() > 0.08 ? 'verified' : 'pending',
      createdAt: new Date(Date.now() - rand() * 86400000 * 400).toISOString(),
    })
  }
  return out
}

export function generateWorkHistory(rows = 220): WorkHistoryRow[] {
  const rand = mulberry32(7)
  const types = ['Ride', 'Delivery', 'Task', 'Consult', 'Shift']
  const list: WorkHistoryRow[] = []
  for (let i = 0; i < rows; i++) {
    const platform = platforms[Math.floor(rand() * platforms.length)]
    const hours = Math.round(rand() * 12 * 10) / 10
    const earnings = Math.round(200 + rand() * 4200)
    const day = new Date(Date.now() - rand() * 86400000 * 45)
    list.push({
      jobId: `GP-${100000 + i}`,
      platform,
      workType: types[Math.floor(rand() * types.length)]!,
      date: day.toISOString().slice(0, 10),
      hoursWorked: hours,
      distanceOrTasks:
        platform === 'Uber' || platform === 'Amazon Flex'
          ? `${(rand() * 42).toFixed(1)} km`
          : `${Math.floor(rand() * 18) + 1} tasks`,
      earnings,
      rating: rand() > 0.05 ? Math.round((3 + rand() * 2) * 10) / 10 : null,
      status: rand() > 0.97 ? 'disputed' : rand() > 0.98 ? 'cancelled' : 'completed',
    })
  }
  return list.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function generatePayouts(n = 48): PayoutRecord[] {
  const rand = mulberry32(99)
  const methods: PayoutRecord['method'][] = ['UPI', 'Bank', 'Wallet']
  const out: PayoutRecord[] = []
  for (let i = 0; i < n; i++) {
    out.push({
      id: `p-${i}`,
      workerId: 'worker-demo',
      amount: Math.round(800 + rand() * 12000),
      method: methods[Math.floor(rand() * methods.length)]!,
      status: rand() > 0.92 ? 'pending' : rand() > 0.98 ? 'failed' : 'completed',
      createdAt: new Date(Date.now() - rand() * 86400000 * 60).toISOString(),
      reference: `GPX-${Math.floor(rand() * 1e12)}`,
    })
  }
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function generateEarnings(n = 80): EarningRecord[] {
  const rand = mulberry32(3)
  const out: EarningRecord[] = []
  for (let i = 0; i < n; i++) {
    const amount = Math.round(120 + rand() * 1800)
    out.push({
      id: `e-${i}`,
      workerId: 'worker-demo',
      platform: platforms[Math.floor(rand() * platforms.length)]!,
      orderId: `ORD-${20000 + i}`,
      amount,
      currency: 'INR',
      completedAt: new Date(Date.now() - rand() * 86400000 * 30).toISOString(),
      savingsContribution: Math.round(amount * SAVINGS_RATE * 100) / 100,
    })
  }
  return out.sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
}

export function generateSupportRequests(): SupportRequest[] {
  const rand = mulberry32(11)
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `sr-${i}`,
    workerId: 'worker-demo',
    amountRequested: [2500, 5000, 7500, 3200, 6000][i]!,
    reason: 'Weekly income below stability threshold',
    status: ['approved', 'review', 'submitted', 'repaying', 'rejected'][i] as SupportRequest['status'],
    aiEligibilityScore: Math.round(55 + rand() * 40),
    createdAt: new Date(Date.now() - (i + 1) * 86400000 * 4).toISOString(),
  }))
}

export function generateRewards(): RewardCoupon[] {
  const now = Date.now()
  return [
    {
      id: 'r1',
      tier: 'Bronze',
      title: 'Grocery partner — 8% off',
      valueLabel: '₹400 max',
      expiresAt: new Date(now + 86400000 * 6).toISOString(),
      claimed: false,
    },
    {
      id: 'r2',
      tier: 'Silver',
      title: 'Fuel — ₹1.5/L cashback',
      valueLabel: 'Up to ₹900',
      expiresAt: new Date(now + 86400000 * 12).toISOString(),
      claimed: false,
    },
    {
      id: 'r3',
      tier: 'Gold',
      title: 'Insurance bundle — 12%',
      valueLabel: 'Partner offer',
      expiresAt: new Date(now + 86400000 * 20).toISOString(),
      claimed: true,
    },
    {
      id: 'r4',
      tier: 'Platinum',
      title: 'Healthcare check-up',
      valueLabel: '1 session',
      expiresAt: new Date(now + 86400000 * 45).toISOString(),
      claimed: false,
    },
  ]
}

export function generateAiPrediction(): AiPrediction {
  return {
    id: 'pred-1',
    workerId: 'worker-demo',
    horizonDays: 14,
    predictedIncome: 42800,
    confidence: 0.86,
    factors: ['Seasonality', 'Weather', 'City demand', 'Your rating momentum'],
    generatedAt: new Date().toISOString(),
  }
}

export function demoFinancialHealth(): FinancialHealthScores {
  return {
    stability: 78,
    burnoutRisk: 34,
    incomeVolatility: 42,
    savingsConsistency: 71,
    debtRisk: 22,
    emergencyPreparedness: 63,
  }
}

export const trustStats = {
  workers: 184_200,
  payouts: 2_420_000_000,
  savings: 318_000_000,
  emergency: 42_600_000,
}

export const sparklineWeek = [12.4, 14.1, 11.8, 15.2, 13.6, 16.9, 14.3].map(
  (v, i) => ({ name: `D${i + 1}`, v: v * 1000 }),
)

export const incomeTrend = Array.from({ length: 12 }).map((_, i) => ({
  name: `W${i + 1}`,
  income: 28000 + Math.sin(i / 2) * 6000 + i * 400,
}))

export const heatmapCells = Array.from({ length: 7 * 6 }).map((_, i) => {
  const col = i % 7
  const row = Math.floor(i / 7)
  const demand = 0.35 + ((col + row * 2) % 5) * 0.12
  return { id: i, col, row, demand }
})
