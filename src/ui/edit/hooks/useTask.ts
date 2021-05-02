import { Task } from '../models'
import { useUser } from '../../auth/hooks/useUser'
import { useQuery } from 'react-query'
import { fetchTask } from '../../../firebase/database'

const loadingTask: Task = {
  id: '',
  name: '読込中...',
  completed: false,
}

export function useTask(taskId: string) {
  const { uid } = useUser()
  const { data } = useQuery<Task, Error, Task>(['task', { taskId }], () =>
    fetchTask(uid, taskId)
  )

  return {
    task: data ?? loadingTask,
  }
}
