import { memo } from 'react'
import { BusinessOutlined, LinkOutlined } from '@mui/icons-material'
import { useAuth } from '../../../../../services/context/auth-context/AuthContext'

function CompanyTab() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h2 id="settings-section-title" className="text-lg font-semibold text-app-text">Company</h2>
        <p className="mt-1 text-sm text-app-text-muted">Workspace information for your organization.</p>
      </div>

      <section className="flex flex-wrap items-center gap-4 rounded-lg border border-app-border bg-app-bg p-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-app-primary-100 text-app-primary-500">
          <BusinessOutlined sx={{ fontSize: 28 }} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-app-text">{user?.tenantName || 'Your Company'}</h3>
          <p className="mt-1 text-xs text-app-text-muted">Go Manage workspace</p>
        </div>
      </section>

      <section className="max-w-2xl">
        <h3 className="mb-3 text-sm font-semibold text-app-text">Company Information</h3>
        <dl className="divide-y divide-app-border rounded-lg border border-app-border px-4">
          <div className="flex items-center gap-3 py-4">
            <BusinessOutlined className="text-app-primary-500" fontSize="small" />
            <dt className="flex-1 text-sm text-app-text-muted">Company name</dt>
            <dd className="text-right text-sm font-medium text-app-text">{user?.tenantName || 'Not provided'}</dd>
          </div>
          <div className="flex items-center gap-3 py-4">
            <LinkOutlined className="text-app-primary-500" fontSize="small" />
            <dt className="flex-1 text-sm text-app-text-muted">Workspace ID</dt>
            <dd className="break-all text-right text-sm font-medium text-app-text">{user?.tenantSlug || 'Not provided'}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

export default memo(CompanyTab)
