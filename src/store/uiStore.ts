import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface UiState {
  theme: Theme
  sidebarOpen: boolean
  notificationsOpen: boolean
  aiPanelOpen: boolean
  toggleTheme: () => void
  setSidebarOpen: (v: boolean) => void
  toggleSidebar: () => void
  setNotificationsOpen: (v: boolean) => void
  setAiPanelOpen: (v: boolean) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      sidebarOpen: true,
      notificationsOpen: false,
      aiPanelOpen: false,
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        document.body.classList.toggle('light', next === 'light')
        set({ theme: next })
      },
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      setNotificationsOpen: (v) => set({ notificationsOpen: v }),
      setAiPanelOpen: (v) => set({ aiPanelOpen: v }),
    }),
    { name: 'gigaplex-ui' },
  ),
)
