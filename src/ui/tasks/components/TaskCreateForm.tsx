import React, { FormEvent, useCallback, useState } from 'react'
import {
  Button,
  createStyles,
  Drawer,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core'

interface Props {
  open: boolean
  onClose: () => void
  onCreateTask: (taskName: string) => void
}

export function TaskCreateForm({ open, onClose, onCreateTask }: Props) {
  const classes = useStyles()
  const [inputTaskName, setInputTaskName] = useState('')

  const handleTaskNameChange = useCallback(
    (event) => {
      setInputTaskName(event.target.value)
    },
    [setInputTaskName]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onCreateTask(inputTaskName)
      setInputTaskName('')
    },
    [inputTaskName, onCreateTask]
  )

  const handleClose = useCallback(() => {
    onClose()
    setInputTaskName('')
  }, [onClose])

  return (
    <Drawer anchor={'bottom'} open={open} onClose={handleClose}>
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
