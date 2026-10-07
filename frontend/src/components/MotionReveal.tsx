import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article'
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: MotionRevealProps) {
  const Component = motion[as]
  const reduceMotion = useReducedMotion()
  const reduceEffects = usePrefersReducedEffects()

  if (reduceMotion || reduceEffects) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={defaultVariants}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}
