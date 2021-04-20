import React, { useCallback } from 'react'
import {
  Checkbox,
  FormControlLabel,
  ListItem,
  Typography,
} from '@material-ui/core'
import { Task } from '../model'
import { useTask } from '../hooks/useTask'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { changeCompleted } = useTask(task.id)

  const handleChange = useCallback(
    async (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      await changeCompleted(checked)
    },
    [changeCompleted]
  )

  return (
    <ListItem aria-label={'task-item'}>
      <FormControlLabel
        control={<Checkbox checked={task.completed} onChange={handleChange} />}
        label={
          <Typography
            style={{
              textDecoration: task.completed ? 'line-through' : undefined,
            }}
          >
            {task.name}
          </Typography>
        }
      />
    </ListItem>
  )
}
