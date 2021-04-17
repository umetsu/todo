import { useCallback, useState } from 'react'
import { createTask as requestCreateTask } from '../firebase/database'
import { useUpdateAtom } from 'jotai/utils'
import { taskMapAtom } from './atoms'
import { useUid } from './useUid'

export function useCreateTask() {
  const { uid } = useUid()
  const setTaskMap = useUpdateAtom(taskMapAtom)
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
    setTaskMap((taskMap) => ({ ...taskMap, [newTask.id]: newTask }))

    setInputTaskName('')
    setCreateTaskFormOpened(false)
  }, [inputTaskName, setTaskMap, uid])

  return {
    createTaskFormOpened,
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
    createTask,
  }
}
