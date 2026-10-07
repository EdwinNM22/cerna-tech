import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { SolutionCta } from '@/data/siteContent'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

type CtaSolutionSplitProps = {
  item: SolutionCta
  imagePosition?: 'left' | 'right'
  className?: string
}

export function CtaSolutionSplit({
  item,
  imagePosition = 'right',
  className,
}: CtaSolutionSplitProps) {
  const imageFirst = imagePosition === 'left'

  return (
    <article
      id={item.id}
      className={cn(
        'overflow-hidden rounded-3xl border border-border bg-card shadow-sm ring-1 ring-black/5 dark:ring-white/5 sm:grid sm:grid-cols-2 sm:items-stretch [&_.cta-split-media]:min-h-0',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-center p-8 md:p-10 lg:p-12',
          imageFirst && 'sm:order-2',
        )}
      >
        <div className="mx-auto max-w-lg text-center sm:mx-0 sm:text-left">
          <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {item.description}
          </p>
          <ul className="mt-5 space-y-2 text-left text-sm text-muted-foreground">
            {item.highlights.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex justify-center sm:justify-start">
            <Button
              nativeButton={false}
              render={<Link to={item.buttonTo} />}
              size="lg"
              className="group h-11 gap-2 rounded-xl px-7"
            >
              {item.buttonLabel}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'cta-split-media relative min-h-[14rem] sm:min-h-[18rem]',
          imageFirst && 'sm:order-1',
        )}
      >
        <img
          src={item.image}
          alt={item.imageAlt}
          className={cn(
            'absolute inset-0 size-full object-cover',
            !imageFirst &&
              'sm:rounded-es-3xl sm:rounded-se-none sm:rounded-ss-none',
            imageFirst &&
              'sm:rounded-ee-3xl sm:rounded-es-none sm:rounded-ss-none',
          )}
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent sm:bg-linear-to-r sm:from-black/25 sm:via-transparent sm:to-transparent"
          aria-hidden
        />
      </div>
    </article>
  )
}
