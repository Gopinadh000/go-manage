import { memo } from 'react'
import type { DashboardStatus } from '../dashboard.types'
import { dashboardCardClass, SectionHeading } from './DashboardPrimitives'

function StatusDonutChart({
  title,
  statuses,
  total,
  totalLabel,
}: {
  title: string
  statuses: DashboardStatus[]
  total: number
  totalLabel: string
}) {
  const radius = 57
  const circumference = 2 * Math.PI * radius
  const statusTotal = statuses.reduce((sum, status) => sum + status.value, 0)

  return (
    <section className={`${dashboardCardClass} flex min-h-64 min-w-0 flex-col p-4`}>
      <SectionHeading title={title} />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 laptop:flex-row laptop:justify-around">
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" role="img" aria-label={`${title} breakdown`}>
            {statuses.map((status, index) => {
              const length = statusTotal > 0 ? (status.value / statusTotal) * circumference : 0
              const previousValues = statuses
                .slice(0, index)
                .reduce((sum, item) => sum + item.value, 0)
              const offset = -(previousValues / (statusTotal || 1)) * circumference
              return (
                <circle
                  key={status.label}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke={status.color}
                  strokeWidth="19"
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={offset}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-semibold">{total}</span>
            <span className="text-[10px] text-app-text-muted">{totalLabel}</span>
          </div>
        </div>
        <ul className="w-full space-y-3 laptop:w-auto laptop:min-w-36">
          {statuses.map((status) => (
            <li key={status.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-2 text-app-text-secondary">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: status.color }} />
                {status.label}
              </span>
              <span className="font-medium text-app-text">{status.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default memo(StatusDonutChart)
