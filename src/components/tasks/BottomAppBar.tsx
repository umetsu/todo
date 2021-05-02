import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { CreateButton } from './CreateButton'
import { Delete as DeleteIcon, Menu as MenuIcon } from '@material-ui/icons'
import { useSideDrawer } from '../../hooks/useSideDrawer'
import { useDeleteAllCompletedTasksConfirmDialog } from '../../hooks/useDeleteAllCompletedTasksConfirmDialog'
import { useTasks } from '../../hooks/useTasks'

export function BottomAppBar() {
  const classes = useStyles()
  const { completedTasks } = useTasks()
  const { openSideDrawer } = useSideDrawer()
  const { openConfirmDialog } = useDeleteAllCompletedTasksConfirmDialog()

  const disabledTasksDeleteButton = completedTasks.length === 0

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <CreateButton />
        <IconButton
          edge={'start'}
          color={'inherit'}
          onClick={openSideDrawer}
          aria-label={'menu'}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.space} />
        <IconButton
          edge={'end'}
          color={'inherit'}
          disabled={disabledTasksDeleteButton}
          onClick={openConfirmDialog}
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
