/**
 * Lenis en casi todos los dispositivos. Desactiva con VITE_ENABLE_SMOOTH_SCROLL=false
 * o prefers-reduced-motion (Lenis también lo respeta vía respectReducedMotion).
 */
export function shouldUseSmoothScroll(): boolean {
  if (import.meta.env.VITE_ENABLE_SMOOTH_SCROLL === 'false') {
    return false
  }
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }
  return true
}
