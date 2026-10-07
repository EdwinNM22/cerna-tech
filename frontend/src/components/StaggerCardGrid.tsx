import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type StaggerCardGridProps = {
  children: ReactNode[]
  className?: string
}

/** Dos filas en desktop: la segunda desplazada ~medio ladrillo (rejilla tipo muro). */
export function StaggerCardGrid({ children, className }: StaggerCardGridProps) {
  const items = [...children]
  const rowA = items.slice(0, 3)
  const rowB = items.slice(3, 6)
  const rest = items.slice(6)

  return (
    <div className={cn('space-y-5 md:space-y-6', className)}>
      {rowA.length > 0 && (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rowA.map((child, i) => (
            <li key={i} className="min-h-0">
              {child}
            </li>
          ))}
        </ul>
      )}
      {rowB.length > 0 && (
        <ul
          className={cn(
            'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6',
            rowB.length === 3 &&
              'lg:grid-cols-3 lg:pl-[calc(16.666%+0.75rem)]',
            rowB.length === 2 &&
              'lg:mx-auto lg:max-w-[calc(66.666%+0.5rem)] lg:grid-cols-2 lg:pl-[calc(8.333%+0.375rem)]',
            rowB.length === 1 && 'lg:mx-auto lg:max-w-sm lg:pl-[calc(16.666%+0.75rem)]',
          )}
        >
          {rowB.map((child, i) => (
            <li key={i} className="min-h-0">
              {child}
            </li>
          ))}
        </ul>
      )}
      {rest.length > 0 && (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rest.map((child, i) => (
            <li key={i}>{child}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

type StaggerTopicCardProps = {
  title: string
  body: string
  badge?: string
  index?: number
}

export function StaggerTopicCard({
  title,
  body,
  badge,
  index = 0,
}: StaggerTopicCardProps) {
  const label = badge ?? String(index + 1).padStart(2, '0')

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-md ring-1 ring-black/5 dark:ring-white/5">
      <div className="flex items-center gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground ring-2 ring-border"
          aria-hidden
        >
          {label}
        </span>
        <h3 className="min-w-0 text-left text-sm font-semibold leading-snug text-foreground md:text-base">
          {title}
        </h3>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </article>
  )
}
