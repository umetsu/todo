import React, { useCallback } from 'react'
import { TaskList } from './TaskList'
import {
  Button,
  Container,
  createStyles,
  Drawer,
  Fab,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useTasks } from '../hooks/useTasks'
import { useCreateTask } from '../hooks/useCreateTask'

export function AuthorizedContent() {
  const classes = useStyles()
  const { tasks } = useTasks()
  const {
    createTaskFormOpened,
    inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
    createTask,
  } = useCreateTask()

  const handleTaskNameChange = useCallback(
    (event) => {
      changeInputTaskName(event.target.value)
    },
    [changeInputTaskName]
  )

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
      <Drawer
        anchor={'bottom'}
        open={createTaskFormOpened}
        onClose={closeCreateTaskForm}
      >
        <div className={classes.drawer}>
          <InputBase
            placeholder={'やること'}
            autoFocus
            value={inputTaskName}
            onChange={handleTaskNameChange}
            className={classes.createTaskInput}
          />
          <Button
            color={'primary'}
            disabled={!inputTaskName}
            onClick={createTask}
            className={classes.createTaskButton}
          >
            追加
          </Button>
        </div>
      </Drawer>
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
    drawer: {
      display: 'flex',
    },
    createTaskInput: {
      padding: theme.spacing(2),
      flex: 1,
    },
    createTaskButton: {
      flex: 0,
    },
  })
)
