import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { CreateButton } from './CreateButton'
import { Delete as DeleteIcon, Menu as MenuIcon } from '@material-ui/icons'
import { useSideDrawer } from '../hooks/useSideDrawer'
import { useDeleteAllCompletedTasksConfirmDialog } from '../hooks/useDeleteAllCompletedTasksConfirmDialog'

export function BottomAppBar() {
  const classes = useStyles()
  const { openSideDrawer } = useSideDrawer()
  const { openConfirmDialog } = useDeleteAllCompletedTasksConfirmDialog()

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <CreateButton />
        <IconButton edge={'start'} color={'inherit'} onClick={openSideDrawer}>
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
