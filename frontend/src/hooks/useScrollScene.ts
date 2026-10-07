import { useLayoutEffect, type RefObject } from 'react'
import { ensureScrollTrigger, gsap } from '@/lib/gsapScroll'
import { shouldUseSmoothScroll } from '@/lib/shouldUseSmoothScroll'

/**
 * Escena reactiva al scroll para secciones que NO se anclan.
 * Todo va ligado al scroll (scrub): se revierte al subir, nunca depende de tiempo,
 * y usa el mismo reloj (Lenis + gsap.ticker) que las islas ancladas.
 *
 * Marcadores (atributos data-*) dentro de la sección:
 *  - data-parallax="0.22"      capa vertical; misma escala que el hero (negativo = sentido contrario).
 *  - data-parallax-x="6"       deriva horizontal en vw a lo largo de la sección.
 *  - data-reveal               entra con fundido + desplazamiento ligado al scroll.
 *  - data-reveal-clip          imagen que se "abre" (clip-path) ligada al scroll.
 */
export function useScrollScene(
  rootRef: RefObject<HTMLElement | null>,
  { enabled = true }: { enabled?: boolean } = {},
) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !enabled) return

    ensureScrollTrigger()
    const parallax = shouldUseSmoothScroll()

    const ctx = gsap.context(() => {
      const across = {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      }

      if (parallax) {
        root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const strength = parseFloat(el.dataset.parallax ?? '0.22')
          gsap.fromTo(
            el,
            { y: () => -strength * window.innerHeight * 0.5 },
            {
              y: () => strength * window.innerHeight * 0.5,
              ease: 'none',
              scrollTrigger: across,
            },
          )
        })

        root.querySelectorAll<HTMLElement>('[data-parallax-x]').forEach((el) => {
          const vw = parseFloat(el.dataset.parallaxX ?? '6')
          gsap.fromTo(
            el,
            { xPercent: 0, x: () => -vw * (window.innerWidth / 100) },
            {
              x: () => vw * (window.innerWidth / 100),
              ease: 'none',
              scrollTrigger: across,
            },
          )
        })
      }

      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              // clamp(): si el elemento está al final del documento, el reveal
              // igualmente llega al 100 % con el scroll máximo.
              start: 'clamp(top 94%)',
              end: 'clamp(top 62%)',
              scrub: true,
            },
          },
        )
      })

      root.querySelectorAll<HTMLElement>('[data-reveal-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'clamp(top 96%)',
              end: 'clamp(top 40%)',
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [rootRef, enabled])
}
