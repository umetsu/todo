import {
  AppBar,
  Fab,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Zoom,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import React, { MouseEvent, useCallback, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useCreateTaskForm } from './hooks'

interface Props {
  onDeleteAllCompletedTasksClick: () => void
  onLogoutClick: () => void
}

export function BottomAppBar({
  onDeleteAllCompletedTasksClick,
  onLogoutClick,
}: Props) {
  const classes = useStyles()

  const { openCreateTaskForm } = useCreateTaskForm()

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const handleMoreActionClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget)
    },
    []
  )

  function closeMenu() {
    setAnchorElement(null)
  }

  const handleMenuClose = useCallback(() => {
    closeMenu()
  }, [])

  const handleDeleteTasks = useCallback(() => {
    onDeleteAllCompletedTasksClick()
    closeMenu()
  }, [onDeleteAllCompletedTasksClick])

  const handleLogoutClick = useCallback(() => {
    onLogoutClick()
    closeMenu()
  }, [onLogoutClick])

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.space} />
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
          <IconButton
            edge={'end'}
            color={'inherit'}
            onClick={handleMoreActionClick}
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteTasks}>完了したタスクを削除</MenuItem>
        <MenuItem onClick={handleLogoutClick}>ログアウト</MenuItem>
      </Menu>
    </>
  )
}

const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fab: {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: 'absolute' as 'absolute',
    zIndex: 1,
    top: '-30px',
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  space: {
    flexGrow: 1,
  },
}))
