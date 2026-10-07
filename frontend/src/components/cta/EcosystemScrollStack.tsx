import { Link } from 'react-router-dom'
import { EcosystemImmersiveView } from '@/components/cta/EcosystemImmersiveView'
import { solutionEcosystemIntro, solutionEcosystemItems } from '@/data/siteContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function EcosystemStaticCardBody({
  item,
}: {
  item: (typeof solutionEcosystemItems)[number]
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-primary uppercase">
          {item.tagline}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.detail}
        </p>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {item.highlights.map((line) => (
            <li key={line} className="flex gap-2">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
        <Link
          to={item.buttonTo}
          className="mt-4 inline-flex w-fit rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {item.buttonLabel}
        </Link>
      </div>
    </div>
  )
}

export function EcosystemIntro() {
  return (
    <>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-primary uppercase md:text-xs">
        {solutionEcosystemIntro.eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {solutionEcosystemIntro.title}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base md:mt-4 md:text-lg">
        {solutionEcosystemIntro.subtitle}
      </p>
    </>
  )
}

/**
 * Vista inmersiva (móvil + desktop). Lista estática si prefers-reduced-motion.
 */
export function EcosystemScrollStack() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  if (reducedMotion) {
    return (
      <div className="py-8 md:py-12">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <EcosystemIntro />
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 px-4 sm:px-6">
          {solutionEcosystemItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-7"
            >
              <EcosystemStaticCardBody item={item} />
            </article>
          ))}
        </div>
      </div>
    )
  }

  return <EcosystemImmersiveView />
}
