"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
  attribute?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  enableSystem = true,
  attribute = "data-theme",
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (disableTransitionOnChange) {
      root.classList.add("transition-none")
      window.setTimeout(() => {
        root.classList.remove("transition-none")
      }, 0)
    }

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      root.style.colorScheme = systemTheme
      root.setAttribute(attribute, systemTheme)
    } else {
      root.classList.add(theme)
      root.style.colorScheme = theme
      root.setAttribute(attribute, theme)
    }
  }, [theme, enableSystem, attribute, disableTransitionOnChange])

  useEffect(() => {
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (theme === "system" && enableSystem) {
        const root = window.document.documentElement
        const systemTheme = e.matches ? "dark" : "light"
        root.classList.remove("light", "dark")
        root.classList.add(systemTheme)
        root.style.colorScheme = systemTheme
        root.setAttribute(attribute, systemTheme)
      }
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", handleMediaChange)

    return () => media.removeEventListener("change", handleMediaChange)
  }, [theme, enableSystem, attribute])

  useEffect(() => {
    if (storageKey) {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          setTheme(stored as Theme)
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error)
      }
    }
  }, [storageKey])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, newTheme)
        } catch (error) {
          console.error("Error accessing localStorage:", error)
        }
      }
    },
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
