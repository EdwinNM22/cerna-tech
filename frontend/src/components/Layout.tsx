import { useTheme } from 'next-themes'
import { Outlet, useLocation } from 'react-router-dom'
import ClickSpark from '@/components/ClickSpark'
import { cn } from '@/lib/utils'
import { ScrollToTop } from './ScrollToTop'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const { pathname } = useLocation()
  const { resolvedTheme } = useTheme()
  const isHome = pathname === '/'
  const sparkColor = resolvedTheme === 'light' ? '#0a0a0a' : '#ffffff'

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkCount={10}
      sparkRadius={18}
      duration={380}
      className="w-full"
    >
      <div className="flex min-h-svh w-full flex-col overflow-x-hidden">
        <ScrollToTop />
        <Header />
        <main
          className={cn('w-full flex-1', !isHome && 'pt-[5.25rem]')}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}
