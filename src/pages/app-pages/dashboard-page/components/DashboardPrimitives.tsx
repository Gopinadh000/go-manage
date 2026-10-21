import type { ReactNode } from 'react'

export const dashboardCardClass =
  'rounded-lg border border-app-border bg-app-surface shadow-sm'

export function SectionHeading({
  title,
  action,
}: {
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-app-text">{title}</h2>
      {action}
    </div>
  )
}

export function MemberAvatar({
  initials,
  color,
  size = 'md',
}: {
  initials: string
  color: string
  size?: 'sm' | 'md'
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${
        size === 'sm' ? 'h-7 w-7 text-[9px]' : 'h-9 w-9 text-[11px]'
      }`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  )
}

export function ViewAllButton() {
  return (
    <button
      type="button"
      className="text-xs font-medium text-app-primary-500 transition-colors hover:text-app-primary-800"
    >
      View all <span aria-hidden="true">→</span>
    </button>
  )
}
