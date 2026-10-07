/**
 * Lenis solo en desktop con puntero fino. En touch el scroll nativo rinde mejor.
 * Desactiva con VITE_ENABLE_SMOOTH_SCROLL=false o prefers-reduced-motion.
 */
export function shouldUseSmoothScroll(): boolean {
  if (import.meta.env.VITE_ENABLE_SMOOTH_SCROLL === 'false') {
    return false
  }
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }
  if (window.matchMedia('(pointer: coarse)').matches) {
    return false
  }
  if (window.matchMedia('(max-width: 767px)').matches) {
    return false
  }
  return true
}
