import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { CtaBlock } from '@/data/siteContent'
import { cn } from '@/lib/utils'

type CtaDualImageProps = {
  cta: CtaBlock
  className?: string
}

export function CtaDualImage({ cta, className }: CtaDualImageProps) {
  const secondary = cta.imageSecondary

  return (
    <section className={cn('w-full py-8 md:py-12', className)}>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
          <div className="flex flex-col justify-center rounded-2xl bg-muted/50 p-8 md:p-12 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {cta.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{cta.description}</p>
              <div className="mt-6 md:mt-8">
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

          <img
            src={cta.image}
            alt={cta.imageAlt}
            className="h-52 w-full rounded-2xl object-cover sm:h-64 lg:h-full lg:min-h-[22rem]"
            loading="lazy"
          />

          {secondary ? (
            <img
              src={secondary}
              alt={cta.imageSecondaryAlt ?? ''}
              className="h-52 w-full rounded-2xl object-cover sm:h-64 lg:h-full lg:min-h-[22rem]"
              loading="lazy"
            />
          ) : (
            <img
              src={cta.image}
              alt=""
              aria-hidden
              className="hidden h-52 w-full rounded-2xl object-cover sm:h-64 lg:block lg:h-full lg:min-h-[22rem]"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  )
}
