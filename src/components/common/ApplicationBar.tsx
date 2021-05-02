import React, { ReactElement } from 'react'
import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Link from 'next/link'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'

interface Props {
  title?: string
  showBackButton?: boolean
  renderAction?: () => ReactElement
}

export function ApplicationBar({ title, showBackButton, renderAction }: Props) {
  const classes = useStyles()

  return (
    <AppBar position="static" color={'transparent'} elevation={0}>
      <Toolbar>
        {showBackButton && (
          <Link href={'/'}>
            <IconButton edge="start" color="inherit" aria-label={'back-button'}>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        )}
        {title && (
          <Typography variant={'h6'} noWrap>
            {title}
          </Typography>
        )}
        <div className={classes.space} />
        {renderAction?.()}
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
