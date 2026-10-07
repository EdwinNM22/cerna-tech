import { Check } from 'lucide-react'

type ServiceFeatureCardProps = {
  id: string
  title: string
  summary: string
  points: string[]
}

export function ServiceFeatureCard({
  id,
  title,
  summary,
  points,
}: ServiceFeatureCardProps) {
  return (
    <article
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="border-b border-border bg-muted/35 p-6 md:p-8 lg:w-[38%] lg:border-b-0 lg:border-r">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-foreground/90">
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
