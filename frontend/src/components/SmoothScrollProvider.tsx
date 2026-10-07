import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'
import { createLenisOptions } from '@/lib/lenisOptions'
import { ensureScrollTrigger, gsap, ScrollTrigger } from '@/lib/gsapScroll'
import { shouldUseSmoothScroll } from '@/lib/shouldUseSmoothScroll'

/**
 * Integración oficial Lenis ↔ GSAP:
 *  - Lenis avanza en `gsap.ticker` (un solo reloj para todo).
 *  - Cada scroll de Lenis actualiza ScrollTrigger.
 *  - lagSmoothing(0) evita saltos de tiempo tras un frame lento.
 */
function LenisGsapSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    ensureScrollTrigger()

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Los pin-spacers cambian la altura del documento: Lenis debe re-medir.
    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
    }
  }, [lenis])

  return null
}

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
  const [options] = useState(createLenisOptions)

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
      <LenisGsapSync />
      <ScrollProgressBar />
      {children}
    </ReactLenis>
  )
}
