import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { CreateButton } from './CreateButton'
import { Delete as DeleteIcon, Menu as MenuIcon } from '@material-ui/icons'
import { useProfile } from '../auth/hooks'
import { useDeleteAllCompletedTasksConfirmDialog } from './hooks'

export function BottomAppBar() {
  const classes = useStyles()
  const { openProfile } = useProfile()
  const { openConfirmDialog } = useDeleteAllCompletedTasksConfirmDialog()

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <CreateButton />
        <IconButton edge={'start'} color={'inherit'} onClick={openProfile}>
          <MenuIcon />
        </IconButton>
        <div className={classes.space} />
        <IconButton edge={'end'} color={'inherit'} onClick={openConfirmDialog}>
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
