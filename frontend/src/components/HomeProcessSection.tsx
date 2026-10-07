import { useCallback, useLayoutEffect, useRef } from 'react'
import type { CtaBlock } from '@/data/siteContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePinnedScrollSteps } from '@/hooks/usePinnedScrollSteps'
import {
  LENIS_HERO_PARALLAX_BG,
  LENIS_HERO_PARALLAX_FG,
} from '@/lib/lenisHeroLayout'

type ProcessStep = { step: string; title: string; text: string }

/** Scroll por fase (en alturas de viewport): el recorrido total escala con el nº de fases. */
const PROCESS_STEP_VH = 0.55

/**
 * Las fases viajan en horizontal ligadas al scroll mientras la sección está
 * anclada. La fase centrada se enciende; la última fase queda centrada al terminar.
 */
export function HomeProcessSection({
  cta,
  steps,
}: {
  cta: CtaBlock
  steps: ProcessStep[]
}) {
  const wrapperRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const bigNumberRef = useRef<HTMLSpanElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const progressRef = useRef(0)
  const activeRef = useRef(-1)
  const metricsRef = useRef({ maxX: 0, viewport: 0, centers: [] as number[] })

  const apply = useCallback((p: number) => {
    progressRef.current = p
    const { maxX, viewport, centers } = metricsRef.current
    const x = -p * maxX
    const track = trackRef.current
    if (track) track.style.transform = `translate3d(${x}px, 0, 0)`
    const bar = barRef.current
    if (bar) bar.style.transform = `scaleX(${p})`

    // Fase cuyo centro queda más cerca del centro del viewport.
    const mid = viewport * 0.5 - x
    let best = 0
    let bestDist = Infinity
    centers.forEach((c, i) => {
      const d = Math.abs(c - mid)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    if (best !== activeRef.current) {
      activeRef.current = best
      cardRefs.current.forEach((el, i) => {
        if (el) el.dataset.active = String(i === best)
      })
      const num = bigNumberRef.current
      if (num) num.textContent = steps[best]?.step ?? ''
    }
  }, [steps])

  useLayoutEffect(() => {
    const track = trackRef.current
    const panel = panelRef.current
    if (!track || !panel || reducedMotion) return

    const measure = () => {
      metricsRef.current = {
        maxX: Math.max(0, track.scrollWidth - panel.clientWidth),
        viewport: panel.clientWidth,
        centers: cardRefs.current.map((el) =>
          el ? el.offsetLeft + el.offsetWidth / 2 : 0,
        ),
      }
      apply(progressRef.current)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    ro.observe(panel)
    return () => ro.disconnect()
  }, [apply, reducedMotion])

  usePinnedScrollSteps(wrapperRef, panelRef, {
    enabled: !reducedMotion,
    steps: steps.length,
    stepVh: PROCESS_STEP_VH,
    onProgress: apply,
    exitLayers: [
      { ref: bgRef, strength: LENIS_HERO_PARALLAX_BG },
      { ref: fgRef, strength: LENIS_HERO_PARALLAX_FG },
    ],
  })

  const cardBase =
    'w-[min(78vw,25rem)] shrink-0 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-[opacity,transform,border-color] duration-500 md:p-7 data-[active=false]:scale-[0.96] data-[active=false]:opacity-45 data-[active=true]:border-sky-400/40'

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
            className="absolute inset-0 size-full scale-110 object-cover opacity-35"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-black via-black/70 to-black"
            aria-hidden
          />
          <span
            ref={bigNumberRef}
            aria-hidden
            className="pointer-events-none absolute right-[4vw] bottom-[6vh] font-semibold leading-none text-white/[0.05] select-none text-[34vw]"
          >
            {steps[0]?.step}
          </span>
        </div>

        <div
          ref={fgRef}
          className="absolute inset-0 z-10 flex flex-col will-change-transform"
        >
          <div className="shrink-0 px-5 pt-24 text-center md:px-10 md:pt-32 md:text-left">
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-sky-400 uppercase md:text-xs">
              Proceso
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              {cta.title}
            </h2>
          </div>

          <div
            className={
              reducedMotion
                ? 'flex min-h-0 flex-1 items-center overflow-x-auto'
                : 'flex min-h-0 flex-1 items-center overflow-hidden'
            }
          >
            <div
              ref={trackRef}
              className="flex w-max items-stretch gap-4 px-[6vw] will-change-transform md:gap-6"
            >
              <div className="flex w-[min(78vw,26rem)] shrink-0 items-center">
                <p className="text-base text-white/80 md:text-lg md:leading-relaxed">
                  {cta.description}
                </p>
              </div>

              {steps.map((item, i) => (
                <article
                  key={item.step}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  data-active={i === 0}
                  className={cardBase}
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-sky-300">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                    {item.text}
                  </p>
                </article>
              ))}

              {/* Permite que la última fase llegue al centro y se encienda. */}
              <div
                aria-hidden
                className="w-[max(0px,calc(50vw-min(39vw,12.5rem)-6vw))] shrink-0"
              />
            </div>
          </div>

          <div className="mx-5 mb-8 h-px shrink-0 bg-white/15 md:mx-10">
            <div
              ref={barRef}
              className="h-full origin-left scale-x-0 bg-sky-400 will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
