import { PageContainer } from '@/components/PageContainer'
import { PageBreadcrumbs } from '@/components/marketing/PageBreadcrumbs'
import { ValueCards } from '@/components/marketing/ValueCards'
import { MotionReveal } from '@/components/MotionReveal'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import {
  processSectionIntro,
  processSteps,
  softwareTopics,
} from '@/data/siteContent'

const values = [
  {
    title: 'Código mantenible',
    text: 'Preferimos claridad sobre atajos. Documentación, tipos en TypeScript y revisiones que facilitan evolucionar sitios y apps.',
  },
  {
    title: 'Rendimiento real',
    text: 'Una página web lenta pierde clientes. Medimos carga, optimizamos recursos y aplicamos animaciones solo cuando aportan claridad y confianza.',
  },
  {
    title: 'Comunicación',
    text: 'Informes breves, avances periódicos y lenguaje accesible para equipos de negocio y técnicos.',
  },
  {
    title: 'Seguridad básica bien hecha',
    text: 'HTTPS, validación en servidor, permisos mínimos y buenas prácticas antes de funciones avanzadas.',
  },
]

export function About() {
  return (
    <PageContainer className="pb-10">
      <PageBreadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Sobre nosotros' },
        ]}
      />
      <header className="mb-14 max-w-3xl">
        <p className="text-sm font-medium text-primary">Sobre nosotros</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          <AnimatedGradientText colorFrom="#0ea5e9" colorTo="#6366f1">
            Cerna Tech
          </AnimatedGradientText>{' '}
          y el desarrollo digital
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Somos una empresa de desarrollo de software enfocada en presencia
          digital, productos web y aplicaciones móviles. Unimos diseño,
          ingeniería y operación para entregar soluciones estables y escalables.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Más que una agencia de páginas web
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          El mercado digital abarca sitios corporativos, tiendas en línea,
          aplicaciones SaaS, portales de clientes y herramientas internas. En
          Cerna Tech acompañamos todo el ciclo: descubrimiento, UX, desarrollo,
          pruebas, despliegue y mejora continua, con estándares de calidad,
          accesibilidad y rendimiento en cada entrega.
        </p>
      </section>

      <MotionReveal className="mb-16">
        <h2 className="text-2xl font-semibold">Valores</h2>
        <div className="mt-6">
          <ValueCards items={values} />
        </div>
      </MotionReveal>

      <MotionReveal delay={0.05} className="mb-16">
        <h2 className="text-2xl font-semibold">Áreas que cubrimos</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {softwareTopics.map((topic) => (
            <li
              key={topic.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {topic.body}
              </p>
            </li>
          ))}
        </ul>
      </MotionReveal>

      <section>
        <h2 className="text-2xl font-semibold">Cómo trabajamos contigo</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {processSectionIntro}
        </p>
        <div className="mt-8 space-y-4">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/25 p-5 sm:flex-row sm:gap-6 sm:p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                {step.step}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
