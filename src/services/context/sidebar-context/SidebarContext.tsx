import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useBreakpoint, type DeviceTier } from '../../../hooks/useBreakpoint'

type SidebarContextProps = {
  isOpen: boolean
  isCollapsed: boolean
  showExpandedContent: boolean

  toggleSidebar: () => void
  toggleCollapsed: () => void

  toggleMenu: () => void
  closeSideBar: () => void
}

const SideBarContext = createContext<SidebarContextProps | null>(null)

function defaultsForTier(tier: DeviceTier) {
  switch (tier) {
    case 'mobile':
      return { isOpen: false, isCollapsed: false }
    case 'tablet':
      return { isOpen: false, isCollapsed: true }
    case 'desktop':
      return { isOpen: false, isCollapsed: false }
  }
}

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const { tier, isMobile } = useBreakpoint()
  const [isOpen, setIsOpen] = useState(() => defaultsForTier(tier).isOpen)
  const [isCollapsed, setIsCollapsed] = useState(
    () => defaultsForTier(tier).isCollapsed,
  )

  // Reset sensible defaults when crossing mobile / tablet / desktop
  useEffect(() => {
    const next = defaultsForTier(tier)
    setIsOpen(next.isOpen)
    setIsCollapsed(next.isCollapsed)
  }, [tier])

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const closeSideBar = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    if (isMobile) {
      setIsOpen((prev) => !prev)
      return
    }
    // Tablet + desktop: expand ↔ icon rail (never fully hide)
    setIsCollapsed((prev) => !prev)
  }, [isMobile])

  const showExpandedContent = isMobile ? isOpen : !isCollapsed

  const value: SidebarContextProps = {
    isOpen,
    isCollapsed,
    showExpandedContent,
    toggleSidebar,
    toggleCollapsed,
    toggleMenu,
    closeSideBar,
  }

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SideBarContext)

  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }

  return context
}
