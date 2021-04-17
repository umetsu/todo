import { useCallback } from 'react'
import { updateTask as requestUpdateTask } from '../firebase/database'
import { useUid } from './useUid'
import { taskMapAtom } from './atoms'
import { useAtom } from 'jotai'
import { Task } from '../model'

export function useTask(taskId: string) {
  const { uid } = useUid()
  const [taskMap, setTaskMap] = useAtom(taskMapAtom)

  const changeCompleted = useCallback(
    async (checked: boolean) => {
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
    [setTaskMap, taskId, taskMap, uid]
  )

  return {
    changeCompleted,
  }
}
