import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'cerna-theme'
const THEMES = ['light', 'dark', 'system'] as const

type ThemeName = (typeof THEMES)[number]

type ThemeContextValue = {
  themes: string[]
  theme?: string
  setTheme: (theme: string) => void
  resolvedTheme?: string
  systemTheme?: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function resolveTheme(theme: ThemeName): 'light' | 'dark' {
  return theme === 'system' ? readSystemTheme() : theme
}

function applyThemeToDocument(resolved: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

type ThemeProviderProps = {
  children: ReactNode
}

/** Tema sin `<script>` inline (compatible con React 19). */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string | undefined>(undefined)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark' | undefined>(
    undefined,
  )
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
    readSystemTheme(),
  )

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const initial: ThemeName =
      stored === 'light' || stored === 'dark' || stored === 'system'
        ? stored
        : 'system'

    const resolved = resolveTheme(initial)
    applyThemeToDocument(resolved)
    setThemeState(initial)
    setResolvedTheme(resolved)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      const next = readSystemTheme()
      setSystemTheme(next)
      setThemeState((current) => {
        if (current === 'system' || !current) {
          applyThemeToDocument(next)
          setResolvedTheme(next)
        }
        return current
      })
    }

    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [])

  const setTheme = useCallback((next: string) => {
    const value: ThemeName =
      next === 'light' || next === 'dark' || next === 'system' ? next : 'system'
    localStorage.setItem(STORAGE_KEY, value)
    const resolved = resolveTheme(value)
    applyThemeToDocument(resolved)
    setThemeState(value)
    setResolvedTheme(resolved)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      themes: [...THEMES],
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
    }),
    [theme, setTheme, resolvedTheme, systemTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return ctx
}
