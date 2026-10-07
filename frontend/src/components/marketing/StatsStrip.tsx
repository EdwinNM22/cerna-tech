import { useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollScene } from '@/hooks/useScrollScene'
import { cn } from '@/lib/utils'

type Stat = { label: string; value: string }

export function StatsStrip({
  items,
  className,
  immersive = false,
}: {
  items: Stat[]
  className?: string
  /** Variante para el espacio negro continuo del Home. */
  immersive?: boolean
}) {
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  useScrollScene(rootRef, { enabled: immersive && !reducedMotion })

  return (
    <section
      ref={rootRef}
      className={cn(
        immersive
          ? 'dark bg-black text-white'
          : 'border-y border-border bg-muted/25',
        className,
      )}
    >
      <dl
        className={cn(
          'mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          immersive && 'py-8 md:py-12',
        )}
      >
        {items.map((stat, i) => (
          <div
            key={stat.label}
            data-reveal={immersive ? '' : undefined}
            className={cn(
              'px-6 py-8 text-center sm:py-10',
              i > 0 &&
                (immersive
                  ? 'border-white/10 sm:border-t-0 sm:border-l'
                  : 'border-border sm:border-t-0 sm:border-l'),
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
