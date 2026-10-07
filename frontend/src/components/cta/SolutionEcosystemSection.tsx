import { useLayoutEffect, useRef } from 'react'
import { EcosystemScrollStack } from '@/components/cta/EcosystemScrollStack'
import { ensureScrollTrigger, gsap } from '@/lib/gsapScroll'
import { cn } from '@/lib/utils'

type SolutionEcosystemSectionProps = {
  className?: string
}

export function SolutionEcosystemSection({
  className,
}: SolutionEcosystemSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  // Funde el final del ecosistema con el negro de la cola solo mientras la
  // sección se va (no oscurece el último paso mientras está anclado).
  useLayoutEffect(() => {
    const section = sectionRef.current
    const fade = fadeRef.current
    if (!section || !fade) return
    ensureScrollTrigger()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fade,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom 55%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ecosistema"
      data-header-dark
      className={cn(
        'dark relative overflow-hidden bg-black py-0',
        className,
      )}
    >
      <EcosystemScrollStack />
      <div
        ref={fadeRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[16svh] bg-linear-to-b from-transparent to-black opacity-0"
      />
    </section>
  )
}
