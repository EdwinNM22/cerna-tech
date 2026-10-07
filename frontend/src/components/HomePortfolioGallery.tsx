import AccordionGallery from '@/components/AccordionGallery'
import { usePrefersReducedEffects } from '@/hooks/usePrefersReducedEffects'
import { serviceGalleryItems } from '@/data/accordionGalleryItems'

export function HomePortfolioGallery() {
  const reduceEffects = usePrefersReducedEffects()

  if (reduceEffects) {
    return (
      <AccordionGallery
        items={serviceGalleryItems}
        defaultIndex={0}
        orientation="vertical"
        immersive={false}
        height={380}
        expandRatio={0.55}
        gap={8}
        radius={16}
        accentColor="#60a5fa"
        overlayColor="#020617"
        trigger="click"
        parallax={0}
        tilt={0}
        grayscale={false}
        duration={0.35}
        className="w-full px-4 sm:px-6"
      />
    )
  }

  return (
    <AccordionGallery
      items={serviceGalleryItems}
      defaultIndex={2}
      immersive
      expandRatio={0.58}
      gap={6}
      radius={0}
      accentColor="#60a5fa"
      overlayColor="#020617"
      trigger="hover"
      parallax={0.65}
      className="w-full"
    />
  )
}
