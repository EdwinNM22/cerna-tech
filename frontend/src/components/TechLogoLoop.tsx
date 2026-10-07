import LogoLoop, { type LogoItem } from '@/components/LogoLoop'
import { devWebLogos } from '@/data/devWebLogos'
import { cn } from '@/lib/utils'

const DARK_INVERT_SLUGS = ['nextdotjs', 'github']

type TechLogoLoopProps = {
  className?: string
  logoHeight?: number
  speed?: number
  direction?: 'left' | 'right'
  fadeOutColor?: string
}

function getLabel(item: LogoItem): string {
  if ('title' in item && item.title) return item.title
  if ('src' in item && item.alt) return item.alt
  return ''
}

function renderLogoItem(item: LogoItem) {
  if (!('src' in item)) return null

  const label = getLabel(item)
  const needsInvert = DARK_INVERT_SLUGS.some((slug) => item.src.includes(slug))

  return (
    <figure className="flex flex-col items-center gap-1.5">
      <img
        src={item.src}
        alt={label}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          'h-[var(--logoloop-logoHeight)] w-auto object-contain opacity-90',
          needsInvert && 'dark:invert',
        )}
      />
      <figcaption className="text-center text-[11px] leading-none font-medium text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  )
}

export function TechLogoLoop({
  className,
  logoHeight = 36,
  speed = 90,
  direction = 'left',
  fadeOutColor,
}: TechLogoLoopProps) {
  return (
    <LogoLoop
      logos={devWebLogos}
      speed={speed}
      direction={direction}
      logoHeight={logoHeight}
      gap={40}
      pauseOnHover
      fadeOut
      fadeOutColor={fadeOutColor}
      scaleOnHover
      renderItem={(item) => renderLogoItem(item)}
      ariaLabel="Tecnologías de desarrollo web"
      className={className}
    />
  )
}
