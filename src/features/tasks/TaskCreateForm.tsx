import React, { FormEvent, useCallback } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { useCreateTask, useCreateTaskForm } from './hooks'

export function TaskCreateForm() {
  const classes = useStyles()
  const { createTask } = useCreateTask()
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

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await createTask(inputTaskName)
      closeCreateTaskForm()
    },
    [closeCreateTaskForm, createTask, inputTaskName]
  )

  return (
    <Drawer
      anchor={'bottom'}
      open={createTaskFormOpened}
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
