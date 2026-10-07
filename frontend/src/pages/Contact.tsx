import type { FormEvent } from 'react'
import { PageContainer } from '@/components/PageContainer'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { PageBreadcrumbs } from '@/components/marketing/PageBreadcrumbs'
import { MotionReveal } from '@/components/MotionReveal'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { contactEmail, contactEmailLabel, faqs } from '@/data/siteContent'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <PageContainer>
      <PageBreadcrumbs
        items={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]}
      />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-medium text-primary">Contacto</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Hablemos de tu sitio web o app
          </h1>
          <p className="mt-4 text-muted-foreground">
            Cuéntanos alcance, plazos y presupuesto aproximado. Respondemos con
            preguntas técnicas útiles y una ruta sugerida: MVP, fase 1 del sitio
            o producto completo.
          </p>

          <MotionReveal className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Correo
              </h2>
              <p className="mt-2 font-medium">
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-primary"
                >
                  {contactEmailLabel}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Horario
              </h2>
              <p className="mt-2 text-muted-foreground">
                Lun–Vie, 9:00–18:00
              </p>
            </div>
          </MotionReveal>

          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Qué incluir en tu mensaje</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Tipo de proyecto (web, app, e-commerce, API)</li>
              <li>Referencias o sitios que te gusten</li>
              <li>Integraciones (pagos, CRM, inventario)</li>
              <li>Fecha objetivo de lanzamiento</li>
            </ul>
          </div>
        </div>

        <MotionReveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            data-lenis-prevent
          >
            <h2 className="text-lg font-semibold">Envíanos un mensaje</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Te respondemos por correo con los siguientes pasos.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium sm:col-span-1">
                Nombre
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </label>
              <label className="text-sm font-medium sm:col-span-1">
                Correo
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Tipo de proyecto
                <select
                  name="projectType"
                  className={inputClass}
                  defaultValue="web"
                >
                  <option value="web">Sitio web / landing</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="webapp">Aplicación web</option>
                  <option value="mobile">App móvil</option>
                  <option value="api">API / integraciones</option>
                  <option value="other">Otro</option>
                </select>
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Mensaje
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-y`}
                  placeholder="Describe objetivos, usuarios y funcionalidades clave…"
                />
              </label>
            </div>
            <ShimmerButton
              type="submit"
              background="oklch(0.205 0 0)"
              className="mt-6 w-full dark:bg-primary"
            >
              Enviar mensaje
            </ShimmerButton>
          </form>
        </MotionReveal>
      </div>

      <section className="mt-16 md:mt-20">
        <h2 className="text-xl font-semibold md:text-2xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-6">
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </PageContainer>
  )
}
