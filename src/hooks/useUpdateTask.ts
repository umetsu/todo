import { Task } from '../models/tasks'
import { useUser } from './auth/useUser'
import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { updateTask as requestUpdateTask } from '../firebase/database'
import { useCallback } from 'react'

export function useUpdateTask(task: Task) {
  const { uid } = useUser()
  const queryClient = useQueryClient()

  const { mutate: updateTaskMutation } = useMutation<
    Task,
    Error,
    Task,
    { previousTask: Task | undefined }
  >((task) => requestUpdateTask(uid, task), {
    onMutate: async (newTask) => {
      const taskQueryKey = ['task', { taskId: task.id }]
      await queryClient.cancelQueries(taskQueryKey)
      const previousTask = queryClient.getQueryData<Task>(taskQueryKey)
      updateCache(queryClient, newTask)
      return { previousTask }
    },
    onError: (error, variables, context) => {
      if (!context?.previousTask) return
      updateCache(queryClient, context.previousTask)
    },
  })

  const changeCompleted = useCallback(
    (checked: boolean) => {
      updateTaskMutation({ ...task, completed: checked })
    },
    [updateTaskMutation, task]
  )

  const changeTaskName = useCallback(
    (taskName: string) => {
      updateTaskMutation({ ...task, name: taskName })
    },
    [updateTaskMutation, task]
  )

  return {
    changeCompleted,
    changeTaskName,
  }
}

function updateCache(queryClient: QueryClient, task: Task) {
  queryClient.setQueryData<{ [id: string]: Task }>('tasks', (tasks) => ({
    ...tasks,
    [task.id]: task,
  }))
  queryClient.setQueryData(['task', { taskId: task.id }], task)
}
