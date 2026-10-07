import { cn } from '@/lib/utils'

type Stat = { label: string; value: string }

export function StatsStrip({
  items,
  className,
}: {
  items: Stat[]
  className?: string
}) {
  return (
    <section
      className={cn(
        'border-y border-border bg-muted/25',
        className,
      )}
    >
      <dl className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              'px-6 py-8 text-center sm:py-10',
              i > 0 && 'border-border sm:border-t-0 sm:border-l',
              i === 2 && 'lg:border-l',
              i === 3 && 'border-t sm:border-t-0 lg:border-l',
            )}
          >
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {stat.label}
            </dt>
            <dd className="mt-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
