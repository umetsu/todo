import { useOpenClose } from './utils/useOpenClose'

export function useSideDrawer() {
  const { isOpened, open, close } = useOpenClose('sideDrawer')

  return {
    opened: isOpened,
    openSideDrawer: open,
    closeSideDrawer: close,
  }
}
