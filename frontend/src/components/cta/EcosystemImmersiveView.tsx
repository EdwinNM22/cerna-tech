import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { solutionEcosystemIntro, solutionEcosystemItems } from '@/data/siteContent'
import { useAnimatedImmersiveFloatIndex } from '@/hooks/useAnimatedImmersiveFloatIndex'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePinnedScrollSteps } from '@/hooks/usePinnedScrollSteps'
import {
  LENIS_HERO_PARALLAX_BG,
  LENIS_HERO_PARALLAX_FG,
} from '@/lib/lenisHeroLayout'
import { sceneCrossfadeOpacity } from '@/lib/sceneCrossfade'

/** pt-4 + h-14 del header fijo del sitio. */
const SITE_HEADER_PX = 84
const MOBILE_SITE_HEADER_PX = 68
/** Scroll que consume la intro y cada escena (en alturas de viewport). */
const ECOSYSTEM_STEP_VH = 0.75

function SceneContentPanel({
  item,
  index,
  compact,
}: {
  item: (typeof solutionEcosystemItems)[number]
  index: number
  /** Pantallas bajas (móviles pequeños): oculta la lista y compacta la tarjeta. */
  compact: boolean
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-10">
      <div>
        <p className="font-mono text-[0.65rem] tracking-[0.24em] text-sky-300/90 uppercase md:text-xs">
          Módulo {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-4xl xl:text-[2.75rem] xl:leading-tight">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-sky-200/90 sm:text-base lg:text-lg">
          {item.tagline}
        </p>
      </div>

      <div
        className={`rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md sm:p-5 lg:p-6 ${compact ? 'p-3' : 'p-4'}`}
      >
        <p
          className={`leading-relaxed text-white/90 lg:text-base ${compact ? 'text-[0.8rem]' : 'text-sm'}`}
        >
          {item.description}
        </p>
        <p className="mt-2 hidden text-sm leading-relaxed text-white/75 sm:block">
          {item.detail}
        </p>
        <ul
          className={`mt-3 space-y-1.5 border-t border-white/10 pt-3 text-sm text-white/80 ${compact ? 'hidden' : ''}`}
        >
          {item.highlights.map((line) => (
            <li key={line} className="flex gap-2">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-400"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
        <Link
          to={item.buttonTo}
          className={`inline-flex rounded-xl bg-white px-5 text-sm font-medium text-slate-950 hover:bg-white/90 sm:mt-6 sm:px-6 sm:py-3 ${compact ? 'mt-3 py-2' : 'mt-4 py-2.5'}`}
        >
          {item.buttonLabel}
        </Link>
      </div>
    </div>
  )
}

export function EcosystemImmersiveView() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bgLayerRef = useRef<HTMLDivElement>(null)
  const fgLayerRef = useRef<HTMLDivElement>(null)
  const [transitionPulse, setTransitionPulse] = useState(0)
  const prevStepRef = useRef(0)
  const narrowViewport = useMediaQuery('(max-width: 767px)')
  const shortViewport = useMediaQuery('(max-height: 740px)')
  const compact = narrowViewport && shortViewport
  const siteHeaderPx = narrowViewport ? MOBILE_SITE_HEADER_PX : SITE_HEADER_PX

  const items = solutionEcosystemItems
  const sceneCount = items.length

  // Paso 0 = intro; pasos 1…n = escenas.
  const { step } = usePinnedScrollSteps(wrapperRef, panelRef, {
    steps: sceneCount + 1,
    stepVh: ECOSYSTEM_STEP_VH,
    exitLayers: [
      { ref: bgLayerRef, strength: LENIS_HERO_PARALLAX_BG },
      { ref: fgLayerRef, strength: LENIS_HERO_PARALLAX_FG },
    ],
  })

  const floatIndex = useAnimatedImmersiveFloatIndex(step)
  const activeIndex = step <= 0 ? 0 : Math.min(sceneCount - 1, step - 1)
  const activeItem = step > 0 ? items[step - 1] : null

  useEffect(() => {
    if (step === prevStepRef.current) return
    prevStepRef.current = step
    setTransitionPulse(1)
    const id = window.setTimeout(() => setTransitionPulse(0), 480)
    return () => window.clearTimeout(id)
  }, [step])

  const storyProgress =
    floatIndex < 0 ? 0 : Math.min(1, floatIndex / Math.max(1, sceneCount - 1))
  const viewportScale = 1 + storyProgress * 0.04

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      aria-label={solutionEcosystemIntro.title}
    >
      <div
        ref={panelRef}
        className="relative h-svh w-full overflow-hidden bg-black"
      >
        <div
          ref={bgLayerRef}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="absolute inset-0 origin-center will-change-transform"
            style={{ transform: `scale(${viewportScale})` }}
          >
            {items.map((item, index) => {
              const opacity = sceneCrossfadeOpacity(index, floatIndex, 0.62)
              const local = Math.min(1, Math.max(0, floatIndex - index + 0.55))
              const scale = 1.16 - local * 0.12
              const pushX = (floatIndex - index) * (narrowViewport ? -2.5 : -4)

              return (
                <div
                  key={item.id}
                  className="pointer-events-none absolute inset-0"
                  style={{ opacity }}
                  aria-hidden={opacity < 0.04}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    style={{
                      transform: `scale(${scale}) translate3d(${pushX}%, 0, 0)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/35"
                    aria-hidden
                  />
                </div>
              )
            })}

            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"
              aria-hidden
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[15] bg-white/10 transition-opacity duration-300"
          style={{ opacity: transitionPulse * 0.35 }}
          aria-hidden
        />

        <div
          ref={fgLayerRef}
          className="absolute inset-0 z-20 will-change-transform"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-linear-to-b from-black/85 to-transparent md:h-36"
            style={{ paddingTop: siteHeaderPx }}
            aria-hidden
          />

          <div
            className="absolute inset-x-0 z-30 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8"
            style={{ top: siteHeaderPx + (narrowViewport ? 12 : 24) }}
          >
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-sky-400 uppercase md:text-xs">
              {solutionEcosystemIntro.eyebrow}
            </p>
            <h2
              className={`mt-2 font-semibold tracking-tight text-white sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-tight ${compact ? 'text-xl' : 'text-2xl'}`}
            >
              {solutionEcosystemIntro.title}
            </h2>
            <AnimatePresence initial={false}>
              {step <= 0 ? (
                <motion.p
                  key="ecosystem-intro-subtitle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 max-w-2xl text-sm text-white/75 sm:mt-4 sm:text-base md:text-lg"
                >
                  {solutionEcosystemIntro.subtitle}
                </motion.p>
              ) : null}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {compact || step > 0 ? null : (
                <motion.p
                  key="ecosystem-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 font-mono text-[0.6rem] tracking-[0.18em] text-white/45 uppercase sm:mt-6 sm:text-[0.65rem] sm:tracking-[0.2em]"
                >
                  Sigue bajando: cada paso cambia la escena
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-40 flex max-h-[min(58vh,520px)] flex-col justify-end overflow-y-auto px-4 pb-6 pt-36 [-webkit-overflow-scrolling:touch] sm:px-8 sm:pb-10 md:max-h-none md:overflow-visible md:px-8 md:pb-10 md:pt-28 lg:px-14 lg:pb-14 xl:px-20">
            <AnimatePresence mode="wait">
              {activeItem && step > 0 ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SceneContentPanel
                    item={activeItem}
                    index={step - 1}
                    compact={compact}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <ol
            className="pointer-events-none absolute right-4 z-50 hidden flex-col items-end gap-3 rounded-2xl bg-black/30 px-4 py-4 backdrop-blur-md md:right-6 md:flex lg:right-10"
            style={{ top: siteHeaderPx + 48 }}
            aria-hidden
          >
            {items.map((item, index) => {
              const on = index === activeIndex && step > 0
              return (
                <li
                  key={item.id}
                  className={`flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-white uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] transition-all duration-500 ${on ? 'opacity-100' : 'opacity-40'}`}
                >
                  <span
                    className={`hidden overflow-hidden whitespace-nowrap transition-all duration-500 xl:inline ${on ? 'max-w-56 opacity-100' : 'max-w-0 opacity-0'}`}
                  >
                    {item.title}
                  </span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span
                    className={`h-px bg-white transition-all duration-500 ${on ? 'w-10' : 'w-4'}`}
                  />
                </li>
              )
            })}
          </ol>

          <div
            className="absolute inset-x-0 bottom-3 z-50 flex justify-center gap-1.5 md:hidden"
            aria-hidden
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="h-1 rounded-full bg-white/30 transition-all duration-500"
                style={{
                  width: index === activeIndex ? 20 : 6,
                  opacity: index === activeIndex ? 1 : 0.45,
                }}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
