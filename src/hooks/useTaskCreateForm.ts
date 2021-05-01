import { useCallback, useState } from 'react'
import { useOpenClose } from './utils/useOpenClose'

export function useTaskCreateForm() {
  const [inputTaskName, setInputTaskName] = useState('')
  const { isOpened, open, close } = useOpenClose('taskCreateForm')

  const openCreateTaskForm = useCallback(() => {
    open()
  }, [open])

  const closeCreateTaskForm = useCallback(() => {
    close()
    setInputTaskName('')
  }, [close])

  const changeInputTaskName = useCallback((input: string) => {
    setInputTaskName(input)
  }, [])

  return {
    taskCreateFormOpened: isOpened,
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
  }
}
