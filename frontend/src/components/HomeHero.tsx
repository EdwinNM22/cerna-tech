import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LenisHeroParallax } from '@/components/LenisHeroParallax'
import Particles from '@/components/Particles'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MorphingText } from '@/components/ui/morphing-text'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'
import { heroMorphingTexts } from '@/data/siteContent'
import {
  LENIS_HERO_GRADIENT_LIGHT,
  LENIS_HERO_PARALLAX_BG,
  LENIS_HERO_PARALLAX_FG,
} from '@/lib/lenisHeroLayout'
import { cn } from '@/lib/utils'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=75'

export function HomeHero() {
  const reduceMotion = useReducedMotion()
  const reduceEffects = usePrefersReducedEffects()
  const showParticles = !reduceEffects && !reduceMotion

  return (
    <section data-header-dark className="relative w-full overflow-hidden max-md:min-h-0 md:min-h-svh">
      <LenisHeroParallax
        className="absolute inset-0"
        strength={LENIS_HERO_PARALLAX_BG}
      >
        <div className="absolute inset-0">
          {showParticles ? (
            <motion.img
              src={HERO_IMAGE}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1.12 }}
              transition={{
                duration: 22,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ) : (
            <img
              src={HERO_IMAGE}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          )}
        </div>
      </LenisHeroParallax>

      <div
        className={`absolute inset-0 ${LENIS_HERO_GRADIENT_LIGHT}`}
        aria-hidden
      />

      {!reduceEffects && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:48px_48px]"
          aria-hidden
        />
      )}

      {showParticles && (
        <div className="absolute inset-0 z-[1] opacity-50">
          <Particles
            particleCount={48}
            particleSpread={8}
            speed={0.08}
            particleColors={['#60a5fa', '#a78bfa', '#ffffff']}
            moveParticlesOnHover
            particleHoverFactor={0.35}
            alphaParticles
            particleBaseSize={70}
            disableRotation={false}
            pixelRatio={1.25}
            className="h-full w-full"
          />
        </div>
      )}

      <LenisHeroParallax
        strength={LENIS_HERO_PARALLAX_FG}
        fadeOut
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-start px-5 pt-[4.25rem] pb-10 text-center max-md:min-h-0 sm:pt-[5rem] md:min-h-svh md:justify-center md:pt-[6rem] md:pb-24"
      >
        <motion.p
          className="mb-4 font-mono text-xs tracking-[0.25em] text-blue-300/90 uppercase md:text-sm"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cerna Tech
        </motion.p>

        <motion.h1
          className="text-balance w-full text-3xl leading-tight font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <AnimatedGradientText
            speed={reduceEffects ? 0 : 1.1}
            colorFrom="#93c5fd"
            colorTo="#c4b5fd"
            className="font-semibold"
          >
            Productos digitales
          </AnimatedGradientText>

          <span className="mt-3 block w-full">
            {reduceMotion || reduceEffects ? (
              <span className="text-white/95">{heroMorphingTexts[0]}</span>
            ) : (
              <MorphingText
                texts={heroMorphingTexts}
                className="mx-auto h-[2.75rem] max-w-none font-semibold text-white filter-[url(#threshold)_blur(0.6px)] sm:h-[3.25rem] md:h-[4rem] md:text-5xl lg:h-[4.5rem] lg:text-6xl"
              />
            )}
          </span>

          <span className="mt-2 block text-lg text-white/90 sm:text-xl md:text-2xl">
            listos para producción
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-sm text-slate-200 sm:mt-6 sm:text-base md:text-lg"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Desarrollamos sitios web, aplicaciones y software con enfoque tech:
          arquitectura sólida, interfaces rápidas y despliegue confiable.
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Link to="/contacto">
            <ShimmerButton
              background="rgba(255,255,255,0.95)"
              shimmerColor="#2563eb"
              className="text-sm font-semibold text-slate-900"
            >
              Iniciar proyecto
            </ShimmerButton>
          </Link>
          <Link
            to="/servicios"
            className={cn(
              'rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium text-white',
              'backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/15',
            )}
          >
            Ver servicios
          </Link>
        </motion.div>
      </LenisHeroParallax>

      <HeroScrollCue />
    </section>
  )
}

/** Indicador de scroll: invita a bajar y desaparece en cuanto se empieza. */
function HeroScrollCue() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      el.style.opacity = String(Math.max(0, 1 - window.scrollY / 120))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-3 text-foreground/60 md:flex"
    >
      <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase">
        Desliza
      </span>
      <span className="relative h-10 w-px overflow-hidden bg-foreground/20">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-foreground/70"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
        />
      </span>
    </div>
  )
}
