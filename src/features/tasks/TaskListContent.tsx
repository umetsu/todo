import React, { useCallback } from 'react'
import { TaskList } from './TaskList'
import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { useTasks } from './useTasks'
import { useCreateTaskForm } from './useCreateTaskForm'
import { TaskCreateForm } from './TaskCreateForm'
import { BottomAppBar } from './BottomAppBar'

interface AuthorizedContentProps {
  logout: () => Promise<void>
}

export function TaskListContent({ logout }: AuthorizedContentProps) {
  const classes = useStyles()
  const { uncompletedTasks, completedTasks, createTask } = useTasks()
  const { inputTaskName, closeCreateTaskForm } = useCreateTaskForm()

  const handleCreateButtonClick = useCallback(async () => {
    await createTask(inputTaskName)
    closeCreateTaskForm()
  }, [closeCreateTaskForm, createTask, inputTaskName])

  return (
    <Box display={'flex'} flexDirection={'column'} className={classes.box}>
      <Container maxWidth={'md'} className={classes.container}>
        <Typography variant={'h6'} noWrap>
          Todo
        </Typography>
        <TaskList
          uncompletedTasks={uncompletedTasks}
          completedTasks={completedTasks}
        />
        <TaskCreateForm onCreateTask={handleCreateButtonClick} />
      </Container>
      <BottomAppBar onLogoutClick={logout} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      height: '100%',
    },
    container: {
      height: '100%',
      flex: 1,
      overflow: 'scroll',
      padding: theme.spacing(2),
    },
  })
)
