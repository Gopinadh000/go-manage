import { memo } from 'react'
import {
  CheckBoxOutlineBlank,
  CheckCircleOutlined,
  FolderOutlined,
  TaskAltOutlined,
} from '@mui/icons-material'
import type { DashboardData } from '../dashboard.types'
import { dashboardCardClass, SectionHeading, ViewAllButton } from './DashboardPrimitives'

const taskIcons = {
  project: FolderOutlined,
  task: CheckBoxOutlineBlank,
  completed: TaskAltOutlined,
} as const

const taskIconColors = {
  project: 'bg-pink-100 text-pink-600',
  task: 'bg-blue-100 text-blue-600',
  completed: 'bg-emerald-100 text-emerald-600',
} as const

function UpcomingTasksCard({ tasks }: { tasks: DashboardData['upcomingTasks'] }) {
  return (
    <section className={`${dashboardCardClass} p-3`}>
      <SectionHeading title="Upcoming Tasks" action={<ViewAllButton />} />
      <ul className="space-y-2">
        {tasks.map((task) => {
          const Icon = taskIcons[task.icon]
          return (
            <li key={task.id} className="flex items-start gap-2">
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${taskIconColors[task.icon]}`}>
                {task.icon === 'completed'
                  ? <CheckCircleOutlined sx={{ fontSize: 14 }} />
                  : <Icon sx={{ fontSize: 14 }} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium text-app-text">{task.title}</p>
                <p className="truncate text-[9px] text-app-text-muted">{task.project}</p>
              </div>
              <time className="shrink-0 pt-0.5 text-[9px] text-app-text-muted">{task.dueDate}</time>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default memo(UpcomingTasksCard)
