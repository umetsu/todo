import React, { useCallback } from 'react'
import {
  Box,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { Task } from '../../models/tasks'

interface Props {
  task: Task
  onCompletedChange: (completed: boolean) => void
  onTaskNameChange: (taskName: string) => void
}

export function TaskEditForm({
  task,
  onCompletedChange,
  onTaskNameChange,
}: Props) {
  const classes = useStyles({ completed: task.completed })

  const completedLabel = task.completed ? '未完了に戻す' : '完了にする'

  const handleCheckedChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onCompletedChange(checked)
    },
    [onCompletedChange]
  )

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onTaskNameChange(event.target.value)
  }

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <FormControlLabel
        control={
          <Checkbox checked={task.completed} onChange={handleCheckedChange} />
        }
        label={completedLabel}
      />
      <TextField
        defaultValue={task.name}
        disabled={task.completed}
        inputProps={{
          className: classes.taskText,
        }}
        onChange={handleTextChange}
      />
    </Box>
  )
}

interface StyleProps {
  completed: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    taskText: {
      marginTop: theme.spacing(2),
      textDecoration: ({ completed }: StyleProps) => {
        return completed ? 'line-through' : 'none'
      },
    },
  })
)
