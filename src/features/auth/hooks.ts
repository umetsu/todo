import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import firebase from 'firebase'
import { useSafeUpdate } from '../../common/useSafeUpdate'
import { useCallback, useEffect } from 'react'
import { logout as requestLogout, subscribeUser } from '../../firebase/auth'

export const authUserAtom = atom<{
  user:
    | Pick<firebase.UserInfo, 'uid' | 'photoURL' | 'displayName'>
    | null
    | undefined
  error: Error | null
}>({
  key: 'authUserAtom',
  default: {
    user: undefined,
    error: null,
  },
})

export function useAuthCheck() {
  const unsafeSetState = useSetRecoilState(authUserAtom)
  const setState = useSafeUpdate(unsafeSetState)

  useEffect(() => {
    const unsubscribe = subscribeUser(
      (user) => {
        setState({
          user: user
            ? {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
              }
            : null,
          error: null,
        })
      },
      (error) => {
        setState({
          user: undefined,
          error: new Error(error.message),
        })
      }
    )

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useUser() {
  const { user, error } = useRecoilValue(authUserAtom)

  const logout = useCallback(async () => {
    await requestLogout()
  }, [])

  return {
    uid: user?.uid ?? '',
    user,
    authChecking: user === undefined && error === null,
    logout,
  }
}
