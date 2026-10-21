import { memo, useState } from 'react'
import Switch from '@mui/material/Switch'
import { EmailOutlined, WhatsApp } from '@mui/icons-material'

function NotificationsTab() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [whatsAppEnabled, setWhatsAppEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 id="settings-section-title" className="text-lg font-semibold text-app-text">Notifications</h2>
        <p className="mt-1 text-sm text-app-text-muted">Choose how you would like to receive notifications.</p>
      </div>

      <section className="max-w-2xl rounded-lg border border-app-border p-4 tablet:p-5">
        <h3 className="mb-3 text-sm font-semibold text-app-text">Notification Channels</h3>
        <div className="divide-y divide-app-border">
          <div className="flex items-center gap-3 py-4 first:pt-1">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-app-primary-50 text-app-primary-500">
              <EmailOutlined fontSize="small" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-app-text">Email</h3>
              <p className="mt-0.5 text-xs text-app-text-muted">Receive updates and reminders by email.</p>
            </div>
            <Switch
              checked={emailEnabled}
              onChange={(_, checked) => setEmailEnabled(checked)}
              inputProps={{ 'aria-label': 'Enable email notifications' }}
            />
          </div>
          <div className="flex items-center gap-3 py-4 last:pb-1">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <WhatsApp fontSize="small" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-app-text">WhatsApp</h3>
              <p className="mt-0.5 text-xs text-app-text-muted">Receive important notifications on WhatsApp.</p>
            </div>
            <Switch
              checked={whatsAppEnabled}
              onChange={(_, checked) => setWhatsAppEnabled(checked)}
              inputProps={{ 'aria-label': 'Enable WhatsApp notifications' }}
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-app-text-muted">Notification preferences are for preview only.</p>
      </section>
    </div>
  )
}

export default memo(NotificationsTab)
