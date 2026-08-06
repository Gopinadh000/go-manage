import { useEffect, useState } from 'react'
import { BREAKPOINTS } from '../styles/themes/break-points.types'

export type DeviceTier = 'mobile' | 'tablet' | 'desktop'

function getDeviceTier(width: number): DeviceTier {
  if (width < BREAKPOINTS.tablet) return 'mobile'
  if (width < BREAKPOINTS.laptop) return 'tablet'
  return 'desktop'
}

/**
 * Reactive viewport tier aligned with Tailwind breakpoints.
 * - mobile:  < tablet (768)
 * - tablet:  tablet..<laptop (768–1023)
 * - desktop: >= laptop (1024+)
 */
export function useBreakpoint() {
  const [tier, setTier] = useState<DeviceTier>(() =>
    typeof window === 'undefined' ? 'desktop' : getDeviceTier(window.innerWidth),
  )

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${BREAKPOINTS.tablet}px)`)
    const mediaLaptop = window.matchMedia(`(min-width: ${BREAKPOINTS.laptop}px)`)

    const update = () => setTier(getDeviceTier(window.innerWidth))

    update()
    media.addEventListener('change', update)
    mediaLaptop.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
      mediaLaptop.removeEventListener('change', update)
    }
  }, [])

  return {
    tier,
    isMobile: tier === 'mobile',
    isTablet: tier === 'tablet',
    isDesktop: tier === 'desktop',
  }
}
