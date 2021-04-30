import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import React, { MouseEvent, useCallback, useState } from 'react'
import { CreateButton } from './CreateButton'

interface Props {
  onDeleteAllCompletedTasksClick: () => void
  onLogoutClick: () => void
}

export function BottomAppBar({
  onDeleteAllCompletedTasksClick,
  onLogoutClick,
}: Props) {
  const classes = useStyles()

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
      <AppBar position={'static'}>
        <Toolbar>
          <div className={classes.space} />
          <CreateButton />
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
  space: {
    flexGrow: 1,
  },
}))
