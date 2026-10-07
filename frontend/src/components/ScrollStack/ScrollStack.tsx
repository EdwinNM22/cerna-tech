import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode, RefObject } from 'react';
import Lenis from 'lenis';
import { useLenis } from 'lenis/react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative box-border w-full origin-top rounded-2xl shadow-[0_0_24px_rgba(0,0,0,0.08)] will-change-transform my-4 ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  /** Ancla Y en px (viewport); si se pasa, tiene prioridad sobre `stackPosition`. */
  stackPositionRef?: RefObject<number>;
  /** Si es false, no se aplica el tope anti-solapamiento (p. ej. intro aún no fijado). */
  stackClampActiveRef?: RefObject<boolean>;
  /** Fuerza recalcular posiciones base de las cards (p. ej. cambió la altura del intro). */
  remeasureKey?: number;
  /** Fracción del viewport restada al marcador final para cerrar el pin (0.5 = mitad). */
  pinEndViewportRatio?: number;
  /** Tras pinEnd, px de scroll para volver las cards a su flujo sin salto. */
  releaseScrollPx?: number;
  /** Clases extra en el contenedor interior (padding del stack). */
  innerClassName?: string;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 56,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  stackPositionRef,
  stackClampActiveRef,
  remeasureKey = 0,
  pinEndViewportRatio = 0.5,
  releaseScrollPx = 0,
  innerClassName = '',
  onStackComplete
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const cardsBaseTopRef = useRef<number[]>([]);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'number') {
      return value;
    }
    if (value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: scrollYRef.current || window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getScrollTop = useCallback(() => {
    if (useWindowScroll) {
      return scrollYRef.current || window.scrollY;
    }
    return scrollerRef.current?.scrollTop ?? 0;
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + getScrollTop();
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll, getScrollTop],
  );

  const measureCardsBaseTop = useCallback(() => {
    const scrollTop = getScrollTop();
    cardsBaseTopRef.current = cardsRef.current.map((card) => {
      const previousTransform = card.style.transform;
      card.style.transform = 'none';
      const top = card.getBoundingClientRect().top + scrollTop;
      card.style.transform = previousTransform;
      return top;
    });
  }, [getScrollTop]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx =
      stackPositionRef?.current ??
      parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx =
      typeof scaleEndPosition === 'number'
        ? scaleEndPosition
        : stackPositionRef?.current != null
          ? Math.max(96, stackPositionRef.current - 48)
          : parsePercentage(scaleEndPosition, containerHeight);

    const stackRoot = useWindowScroll ? rootRef.current : scrollerRef.current;
    const endElement = stackRoot?.querySelector('.scroll-stack-end') as HTMLElement | null;

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop =
        cardsBaseTopRef.current[i] ?? getElementOffset(card);
      const targetStackTop = stackPositionPx + itemStackDistance * i;
      const triggerStart = cardTop - targetStackTop;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - targetStackTop;
      const pinEnd =
        endElementTop - containerHeight * pinEndViewportRatio;

      const releaseEnd = pinEnd + Math.max(0, releaseScrollPx);
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      const isReleasing =
        releaseScrollPx > 0 && scrollTop > pinEnd && scrollTop <= releaseEnd;

      const targetScale = baseScale + i * itemScale;

      let translateY = 0;
      let scale = 1;
      let rotation = 0;
      let blur = 0;

      if (scrollTop <= pinEnd) {
        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        scale = 1 - scaleProgress * (1 - targetScale);
        rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

        if (blurAmount) {
          let topCardIndex = 0;
          for (let j = 0; j < cardsRef.current.length; j++) {
            const jCardTop =
              cardsBaseTopRef.current[j] ??
              getElementOffset(cardsRef.current[j]);
            const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
            if (scrollTop >= jTriggerStart) {
              topCardIndex = j;
            }
          }

          if (i < topCardIndex) {
            const depthInStack = topCardIndex - i;
            blur = Math.max(0, depthInStack * blurAmount);
          }
        }

        if (isPinned) {
          translateY = scrollTop - cardTop + targetStackTop;
        }

        const clampActive = stackClampActiveRef?.current ?? !stackPositionRef;
        if (clampActive && scrollTop <= pinEnd) {
          const floorTranslate = scrollTop - cardTop + targetStackTop;
          if (floorTranslate > translateY) {
            translateY = floorTranslate;
          }
        }
      } else if (isReleasing) {
        const scaleAtPinEnd = 1 - calculateProgress(pinEnd, triggerStart, triggerEnd) * (1 - targetScale);
        const translateAtPinEnd = pinEnd - cardTop + targetStackTop;
        const t = (scrollTop - pinEnd) / releaseScrollPx;
        const eased = t * t * (3 - 2 * t);
        translateY = translateAtPinEnd * (1 - eased);
        scale = scaleAtPinEnd + (1 - scaleAtPinEnd) * eased;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    stackPositionRef,
    stackClampActiveRef,
    pinEndViewportRatio,
    releaseScrollPx,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  useLenis(
    (lenis) => {
      scrollYRef.current = lenis.scroll;
      if (useWindowScroll) {
        updateCardTransforms();
      }
    },
    [useWindowScroll, updateCardTransforms],
  );

  useEffect(() => {
    if (!useWindowScroll) return;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      updateCardTransforms();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [useWindowScroll, updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      return;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const stackRoot = useWindowScroll ? rootRef.current : scrollerRef.current;
    const cards = Array.from(
      stackRoot?.querySelectorAll('.scroll-stack-card') ?? [],
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    measureCardsBaseTop();

    const onResize = () => {
      measureCardsBaseTop();
      updateCardTransforms();
    };
    window.addEventListener('resize', onResize, { passive: true });

    if (!useWindowScroll) {
      setupLenis();
    }

    updateCardTransforms();

    return () => {
      if (!useWindowScroll) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }
      }
      stackCompletedRef.current = false;
      window.removeEventListener('resize', onResize);
      cardsRef.current = [];
      cardsBaseTopRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    stackPositionRef,
    remeasureKey,
    pinEndViewportRatio,
    releaseScrollPx,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    measureCardsBaseTop,
  ]);

  const inner = (
    <div
      className={`scroll-stack-inner px-3 pt-1 pb-[11rem] sm:px-4 md:px-12 md:pt-6 md:pb-[16rem] lg:px-20 ${innerClassName}`.trim()}
    >
      {children}
      {/* Spacer so the last pin can release cleanly */}
      <div className="scroll-stack-end h-px w-full" />
    </div>
  );

  if (useWindowScroll) {
    return (
      <div
        ref={rootRef}
        className={`scroll-stack-scroller relative w-full ${className}`.trim()}
      >
        {inner}
      </div>
    );
  }

  return (
    <div
      className={`scroll-stack-scroller relative h-full w-full overflow-x-visible overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
      }}
    >
      {inner}
    </div>
  );
};

export default ScrollStack;
