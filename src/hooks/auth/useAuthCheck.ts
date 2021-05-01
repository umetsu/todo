import { useSetRecoilState } from 'recoil'
import { useSafeUpdate } from '../utils/useSafeUpdate'
import { useEffect } from 'react'
import { subscribeUser } from '../../firebase/auth'
import { userAtom } from './atoms'

export function useAuthCheck() {
  const unsafeSetState = useSetRecoilState(userAtom)
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
