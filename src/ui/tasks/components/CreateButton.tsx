import React from 'react'
import { createStyles, Fab, makeStyles, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

interface Props {
  onClick: () => void
}

export function CreateButton({ onClick }: Props) {
  const classes = useStyles()

  return (
    <Zoom in>
      <Fab
        color={'secondary'}
        aria-label={'create-task'}
        onClick={onClick}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      // eslint-disable-next-line @typescript-eslint/prefer-as-const
      position: 'absolute' as 'absolute',
      top: '-30px',
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  })
)
