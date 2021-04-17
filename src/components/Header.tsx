import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import React, { useState, MouseEvent, useCallback } from 'react'

interface HeaderProps {
  loggedIn: boolean
  onLogoutClick: () => void
}

export function Header({ loggedIn, onLogoutClick }: HeaderProps) {
  const classes = useStyles()

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
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Todo
          </Typography>
          {loggedIn && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMoreActionClick}
            >
              <MoreIcon />
            </IconButton>
          )}
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
  title: {
    flexGrow: 1,
  },
}))
