import type { PlatformName } from '@/lib/constants'

export type UserRole = 'worker' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  ratingAvg: number
  kycStatus: 'pending' | 'verified' | 'rejected'
  createdAt: string
}

export interface EarningRecord {
  id: string
  workerId: string
  platform: PlatformName
  orderId: string
  amount: number
  currency: string
  completedAt: string
  savingsContribution: number
}

export interface PayoutRecord {
  id: string
  workerId: string
  amount: number
  method: 'UPI' | 'Bank' | 'Wallet'
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  reference: string
}

export interface SupportRequest {
  id: string
  workerId: string
  amountRequested: number
  reason: string
  status: 'draft' | 'submitted' | 'review' | 'approved' | 'rejected' | 'repaying'
  aiEligibilityScore: number
  createdAt: string
}

export interface SavingsAccount {
  workerId: string
  balance: number
  lifetimeContributed: number
  lastContributionAt: string | null
}

export interface RewardCoupon {
  id: string
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  title: string
  valueLabel: string
  expiresAt: string
  claimed: boolean
}

export interface WorkHistoryRow {
  jobId: string
  platform: PlatformName
  workType: string
  date: string
  hoursWorked: number
  distanceOrTasks: string
  earnings: number
  rating: number | null
  status: 'completed' | 'cancelled' | 'disputed'
}

export interface PlatformIntegration {
  platform: PlatformName
  connected: boolean
  earningsWeek: number
  activeJobs: number
  rating: number
  weeklyHours: number
  lastPayoutAt: string | null
}

export interface AiPrediction {
  id: string
  workerId: string
  horizonDays: number
  predictedIncome: number
  confidence: number
  factors: string[]
  generatedAt: string
}

export interface FinancialHealthScores {
  stability: number
  burnoutRisk: number
  incomeVolatility: number
  savingsConsistency: number
  debtRisk: number
  emergencyPreparedness: number
}

export interface AdminMetrics {
  activeWorkers: number
  flaggedFraud: number
  openSupport: number
  pendingPayouts: number
}
