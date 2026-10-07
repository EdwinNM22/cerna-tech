import { Link } from 'react-router-dom'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack/ScrollStack'
import { solutionEcosystemItems } from '@/data/siteContent'

/**
 * ScrollStack de React Bits + contenido e imágenes del ecosistema.
 * Scroll interno en este bloque (Lenis anidado); la barra del contenedor va oculta.
 */
export function EcosystemScrollStack() {
  return (
    <div
      className="mt-10 h-[min(100svh,920px)] w-full"
      data-lenis-prevent
    >
      <ScrollStack className="h-full">
        {solutionEcosystemItems.map((item) => (
          <ScrollStackItem
            key={item.id}
            itemClassName="h-auto min-h-[22rem] overflow-hidden bg-card p-6 text-card-foreground md:min-h-[24rem] md:p-8"
          >
            <div className="flex h-full flex-col gap-5 md:flex-row md:items-stretch md:gap-8">
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl md:aspect-auto md:w-[42%] md:min-h-[14rem]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 to-transparent md:bg-linear-to-r md:from-black/20"
                  aria-hidden
                />
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl lg:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>
                <ul className="mt-4 hidden space-y-1.5 text-sm text-muted-foreground sm:block">
                  {item.highlights.slice(0, 2).map((line) => (
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
                  className="mt-5 inline-flex w-fit rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {item.buttonLabel}
                </Link>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  )
}
