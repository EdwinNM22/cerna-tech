import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { LenisHeroParallax } from '@/components/LenisHeroParallax'
import Particles from '@/components/Particles'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { MorphingText } from '@/components/ui/morphing-text'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'
import { heroMorphingTexts } from '@/data/siteContent'
import { cn } from '@/lib/utils'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=75'

export function HomeHero() {
  const reduceMotion = useReducedMotion()
  const reduceEffects = usePrefersReducedEffects()
  const showParticles = !reduceEffects && !reduceMotion

  return (
    <section className="relative min-h-svh w-full overflow-hidden">
      <LenisHeroParallax className="absolute inset-0" strength={0.22}>
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
        className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/65 to-background"
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
        strength={0.45}
        className="relative z-10 mx-auto flex min-h-svh max-w-4xl flex-col items-center justify-center px-5 pt-[5.5rem] pb-16 text-center sm:pt-[6rem] md:pb-24"
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
          className="text-balance w-full text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
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
          className="mt-6 max-w-2xl text-base text-slate-200 md:text-lg"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Desarrollamos sitios web, aplicaciones y software con enfoque tech:
          arquitectura sólida, interfaces rápidas y despliegue confiable.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
    </section>
  )
}
