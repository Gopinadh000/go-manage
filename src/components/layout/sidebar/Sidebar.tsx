import { useSidebar } from '../../../services/context/sidebar-context/SidebarContext'
import { useBreakpoint } from '../../../hooks/useBreakpoint'
import SidebarLogo from './SidebarLogo'
import SidebarNavigation from './SidebarNavigation'

const Sidebar = () => {
  const { isOpen, isCollapsed, closeSideBar } = useSidebar()
  const { isMobile } = useBreakpoint()

  const widthClass = isCollapsed
    ? 'w-[var(--sidebar-collapsed)]'
    : 'w-[var(--sidebar-expanded)]'

  return (
    <>
      {isMobile && isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSideBar}
          className="fixed inset-0 z-40 bg-app-text/40"
        />
      )}

      <aside
        aria-hidden={isMobile && !isOpen}
        className={
          isMobile
            ? `
              fixed inset-y-0 left-0 z-50 flex h-full
              w-(--sidebar-expanded) flex-col
              border-r border-app-border bg-app-surface
              transition-transform duration-200 ease-out
              ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `
            : `
              relative z-50 flex h-full shrink-0 flex-col
              border-r border-app-border bg-app-surface
              transition-[width] duration-200 ease-out
              ${widthClass}
            `
        }
      >
        <SidebarLogo />
        <SidebarNavigation />
      </aside>
    </>
  )
}

export default Sidebar
