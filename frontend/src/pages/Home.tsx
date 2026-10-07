import AccordionGallery from '@/components/AccordionGallery'
import { HomeHero } from '@/components/HomeHero'
import { PageContainer } from '@/components/PageContainer'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { StatsStrip } from '@/components/marketing/StatsStrip'
import { MotionReveal } from '@/components/MotionReveal'
import { SolutionEcosystemSection } from '@/components/cta/SolutionEcosystemSection'
import { CtaDualImage } from '@/components/cta/CtaDualImage'
import { CtaProcessSection } from '@/components/cta/CtaProcessSection'
import { CtaSplitOffset } from '@/components/cta/CtaSplitOffset'
import { TechLogoLoop } from '@/components/TechLogoLoop'
import { serviceGalleryItems } from '@/data/accordionGalleryItems'
import {
  ctaBuildTogether,
  ctaHowWeWork,
  ctaStartProject,
  faqs,
  processSteps,
  stats,
} from '@/data/siteContent'

export function Home() {
  return (
    <>
      <HomeHero />

      <section className="relative isolate w-full overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-linear-to-b from-background via-background/55 to-transparent px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-primary uppercase md:text-xs">
              Portafolio
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Soluciones que desarrollamos
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Recorre cada panel — sitios, apps, tiendas e integraciones en un
              solo vistazo.
            </p>
          </div>
        </div>

        <AccordionGallery
          items={serviceGalleryItems}
          defaultIndex={2}
          immersive
          expandRatio={0.58}
          gap={6}
          radius={0}
          accentColor="#60a5fa"
          overlayColor="#020617"
          trigger="hover"
          parallax={0.65}
          className="w-full"
        />
      </section>

      <section className="w-full border-b border-border bg-muted/30 py-8 md:py-10">
        <p className="mb-6 text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Tecnologías de desarrollo web
        </p>
        <TechLogoLoop className="w-full" logoHeight={40} speed={85} />
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
