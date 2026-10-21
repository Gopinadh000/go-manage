import { useCallback, useEffect, useMemo, useState } from 'react'
import { WavingHandOutlined } from '@mui/icons-material'
import DashboardMetricCards from './components/DashboardMetricCards'
import StatusDonutChart from './components/ProjectStatusSection'
import RecentActivitySection from './components/RecentActivitySection'
import UpcomingTasksCard from './components/UpcomingTasksCard'
import UserStatusCard from './components/UserStatusCard'
import dashboardData from './db-data.js'
import type { DashboardData } from './dashboard.types'
import { useApi } from '../../../services/api'
import { useAuth } from '../../../services/context/auth-context/AuthContext'

interface DashboardApiResponse {
  status: boolean
  statusMessage?: string
  data: DashboardData
}

const DashboardPage = () => {
  const { user, permissions, login } = useAuth()
  const { GET } = useApi<DashboardApiResponse>()
  const [data, setData] = useState<DashboardData>(dashboardData)
  const [userStatus, setUserStatus] = useState(user?.userStatus || 'active')
  const fullName = useMemo(
    () => [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || 'there',
    [user?.firstName, user?.lastName],
  )

  const handleUserStatusChange = useCallback((status: string) => {
    setUserStatus(status)
    if (user) {
      login({ ...user, userStatus: status, userpermissions: permissions })
    }
  }, [login, permissions, user])

  useEffect(() => {
    const loadDashboard = async () => {
      const response = await GET('dashboard/overview')
      if (!response) return
      if (!response.status || !response.data) return
      setData(response.data)
    }

    void loadDashboard()
  }, [GET])

  return (
    <div className="flex min-h-0 flex-col gap-4 pb-2">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-semibold text-app-text">
            <WavingHandOutlined className="text-amber-500" sx={{ fontSize: 22 }} />
            Hii, {fullName}!
          </h1>
          <p className="mt-0.5 text-xs text-app-text-muted">
            Here&apos;s what&apos;s happening in your workspace today.
          </p>
        </div>
        <div className="w-full shrink-0 mobile:w-64">
          <UserStatusCard userStatus={userStatus} onStatusChange={handleUserStatusChange} />
        </div>
      </header>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="grid min-w-0 grid-cols-1 items-start gap-4 laptop:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-3">
            <DashboardMetricCards title="My Projects" metrics={data.projectMetrics} />
            <StatusDonutChart
              title="Project Status"
              statuses={data.projectStatuses}
              total={data.totalProjects}
              totalLabel="Total Projects"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <DashboardMetricCards title="My Tasks" metrics={data.taskMetrics} />
            <StatusDonutChart
              title="Task Status"
              statuses={data.taskStatuses}
              total={data.taskMetrics.reduce((sum, metric) => sum + metric.value, 0)}
              totalLabel="Total Tasks"
            />
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 laptop:grid-cols-2">
          <RecentActivitySection activities={data.activities} />
          <UpcomingTasksCard tasks={data.upcomingTasks} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
