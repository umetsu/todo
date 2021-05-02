import { useUser } from './auth/useUser'
import { useMutation, useQueryClient } from 'react-query'
import { Task } from '../models/tasks'
import { deleteTasks as requestDeleteTasks } from '../firebase/database'
import { useCallback } from 'react'

export function useDeleteTask() {
  const { uid } = useUser()
  const queryClient = useQueryClient()

  const { mutate: deleteTasksMutation } = useMutation<void, Error, Task>(
    (task: Task) => requestDeleteTasks(uid, [task]),
    {
      onSuccess: (_, deletedTask) => {
        queryClient.removeQueries(['task', { taskId: deletedTask.id }], {
          exact: true,
        })
      },
      onSettled: () => queryClient.invalidateQueries('tasks'),
    }
  )

  const deleteTask = useCallback(
    (task: Task) => {
      deleteTasksMutation(task)
    },
    [deleteTasksMutation]
  )

  return {
    deleteTask,
  }
}
