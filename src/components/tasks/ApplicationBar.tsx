import {
  AppBar,
  Fab,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import React, { MouseEvent, useCallback, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useCreateTaskForm } from '../../hooks/useCreateTaskForm'

interface HeaderProps {
  onLogoutClick: () => void
}

export function ApplicationBar({ onLogoutClick }: HeaderProps) {
  const classes = useStyles()

  const { openCreateTaskForm } = useCreateTaskForm()

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const handleMoreActionClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget)
    },
    []
  )

  const handleMenuClose = useCallback(() => {
    setAnchorElement(null)
  }, [])

  const handleLogoutClick = useCallback(() => {
    onLogoutClick()
    setAnchorElement(null)
  }, [onLogoutClick])

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.space} />
          <Fab
            color={'secondary'}
            aria-label={'create-task'}
            onClick={openCreateTaskForm}
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
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
