import { useCallback, useState } from 'react'
import { createTask as requestCreateTask } from '../firebase/database'
import { useUpdateAtom } from 'jotai/utils'
import { tasksAtom } from './useTasks'

export function useCreateTask(uid: string) {
  const setTasks = useUpdateAtom(tasksAtom)
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

    // TODO: エラー処理
    const newTask = await requestCreateTask(uid, inputTaskName)
    setTasks((tasks) => [newTask, ...tasks])

    setInputTaskName('')
    setCreateTaskFormOpened(false)
  }, [inputTaskName, setTasks, uid])

  return {
    createTaskFormOpened,
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
    createTask,
  }
}
