import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

type Theme = 'light' | 'dark'

export function useTheme() {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>('produck.theme', prefersDark ? 'dark' : 'light')
  const [theme, setTheme] = useState<Theme>(storedTheme)

  useEffect(() => {
    setStoredTheme(theme)
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme, setStoredTheme])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}