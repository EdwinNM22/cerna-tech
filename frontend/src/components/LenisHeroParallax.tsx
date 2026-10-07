import { useLenis } from 'lenis/react'
import { useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { shouldUseSmoothScroll } from '@/lib/shouldUseSmoothScroll'

type LenisHeroParallaxProps = {
  children: ReactNode
  className?: string
  strength?: number
  /** Desvanece la capa al alejarse del tope (se va con el scroll, no se corta). */
  fadeOut?: boolean
}

/** Capa del hero que se desplaza con el scroll suave de Lenis. */
export function LenisHeroParallax({
  children,
  className,
  strength = 0.35,
  fadeOut = false,
}: LenisHeroParallaxProps) {
  const [parallaxEnabled] = useState(() => shouldUseSmoothScroll())
  const layerRef = useRef<HTMLDivElement>(null)

  useLenis(
    (lenis) => {
      if (!parallaxEnabled) return
      const el = layerRef.current
      if (!el) return
      const y = lenis.scroll * strength
      el.style.transform = `translate3d(0, ${y}px, 0)`
      if (fadeOut) {
        const t = Math.min(1, Math.max(0, lenis.scroll / (window.innerHeight * 0.7)))
        el.style.opacity = String(1 - t * t)
      }
    },
    [parallaxEnabled, strength, fadeOut],
    0,
  )

  if (!parallaxEnabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={layerRef}
      className={cn('will-change-transform', className)}
    >
      {children}
    </div>
  )
}
