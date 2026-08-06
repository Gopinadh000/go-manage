import { useEffect, useRef, useState } from 'react'
import {
  AssignmentOutlined,
  NotificationsNoneOutlined,
  PeopleAltOutlined,
  TaskAltOutlined,
} from '@mui/icons-material'

type NotificationItem = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'task' | 'project' | 'team'
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Task assigned',
    message: 'You were assigned to “Homepage redesign”.',
    time: '2m ago',
    read: false,
    type: 'task',
  },
  {
    id: '2',
    title: 'Project update',
    message: 'Acme rollout moved to In Progress.',
    time: '1h ago',
    read: false,
    type: 'project',
  },
  {
    id: '3',
    title: 'New team member',
    message: 'Sarah joined your workspace.',
    time: 'Yesterday',
    read: true,
    type: 'team',
  },
]

const typeIcon = {
  task: TaskAltOutlined,
  project: AssignmentOutlined,
  team: PeopleAltOutlined,
} as const

const NotificationsMenu = () => {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const menuRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((item) => !item.read).length

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

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={open}
        className={`
          relative flex h-9 w-9 items-center justify-center rounded-[3px]
          text-app-text-secondary transition-colors
          hover:bg-app-surface-muted hover:text-app-text
          ${open ? 'bg-app-surface-muted text-app-text' : ''}
        `}
      >
        <NotificationsNoneOutlined sx={{ fontSize: 22 }} />
        {unreadCount > 0 ? (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-app-primary-500 px-1 text-[10px] font-semibold text-app-text-inverse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1.5 w-[22rem] overflow-hidden rounded-[3px] border border-app-border bg-app-surface shadow-[0_8px_24px_rgb(0_0_0/0.08)]"
        >
          <div className="flex items-center justify-between gap-3 px-3.5 py-3">
            <div>
              <p className="text-sm font-semibold text-app-text">
                Notifications
              </p>
              <p className="text-xs text-app-text-muted">
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : 'You’re all caught up'}
              </p>
            </div>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs font-medium text-app-primary-500 transition-colors hover:text-app-primary-800"
              >
                Mark all read
              </button>
            ) : null}
          </div>

          <div className="h-px bg-app-border" />

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-3.5 py-8 text-center text-sm text-app-text-muted">
                No notifications yet
              </div>
            ) : (
              <ul className="divide-y divide-app-border">
                {notifications.map((item) => {
                  const Icon = typeIcon[item.type]

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => markAsRead(item.id)}
                        className={`
                          flex w-full items-start gap-3 px-3.5 py-3 text-left transition-colors
                          hover:bg-app-surface-muted
                          ${item.read ? 'bg-app-surface' : 'bg-app-primary-50/40'}
                        `}
                      >
                        <span
                          className={`
                            mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px]
                            ${
                              item.read
                                ? 'bg-app-surface-muted text-app-text-muted'
                                : 'bg-app-primary-100 text-app-primary-800'
                            }
                          `}
                        >
                          <Icon sx={{ fontSize: 18 }} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="truncate text-sm font-medium text-app-text">
                              {item.title}
                            </span>
                            <span className="shrink-0 text-[11px] text-app-text-muted">
                              {item.time}
                            </span>
                          </span>
                          <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-app-text-muted">
                            {item.message}
                          </span>
                        </span>

                        {!item.read ? (
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-app-primary-500" />
                        ) : (
                          <span className="mt-2 h-1.5 w-1.5 shrink-0" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NotificationsMenu
