import React from 'react'
import { useDeleteAllCompletedTasks } from '../features/tasks/hooks'
import { useUser } from '../features/auth/hooks'
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

export default function TopPage() {
  const classes = useStyles()
  const { logout } = useUser()
  const { deleteAllCompletedTasks } = useDeleteAllCompletedTasks()

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={console.error}
    >
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
        <BottomAppBar
          onDeleteAllCompletedTasksClick={deleteAllCompletedTasks}
          onLogoutClick={logout}
        />
      </Box>
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
