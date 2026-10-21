export interface DashboardMetric {
  label: string
  value: number
  icon: 'projects' | 'new' | 'inProgress' | 'completed' | 'onHold'
}

export interface DashboardData {
  projectMetrics: DashboardMetric[]
  taskMetrics: DashboardMetric[]
  projectStatuses: DashboardStatus[]
  taskStatuses: DashboardStatus[]
  totalProjects: number
  activities: {
    id: number
    actorName: string
    action: string
    subject: string
    project: string
    time: string
  }[]
  upcomingTasks: {
    id: number
    title: string
    project: string
    dueDate: string
    icon: 'project' | 'task'
  }[]
}

export interface DashboardStatus {
  label: string
  value: number
  color: string
}
