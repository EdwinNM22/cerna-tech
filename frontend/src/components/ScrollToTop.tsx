import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { ScrollTrigger } from '@/lib/gsapScroll'

/** Al cambiar de ruta, vuelve arriba (Lenis o scroll nativo) y re-mide los pins. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
    ScrollTrigger.refresh()
  }, [pathname, lenis])

  return null
}
