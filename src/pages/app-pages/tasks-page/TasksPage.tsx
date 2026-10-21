import { useSearchParams } from 'react-router'
import TaskWorkspace from './components/TaskWorkspace'

const TasksPage = () => {
  const [searchParams] = useSearchParams()

  return (
    <TaskWorkspace
      mode="my-tasks"
      view={searchParams.get('view') === 'board' ? 'board' : 'list'}
    />
  )
}

export default TasksPage
