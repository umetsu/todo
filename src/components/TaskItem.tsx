import React, { useCallback } from 'react'
import { Checkbox, FormControlLabel, ListItem } from '@material-ui/core'
import { Task } from '../model'
import { useChangeCompleted } from '../hooks/useChangeCompleted'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { changeCompleted } = useChangeCompleted()

  const handleChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      void changeCompleted(task.id, checked)
    },
    [changeCompleted, task.id]
  )

  return (
    <ListItem aria-label={'task-item'}>
      <FormControlLabel
        control={<Checkbox checked={task.completed} onChange={handleChange} />}
        label={task.name}
      />
    </ListItem>
  )
}
