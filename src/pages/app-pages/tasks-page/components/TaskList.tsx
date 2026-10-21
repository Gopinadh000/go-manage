import DataTable from '../../../../components/ui/data-table/DataTable'
import type { DataTableHeader } from '../../../../components/ui/data-table/datatable.types'
import type { WorkspaceMode } from '../tasks.types'

const myTaskHeaders: DataTableHeader[] = [
  { key: 'select', fieldName: 'select', label: '' },
  { key: 'taskName', fieldName: 'taskName', label: 'Task' },
  { key: 'projectName', fieldName: 'projectName', label: 'Project' },
  { key: 'priority', fieldName: 'priority', label: 'Priority' },
  { key: 'status', fieldName: 'status', label: 'Status' },
  { key: 'dueDate', fieldName: 'dueDate', label: 'Due Date' },
  { key: 'assignee', fieldName: 'assignee', label: 'Assignee' },
]

const projectTaskHeaders: DataTableHeader[] = [
  { key: 'select', fieldName: 'select', label: '' },
  { key: 'taskName', fieldName: 'taskName', label: 'Task' },
  { key: 'priority', fieldName: 'priority', label: 'Priority' },
  { key: 'status', fieldName: 'status', label: 'Status' },
  { key: 'dueDate', fieldName: 'dueDate', label: 'Due Date' },
  { key: 'assignee', fieldName: 'assignee', label: 'Assignee' },
]

const TaskList = ({ mode, projectId }: { mode: WorkspaceMode; projectId?: string }) => {
  const isProjectMode = mode === 'project'
  const params = new URLSearchParams()
  if (isProjectMode && projectId) params.set('projectId', projectId)
  if (!isProjectMode) params.set('assignedToMe', 'true')

  return (
    <DataTable
      rowKey="taskPublicId"
      refreshKey={projectId ?? 'my-tasks'}
      tableUrlConfig={{
        pageName: '/tasks',
        payloadParams: params.toString(),
      }}
      fallbackHeaders={isProjectMode ? projectTaskHeaders : myTaskHeaders}
    />
  )
}

export default TaskList
