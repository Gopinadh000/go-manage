import { useState } from 'react'
import Button from '../../../../components/ui/button/Button'
import InputField from '../../../../components/ui/inputs/input-field/InputField'
import SelectField from '../../../../components/ui/inputs/select-field/SelectField'
import type { ProjectTaskStatus, TaskCategory } from '../tasks.types'

interface ProjectStatusesPanelProps {
  open: boolean
  statuses: ProjectTaskStatus[]
  onClose: () => void
  onSave: (statuses: ProjectTaskStatus[]) => void
}

const categories = [
  { value: 'new', label: 'New' },
  { value: 'inprogress', label: 'In progress' },
  { value: 'onhold', label: 'On hold' },
  { value: 'done', label: 'Done' },
] satisfies { value: TaskCategory; label: string }[]

const categoryOptions = categories.map((category) => ({
  value: category.value,
  label: category.label,
}))

const ProjectStatusesPanel = ({ open, statuses, onClose, onSave }: ProjectStatusesPanelProps) => {
  const [draft, setDraft] = useState(statuses)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState<TaskCategory>('new')

  if (!open) return null

  const updateStatus = (id: string, patch: Partial<ProjectTaskStatus>) => {
    setDraft((current) => current.map((status) => status.id === id ? { ...status, ...patch } : status))
  }
  const addStatus = () => {
    const name = newName.trim()
    if (!name) return
    setDraft((current) => [...current, { id: `status-${Date.now()}`, name, category: newCategory }])
    setNewName('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-app-surface shadow-xl">
        <header className="border-b border-app-border px-5 py-4">
          <h2 className="text-lg font-semibold text-app-text">Configure statuses</h2>
          <p className="mt-1 text-xs text-app-text-muted">Status names are project-specific; categories are shared.</p>
        </header>
        <div className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
          {draft.length === 0 && (
            <p className="rounded-lg border border-dashed border-app-border p-4 text-center text-sm text-app-text-muted">
              No project statuses are configured yet.
            </p>
          )}
          {draft.map((status) => (
            <div key={status.id} className="grid grid-cols-[1fr_130px] gap-2 rounded-lg border border-app-border p-3">
              <InputField
                label="Status name"
                name={`status-${status.id}`}
                type="text"
                placeholder="Enter status name"
                value={status.name}
                onChange={(event) => updateStatus(status.id, { name: event.target.value })}
              />
              <SelectField
                label="Category"
                name={`category-${status.id}`}
                value={status.category}
                options={categoryOptions}
                onChange={(event) => updateStatus(status.id, { category: event.target.value as TaskCategory })}
              />
            </div>
          ))}
          <div className="rounded-lg border border-dashed border-app-border p-3">
            <p className="mb-2 text-xs font-medium text-app-text">Add status</p>
            <div className="grid grid-cols-[1fr_130px_auto] items-end gap-2">
              <InputField
                label="Status name"
                name="new-status-name"
                type="text"
                placeholder="Enter status name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
              <SelectField
                label="Category"
                name="new-status-category"
                value={newCategory}
                options={categoryOptions}
                onChange={(event) => setNewCategory(event.target.value as TaskCategory)}
              />
              <Button label="Add" size="sm" onClick={addStatus} disabled={!newName.trim()} />
            </div>
          </div>
        </div>
        <footer className="flex justify-end gap-2 border-t border-app-border p-4">
          <Button label="Cancel" variant="outlined" size="sm" onClick={onClose} />
          <Button label="Save statuses" size="sm" onClick={() => { onSave(draft); onClose() }} />
        </footer>
      </aside>
    </div>
  )
}

export default ProjectStatusesPanel
