import { useCallback, useState } from 'react'

export function useCreateTaskForm() {
  const [createTaskFormOpened, setCreateTaskFormOpened] = useState(false)
  const [inputTaskName, setInputTaskName] = useState('')

  const openCreateTaskForm = useCallback(() => {
    setCreateTaskFormOpened(true)
  }, [])

  const closeCreateTaskForm = useCallback(() => {
    setCreateTaskFormOpened(false)
    setInputTaskName('')
  }, [])

  const changeInputTaskName = useCallback((input: string) => {
    setInputTaskName(input)
  }, [])

  return {
    createTaskFormOpened,
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
  }
}
