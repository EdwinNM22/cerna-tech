import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useLenis } from 'lenis/react'
import { useHeaderState } from '@/hooks/useHeaderState'
import { cn } from '@/lib/utils'

const navItems: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/servicios', label: 'Servicios' },
  { to: '/sobre-nosotros', label: 'Sobre nosotros' },
]

export function Header() {
  const { pathname } = useLocation()
  const { hidden, overDark } = useHeaderState(pathname)
  const lenis = useLenis()
  const [mobileOpen, setMobileOpen] = useState(false)
  // Cristal oscuro sobre secciones oscuras (hero, ecosistema y cola de Home).
  const onHero = overDark

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    if (mobileOpen) lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [mobileOpen, lenis])

  return (
    <>
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 w-full px-3 pt-2 sm:px-6 sm:pt-4">
        <div
          className={cn(
            'pointer-events-auto mx-auto flex h-14 max-w-6xl items-center gap-4 rounded-2xl border px-3 shadow-lg backdrop-blur-xl transition-[transform,opacity,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:translate-y-0 focus-within:opacity-100 sm:px-4',
            hidden && !mobileOpen && '-translate-y-[calc(100%+1rem)] opacity-0',
            onHero
              ? 'border-white/15 bg-slate-950/50 shadow-slate-950/40'
              : 'border-border/70 bg-background/80 shadow-black/5',
          )}
        >
          <NavLink
            to="/"
            end
            className={cn(
              'group flex shrink-0 items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors',
              onHero ? 'text-white' : 'text-foreground',
            )}
          >
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-lg text-xs font-bold tracking-tighter',
                onHero
                  ? 'bg-white/15 text-white'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              CT
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight sm:text-[0.95rem]">
              Cerna Tech
            </span>
          </NavLink>

          <nav
            className="hidden flex-1 justify-center md:flex"
            aria-label="Principal"
          >
            <ul className="flex items-center gap-0.5 rounded-xl p-0.5">
              {navItems.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                        onHero
                          ? isActive
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                          : isActive
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-pill"
                            className={cn(
                              'absolute inset-0 rounded-lg',
                              onHero ? 'bg-white/12' : 'bg-muted',
                            )}
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        <span className="relative z-[1]">{label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle onHero={onHero} className="hidden sm:inline-flex" />

            <Button
              nativeButton={false}
              render={<Link to="/contacto" />}
              size="sm"
              className={cn(
                'hidden rounded-xl md:inline-flex',
                onHero && 'bg-white text-slate-900 hover:bg-white/90',
              )}
            >
              Contacto
            </Button>

            <ThemeToggle onHero={onHero} className="sm:hidden" />

            <button
              type="button"
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-xl border transition-colors md:hidden',
                onHero
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-border text-foreground hover:bg-muted',
              )}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[49] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute top-20 right-4 left-4 overflow-hidden rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              aria-label="Menú móvil"
            >
              <ul className="flex flex-col gap-1">
                {[...navItems, { to: '/contacto', label: 'Contacto' }].map(
                  ({ to, label, end }, i) => (
                    <motion.li
                      key={to}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 + i * 0.05,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NavLink
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                          cn(
                            'flex items-baseline gap-3 rounded-xl px-4 py-3 text-lg font-medium transition-colors',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-muted',
                          )
                        }
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {label}
                      </NavLink>
                    </motion.li>
                  ),
                )}
              </ul>
              <div className="mt-3 border-t border-border pt-3">
                <Button
                  nativeButton={false}
                  render={<Link to="/contacto" onClick={() => setMobileOpen(false)} />}
                  className="w-full rounded-xl"
                >
                  Solicitar cotización
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
