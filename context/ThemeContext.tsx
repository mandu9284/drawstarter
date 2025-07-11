'use client'

import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
}
