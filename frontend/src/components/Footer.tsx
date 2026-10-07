import { Link } from 'react-router-dom'
import { Marquee } from '@/components/ui/marquee'
import { contactEmail, contactEmailLabel } from '@/data/siteContent'

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

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="border-b border-border py-3">
        <Marquee className="[--duration:50s]">
          {footerTags.map((tag) => (
            <span key={tag} className="mx-4 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </Marquee>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-semibold text-foreground">Cerna Tech</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Sitios web, aplicaciones y software a medida con entregas por fases.
          </p>
        </div>
        <div>
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
        <div>
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
        <div>
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
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {year} Cerna Tech
      </div>
    </footer>
  )
}
