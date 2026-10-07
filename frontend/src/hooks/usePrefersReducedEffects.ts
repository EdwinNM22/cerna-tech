import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * Móvil, pantalla táctil o reduced-motion: menos WebGL, sin Lenis anidado
 * y animaciones más ligeras para evitar jank al hacer scroll.
 */
export function usePrefersReducedEffects(): boolean {
  const coarsePointer = useMediaQuery('(pointer: coarse)')
  const narrowViewport = useMediaQuery('(max-width: 767px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return coarsePointer || narrowViewport || reducedMotion
}
