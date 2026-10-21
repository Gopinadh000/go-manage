import { useState } from 'react'
import { AppsOutlined } from '@mui/icons-material'

interface ProjectActionsProps {
  onAddMembers: () => void
  onConfigureStatuses: () => void
  onDelete: () => void
}

const ProjectActions = ({ onAddMembers, onConfigureStatuses, onDelete }: ProjectActionsProps) => {
  const [open, setOpen] = useState(false)
  const actions = [
    { label: 'Add members', onClick: onAddMembers },
    { label: 'Configure statuses', onClick: onConfigureStatuses },
    { label: 'Delete project', onClick: onDelete, danger: true },
  ]

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Project options"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-app-border bg-app-surface text-app-text-secondary hover:bg-app-bg"
      >
        <AppsOutlined fontSize="small" />
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-30 w-48 rounded-lg border border-app-border bg-app-surface p-1 shadow-lg">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                setOpen(false)
                action.onClick()
              }}
              className={`block w-full rounded px-3 py-2 text-left text-xs hover:bg-app-bg ${action.danger ? 'text-app-error' : 'text-app-text'}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectActions
