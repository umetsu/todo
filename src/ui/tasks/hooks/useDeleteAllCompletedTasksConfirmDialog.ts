import { useOpenClose } from '../../common/hooks/useOpenClose'

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
