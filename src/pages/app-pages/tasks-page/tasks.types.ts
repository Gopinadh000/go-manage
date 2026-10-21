export type TaskCategory = 'new' | 'inprogress' | 'onhold' | 'done'

export interface ProjectTaskStatus {
  id: string
  name: string
  category: TaskCategory
}

export interface ProjectMember {
  id: string
  name: string
  role: string
  initials: string
  color: string
}

export interface TaskProject {
  id: string
  name: string
  description: string
  ownerId: string
  memberIds: string[]
  statuses: ProjectTaskStatus[]
}

export type TaskView = 'list' | 'board'
export type WorkspaceMode = 'my-tasks' | 'project'
