import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Check,
  DarkModeOutlined,
  LightModeOutlined,
  LogoutOutlined,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { useAuth } from '../../../services/context/auth-context/AuthContext'
import { useTheme } from '../../../services/context/theme-context/ThemeContext'
import {
  brandPalettes,
  palleteLabels,
  type ThemePallete,
} from '../../../styles'

const PALETTE_OPTIONS = Object.keys(brandPalettes) as ThemePallete[]

function getInitials(name?: string | null) {
  if (!name?.trim()) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

const UserProfileMenu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { user, logout } = useAuth()
  const { mode, palette, setMode, setPallete } = useTheme()
  const navigate = useNavigate()

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() ||
    'User'
  const initials = getInitials(displayName)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`
          flex items-center gap-2 rounded-[3px] px-1.5 py-1
          transition-colors
          hover:bg-app-surface-muted
          ${open ? 'bg-app-surface-muted' : ''}
        `}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-app-primary-500 text-xs font-semibold text-app-text-inverse">
          {initials}
        </span>
        <span className="hidden max-w-[7.5rem] truncate text-sm font-medium text-app-text tablet:inline">
          {displayName}
        </span>
        <KeyboardArrowDown
          sx={{ fontSize: 16 }}
          className={`text-app-text-muted transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1.5 w-[17.5rem] overflow-hidden rounded-[3px] border border-app-border bg-app-surface shadow-[0_8px_24px_rgb(0_0_0/0.08)]"
        >
          {/* Profile header */}
          <div className="flex items-center gap-3 px-3.5 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-primary-500 text-xs font-semibold text-app-text-inverse">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-app-text">
                {displayName}
              </p>
              <p>
                {user?.rolename}
              </p>
              <p className="truncate text-xs text-app-text-muted">
               
                    {user.tenantName}`
                
              </p>
            </div>
          </div>

          <div className="h-px bg-app-border" />

          {/* Appearance */}
          <div className="space-y-3.5 px-3.5 py-3">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-app-text-muted">
                  Appearance
                </p>
                <p className="text-[11px] capitalize text-app-text-secondary">
                  {mode}
                </p>
              </div>
              <div className="flex rounded-[3px] bg-app-surface-muted p-0.5">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setMode('light')}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-[3px] py-1.5 text-xs font-medium transition-colors ${
                    mode === 'light'
                      ? 'bg-app-surface text-app-text shadow-sm'
                      : 'text-app-text-muted hover:text-app-text'
                  }`}
                >
                  <LightModeOutlined sx={{ fontSize: 15 }} />
                  Light
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setMode('dark')}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-[3px] py-1.5 text-xs font-medium transition-colors ${
                    mode === 'dark'
                      ? 'bg-app-surface text-app-text shadow-sm'
                      : 'text-app-text-muted hover:text-app-text'
                  }`}
                >
                  <DarkModeOutlined sx={{ fontSize: 15 }} />
                  Dark
                </button>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-app-text-muted">
                  Theme color
                </p>
                <p className="text-[11px] text-app-text-secondary">
                  {palleteLabels[palette]}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                {PALETTE_OPTIONS.map((option) => {
                  const selected = palette === option
                  return (
                    <button
                      key={option}
                      type="button"
                      role="menuitem"
                      title={palleteLabels[option]}
                      aria-label={palleteLabels[option]}
                      aria-pressed={selected}
                      onClick={() => setPallete(option)}
                      className={`
                        relative flex h-6 w-6 items-center justify-center
                        transition-transform hover:scale-105
                        ${selected ? 'ring-2 ring-app-primary-500 ring-offset-2 ring-offset-app-surface' : ''}
                      `}
                    >
                      <span
                        className="h-full w-full "
                        style={{ backgroundColor: brandPalettes[option][500] }}
                      />
                      {selected ? (
                        <Check
                          sx={{ fontSize: 14 }}
                          className="absolute text-white"
                        />
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="h-px bg-app-border" />

          <div className="p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-[3px] px-2.5 py-2 text-sm text-app-error transition-colors hover:bg-app-error-soft"
            >
              <LogoutOutlined sx={{ fontSize: 17 }} />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserProfileMenu
