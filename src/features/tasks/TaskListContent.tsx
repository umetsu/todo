import React from 'react'
import { TaskList } from './TaskList'
import {
  AppBar,
  Box,
  Container,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { TaskCreateForm } from './TaskCreateForm'
import { BottomAppBar } from './BottomAppBar'
import { FullPageSpinner } from '../../common/FullPageSpinner'

interface AuthorizedContentProps {
  logout: () => Promise<void>
}

export function TaskListContent({ logout }: AuthorizedContentProps) {
  const classes = useStyles()

  return (
    <Box display={'flex'} flexDirection={'column'} className={classes.box}>
      <AppBar position="static" color={'transparent'} elevation={0}>
        <Toolbar>
          <Typography variant={'h6'} noWrap>
            Todo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'md'} className={classes.container}>
        <React.Suspense fallback={<FullPageSpinner />}>
          <TaskList />
        </React.Suspense>
        <TaskCreateForm />
      </Container>
      <BottomAppBar onLogoutClick={logout} />
    </Box>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      height: '100%',
    },
    container: {
      height: '100%',
      flex: 1,
      overflow: 'scroll',
      padding: 0,
    },
  })
)
