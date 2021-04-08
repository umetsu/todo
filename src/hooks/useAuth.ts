import { useFirebase } from './useFirebase'
import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { subscribeUser } from '../firebase/auth'
import { atomFamily } from 'jotai/utils'

export const uidFamily = atomFamily((uid: string | null) => atom(uid))

export function useAuth(currentUid: string | null = null) {
  const { auth } = useFirebase()
  const [uid, setUid] = useAtom(uidFamily(currentUid))

  useEffect(() => {
    const unsubscribe = subscribeUser((user) => {
      setUid(user?.uid ?? null)
    })

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    auth,
    loggedIn: uid !== null,
    uid,
  }
}
