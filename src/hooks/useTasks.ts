import { useEffect } from 'react'
import { fetchAllTasks } from '../firebase/database'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { taskMapAtom, tasksAtom } from './atoms'

export function useTasks(uid: string) {
  const setTaskMap = useUpdateAtom(taskMapAtom)
  const tasks = useAtomValue(tasksAtom)

  useEffect(() => {
    ;(async () => {
      // TODO: エラー処理
      const taskMap = await fetchAllTasks(uid)
      setTaskMap(taskMap)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    tasks,
  }
}
