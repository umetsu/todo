import { useOpenClose } from '../../common/hooks/useOpenClose'

export function useSideDrawer() {
  const { isOpened, open, close } = useOpenClose('sideDrawer')

  return {
    opened: isOpened,
    openSideDrawer: open,
    closeSideDrawer: close,
  }
}
