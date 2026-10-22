import DataTable from '../../../../components/ui/data-table/DataTable'
import type { WorkspaceMode } from '../tasks.types'

const TaskList = ({ mode, projectId }: { mode: WorkspaceMode; projectId?: string }) => {
  const isProjectMode = mode === 'project'
  const params = new URLSearchParams()
  if (isProjectMode && projectId) params.set('projectId', projectId)
  if (!isProjectMode) params.set('assignedToMe', 'true')

  return (
    <DataTable
      rowKey="taskId"
      refreshKey={projectId ?? 'my-tasks'}
      tableUrlConfig={{
        pageName: '/tasks',
        payloadParams: params.toString(),
      }}
    />
  )
}

export default TaskList
