import { useCallback, useEffect } from 'react'
import {
  createTask as requestCreateTask,
  fetchAllTasks,
} from '../firebase/database'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { taskMapAtom, tasksAtom } from './atoms'
import { useUid } from './useUid'

export function useTasks() {
  const { uid } = useUid()
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

  const createTask = useCallback(
    async (inputTaskName) => {
      if (!inputTaskName) {
        return
      }

      // TODO: エラー処理
      const newTask = await requestCreateTask(uid, inputTaskName)
      setTaskMap((taskMap) => ({ ...taskMap, [newTask.id]: newTask }))
    },
    [setTaskMap, uid]
  )

  return {
    tasks,
    createTask,
  }
}
