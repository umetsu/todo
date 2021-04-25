import { uidAtom } from './atoms'
import { useRecoilValue } from 'recoil'

export function useUid() {
  const uid = useRecoilValue(uidAtom)
  return {
    uid: uid ?? '',
  }
}
