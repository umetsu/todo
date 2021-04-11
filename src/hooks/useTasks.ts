import { useEffect } from 'react'
import { Task } from '../model'
import { fetchAllTasks } from '../firebase/database'
import { atom, useAtom } from 'jotai'

export const tasksAtom = atom<ReadonlyArray<Task>>([])

export function useTasks(uid: string) {
  const [tasks, setTasks] = useAtom(tasksAtom)

  useEffect(() => {
    ;(async () => {
      // TODO: エラー処理
      const tasks = await fetchAllTasks(uid)
      setTasks(tasks.reverse())
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    tasks,
  }
}
