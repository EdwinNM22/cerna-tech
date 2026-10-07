import { useTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
  onHero?: boolean
}

export function ThemeToggle({ className, onHero }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <span
        className={cn(
          'inline-flex size-10 shrink-0 rounded-xl border border-transparent',
          className,
        )}
        aria-hidden
      />
    )
  }

  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      duration={500}
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors [&_svg]:size-[1.15rem]',
        onHero
          ? 'border-white/20 text-white hover:bg-white/10'
          : 'border-border text-foreground hover:bg-muted',
        className,
      )}
      aria-label={
        theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'
      }
    />
  )
}
