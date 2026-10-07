import { EcosystemScrollStack } from '@/components/cta/EcosystemScrollStack'
import { MotionReveal } from '@/components/MotionReveal'
import { PageContainer } from '@/components/PageContainer'
import { solutionEcosystemIntro } from '@/data/siteContent'
import { cn } from '@/lib/utils'

type SolutionEcosystemSectionProps = {
  className?: string
}

export function SolutionEcosystemSection({
  className,
}: SolutionEcosystemSectionProps) {
  return (
    <section
      id="ecosistema"
      className={cn(
        'border-b border-border bg-muted/20 py-16 md:py-24',
        className,
      )}
    >
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <MotionReveal>
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-primary uppercase md:text-xs">
              {solutionEcosystemIntro.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {solutionEcosystemIntro.title}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              {solutionEcosystemIntro.subtitle}
            </p>
          </MotionReveal>
        </div>
      </PageContainer>

      <EcosystemScrollStack />
    </section>
  )
}
