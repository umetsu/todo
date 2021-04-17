import { useCallback } from 'react'
import { taskMapAtom } from './atoms'
import { updateTask as requestUpdateTask } from '../firebase/database'
import { useUid } from './useUid'
import { useAtom } from 'jotai'
import { Task } from '../model'

export function useChangeCompleted() {
  const { uid } = useUid()
  const [taskMap, setTaskMap] = useAtom(taskMapAtom)

  const changeCompleted = useCallback(
    async (taskId: string, checked: boolean) => {
      const task: Task = { ...taskMap[taskId], completed: checked }
      // TODO: エラー処理
      await requestUpdateTask(uid, task)

      setTaskMap((tasks) => {
        return {
          ...tasks,
          [taskId]: task,
        }
      })
    },
    [setTaskMap, taskMap, uid]
  )

  return {
    changeCompleted,
  }
}
