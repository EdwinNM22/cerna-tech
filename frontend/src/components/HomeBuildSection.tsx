import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { CtaBlock } from '@/data/siteContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollScene } from '@/hooks/useScrollScene'

/**
 * Texto que entra con el scroll e imágenes que se abren (clip-path) y se
 * desplazan en sentidos opuestos: profundidad sin salir del espacio negro.
 */
export function HomeBuildSection({ cta }: { cta: CtaBlock }) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  useScrollScene(rootRef, { enabled: !reducedMotion })

  const secondary = cta.imageSecondary ?? cta.image

  return (
    <section
      ref={rootRef}
      data-header-dark
      className="dark relative overflow-hidden bg-black py-24 text-white md:py-36"
    >
      <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2
              data-reveal
              className="text-3xl font-semibold tracking-tight text-white md:text-5xl"
            >
              {cta.title}
            </h2>
            <p
              data-reveal
              className="mt-5 text-base text-white/75 md:text-lg md:leading-relaxed"
            >
              {cta.description}
            </p>
            <div data-reveal className="mt-8 md:mt-10">
              <Button
                nativeButton={false}
                render={<Link to={cta.buttonTo} />}
                size="lg"
                className="h-11 rounded-xl px-10"
              >
                {cta.buttonLabel}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-7">
          <div data-parallax="0.14" className="will-change-transform">
            <div
              data-reveal-clip
              className="aspect-[3/4] overflow-hidden rounded-[28px]"
            >
              <img
                src={cta.image}
                alt={cta.imageAlt}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div
            data-parallax="-0.14"
            className="mt-10 will-change-transform sm:mt-16 lg:mt-24"
          >
            <div
              data-reveal-clip
              className="aspect-[3/4] overflow-hidden rounded-[28px]"
            >
              <img
                src={secondary}
                alt={cta.imageSecondaryAlt ?? ''}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
