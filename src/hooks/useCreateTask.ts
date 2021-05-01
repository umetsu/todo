import { useUser } from './auth/useUser'
import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { Task } from '../models/tasks'
import { createTask as requestCreateTask } from '../firebase/database'
import { useCallback } from 'react'

export function useCreateTask() {
  const { uid } = useUser()
  const queryClient = useQueryClient()

  const { mutate: createTaskMutation } = useMutation<Task, Error, string>(
    (taskName) => requestCreateTask(uid, taskName),
    {
      onSuccess: (task) => updateCache(queryClient, task),
    }
  )

  const createTask = useCallback(
    (inputTaskName) => {
      if (!inputTaskName) return
      createTaskMutation(inputTaskName)
    },
    [createTaskMutation]
  )

  return {
    createTask,
  }
}

function updateCache(queryClient: QueryClient, task: Task) {
  queryClient.setQueryData<{ [id: string]: Task }>('tasks', (tasks) => ({
    ...tasks,
    [task.id]: task,
  }))
  queryClient.setQueryData(['task', { taskId: task.id }], task)
}
