import React, { useCallback } from 'react'
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { Task } from './models'
import { useTask } from './useTask'
import { useRouter } from 'next/router'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { changeCompleted } = useTask(task.id)
  const router = useRouter()

  const handleClick = useCallback(() => {
    void router.push(`/edit/${task.id}`)
  }, [router, task.id])

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      await changeCompleted(checked)
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
