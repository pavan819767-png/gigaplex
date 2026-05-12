import { Navigate, createBrowserRouter } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAuthStore } from '@/store/authStore'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { DashboardPage } from '@/pages/app/DashboardPage'
import { IntegrationsPage } from '@/pages/app/IntegrationsPage'
import { WorkHistoryPage } from '@/pages/app/WorkHistoryPage'
import { PayoutsPage } from '@/pages/app/PayoutsPage'
import { EmergencySupportPage } from '@/pages/app/EmergencySupportPage'
import { ForecastPage } from '@/pages/app/ForecastPage'
import { RewardsPage } from '@/pages/app/RewardsPage'
import { SavingsVaultPage } from '@/pages/app/SavingsVaultPage'
import { FinancialHealthPage } from '@/pages/app/FinancialHealthPage'
import { CommunityPage } from '@/pages/app/CommunityPage'
import { AdminPage } from '@/pages/app/AdminPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function Protected({ children }: { children: ReactElement }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AdminOnly({ children }: { children: ReactElement }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/app/dashboard" replace />
  return children
}

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    path: '/onboarding',
    element: (
      <Protected>
        <OnboardingPage />
      </Protected>
    ),
  },
  {
    path: '/app',
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'integrations', element: <IntegrationsPage /> },
      { path: 'work-history', element: <WorkHistoryPage /> },
      { path: 'payouts', element: <PayoutsPage /> },
      { path: 'emergency-support', element: <EmergencySupportPage /> },
      { path: 'forecast', element: <ForecastPage /> },
      { path: 'rewards', element: <RewardsPage /> },
      { path: 'savings-vault', element: <SavingsVaultPage /> },
      { path: 'financial-health', element: <FinancialHealthPage /> },
      { path: 'community', element: <CommunityPage /> },
      {
        path: 'admin',
        element: (
          <AdminOnly>
            <AdminPage />
          </AdminOnly>
        ),
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
