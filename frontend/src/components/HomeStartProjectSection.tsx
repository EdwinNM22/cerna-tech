import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { CtaBlock } from '@/data/siteContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePinnedScrollSteps } from '@/hooks/usePinnedScrollSteps'
import {
  LENIS_HERO_PARALLAX_BG,
  LENIS_HERO_PARALLAX_FG,
} from '@/lib/lenisHeroLayout'

/** Scroll que consume la escena (en alturas de viewport). */
const START_SCENE_VH = 1.3
/** Progreso en el que el título ya está completamente encendido. */
const TITLE_DONE_AT = 0.68

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/**
 * El título se enciende palabra a palabra con el scroll (reversible) y al
 * terminar aparecen descripción y botones. Misma isla anclada que el resto.
 */
export function HomeStartProjectSection({ cta }: { cta: CtaBlock }) {
  const wrapperRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tailRef = useRef<HTMLDivElement>(null)

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const words = cta.title.split(' ')

  const onProgress = useCallback(
    (p: number) => {
      const n = words.length
      const lit = (p / TITLE_DONE_AT) * (n + 2)
      wordRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(0.16 + 0.84 * clamp01(lit - i))
      })
      const tail = tailRef.current
      if (tail) {
        const t = clamp01((p - (TITLE_DONE_AT - 0.08)) / 0.22)
        tail.style.opacity = String(t)
        tail.style.transform = `translate3d(0, ${(1 - t) * 28}px, 0)`
        tail.style.pointerEvents = t < 0.5 ? 'none' : ''
      }
    },
    [words.length],
  )

  usePinnedScrollSteps(wrapperRef, panelRef, {
    enabled: !reducedMotion,
    steps: 1,
    stepVh: START_SCENE_VH,
    onProgress,
    exitLayers: [
      { ref: bgRef, strength: LENIS_HERO_PARALLAX_BG },
      { ref: fgRef, strength: LENIS_HERO_PARALLAX_FG },
    ],
  })

  return (
    <section ref={wrapperRef} data-header-dark className="dark relative bg-black text-white">
      <div
        ref={panelRef}
        className="relative h-svh w-full overflow-hidden bg-black"
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <img
            src={cta.image}
            alt={cta.imageAlt}
            className="absolute inset-0 size-full scale-110 object-cover opacity-60"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-black via-black/55 to-black"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-[30%] bg-linear-to-b from-black to-transparent"
            aria-hidden
          />
        </div>

        <div
          ref={fgRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-5 will-change-transform md:px-10"
        >
          <div className="mx-auto w-full max-w-5xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05]">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  ref={(el) => {
                    wordRefs.current[i] = el
                  }}
                  className="mr-[0.24em] inline-block"
                >
                  {word}
                </span>
              ))}
            </h2>

            <div ref={tailRef}>
              <p className="mx-auto mt-8 max-w-2xl text-base text-white/80 md:mt-10 md:text-lg md:leading-relaxed">
                {cta.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
                <Button
                  nativeButton={false}
                  render={<Link to={cta.buttonTo} />}
                  size="lg"
                  className="h-11 rounded-xl px-8"
                >
                  {cta.buttonLabel}
                </Button>
                {cta.secondaryButtonLabel && cta.secondaryButtonTo && (
                  <Button
                    nativeButton={false}
                    render={<Link to={cta.secondaryButtonTo} />}
                    variant="outline"
                    size="lg"
                    className="h-11 rounded-xl border-white/35 bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white"
                  >
                    {cta.secondaryButtonLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
