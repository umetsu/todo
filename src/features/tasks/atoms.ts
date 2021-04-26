import { Task } from './models'
import { atom, selector } from 'recoil'

export const taskMapAtom = atom<{ [id: string]: Task }>({
  key: 'taskMapAtom',
  default: {},
})

const allTasksAtom = selector<ReadonlyArray<Task>>({
  key: 'allTasksAtom',
  get: ({ get }) => {
    return Object.values(get(taskMapAtom)).reverse()
  },
})

export const uncompletedTasksAtom = selector<ReadonlyArray<Task>>({
  key: 'uncompletedTasksAtom',
  get: ({ get }) => {
    const tasks = get(allTasksAtom)
    return tasks.filter((t) => !t.completed)
  },
})

export const completedTasksAtom = selector<ReadonlyArray<Task>>({
  key: 'completedTasksAtom',
  get: ({ get }) => {
    const tasks = get(allTasksAtom)
    return tasks.filter((t) => t.completed)
  },
})
