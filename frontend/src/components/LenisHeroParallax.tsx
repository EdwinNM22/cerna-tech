import { useLenis } from 'lenis/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type LenisHeroParallaxProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/** Capa del hero que se desplaza con el scroll suave de Lenis. */
export function LenisHeroParallax({
  children,
  className,
  strength = 0.35,
}: LenisHeroParallaxProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useLenis(
    (lenis) => {
      const el = layerRef.current
      if (!el) return
      const y = lenis.scroll * strength
      el.style.transform = `translate3d(0, ${y}px, 0)`
    },
    [],
    0,
  )

  return (
    <div
      ref={layerRef}
      className={cn('will-change-transform', className)}
    >
      {children}
    </div>
  )
}
