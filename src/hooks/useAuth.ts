import { useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { subscribeUser, logout as requestLogout } from '../firebase/auth'
import { authAtom } from './atoms'
import { useSafeUpdate } from './useSafeUpdate'

export function useAuth() {
  const [state, unsafeSetState] = useAtom(authAtom)
  const setState = useSafeUpdate(unsafeSetState)

  useEffect(() => {
    const unsubscribe = subscribeUser(
      (user) => {
        setState({
          loading: false,
          error: null,
          uid: user?.uid ?? null,
        })
      },
      (error) => {
        setState({
          loading: false,
          error: new Error(error.message),
          uid: null,
        })
      }
    )

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = useCallback(async () => {
    await requestLogout()
  }, [])

  return {
    loading: state.loading,
    error: state.error,
    loggedIn: state.uid !== null,
    logout,
  }
}
