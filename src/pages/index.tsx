import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  AppBar,
  Box,
  Container,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { FullPageSpinner } from '../common/FullPageSpinner'
import { TaskList } from '../features/tasks/TaskList'
import { TaskCreateForm } from '../features/tasks/TaskCreateForm'
import { BottomAppBar } from '../features/tasks/BottomAppBar'
import { ProfileDrawer } from '../features/auth/ProfileDrawer'
import { DeleteAllCompletedTasksConfirmDialog } from '../features/tasks/DeleteAllCompletedTasksConfirmDialog'

export default function TopPage() {
  const classes = useStyles()

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={console.error}
    >
      <ProfileDrawer />
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
        <BottomAppBar />
      </Box>
      <DeleteAllCompletedTasksConfirmDialog />
    </ErrorBoundary>
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
