/** Opacidad suave entre escenas indexadas (índice continuo 0…n-1). */
export function sceneCrossfadeOpacity(
  index: number,
  floatIndex: number,
  fadeWidth = 0.45,
) {
  const dist = Math.abs(floatIndex - index)
  if (dist >= fadeWidth) return 0
  return 1 - dist / fadeWidth
}
