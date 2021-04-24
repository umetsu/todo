import { useCallback, useEffect } from 'react'
import {
  createTask as requestCreateTask,
  fetchAllTasks,
} from '../../firebase/database'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { completedTasksAtom, taskMapAtom, uncompletedTasksAtom } from './atoms'
import { useUid } from '../auth/useUid'
import { useSafeUpdate } from '../../common/useSafeUpdate'

export function useTasks() {
  const { uid } = useUid()
  const unsafeSetTaskMap = useUpdateAtom(taskMapAtom)
  const setTaskMap = useSafeUpdate(unsafeSetTaskMap)
  const uncompletedTasks = useAtomValue(uncompletedTasksAtom)
  const completedTasks = useAtomValue(completedTasksAtom)

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
    uncompletedTasks,
    completedTasks,
    createTask,
  }
}
