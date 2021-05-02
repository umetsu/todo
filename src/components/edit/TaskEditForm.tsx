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
import { useTask } from '../../hooks/useTask'
import { useUpdateTask } from '../../hooks/useUpdateTask'

interface Props {
  taskId: string
}

export function TaskEditForm({ taskId }: Props) {
  const { task } = useTask(taskId)
  const { changeCompleted, changeTaskName } = useUpdateTask(task)
  const classes = useStyles({ completed: task.completed })

  const completedLabel = task.completed ? '未完了に戻す' : '完了にする'

  const handleCheckedChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      changeCompleted(checked)
    },
    [changeCompleted]
  )

  const onTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    changeTaskName(event.target.value)
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
        onChange={onTextChange}
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
