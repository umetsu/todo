import React from 'react'
import { Fab, makeStyles, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useCreateTaskForm } from './hooks'

export function CreateButton() {
  const classes = useStyles()
  const { openCreateTaskForm } = useCreateTaskForm()

  return (
    <Zoom in>
      <Fab
        color={'secondary'}
        aria-label={'create-task'}
        onClick={openCreateTaskForm}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  )
}

const useStyles = makeStyles(() => ({
  fab: {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: 'absolute' as 'absolute',
    top: '-30px',
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}))
