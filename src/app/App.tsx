import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { Toaster } from '@/components/layout/Toaster'
import { useUiStore } from '@/store/uiStore'

export default function App() {
  const theme = useUiStore((s) => s.theme)

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
