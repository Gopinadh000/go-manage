import { memo } from 'react'
import type { DashboardData } from '../dashboard.types'
import { dashboardCardClass, MemberAvatar, SectionHeading, ViewAllButton } from './DashboardPrimitives'

function RecentActivitySection({
  activities,
}: {
  activities: DashboardData['activities']
}) {
  return (
    <section className={`${dashboardCardClass} min-w-0 p-3`}>
      <SectionHeading title="Recent Activity" action={<ViewAllButton />} />
      <ul className="divide-y divide-app-border">
        {activities.map((activity) => (
          <li key={activity.id} className="flex min-w-0 items-start gap-2.5 py-2.5 first:pt-1">
            <MemberAvatar
              initials={activity.actorName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
              color="#ec4899"
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] leading-4 text-app-text-secondary">
                <span className="font-semibold text-app-text">{activity.actorName}</span>{' '}
                {activity.action}{' '}
                {activity.subject && <span className="font-medium text-app-text">“{activity.subject}”</span>}
              </p>
              <p className="mt-0.5 text-[10px] text-app-text-muted">in {activity.project}</p>
            </div>
            <time className="shrink-0 pt-0.5 text-[10px] text-app-text-muted">{activity.time}</time>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default memo(RecentActivitySection)
