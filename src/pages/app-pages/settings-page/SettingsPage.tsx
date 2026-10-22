import { useState } from 'react'
import {
  BusinessOutlined,
  NotificationsNoneOutlined,
  PaletteOutlined,
  PersonOutlined,
  ShieldOutlined,
} from '@mui/icons-material'
import PageHeader from '../../../components/ui/page-header/PageHeader'
import type { ReactNode } from 'react'
import ProfileTab from './tabs-sections/profile/ProfileTab'
import SecurityTab from './tabs-sections/security/SecurityTab'
import NotificationsTab from './tabs-sections/notifications/NotificationsTab'
import AppearanceTab from './tabs-sections/appearance/AppearanceTab'
import CompanyTab from './tabs-sections/company/CompanyTab'

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: <PersonOutlined fontSize="small" /> },
  { id: 'company', label: 'Company', icon: <BusinessOutlined fontSize="small" /> },
  { id: 'security', label: 'Security', icon: <ShieldOutlined fontSize="small" /> },
  { id: 'notifications', label: 'Notifications', icon: <NotificationsNoneOutlined fontSize="small" /> },
  { id: 'appearance', label: 'Appearance', icon: <PaletteOutlined fontSize="small" /> },
 
] as const

type SettingsTab = (typeof settingsTabs)[number]['id']

const tabContent: Record<SettingsTab, ReactNode> = {
  profile: <ProfileTab />,
  security: <SecurityTab />,
  notifications: <NotificationsTab />,
  appearance: <AppearanceTab />,
  company: <CompanyTab />,
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and workspace settings."
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-4 tablet:grid-cols-[13rem_minmax(0,1fr)] tablet:grid-rows-1">
        <nav
          aria-label="Settings sections"
          role="tablist"
          aria-orientation="vertical"
          className="custom-scrollbar flex min-h-0 gap-1 overflow-x-auto rounded-lg border border-app-border bg-app-surface p-2 tablet:h-full tablet:flex-col tablet:gap-1 tablet:overflow-y-auto"
        >
          {settingsTabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <div
                key={tab.id}
                id={`settings-tab-${tab.id}`}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`settings-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => {
                  const currentIndex = settingsTabs.findIndex((item) => item.id === activeTab)
                  let nextIndex: number

                  if (event.key === 'ArrowDown') {
                    nextIndex = (currentIndex + 1) % settingsTabs.length
                  } else if (event.key === 'ArrowUp') {
                    nextIndex = (currentIndex - 1 + settingsTabs.length) % settingsTabs.length
                  } else if (event.key === 'Home') {
                    nextIndex = 0
                  } else if (event.key === 'End') {
                    nextIndex = settingsTabs.length - 1
                  } else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveTab(tab.id)
                    return
                  } else {
                    return
                  }

                  event.preventDefault()
                  const nextTab = settingsTabs[nextIndex]
                  setActiveTab(nextTab.id)
                  document.getElementById(`settings-tab-${nextTab.id}`)?.focus()
                }}
                className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors tablet:w-full ${
                  isActive
                    ? 'bg-app-primary-50 text-app-primary-800'
                    : 'text-app-text-secondary hover:bg-app-bg hover:text-app-text'
                } cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-app-primary-500`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            )
          })}
        </nav>

        <section
          key={activeTab}
          id={`settings-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`settings-tab-${activeTab}`}
          className="custom-scrollbar min-h-0 min-w-0 overflow-y-auto rounded-lg border border-app-border bg-app-surface p-4 tablet:h-full tablet:p-6"
        >
          {tabContent[activeTab]}
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
