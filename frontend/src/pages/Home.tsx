import { HomeBuildSection } from '@/components/HomeBuildSection'
import { HomeHero } from '@/components/HomeHero'
import { HomePortfolioSection } from '@/components/HomePortfolioSection'
import { HomeProcessSection } from '@/components/HomeProcessSection'
import { HomeStartProjectSection } from '@/components/HomeStartProjectSection'
import { HomeTechSection } from '@/components/HomeTechSection'
import { SolutionEcosystemSection } from '@/components/cta/SolutionEcosystemSection'
import {
  ctaBuildTogether,
  ctaHowWeWork,
  ctaStartProject,
  processSteps,
} from '@/data/siteContent'

export function Home() {
  return (
    <>
      <HomeHero />

      {/* Islas ancladas por ScrollTrigger (dirigidas por el scroll, sin locks).
          Desde el ecosistema todo continúa en el mismo espacio negro. */}
      <HomePortfolioSection />

      <SolutionEcosystemSection />

      <HomeTechSection />

      <HomeStartProjectSection cta={ctaStartProject} />

      <HomeProcessSection cta={ctaHowWeWork} steps={processSteps} />

      <HomeBuildSection cta={ctaBuildTogether} />
    </>
  )
}
