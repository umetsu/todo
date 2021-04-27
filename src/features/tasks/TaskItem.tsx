import React, { useCallback } from 'react'
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { Task } from './models'
import { useRouter } from 'next/router'
import { useUpdateTask } from './hooks'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { changeCompleted } = useUpdateTask(task)
  const router = useRouter()

  // TODO: Linkに変更
  const handleClick = useCallback(() => {
    void router.push(`/edit/${task.id}`)
  }, [router, task.id])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      changeCompleted(checked)
    },
    [changeCompleted]
  )

  return (
    <ListItem button aria-label={'task-item'}>
      <ListItemIcon>
        <Checkbox checked={task.completed} onChange={handleChange} />
      </ListItemIcon>
      <ListItemText
        style={{
          textDecoration: task.completed ? 'line-through' : undefined,
        }}
        onClick={handleClick}
      >
        {task.name}
      </ListItemText>
    </ListItem>
  )
}
