import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { useUser } from '../../auth/hooks/useUser'
import { Task } from '../models'
import { fetchAllTasks } from '../../../firebase/database'

export function useTasks() {
  const queryClient = useQueryClient()
  const { uid } = useUser()

  const { data } = useQuery<
    { [id: string]: Task },
    Error,
    {
      uncompletedTasks: ReadonlyArray<Task>
      completedTasks: ReadonlyArray<Task>
    }
  >(['tasks'], () => fetchAllTasks(uid), {
    select: (data) => {
      const tasks = Object.values(data).reverse()
      return {
        uncompletedTasks: tasks.filter((t) => !t.completed),
        completedTasks: tasks.filter((t) => t.completed),
      }
    },
    onSuccess: ({ uncompletedTasks, completedTasks }) => {
      setQueryDataForTask(queryClient, [...uncompletedTasks, ...completedTasks])
    },
  })

  return {
    uncompletedTasks: data?.uncompletedTasks ?? [],
    completedTasks: data?.completedTasks ?? [],
  }
}

function setQueryDataForTask(
  queryClient: QueryClient,
  tasks: ReadonlyArray<Task>
) {
  tasks.forEach((task) =>
    queryClient.setQueryData(['task', { taskId: task.id }], task)
  )
}
