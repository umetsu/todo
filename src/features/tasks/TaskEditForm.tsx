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
import { useTask, useUpdateTask } from './hooks'

interface TaskEditFormProps {
  taskId: string
}

export function TaskEditForm({ taskId }: TaskEditFormProps) {
  const { task } = useTask(taskId)
  const { changeCompleted } = useUpdateTask(task)
  const classes = useStyles({ completed: task.completed })

  const completedLabel = task.completed ? '未完了に戻す' : '完了にする'

  const handleCheckedChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      await changeCompleted(checked)
    },
    [changeCompleted]
  )

  const onTextChange = (
    _: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // TODO:
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
        value={task.name}
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
        // TODO:  Warning: [JSS] Cannot set property 'parentStyleSheet' of undefined
        // 空文字だと警告が出るが、undefinedにすると打ち消し線が残り続けてしまう
        return completed ? 'line-through' : ''
      },
    },
  })
)
