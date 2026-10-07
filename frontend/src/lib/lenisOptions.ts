import type { LenisOptions } from 'lenis'

/** Curva por defecto de Lenis — inercia al soltar la rueda. */
export const lenisEasing = (t: number) =>
  Math.min(1, 1.001 - 2 ** (-10 * t))

export function createLenisOptions(isCoarsePointer: boolean): LenisOptions {
  return {
    autoRaf: true,
    smoothWheel: true,
    syncTouch: isCoarsePointer,
    syncTouchLerp: 0.1,
    touchMultiplier: 1.15,
    wheelMultiplier: 1.25,
    lerp: isCoarsePointer ? 0.12 : 0.055,
    easing: lenisEasing,
    infinite: false,
    anchors: true,
    autoToggle: true,
    autoResize: true,
    overscroll: true,
    respectReducedMotion: true,
    prevent: (node) => Boolean(node.closest('[data-lenis-prevent]')),
  }
}
