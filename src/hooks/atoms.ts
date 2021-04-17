import { atom } from 'jotai'
import { Task } from '../model'

export const authAtom = atom<{
  loading: boolean
  error: Error | null
  uid: string | null
}>({
  loading: true,
  error: null,
  uid: null,
})

export const uidAtom = atom((get) => {
  return get(authAtom).uid
})

export const taskMapAtom = atom<{ [id: string]: Task }>({})

export const tasksAtom = atom((get) => {
  const taskMap = get(taskMapAtom)
  return Object.values(taskMap).reverse()
})
