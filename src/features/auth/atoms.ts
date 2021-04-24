import { atom } from 'jotai'

export const authAtom = atom<{
  loading: boolean
  error: Error | null
  uid: string | null
}>({
  loading: true,
  error: null,
  uid: null,
})

export const uidAtom = atom<string | null>((get) => {
  return get(authAtom).uid
})
