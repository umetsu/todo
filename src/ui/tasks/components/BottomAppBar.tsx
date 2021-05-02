import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { CreateButton } from './CreateButton'
import { Delete as DeleteIcon, Menu as MenuIcon } from '@material-ui/icons'

interface Props {
  disabledTasksDeleteButton: boolean
  onCreateButtonClick: () => void
  onMenuClick: () => void
  onDeleteTasksClick: () => void
}

export function BottomAppBar({
  disabledTasksDeleteButton,
  onCreateButtonClick,
  onMenuClick,
  onDeleteTasksClick,
}: Props) {
  const classes = useStyles()

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <CreateButton onClick={onCreateButtonClick} />
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={onMenuClick}
          aria-label={'menu'}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.space} />
        <IconButton
          edge={'end'}
          color={'inherit'}
          disabled={disabledTasksDeleteButton}
          onClick={onDeleteTasksClick}
          aria-label={'delete-tasks'}
        >
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(() => ({
  space: {
    flexGrow: 1,
  },
}))
