import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import type { TaskProject } from './tasks.types'
import TaskWorkspace from './components/TaskWorkspace'
import ProjectActions from './components/ProjectActions'
import ProjectMembersPanel from './components/ProjectMembersPanel'
import ProjectStatusesPanel from './components/ProjectStatusesPanel'
import DeleteProjectDialog from './components/DeleteProjectDialog'

interface ProjectRouteState {
  projectName?: string
  projectDescription?: string
}

const ProjectTasksPage = () => {
  const { projectId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const routeState = location.state as ProjectRouteState | null
  const [project, setProject] = useState<TaskProject>(() => ({
    id: projectId,
    name: routeState?.projectName || 'Project Tasks',
    description: routeState?.projectDescription || 'Tasks for the selected project.',
    ownerId: '',
    memberIds: [],
    statuses: [],
  }))
  const [activePanel, setActivePanel] = useState<'members' | 'statuses' | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateProject = (update: (current: TaskProject) => TaskProject) =>
    setProject(update)

  return (
    <>
      <TaskWorkspace
        mode="project"
        view={new URLSearchParams(location.search).get('view') === 'board' ? 'board' : 'list'}
        projectId={project.id}
        projectName={project.name}
        projectDescription={project.description}
        actionsSlot={
          <ProjectActions
            onAddMembers={() => setActivePanel('members')}
            onConfigureStatuses={() => setActivePanel('statuses')}
            onDelete={() => setDeleteOpen(true)}
          />
        }
      />
      {activePanel === 'members' && (
        <ProjectMembersPanel
          open
          members={[]}
          memberIds={project.memberIds}
          ownerId={project.ownerId}
          onClose={() => setActivePanel(null)}
          onSave={(memberIds, ownerId) => updateProject((current) => ({ ...current, memberIds, ownerId }))}
        />
      )}
      {activePanel === 'statuses' && (
        <ProjectStatusesPanel
          open
          statuses={project.statuses}
          onClose={() => setActivePanel(null)}
          onSave={(statuses) => updateProject((current) => ({ ...current, statuses }))}
        />
      )}
      <DeleteProjectDialog
        open={deleteOpen}
        projectName={project.name}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false)
          navigate('/projects')
        }}
      />
    </>
  )
}

export default ProjectTasksPage
