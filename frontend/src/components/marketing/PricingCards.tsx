import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { ServiceTier } from '@/data/siteContent'
import { cn } from '@/lib/utils'

export function PricingCards({ tiers }: { tiers: ServiceTier[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {tiers.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            'flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8',
            tier.highlighted &&
              'border-primary/40 shadow-md ring-1 ring-primary/15',
          )}
        >
          <h3 className="text-lg font-semibold">{tier.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{tier.summary}</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-sm">
            {tier.features.map((f) => (
              <li key={f} className="text-foreground/90">
                {f}
              </li>
            ))}
          </ul>
          <Button
            nativeButton={false}
            render={<Link to={tier.ctaTo} />}
            variant={tier.highlighted ? 'default' : 'outline'}
            className="mt-8 w-full rounded-xl"
          >
            {tier.ctaLabel}
          </Button>
        </article>
      ))}
    </div>
  )
}
