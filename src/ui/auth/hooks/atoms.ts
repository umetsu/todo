import { atom } from 'recoil'
import firebase from 'firebase'

export const userAtom = atom<{
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
