import React, { useCallback } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { useCreateTaskForm } from '../hooks/useCreateTaskForm'

interface TaskCreateFormProps {
  onCreateButtonClick: () => void
}

export function TaskCreateForm({ onCreateButtonClick }: TaskCreateFormProps) {
  const classes = useStyles()
  const {
    createTaskFormOpened,
    inputTaskName,
    closeCreateTaskForm,
    changeInputTaskName,
  } = useCreateTaskForm()

  const handleTaskNameChange = useCallback(
    (event) => {
      changeInputTaskName(event.target.value)
    },
    [changeInputTaskName]
  )

  return (
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
          onClick={onCreateButtonClick}
          className={classes.createTaskButton}
        >
          追加
        </Button>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
