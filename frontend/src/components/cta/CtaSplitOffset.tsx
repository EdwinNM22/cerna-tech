import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { CtaBlock } from '@/data/siteContent'
import { cn } from '@/lib/utils'

type CtaSplitOffsetProps = {
  cta: CtaBlock
  className?: string
  imagePosition?: 'left' | 'right'
}

export function CtaSplitOffset({
  cta,
  className,
  imagePosition = 'right',
}: CtaSplitOffsetProps) {
  const imageFirst = imagePosition === 'left'

  return (
    <section
      className={cn(
        'overflow-hidden bg-muted/40 sm:grid sm:grid-cols-2 sm:items-center',
        className,
      )}
    >
      <div
        className={cn(
          'p-8 md:p-12 lg:px-16 lg:py-20',
          imageFirst && 'sm:order-2',
        )}
      >
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-base">
            {cta.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start md:mt-8">
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
                className="h-11 rounded-xl px-8"
              >
                {cta.secondaryButtonLabel}
              </Button>
            )}
          </div>
        </div>
      </div>

      <img
        src={cta.image}
        alt={cta.imageAlt}
        className={cn(
          'h-56 w-full object-cover sm:h-[calc(100%-2rem)] sm:min-h-[20rem] sm:self-end sm:rounded-ss-[2rem] md:h-[calc(100%-4rem)] md:min-h-[24rem] md:rounded-ss-[3.75rem]',
          imageFirst && 'sm:order-1 sm:rounded-ss-none sm:rounded-se-[2rem] md:rounded-se-[3.75rem]',
        )}
        loading="lazy"
      />
    </section>
  )
}
