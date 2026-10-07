import { useRef } from 'react'
import { TechLogoLoop } from '@/components/TechLogoLoop'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'
import { useScrollScene } from '@/hooks/useScrollScene'
import { LENIS_HERO_PARALLAX_BG } from '@/lib/lenisHeroLayout'

/**
 * Escena de tecnologías: mismo espacio negro que el ecosistema, con dos filas
 * que derivan en sentidos opuestos según el scroll (no según el tiempo).
 */
export function HomeTechSection() {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const reduceEffects = usePrefersReducedEffects()

  useScrollScene(rootRef, { enabled: !reducedMotion })

  return (
    <section
      ref={rootRef}
      id="tecnologias"
      data-header-dark
      className="dark relative flex min-h-[78svh] w-full flex-col justify-center overflow-hidden bg-black py-24 text-white md:py-32"
      aria-labelledby="home-tech-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        data-parallax={LENIS_HERO_PARALLAX_BG}
        aria-hidden
      >
        <div className="absolute inset-x-0 top-1/4 mx-auto h-[28rem] max-w-4xl rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        <p
          id="home-tech-heading"
          data-reveal
          className="text-center font-mono text-[0.65rem] tracking-[0.28em] text-sky-400 uppercase md:text-xs"
        >
          Tecnologías de desarrollo web
        </p>
        <p
          data-reveal
          className="mx-auto mt-5 max-w-xl text-center text-base text-white/75 md:text-lg"
        >
          Stack moderno para sitios rápidos, apps escalables e integraciones
          confiables — el mismo criterio que aplicamos en cada módulo de arriba.
        </p>
      </div>

      <div className="relative z-10 mt-14 space-y-8 md:mt-20 md:space-y-10">
        <div className="-mx-[7vw]" data-parallax-x="5">
          <TechLogoLoop
            className="w-full"
            logoHeight={reduceEffects ? 32 : 46}
            speed={reduceEffects ? 30 : 70}
            fadeOutColor="#000000"
          />
        </div>
        <div className="-mx-[7vw]" data-parallax-x="-5">
          <TechLogoLoop
            className="w-full"
            logoHeight={reduceEffects ? 32 : 46}
            speed={reduceEffects ? 30 : 70}
            direction="right"
            fadeOutColor="#000000"
          />
        </div>
      </div>
    </section>
  )
}
