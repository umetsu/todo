import { useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { logout as requestLogout, subscribeUser } from '../firebase/auth'
import { authAtom } from './atoms'
import { useSafeUpdate } from './useSafeUpdate'
import { useRouter } from 'next/router'

export function useRequireAuth() {
  const router = useRouter()
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

  useEffect(() => {
    if (!state.loading && !state.uid) {
      void router.push('/login')
    }
  }, [router, state.loading, state.uid])

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
