import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let ready = false

/** Registro único de ScrollTrigger + ajustes globales. */
export function ensureScrollTrigger() {
  if (ready) return
  gsap.registerPlugin(ScrollTrigger)
  // Evita refrescos al aparecer/ocultarse la barra del navegador en móvil.
  ScrollTrigger.config({ ignoreMobileResize: true })
  ready = true
}

export { gsap, ScrollTrigger }
