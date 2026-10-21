const dashboardData = {
  projectMetrics: [
    { label: 'Total Projects', value: 6, icon: 'projects' },
    { label: 'Completed Projects', value: 2, icon: 'completed' },
  ],
  taskMetrics: [
    { label: 'New', value: 4, icon: 'new' },
    { label: 'In Progress', value: 5, icon: 'inProgress' },
    { label: 'Completed', value: 8, icon: 'completed' },
    { label: 'On Hold', value: 2, icon: 'onHold' },
  ],
  projectStatuses: [
    { label: 'Active', value: 4, color: '#3b82f6' },
    { label: 'Completed', value: 2, color: '#10b981' },
  ],
  taskStatuses: [
    { label: 'New', value: 4, color: '#a855f7' },
    { label: 'In Progress', value: 5, color: '#3b82f6' },
    { label: 'Completed', value: 8, color: '#10b981' },
    { label: 'On Hold', value: 2, color: '#f59e0b' },
  ],
  totalProjects: 6,
  activities: [
    { id: 1, actorName: 'You', action: 'created a project', subject: 'Website Redesign', project: 'My Projects', time: '2 hours ago' },
    { id: 2, actorName: 'You', action: 'commented on a task', subject: 'Design login page', project: 'Mobile App', time: '4 hours ago' },
    { id: 3, actorName: 'You', action: 'completed a task', subject: 'Setup database', project: 'Backend Development', time: '6 hours ago' },
    { id: 4, actorName: 'You', action: 'updated project details', subject: 'Customer Portal', project: 'My Projects', time: '1 day ago' },
  ],
  upcomingTasks: [
    { id: 1, title: 'Fix login issue on mobile', project: 'Website Redesign', dueDate: 'Today', icon: 'task' },
    { id: 2, title: 'Create landing page design', project: 'Mobile App', dueDate: 'Tomorrow', icon: 'task' },
    { id: 3, title: 'API integration testing', project: 'Customer Portal', dueDate: 'May 5', icon: 'task' },
    { id: 4, title: 'Update documentation', project: 'Internal Tools', dueDate: 'May 6', icon: 'task' },
  ],
}

export default dashboardData
