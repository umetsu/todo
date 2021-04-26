import React, { useCallback } from 'react'
import {
  AppBar,
  Box,
  Checkbox,
  Container,
  createStyles,
  FormControlLabel,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Toolbar,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Link from 'next/link'
import { useEditTask } from './useEditTask'

interface TaskEditContentProps {
  taskId: string
}

export function TaskEditContent({ taskId }: TaskEditContentProps) {
  const { task, changeCompleted } = useEditTask(taskId)
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
      <AppBar position="static" color={'transparent'} elevation={0}>
        <Toolbar>
          <Link href={'/'}>
            <IconButton edge="start" color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'md'} className={classes.container}>
        <Box display={'flex'} flexDirection={'column'}>
          <FormControlLabel
            control={
              <Checkbox
                checked={task.completed}
                onChange={handleCheckedChange}
              />
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
      </Container>
    </Box>
  )
}

interface StyleProps {
  completed: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
    taskText: {
      marginTop: theme.spacing(2),
      textDecoration: ({ completed }: StyleProps) =>
        completed ? 'line-through' : '',
    },
  })
)
