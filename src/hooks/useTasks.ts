import { useEffect, useState } from 'react'
import { Task } from '../state'
import { subscribeAllTasks, unsubscribeAllTasks } from '../firebase/database'

export function useTasks(uid: string) {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([])

  useEffect(() => {
    subscribeAllTasks(uid, (tasks) => {
      setTasks(
        Object.entries(tasks)
          .flatMap(([k, v]) => ({ id: k, ...v }))
          .reverse()
      )
    })
    return () => {
      unsubscribeAllTasks(uid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    tasks,
  }
}
