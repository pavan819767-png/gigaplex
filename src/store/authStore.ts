import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
  onboardingStep: number
  setSession: (token: string, user: User) => void
  logout: () => void
  setOnboardingStep: (n: number) => void
  /** Demo helper: treat as authenticated without API. */
  demoLogin: (role?: UserRole) => void
}

const demoUser = (role: UserRole): User => ({
  id: role === 'admin' ? 'admin-1' : 'worker-demo',
  email: role === 'admin' ? 'admin@gigaplex.io' : 'you@gigaplex.app',
  name: role === 'admin' ? 'Ops Admin' : 'Aisha Khan',
  role,
  phone: '+91 •••• ••21',
  ratingAvg: 4.7,
  kycStatus: 'verified',
  createdAt: new Date().toISOString(),
})

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      onboardingStep: 0,
      setSession: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null, onboardingStep: 0 }),
      setOnboardingStep: (n) => set({ onboardingStep: n }),
      demoLogin: (role = 'worker') =>
        set({
          token: 'demo-jwt',
          user: demoUser(role),
        }),
    }),
    { name: 'gigaplex-auth' },
  ),
)
