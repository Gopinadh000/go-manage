import { useState } from 'react'
import Button from '../../../../components/ui/button/Button'
import Checkbox from '../../../../components/ui/inputs/checkbox/Checkbox'
import type { ProjectMember } from '../tasks.types'

interface ProjectMembersPanelProps {
  open: boolean
  members: ProjectMember[]
  memberIds: string[]
  ownerId: string
  onClose: () => void
  onSave: (memberIds: string[], ownerId: string) => void
}

const panelClass = 'fixed inset-0 z-50 bg-black/30'

const ProjectMembersPanel = ({
  open,
  members,
  memberIds,
  ownerId,
  onClose,
  onSave,
}: ProjectMembersPanelProps) => {
  const [selected, setSelected] = useState(memberIds)
  const [owner, setOwner] = useState(ownerId)

  if (!open) return null

  const toggleMember = (id: string) => {
    setSelected((current) => current.includes(id) ? current.filter((memberId) => memberId !== id) : [...current, id])
    if (id === owner && selected.includes(id)) setOwner('')
  }
  const save = () => {
    const validOwner = selected.includes(owner) ? owner : selected[0]
    if (!validOwner) return
    onSave(selected, validOwner)
    onClose()
  }

  return (
    <div className={panelClass} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-app-surface shadow-xl">
        <header className="border-b border-app-border px-5 py-4">
          <h2 className="text-lg font-semibold text-app-text">Project members</h2>
          <p className="mt-1 text-xs text-app-text-muted">Choose members and set one project owner.</p>
        </header>
        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-3">
          {members.length === 0 && (
            <p className="p-5 text-center text-sm text-app-text-muted">Members will appear here when connected to the user API.</p>
          )}
          {members.map((member) => {
            const checked = selected.includes(member.id)
            return (
              <div key={member.id} className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-app-bg">
                <Checkbox
                  checked={checked}
                  onChange={() => toggleMember(member.id)}
                  ariaLabel={`Add ${member.name} to project`}
                />
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: member.color }}>{member.initials}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-app-text">{member.name}</span>
                  <span className="block truncate text-xs text-app-text-muted">{member.role}</span>
                </span>
                <label className={`flex items-center gap-1 text-[10px] ${checked ? 'text-app-text-secondary' : 'text-app-text-muted'}`}>
                  <input
                    type="radio"
                    className="accent-app-primary-500"
                    name="project-owner"
                    disabled={!checked}
                    checked={owner === member.id}
                    onChange={() => setOwner(member.id)}
                    aria-label={`Set ${member.name} as project owner`}
                  />
                  Owner
                </label>
              </div>
            )
          })}
        </div>
        <footer className="flex justify-end gap-2 border-t border-app-border p-4">
          <Button label="Cancel" variant="outlined" size="sm" onClick={onClose} />
          <Button label="Save members" size="sm" disabled={selected.length === 0} onClick={save} />
        </footer>
      </aside>
    </div>
  )
}

export default ProjectMembersPanel
