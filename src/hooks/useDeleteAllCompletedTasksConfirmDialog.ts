import { useOpenClose } from './utils/useOpenClose'

export function useDeleteAllCompletedTasksConfirmDialog() {
  const { isOpened, open, close } = useOpenClose(
    'deleteAllCompletedTasksConfirmDialog'
  )

  return {
    opened: isOpened,
    openConfirmDialog: open,
    closeConfirmDialog: close,
  }
}
