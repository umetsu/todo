import { useCallback } from 'react'
import { updateTask as requestUpdateTask } from '../../firebase/database'
import { useUid } from '../auth/useUid'
import { taskMapAtom } from './atoms'
import { Task } from './models'
import { useRecoilState } from 'recoil'

export function useTask(taskId: string) {
  const { uid } = useUid()
  const [taskMap, setTaskMap] = useRecoilState(taskMapAtom)

  const changeCompleted = useCallback(
    async (checked: boolean) => {
      const task: Task = { ...taskMap[taskId], completed: checked }
      // TODO: エラー処理
      await requestUpdateTask(uid, task)

      setTaskMap((tasks) => ({
        ...tasks,
        [taskId]: task,
      }))
    },
    [setTaskMap, taskId, taskMap, uid]
  )

  return {
    changeCompleted,
  }
}
