import type { LenisOptions } from 'lenis'

/** Curva por defecto de Lenis para `scrollTo` programático (anclas, rutas). */
export const lenisEasing = (t: number) =>
  Math.min(1, 1.001 - 2 ** (-10 * t))

/**
 * Configuración cercana a lenis.dev: inercia suave por `lerp`, sin multiplicadores
 * agresivos y sin tocar el scroll (nada de stop/start).
 *
 * `autoRaf: false` → el reloj lo pone `gsap.ticker` (ver SmoothScrollProvider),
 * así Lenis, ScrollTrigger y los tweens comparten el mismo frame.
 */
export function createLenisOptions(): LenisOptions {
  return {
    autoRaf: false,
    smoothWheel: true,
    wheelMultiplier: 1,
    lerp: 0.09,
    easing: lenisEasing,
    infinite: false,
    anchors: true,
    autoResize: true,
    overscroll: true,
    prevent: (node) => Boolean(node.closest('[data-lenis-prevent]')),
  }
}
