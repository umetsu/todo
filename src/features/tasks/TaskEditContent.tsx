import React from 'react'
import {
  AppBar,
  Box,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Link from 'next/link'
import { TaskEditForm } from './TaskEditForm'
import { FullPageSpinner } from '../../common/FullPageSpinner'

interface Props {
  taskId: string
}

export function TaskEditContent({ taskId }: Props) {
  const classes = useStyles()

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <AppBar position="static" color={'transparent'} elevation={0}>
        <Toolbar>
          <Link href={'/'}>
            <IconButton edge="start" color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'md'} className={classes.container}>
        <React.Suspense fallback={<FullPageSpinner />}>
          <TaskEditForm taskId={taskId} />
        </React.Suspense>
      </Container>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      padding: theme.spacing(2),
    },
  })
)
