import { useTheme } from 'next-themes'
import { Outlet, useLocation } from 'react-router-dom'
import ClickSpark from '@/components/ClickSpark'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'
import { cn } from '@/lib/utils'
import { ScrollToTop } from './ScrollToTop'
import { Footer } from './Footer'
import { Header } from './Header'

function LayoutShell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-svh w-full flex-col overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main className={cn('w-full flex-1', !isHome && 'pt-[5.25rem]')}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function Layout() {
  const { resolvedTheme } = useTheme()
  const reduceEffects = usePrefersReducedEffects()
  const sparkColor = resolvedTheme === 'light' ? '#0a0a0a' : '#ffffff'

  if (reduceEffects) {
    return <LayoutShell />
  }

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkCount={10}
      sparkRadius={18}
      duration={380}
      className="w-full"
    >
      <LayoutShell />
    </ClickSpark>
  )
}
