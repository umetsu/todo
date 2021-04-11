import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { subscribeUser } from '../firebase/auth'

const uidAtom = atom<{
  loading: boolean
  error: Error | null
  uid: string | null
}>({
  loading: false,
  error: null,
  uid: null,
})

export function useAuth() {
  const [state, setState] = useAtom(uidAtom)

  useEffect(() => {
    setState({
      loading: true,
      error: null,
      uid: null,
    })
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

  return {
    loading: state.loading,
    error: state.error,
    uid: state.uid,
  }
}
