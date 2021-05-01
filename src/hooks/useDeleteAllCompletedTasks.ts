import { useUser } from './auth/useUser'
import { useMutation, useQueryClient } from 'react-query'
import { Task } from '../models/tasks'
import { deleteTasks as requestDeleteTasks } from '../firebase/database'
import { useCallback } from 'react'

export function useDeleteAllCompletedTasks() {
  const { uid } = useUser()
  const queryClient = useQueryClient()

  const { mutate: deleteTasksMutation } = useMutation<
    void,
    Error,
    ReadonlyArray<Task>
  >((tasks: ReadonlyArray<Task>) => requestDeleteTasks(uid, tasks), {
    onSuccess: (_, deleteTasks) => {
      queryClient.setQueryData<{ [id: string]: Task }>('tasks', (tasks) => {
        return deleteTasks.reduce((tasks, task) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [task.id]: _, ...rest } = tasks
          return rest
        }, tasks ?? {})
      })
      deleteTasks.forEach((task) => {
        queryClient.removeQueries(['task', { taskId: task.id }], {
          exact: true,
        })
      })
    },
  })

  const deleteAllCompletedTasks = useCallback(
    (completedTasks: ReadonlyArray<Task>) => {
      deleteTasksMutation(completedTasks)
    },
    [deleteTasksMutation]
  )

  return {
    deleteAllCompletedTasks,
  }
}
