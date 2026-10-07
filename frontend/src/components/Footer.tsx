import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Marquee } from '@/components/ui/marquee'
import { contactEmail, contactEmailLabel } from '@/data/siteContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollScene } from '@/hooks/useScrollScene'
import { cn } from '@/lib/utils'

const footerTags = [
  'Desarrollo web',
  'Apps móviles',
  'Software a medida',
  'Páginas web',
  'E-commerce',
  'Integraciones',
  'Consultoría',
  'UI/UX',
]

const footerLinks = {
  servicios: [
    { label: 'Sitios web', to: '/servicios#web' },
    { label: 'Apps', to: '/servicios#apps' },
    { label: 'Integraciones', to: '/servicios#integrations' },
    { label: 'DevOps', to: '/servicios#devops' },
  ],
  empresa: [
    { label: 'Sobre nosotros', to: '/sobre-nosotros' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Contacto', to: '/contacto' },
  ],
}

type FooterProps = {
  /** En el Home continúa el espacio negro inmersivo y reacciona al scroll. */
  immersive?: boolean
}

export function Footer({ immersive = false }: FooterProps) {
  const year = new Date().getFullYear()
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  useScrollScene(rootRef, { enabled: immersive && !reducedMotion })

  const reveal = immersive ? '' : undefined

  return (
    <footer
      ref={rootRef}
      data-header-dark={immersive ? '' : undefined}
      className={cn(
        'mt-auto',
        immersive
          ? 'dark overflow-hidden bg-black text-white'
          : 'border-t border-border bg-muted/30',
      )}
    >
      <div
        className={cn(
          'py-3',
          immersive ? 'border-y border-white/10' : 'border-b border-border',
        )}
      >
        <Marquee className="[--duration:50s]">
          {footerTags.map((tag) => (
            <span key={tag} className="mx-4 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </Marquee>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 sm:gap-10 sm:py-12 lg:grid-cols-4">
        <div data-reveal={reveal} className="col-span-2 lg:col-span-1">
          <p className="font-semibold text-foreground">Cerna Tech</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Sitios web, aplicaciones y software a medida con entregas por fases.
          </p>
        </div>
        <div data-reveal={reveal}>
          <p className="text-sm font-semibold text-foreground">Servicios</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.servicios.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal={reveal}>
          <p className="text-sm font-semibold text-foreground">Empresa</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.empresa.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal={reveal} className="col-span-2 sm:col-span-1 lg:col-span-1">
          <p className="text-sm font-semibold text-foreground">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${contactEmail}`}
                className="transition-colors hover:text-primary"
              >
                {contactEmailLabel}
              </a>
            </li>
            <li>Lun–Vie, 9:00–18:00</li>
          </ul>
          <Link
            to="/contacto"
            className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Escríbenos
          </Link>
        </div>
      </div>

      {immersive && (
        <div
          data-reveal=""
          aria-hidden
          className="pointer-events-none select-none px-5 text-center"
        >
          <span className="block bg-linear-to-b from-white/25 to-transparent bg-clip-text text-[17vw] leading-[0.85] font-semibold tracking-tighter text-transparent">
            Cerna Tech
          </span>
        </div>
      )}

      <div
        className={cn(
          'py-5 text-center text-xs text-muted-foreground',
          immersive ? 'border-t border-white/10' : 'border-t border-border',
        )}
      >
        © {year} Cerna Tech
      </div>
    </footer>
  )
}
