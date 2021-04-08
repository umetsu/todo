import { useCallback, useState } from 'react'
import { createTask as requestCreateTask } from '../firebase/database'

export function useCreateTask(uid: string) {
  const [createTaskFormOpened, setCreateTaskFormOpened] = useState(false)
  const [inputTaskName, setInputTaskName] = useState('')

  const openCreateTaskForm = useCallback(() => {
    setCreateTaskFormOpened(true)
  }, [])

  const closeCreateTaskForm = useCallback(() => {
    setCreateTaskFormOpened(false)
  }, [])

  const changeInputTaskName = useCallback((input: string) => {
    setInputTaskName(input)
  }, [])

  const createTask = useCallback(async () => {
    if (!inputTaskName) {
      return
    }

    await requestCreateTask(uid, inputTaskName)
    setInputTaskName('')
    setCreateTaskFormOpened(false)
  }, [inputTaskName, uid])

  return {
    createTaskFormOpened,
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
    createTask,
  }
}
