import { useOpenClose } from './utils/useOpenClose'

export function useDeleteTaskConfirmDialog() {
  const { isOpened, open, close } = useOpenClose('deleteTaskConfirmDialog')

  return {
    opened: isOpened,
    openConfirmDialog: open,
    closeConfirmDialog: close,
  }
}
