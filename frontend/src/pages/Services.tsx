import { Link } from 'react-router-dom'
import { PageBreadcrumbs } from '@/components/marketing/PageBreadcrumbs'
import { PricingCards } from '@/components/marketing/PricingCards'
import { ServiceFeatureCard } from '@/components/marketing/ServiceFeatureCard'
import { MotionReveal } from '@/components/MotionReveal'
import { CtaSplitOffset } from '@/components/cta/CtaSplitOffset'
import { PageContainer } from '@/components/PageContainer'
import {
  ctaStartProject,
  serviceTiers,
  servicesDetailed,
} from '@/data/siteContent'
import { TechLogoLoop } from '@/components/TechLogoLoop'

export function Services() {
  return (
    <PageContainer className="pb-8">
      <PageBreadcrumbs
        items={[{ label: 'Inicio', to: '/' }, { label: 'Servicios' }]}
      />
      <header className="mb-12 max-w-3xl">
        <p className="text-sm font-medium text-primary">Servicios</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Desarrollo de software, sitios web y apps
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ofrecemos un catálogo completo para llevar ideas a producción: páginas
          web institucionales, landings de conversión, aplicaciones web con
          login, APIs, apps móviles y operación en la nube.
        </p>
      </header>

      <section className="mb-16 overflow-hidden rounded-2xl border border-border bg-muted/20 py-8">
        <p className="mb-5 text-center text-sm text-muted-foreground">
          Herramientas y plataformas que dominamos en proyectos web
        </p>
        <TechLogoLoop speed={75} logoHeight={34} />
      </section>

      <section className="mb-16 md:mb-20">
        <MotionReveal>
          <h2 className="text-2xl font-semibold md:text-3xl">
            Modalidades de proyecto
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Referencias de alcance; el presupuesto final depende de requisitos y
            plazos.
          </p>
        </MotionReveal>
        <div className="mt-10">
          <PricingCards tiers={serviceTiers} />
        </div>
      </section>

      <div className="flex flex-col gap-8">
        {servicesDetailed.map((service) => (
          <ServiceFeatureCard key={service.id} {...service} />
        ))}
      </div>

      <MotionReveal className="mt-16 rounded-2xl border border-dashed border-border bg-muted/20 p-8 md:p-10">
        <h2 className="text-2xl font-semibold">¿No encuentras lo que buscas?</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          También apoyamos migraciones de WordPress a stacks modernos,
          refactorización de frontends legacy, microservicios, chatbots
          conectados a tus datos y MVPs para validar mercado antes de invertir
          en una app nativa completa.
        </p>
        <Link
          to="/contacto"
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Describe tu proyecto
        </Link>
      </MotionReveal>

      <CtaSplitOffset
        cta={{
          ...ctaStartProject,
          title: '¿Listo para definir alcance y plazos?',
          description:
            'Cuéntanos si buscas un sitio nuevo, una web app o integraciones. Te proponemos fases, stack y entregables concretos.',
          buttonLabel: 'Hablar con el equipo',
        }}
        imagePosition="left"
        className="mt-16 overflow-hidden rounded-2xl border border-border"
      />
    </PageContainer>
  )
}
