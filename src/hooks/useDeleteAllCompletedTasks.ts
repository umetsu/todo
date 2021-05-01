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
    onSuccess: (_, deletedTasks) => {
      deletedTasks.forEach((task) => {
        queryClient.removeQueries(['task', { taskId: task.id }], {
          exact: true,
        })
      })
    },
    onSettled: () => queryClient.invalidateQueries('tasks'),
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
