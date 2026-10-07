import { useEffect, useState } from 'react'

/** Scroll (px) a partir del cual el header puede esconderse al bajar. */
const HIDE_AFTER = 520
/** Movimiento mínimo (px) para considerar un cambio de dirección real. */
const DIRECTION_DEADBAND = 6
/** Línea (px desde arriba) donde se evalúa qué hay detrás del header. */
const PROBE_Y = 36

/**
 * Estado del header ligado al scroll:
 * - `hidden`: se esconde al bajar (más inmersión) y reaparece al subir.
 * - `overDark`: hay una sección marcada con `data-header-dark` detrás del
 *   header, así que usa el estilo de cristal oscuro en lugar del claro.
 */
export function useHeaderState(routeKey: string) {
  const [hidden, setHidden] = useState(false)
  // En Home el primer frame ya está sobre el hero oscuro: evita el parpadeo.
  const [overDark, setOverDark] = useState(routeKey === '/')

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const measure = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - lastY

      if (y <= HIDE_AFTER) {
        setHidden(false)
        lastY = y
      } else if (delta > DIRECTION_DEADBAND) {
        setHidden(true)
        lastY = y
      } else if (delta < -DIRECTION_DEADBAND) {
        setHidden(false)
        lastY = y
      }

      let dark = false
      document.querySelectorAll('[data-header-dark]').forEach((el) => {
        if (dark) return
        const r = el.getBoundingClientRect()
        if (r.top <= PROBE_Y && r.bottom > PROBE_Y) dark = true
      })
      setOverDark(dark)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    // Tras navegar, el DOM de la nueva ruta tarda un frame en existir.
    lastY = window.scrollY
    frame = requestAnimationFrame(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [routeKey])

  return { hidden, overDark }
}
