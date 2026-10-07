import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { ensureScrollTrigger, gsap, ScrollTrigger } from '@/lib/gsapScroll'
import { shouldUseSmoothScroll } from '@/lib/shouldUseSmoothScroll'

export type ExitParallaxLayer = {
  /** Capa interior (nunca el panel anclado: ScrollTrigger usa su transform). */
  ref: RefObject<HTMLElement | null>
  /** Misma escala que el hero: fondo 0.22, contenido 0.45. */
  strength: number
}

type UsePinnedScrollStepsOptions = {
  enabled?: boolean
  /** Número de pasos discretos (portafolio: paneles; ecosistema: intro + escenas). */
  steps: number
  /** Scroll que consume cada paso, en alturas de viewport. */
  stepVh?: number
  /** Parallax de salida (idéntico al del hero cuando se va). Solo con Lenis. */
  exitLayers?: ExitParallaxLayer[]
  /**
   * Progreso continuo 0→1 del pin, sin pasar por React (escribe estilos directo).
   * Se llama en cada frame de scroll y al medir/refrescar.
   */
  onProgress?: (progress: number) => void
}

/**
 * Isla anclada dirigida por el scroll (patrón oficial Lenis + ScrollTrigger).
 *
 * - No se detiene Lenis, no se intercepta la rueda y no se hace scrollTo:
 *   el usuario siempre scrollea con la misma inercia que en el resto de la página.
 * - El paso activo es función del progreso del scroll → totalmente reversible.
 * - Al terminar el último paso el pin se suelta y la siguiente sección sube
 *   por scroll natural, igual que Hero → Portafolio. Sin tramos muertos: la
 *   distancia del pin es exactamente `steps * stepVh` viewports.
 */
export function usePinnedScrollSteps(
  wrapperRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    steps,
    stepVh = 0.7,
    exitLayers = [],
    onProgress,
  }: UsePinnedScrollStepsOptions,
) {
  const [step, setStep] = useState(0)
  const layersRef = useRef<ExitParallaxLayer[]>([])
  const progressRef = useRef<UsePinnedScrollStepsOptions['onProgress']>(undefined)

  useLayoutEffect(() => {
    layersRef.current = exitLayers
    progressRef.current = onProgress
  })

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const panel = panelRef.current
    if (!enabled || steps < 1 || !wrapper || !panel) return

    ensureScrollTrigger()
    const withParallax = shouldUseSmoothScroll()
    const lastStep = steps - 1
    const toStep = (progress: number) =>
      Math.min(lastStep, Math.max(0, Math.floor(progress * steps)))

    const applyExit = (progress: number) => {
      const vh = window.innerHeight
      for (const { ref, strength } of layersRef.current) {
        const el = ref.current
        if (!el) continue
        el.style.transform =
          progress <= 0 ? '' : `translate3d(0, ${progress * vh * strength}px, 0)`
      }
    }

    const ctx = gsap.context(() => {
      const pin = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${Math.round(steps * stepVh * window.innerHeight)}`,
        pin: panel,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setStep(toStep(self.progress))
          progressRef.current?.(self.progress)
        },
        onRefresh: (self) => progressRef.current?.(self.progress),
        onLeave: () => {
          setStep(lastStep)
          progressRef.current?.(1)
        },
        onLeaveBack: () => {
          setStep(0)
          progressRef.current?.(0)
        },
      })

      if (withParallax) {
        // Tramo de salida: el panel se va durante 1 viewport, como el hero.
        ScrollTrigger.create({
          start: () => pin.end,
          end: () => pin.end + window.innerHeight,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyExit(self.progress),
          onLeave: () => applyExit(1),
          onLeaveBack: () => applyExit(0),
        })
      }
    }, wrapper)

    return () => {
      ctx.revert()
      applyExit(0)
    }
  }, [enabled, steps, stepVh, wrapperRef, panelRef])

  return { step }
}
