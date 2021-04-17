import { useAtomValue } from 'jotai/utils'
import { uidAtom } from './atoms'

export function useUid() {
  const uid = useAtomValue(uidAtom)
  if (!uid) {
    throw new Error('ログインされていません')
  }
  return {
    uid,
  }
}
