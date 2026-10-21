import type { ReactNode } from 'react'
import { AddOutlined } from '@mui/icons-material'
import Button from '../../../../components/ui/button/Button'
import PageHeader from '../../../../components/ui/page-header/PageHeader'
import Tabs from '../../../../components/ui/tabs/Tabs'
import type { TaskView, WorkspaceMode } from '../tasks.types'
import TaskList from './TaskList'
import TaskBoard from './TaskBoard'

const taskTabs = [
  { id: 'list', key: 'list', label: 'List' },
  { id: 'board', key: 'board', label: 'Board' },
]

interface TaskWorkspaceProps {
  mode: WorkspaceMode
  view: TaskView
  projectId?: string
  projectName?: string
  projectDescription?: string
  actionsSlot?: ReactNode
}

const TaskWorkspace = ({
  mode,
  view,
  projectId,
  projectName,
  projectDescription,
  actionsSlot,
}: TaskWorkspaceProps) => {
  const isProjectMode = mode === 'project'
  const pageTitle = isProjectMode ? projectName || 'Project Tasks' : 'My Tasks'
  const pageSubtitle = isProjectMode
    ? projectDescription || 'Tasks for the selected project.'
    : 'Tasks assigned to you across your projects.'

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title={pageTitle} subtitle={pageSubtitle}>
        <Tabs tabs={taskTabs} defaultTab="list" />
        <Button
          startIcon={<AddOutlined />}
          label="Create Task"
          size="sm"
        />
        {actionsSlot}
      </PageHeader>

      <div className="min-h-0 flex-1">
        {view === 'list' ? <TaskList mode={mode} projectId={projectId} /> : <TaskBoard />}
      </div>
    </div>
  )
}

export default TaskWorkspace
