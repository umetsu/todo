import React, { useCallback } from 'react'
import { TaskList } from './TaskList'
import {
  Container,
  createStyles,
  Fab,
  makeStyles,
  Theme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useTasks } from '../hooks/useTasks'
import { useCreateTaskForm } from '../hooks/useCreateTaskForm'
import { TaskCreateForm } from './TaskCreateForm'

export function AuthorizedContent() {
  const classes = useStyles()
  const { tasks, createTask } = useTasks()
  const {
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
  } = useCreateTaskForm()

  const handleCreateButtonClick = useCallback(async () => {
    await createTask(inputTaskName)
    closeCreateTaskForm()
  }, [closeCreateTaskForm, createTask, inputTaskName])

  return (
    <Container maxWidth={'md'} style={{ padding: '16px' }}>
      <TaskList tasks={tasks} />
      <Fab
        color="primary"
        aria-label="create-task"
        onClick={openCreateTaskForm}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <TaskCreateForm onCreateButtonClick={handleCreateButtonClick} />
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      // eslint-disable-next-line @typescript-eslint/prefer-as-const
      position: 'absolute' as 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)
