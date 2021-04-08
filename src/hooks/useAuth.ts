import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { subscribeUser } from '../firebase/auth'

export const uidAtom = atom<string | null>(null)

export function useAuth() {
  const [uid, setUid] = useAtom(uidAtom)

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
    uid,
  }
}
