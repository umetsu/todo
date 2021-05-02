import React, { useCallback } from 'react'
import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import Link from 'next/link'
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { useDeleteTaskConfirmDialog } from '../../hooks/useDeleteTaskConfirmDialog'

export function ApplicationBar() {
  const classes = useStyles()
  const { openConfirmDialog } = useDeleteTaskConfirmDialog()

  const handleDelete = useCallback(() => {
    openConfirmDialog()
  }, [openConfirmDialog])

  return (
    <AppBar position="static" color={'transparent'} elevation={0}>
      <Toolbar>
        <Link href={'/'}>
          <IconButton edge="start" color="inherit" aria-label={'back-button'}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <div className={classes.space} />
        <IconButton
          edge="end"
          color="inherit"
          aria-label={'delete-task'}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    space: {
      flexGrow: 1,
    },
  })
)
