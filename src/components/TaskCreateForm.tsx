import React, { FormEvent, useCallback } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { useCreateTask } from '../hooks/useCreateTask'
import { useTaskCreateForm } from '../hooks/useTaskCreateForm'

export function TaskCreateForm() {
  const classes = useStyles()
  const { createTask } = useCreateTask()
  const {
    taskCreateFormOpened,
    inputTaskName,
    closeCreateTaskForm,
    changeInputTaskName,
  } = useTaskCreateForm()

  const handleTaskNameChange = useCallback(
    (event) => {
      changeInputTaskName(event.target.value)
    },
    [changeInputTaskName]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createTask(inputTaskName)
      closeCreateTaskForm()
    },
    [closeCreateTaskForm, createTask, inputTaskName]
  )

  return (
    <Drawer
      anchor={'bottom'}
      open={taskCreateFormOpened}
      onClose={closeCreateTaskForm}
    >
      <form onSubmit={handleSubmit}>
        <div className={classes.container}>
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
            className={classes.createTaskButton}
            type={'submit'}
          >
            追加
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
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
