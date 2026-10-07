import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import AccordionGallery from '@/components/AccordionGallery'
import { usePinnedScrollSteps } from '@/hooks/usePinnedScrollSteps'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { serviceGalleryItems } from '@/data/accordionGalleryItems'
import {
  LENIS_HERO_PARALLAX_BG,
  LENIS_HERO_PARALLAX_FG,
} from '@/lib/lenisHeroLayout'

/** Scroll que consume cada panel (en alturas de viewport). */
const PORTFOLIO_STEP_VH = 0.6

export function HomePortfolioSection() {
  const wrapperRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headingLayerRef = useRef<HTMLDivElement>(null)
  const galleryLayerRef = useRef<HTMLDivElement>(null)

  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const narrowViewport = useMediaQuery('(max-width: 767px)')
  const shortViewport = useMediaQuery('(max-height: 740px)')
  const compact = narrowViewport && shortViewport
  const itemCount = serviceGalleryItems.length
  const scrollDriven = !reducedMotion

  const { step } = usePinnedScrollSteps(wrapperRef, panelRef, {
    enabled: scrollDriven,
    steps: itemCount,
    stepVh: PORTFOLIO_STEP_VH,
    exitLayers: [
      { ref: galleryLayerRef, strength: LENIS_HERO_PARALLAX_BG },
      { ref: headingLayerRef, strength: LENIS_HERO_PARALLAX_FG },
    ],
  })

  return (
    <section
      ref={wrapperRef}
      className="relative isolate w-full overflow-hidden border-b border-border"
    >
      <div
        ref={panelRef}
        className="relative flex h-svh w-full flex-col overflow-hidden bg-background"
      >
        <div
          ref={headingLayerRef}
          className={`relative z-20 shrink-0 px-5 will-change-transform ${compact ? 'pb-3 pt-[80px]' : 'pb-4 pt-[84px]'} md:pointer-events-none md:absolute md:inset-x-0 md:top-0 md:bg-linear-to-b md:from-background md:via-background/55 md:to-transparent md:px-8 md:pb-20 md:pt-14`}
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-primary uppercase md:text-xs">
              Portafolio
            </p>
            <h2
              className={`mt-3 font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl ${compact ? 'text-2xl' : 'text-3xl'}`}
            >
              Soluciones que desarrollamos
            </h2>
            <p
              className={`mt-4 text-sm text-muted-foreground transition-opacity duration-500 md:text-base ${compact ? 'hidden' : ''} ${scrollDriven && step > 0 ? 'opacity-0' : ''}`}
            >
              {reducedMotion ? (
                <>
                  <span className="md:hidden">
                    Toca cada tarjeta para ver sitios, apps, tiendas e integraciones.
                  </span>
                  <span className="hidden md:inline">
                    Pasa el cursor o el foco por cada panel para ver sitios, apps,
                    tiendas e integraciones.
                  </span>
                </>
              ) : (
                <>Sigue bajando: cada paso cambia de panel.</>
              )}
            </p>
          </div>
        </div>

        <div
          ref={galleryLayerRef}
          className="relative min-h-0 flex-1 pt-2 will-change-transform md:pt-0"
        >
          <AccordionGallery
            items={serviceGalleryItems}
            defaultIndex={0}
            activeIndex={scrollDriven ? step : undefined}
            orientation={narrowViewport ? 'vertical' : 'horizontal'}
            immersive={!narrowViewport}
            fillContainer
            expandRatio={narrowViewport ? 0.55 : 0.58}
            gap={narrowViewport ? 8 : 6}
            radius={narrowViewport ? 16 : 0}
            height={narrowViewport ? 360 : 460}
            accentColor="#60a5fa"
            overlayColor="#020617"
            trigger={reducedMotion ? 'click' : 'none'}
            parallax={narrowViewport ? 0 : 0.65}
            tilt={narrowViewport ? 0 : 8}
            grayscale={!narrowViewport}
            duration={0.55}
            className={
              narrowViewport
                ? `h-full w-full px-4 pb-4 sm:px-6 ${compact ? '[&>*]:!min-h-[52px]' : ''}`
                : 'h-full w-full'
            }
          />
        </div>

        {scrollDriven && !narrowViewport && (
          <>
            {/* Índice vertical: dónde estás dentro del recorrido. */}
            <ol
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 rounded-2xl bg-black/35 px-4 py-4 backdrop-blur-md md:flex lg:right-10"
            >
              {serviceGalleryItems.map((item, i) => (
                <li
                  key={item.label}
                  className={`flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-white uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] transition-all duration-500 ${i === step ? 'opacity-100' : 'opacity-45'}`}
                >
                  <span
                    className={`hidden transition-all duration-500 xl:inline ${i === step ? 'max-w-48 opacity-100' : 'max-w-0 overflow-hidden opacity-0'}`}
                  >
                    {item.label}
                  </span>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`h-px bg-white transition-all duration-500 ${i === step ? 'w-10' : 'w-4'}`}
                  />
                </li>
              ))}
            </ol>

            <Link
              to="/servicios"
              className="group absolute right-6 bottom-8 z-30 hidden items-center gap-2 rounded-full border border-white/30 bg-black/35 py-2.5 pr-3 pl-5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white hover:text-slate-950 md:inline-flex lg:right-10 lg:bottom-10"
            >
              Ver todos los servicios
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
