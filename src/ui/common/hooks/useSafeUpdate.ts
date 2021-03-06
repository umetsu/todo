import { useCallback, useEffect, useRef } from 'react'

export function useSafeUpdate<Fn extends (...args: never[]) => unknown>(
  update: Fn
) {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(
    (...args: [...Parameters<Fn>]) => {
      if (mountedRef.current) {
        update(...args)
      }
    },
    [update]
  )
}
