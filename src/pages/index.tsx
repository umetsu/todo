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
import { FullPageSpinner } from '../components/common/FullPageSpinner'
import { TaskList } from '../components/tasks/TaskList'
import { TaskCreateForm } from '../components/tasks/TaskCreateForm'
import { BottomAppBar } from '../components/tasks/BottomAppBar'
import { SideDrawer } from '../components/tasks/SideDrawer'
import { DeleteAllCompletedTasksConfirmDialog } from '../components/tasks/DeleteAllCompletedTasksConfirmDialog'
import { ErrorFallback } from '../components/common/ErrorFallback'

export default function TopPage() {
  const classes = useStyles()

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <ErrorFallback message={error.message} />}
      onError={console.error}
    >
      <React.Suspense fallback={<FullPageSpinner />}>
        <Box display={'flex'} flexDirection={'column'} className={classes.box}>
          <AppBar position="static" color={'transparent'} elevation={0}>
            <Toolbar>
              <Typography variant={'h6'} noWrap>
                Todo
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth={'md'} className={classes.container}>
            <TaskList />
          </Container>
          <BottomAppBar />
        </Box>
        <SideDrawer />
        <TaskCreateForm />
        <DeleteAllCompletedTasksConfirmDialog />
      </React.Suspense>
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
