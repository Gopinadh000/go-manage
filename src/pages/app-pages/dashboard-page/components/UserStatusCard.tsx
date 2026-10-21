import { memo, useState } from 'react'
import Switch from '@mui/material/Switch'
import { useApi } from '../../../../services/api'
import { dashboardCardClass } from './DashboardPrimitives'

interface UserStatusResponse {
  status: boolean
  statusMessage?: string
  data?: { userStatus: string }
}

function UserStatusCard({
  userStatus,
  onStatusChange,
}: {
  userStatus: string
  onStatusChange: (status: string) => void
}) {
  const { PATCH, loading, error } = useApi<UserStatusResponse>()
  const [statusMessage, setStatusMessage] = useState('')
  const isActive = userStatus.toLowerCase() === 'active'

  const handleStatusChange = async (active: boolean) => {
    const nextStatus = active ? 'active' : 'inactive'
    setStatusMessage('')
    const response = await PATCH('users/me/status', { userStatus: nextStatus })

    if (!response?.status || !response.data) {
      setStatusMessage(response?.statusMessage || error?.message || 'Could not update your status.')
      return
    }

    onStatusChange(response.data.userStatus)
  }

  return (
    <section className={`${dashboardCardClass} flex items-center justify-between gap-3 p-3`}>
      <div className="min-w-0">
        <h2 className="text-xs font-semibold text-app-text">My Status</h2>
        <p className="mt-1 text-[10px] text-app-text-muted">Set your availability</p>
        {statusMessage && (
          <p role="alert" className="mt-1 text-[10px] text-app-error">{statusMessage}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className={`text-[10px] font-medium ${isActive ? 'text-emerald-600' : 'text-app-text-muted'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
        <Switch
          checked={isActive}
          disabled={loading}
          onChange={(_, checked) => void handleStatusChange(checked)}
          size="small"
          inputProps={{ 'aria-label': `Set my status to ${isActive ? 'inactive' : 'active'}` }}
          sx={{
            width: 34,
            height: 22,
            p: 0,
            '& .MuiSwitch-switchBase': { p: '3px' },
            '& .MuiSwitch-thumb': { width: 16, height: 16, boxShadow: 'none' },
            '& .MuiSwitch-track': { borderRadius: 11, backgroundColor: 'var(--app-border-strong)', opacity: 1 },
            '& .MuiSwitch-switchBase.Mui-checked': { transform: 'translateX(12px)', color: '#fff' },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'var(--app-primary-500)',
              opacity: 1,
            },
          }}
        />
      </div>
    </section>
  )
}

export default memo(UserStatusCard)
