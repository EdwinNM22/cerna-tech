import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'
import { createLenisOptions } from '@/lib/lenisOptions'
import { shouldUseSmoothScroll } from '@/lib/shouldUseSmoothScroll'

function ScrollProgressBar() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const bar = document.getElementById('lenis-scroll-progress')
    if (!bar) return

    const onScroll = () => {
      bar.style.transform = `scaleX(${lenis.progress})`
    }
    onScroll()
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-transparent"
      aria-hidden
    >
      <div
        id="lenis-scroll-progress"
        className="h-full origin-left scale-x-0 bg-primary transition-none will-change-transform"
      />
    </div>
  )
}

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [enabled] = useState(shouldUseSmoothScroll)
  const [options] = useState(() =>
    createLenisOptions(
      typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches,
    ),
  )

  useEffect(() => {
    document.documentElement.dataset.smoothScroll = enabled ? 'lenis' : 'off'
    return () => {
      delete document.documentElement.dataset.smoothScroll
    }
  }, [enabled])

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={options}>
      <ScrollProgressBar />
      {children}
    </ReactLenis>
  )
}
