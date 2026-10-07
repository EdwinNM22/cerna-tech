import { HomeHero } from '@/components/HomeHero'
import { HomePortfolioGallery } from '@/components/HomePortfolioGallery'
import { PageContainer } from '@/components/PageContainer'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { StatsStrip } from '@/components/marketing/StatsStrip'
import { MotionReveal } from '@/components/MotionReveal'
import { SolutionEcosystemSection } from '@/components/cta/SolutionEcosystemSection'
import { CtaDualImage } from '@/components/cta/CtaDualImage'
import { CtaProcessSection } from '@/components/cta/CtaProcessSection'
import { CtaSplitOffset } from '@/components/cta/CtaSplitOffset'
import { TechLogoLoop } from '@/components/TechLogoLoop'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'
import {
  ctaBuildTogether,
  ctaHowWeWork,
  ctaStartProject,
  faqs,
  processSteps,
  stats,
} from '@/data/siteContent'

export function Home() {
  const reduceEffects = usePrefersReducedEffects()

  return (
    <>
      <HomeHero />

      <section className="relative isolate w-full overflow-hidden border-b border-border py-10 md:py-0">
        <div className="relative z-20 px-5 pb-8 md:pointer-events-none md:absolute md:inset-x-0 md:top-0 md:bg-linear-to-b md:from-background md:via-background/55 md:to-transparent md:px-8 md:pb-28 md:pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-primary uppercase md:text-xs">
              Portafolio
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Soluciones que desarrollamos
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              <span className="md:hidden">
                Toca cada tarjeta para ver sitios, apps, tiendas e integraciones.
              </span>
              <span className="hidden md:inline">
                Recorre cada panel — sitios, apps, tiendas e integraciones en un
                solo vistazo.
              </span>
            </p>
          </div>
        </div>

        <HomePortfolioGallery />
      </section>

      <section className="w-full border-b border-border bg-muted/30 py-8 md:py-10">
        <p className="mb-6 text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Tecnologías de desarrollo web
        </p>
        <TechLogoLoop
          className="w-full"
          logoHeight={reduceEffects ? 32 : 40}
          speed={reduceEffects ? 35 : 85}
        />
      </section>

      <SolutionEcosystemSection />

      <CtaSplitOffset
        cta={ctaStartProject}
        className="border-b border-border"
      />

      <CtaProcessSection cta={ctaHowWeWork} steps={processSteps} />

      <CtaDualImage cta={ctaBuildTogether} className="border-b border-border bg-background" />

      <PageContainer className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <MotionReveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Respuestas breves antes de tu primera conversación con el equipo.
            </p>
          </MotionReveal>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={faqs.slice(0, 5)} />
        </div>
      </PageContainer>

      <StatsStrip items={stats} />
    </>
  )
}
