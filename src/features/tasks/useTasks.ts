import { useCallback, useEffect } from 'react'
import {
  createTask as requestCreateTask,
  fetchAllTasks,
} from '../../firebase/database'
import { completedTasksAtom, taskMapAtom, uncompletedTasksAtom } from './atoms'
import { useUid } from '../auth/useUid'
import { useSafeUpdate } from '../../common/useSafeUpdate'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export function useTasks() {
  const { uid } = useUid()
  const unsafeSetTaskMap = useSetRecoilState(taskMapAtom)
  const setTaskMap = useSafeUpdate(unsafeSetTaskMap)
  const uncompletedTasks = useRecoilValue(uncompletedTasksAtom)
  const completedTasks = useRecoilValue(completedTasksAtom)

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
