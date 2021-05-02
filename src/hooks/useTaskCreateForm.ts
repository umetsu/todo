import { useCallback } from 'react'
import { useOpenClose } from './utils/useOpenClose'

export function useTaskCreateForm() {
  const { isOpened, open, close } = useOpenClose('taskCreateForm')

  const openCreateTaskForm = useCallback(() => {
    open()
  }, [open])

  const closeCreateTaskForm = useCallback(() => {
    close()
  }, [close])

  return {
    taskCreateFormOpened: isOpened,
    openCreateTaskForm,
    closeCreateTaskForm,
  }
}
