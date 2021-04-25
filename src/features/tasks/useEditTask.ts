import { taskMapAtom } from './atoms'
import { useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { Task } from './models'
import { updateTask as requestUpdateTask } from '../../firebase/database'
import { useUid } from '../auth/useUid'

export function useEditTask(taskId: string) {
  const { uid } = useUid()
  const [taskMap, setTaskMap] = useRecoilState(taskMapAtom)
  // TODO: recoilにキャッシュされていないときの処理
  const task = taskMap[taskId]

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
    task,
    changeCompleted,
  }
}
