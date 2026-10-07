import type { LucideIcon } from 'lucide-react'
import { Code2, Gauge, MessageCircle, ShieldCheck } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  'Código mantenible': Code2,
  'Rendimiento real': Gauge,
  Comunicación: MessageCircle,
  'Seguridad básica bien hecha': ShieldCheck,
}

type Value = { title: string; text: string }

export function ValueCards({ items }: { items: Value[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((v) => {
        const Icon = icons[v.title] ?? Code2
        return (
          <article
            key={v.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {v.text}
            </p>
          </article>
        )
      })}
    </div>
  )
}
