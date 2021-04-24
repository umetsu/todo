import { atom } from 'jotai'
import { Task } from './models'

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
