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

export const uidAtom = atom<string | null>((get) => {
  return get(authAtom).uid
})

export const taskMapAtom = atom<{ [id: string]: Task }>({})

const allTasksAtom = atom<ReadonlyArray<Task>>((get) => {
  return Object.values(get(taskMapAtom)).reverse()
})

export const uncompletedTasksAtom = atom<ReadonlyArray<Task>>((get) => {
  const tasks = get(allTasksAtom)
  return tasks.filter((t) => !t.completed)
})

export const completedTasksAtom = atom<ReadonlyArray<Task>>((get) => {
  const tasks = get(allTasksAtom)
  return tasks.filter((t) => t.completed)
})
