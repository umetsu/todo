import { useRecoilValue } from 'recoil'
import { useCallback } from 'react'
import { logout as requestLogout } from '../../../firebase/auth'
import { userAtom } from './atoms'

export function useUser() {
  const { user, error } = useRecoilValue(userAtom)

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
