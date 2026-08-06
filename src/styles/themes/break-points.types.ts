/**
 * Must stay in sync with @theme breakpoints in src/index.css
 * (Tailwind uses rem; 1rem = 16px)
 */
export const BREAKPOINTS = {
  mobile: 320, // 20rem
  tablet: 768, // 48rem
  laptop: 1024, // 64rem — layout "desktop" behavior starts here
  desktop: 1280, // 80rem
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS

export const mediaQueries = {
  mobile: `(min-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  laptop: `(min-width: ${BREAKPOINTS.laptop}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
} as const
