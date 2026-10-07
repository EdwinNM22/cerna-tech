import { Link } from 'react-router-dom'
import { StaggerCardGrid, StaggerTopicCard } from '@/components/StaggerCardGrid'
import { Button } from '@/components/ui/button'
import type { CtaBlock } from '@/data/siteContent'
import { cn } from '@/lib/utils'

type ProcessStep = { step: string; title: string; text: string }

type CtaProcessSectionProps = {
  cta: CtaBlock
  steps: ProcessStep[]
  className?: string
  stepsEyebrow?: string
}

export function CtaProcessSection({
  cta,
  steps,
  className,
  stepsEyebrow = 'Seis fases',
}: CtaProcessSectionProps) {
  return (
    <section
      className={cn(
        'relative border-b border-border px-4 pt-6 sm:px-6 md:pt-8 lg:px-8',
        className,
      )}
    >
      <div className="relative mx-auto min-h-[26rem] w-full max-w-screen-2xl overflow-hidden rounded-3xl md:min-h-[34rem] lg:min-h-[38rem]">
        <img
          src={cta.image}
          alt={cta.imageAlt}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-background via-black/80 to-black/55"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />

        <div className="relative z-10 flex min-h-[inherit] items-center px-5 py-16 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-3xl text-center md:text-left">
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-sky-300 uppercase md:text-xs">
              Proceso
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-base text-white/85 md:text-lg md:leading-relaxed">
              {cta.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:justify-start">
              <Button
                nativeButton={false}
                render={<Link to={cta.buttonTo} />}
                size="lg"
                className="h-11 rounded-xl px-8"
              >
                {cta.buttonLabel}
              </Button>
              {cta.secondaryButtonLabel && cta.secondaryButtonTo && (
                <Button
                  nativeButton={false}
                  render={<Link to={cta.secondaryButtonTo} />}
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-xl border-white/35 bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white"
                >
                  {cta.secondaryButtonLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-10 bg-background px-5 pb-14 pt-2 md:-mt-14 md:px-6 md:pb-20">
        <p className="text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {stepsEyebrow}
        </p>
        <div className="mx-auto mt-8 max-w-6xl md:mt-10">
          <StaggerCardGrid>
            {steps.map((item, index) => (
              <StaggerTopicCard
                key={item.step}
                badge={item.step}
                title={item.title}
                body={item.text}
                index={index}
              />
            ))}
          </StaggerCardGrid>
        </div>
      </div>
    </section>
  )
}
