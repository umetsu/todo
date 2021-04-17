import { useAtomValue } from 'jotai/utils'
import { uidAtom } from './atoms'

export function useUid() {
  const uid = useAtomValue(uidAtom)
  return {
    uid: uid ?? '',
  }
}
