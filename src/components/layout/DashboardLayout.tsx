import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  Activity,
  Brain,
  Coins,
  Gift,
  HeartPulse,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Moon,
  PiggyBank,
  Shield,
  Sun,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { useUiStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/cn'
import { AIAssistantFab } from '@/components/layout/AIAssistantPanel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const nav = [
  { to: '/app/dashboard', label: 'Command Center', icon: LayoutDashboard },
  { to: '/app/integrations', label: 'Gig Integrations', icon: Link2 },
  { to: '/app/work-history', label: 'Work History', icon: Activity },
  { to: '/app/payouts', label: 'Payouts', icon: Wallet },
  { to: '/app/emergency-support', label: 'Emergency Support', icon: HeartPulse },
  { to: '/app/forecast', label: 'AI Forecast', icon: Brain },
  { to: '/app/rewards', label: 'Rewards Center', icon: Gift },
  { to: '/app/savings-vault', label: 'Savings Vault', icon: PiggyBank },
  { to: '/app/financial-health', label: 'Financial Health', icon: Coins },
  { to: '/app/community', label: 'Community', icon: Users },
]

export function DashboardLayout() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const theme = useUiStore((s) => s.theme)
  const toggleTheme = useUiStore((s) => s.toggleTheme)
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen)

  const sidebar = (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-gp-matte/90 p-4 backdrop-blur-xl transition-transform light:border-slate-200 light:bg-white/90 lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center justify-between gap-2 px-2 py-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Gigaplex
          </span>
        </button>
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-white/10 lg:hidden light:hover:bg-slate-100"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <p className="px-2 pb-4 text-xs text-gp-muted light:text-slate-500">
        The operating system for gig workers.
      </p>
      <nav className="space-y-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/10 text-white light:text-gp-matte'
                  : 'text-gp-muted hover:bg-white/5 hover:text-gp-frost light:hover:bg-slate-100',
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0 opacity-80" />
            {item.label}
          </NavLink>
        ))}
        {user?.role === 'admin' && (
          <NavLink
            to="/app/admin"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-violet-600/30 to-rose-500/10 text-white light:text-gp-matte'
                  : 'text-gp-muted hover:bg-white/5 hover:text-gp-frost light:hover:bg-slate-100',
              )
            }
          >
            <Shield className="h-4 w-4 shrink-0 opacity-80" />
            Admin Console
          </NavLink>
        )}
      </nav>
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="glass rounded-xl p-3 text-xs">
          <p className="font-semibold text-gp-frost light:text-gp-matte">{user?.name}</p>
          <p className="truncate text-gp-muted">{user?.email}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge tone="info">{user?.role === 'admin' ? 'Admin' : 'Worker'}</Badge>
            <Badge tone="success">KYC {user?.kycStatus}</Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-gp-muted"
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )

  return (
    <div className="mesh-bg min-h-screen">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex min-h-screen">
        {sidebar}
        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-gp-matte/70 px-4 py-3 backdrop-blur-xl light:border-slate-200 light:bg-white/80">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl p-2 hover:bg-white/10 lg:hidden light:hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs uppercase tracking-widest text-gp-muted">Workspace</p>
                <p className="font-display text-sm font-semibold sm:text-base">
                  Securing your gig income
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="hidden px-3 sm:inline-flex"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Badge tone="success">Live sync</Badge>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
      <AIAssistantFab />
    </div>
  )
}
