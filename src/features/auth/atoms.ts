import { atom, selector } from 'recoil'

export const authAtom = atom<{
  loading: boolean
  error: Error | null
  uid: string | null
}>({
  key: 'authAtom',
  default: {
    loading: true,
    error: null,
    uid: null,
  },
})

export const uidAtom = selector<string | null>({
  key: 'uidAtom',
  get: ({ get }) => {
    return get(authAtom).uid
  },
})
