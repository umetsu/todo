import { atom } from 'jotai'
import { Task } from '../model'

export const taskMapAtom = atom<{ [id: string]: Task }>({})

export const tasksAtom = atom((get) => {
  const taskMap = get(taskMapAtom)
  return Object.values(taskMap).reverse()
})
