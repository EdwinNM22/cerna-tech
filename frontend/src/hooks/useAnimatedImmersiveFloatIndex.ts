import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

const TRANSITION_DURATION = 0.72

/** Índice continuo de escena (intro ≈ -0.15, escena k → k). */
export function targetFloatIndexFromStep(step: number) {
  if (step <= 0) return -0.15
  return step - 1
}

export function useAnimatedImmersiveFloatIndex(step: number) {
  const [floatIndex, setFloatIndex] = useState(-0.15)
  const tweenState = useRef({ value: -0.15 })
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const target = targetFloatIndexFromStep(step)

    tweenRef.current?.kill()
    tweenRef.current = gsap.to(tweenState.current, {
      value: target,
      duration: TRANSITION_DURATION,
      ease: 'power3.inOut',
      onUpdate: () => {
        setFloatIndex(tweenState.current.value)
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [step])

  return floatIndex
}

export const IMMERSIVE_TRANSITION_MS = Math.round(TRANSITION_DURATION * 1000)
