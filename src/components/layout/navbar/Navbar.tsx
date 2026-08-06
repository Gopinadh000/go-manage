import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import {
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRightOutlined,
} from '@mui/icons-material'
import { useSidebar } from '../../../services/context/sidebar-context/SidebarContext'
import { useBreakpoint } from '../../../hooks/useBreakpoint'
import NotificationsMenu from './NotificationsMenu'
import UserProfileMenu from './UserProfileMenu'

const Navbar = () => {
  const { isOpen, isCollapsed, toggleMenu } = useSidebar()
  const { isMobile } = useBreakpoint()

  return (
    <header className="flex h-18 items-center justify-between gap-3 border-b border-app-border bg-app-surface px-4">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={
          isMobile
            ? isOpen
              ? 'Close sidebar'
              : 'Open sidebar'
            : isCollapsed
              ? 'Expand sidebar'
              : 'Collapse sidebar'
        }
        className="
          flex h-7 w-7 items-center justify-center
          rounded-[3px] border border-app-border
          transition-colors hover:bg-app-primary-50
        "
      >
        {isMobile ? (
          <MenuOpenIcon />
        ) : isCollapsed ? (
          <KeyboardDoubleArrowRightOutlined />
        ) : (
          <KeyboardDoubleArrowLeftOutlined />
        )}
      </button>

      <div className="flex items-center gap-1.5">
        <NotificationsMenu />
        <UserProfileMenu />
      </div>
    </header>
  )
}

export default Navbar
