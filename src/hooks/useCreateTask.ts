import { useUser } from './auth/useUser'
import { useMutation, useQueryClient } from 'react-query'
import { Task } from '../models/tasks'
import { createTask as requestCreateTask } from '../firebase/database'
import { useCallback } from 'react'

export function useCreateTask() {
  const { uid } = useUser()
  const queryClient = useQueryClient()

  const { mutate: createTaskMutation } = useMutation<Task, Error, string>(
    (taskName) => requestCreateTask(uid, taskName),
    {
      onSettled: () => queryClient.invalidateQueries('tasks'),
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
