import { memo } from 'react'
import {
  AddTaskOutlined,
  CheckCircleOutlined,
  FolderOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@mui/icons-material'
import type { DashboardMetric } from '../dashboard.types'
import { dashboardCardClass } from './DashboardPrimitives'

const metricIcons = {
  projects: FolderOutlined,
  completed: CheckCircleOutlined,
  new: AddTaskOutlined,
  inProgress: PlayCircleOutlined,
  onHold: PauseCircleOutlined,
} as const

const metricColors = {
  projects: 'bg-pink-100 text-pink-600',
  completed: 'bg-emerald-100 text-emerald-600',
  new: 'bg-purple-100 text-purple-600',
  inProgress: 'bg-blue-100 text-blue-600',
  onHold: 'bg-amber-100 text-amber-600',
} as const

function DashboardMetricCards({
  title,
  metrics,
}: {
  title: string
  metrics: DashboardMetric[]
}) {
  return (
    <section aria-label={title}>
      <h2 className="mb-2 text-sm font-semibold text-app-text">{title}</h2>
      <div className={`grid grid-cols-1 gap-3 ${metrics.length === 2 ? 'mobile:grid-cols-2' : 'mobile:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-4'}`}>
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.icon]
          return (
            <article key={metric.label} className={`${dashboardCardClass} flex min-h-20 items-center gap-3 p-3`}>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${metricColors[metric.icon]}`}>
                <Icon fontSize="small" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs text-app-text-muted">{metric.label}</p>
                <p className="mt-0.5 text-xl font-semibold leading-6 text-app-text">{metric.value}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default memo(DashboardMetricCards)
