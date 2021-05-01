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
import { FullPageSpinner } from '../components/FullPageSpinner'
import { TaskList } from '../components/TaskList'
import { TaskCreateForm } from '../components/TaskCreateForm'
import { BottomAppBar } from '../components/BottomAppBar'
import { SideDrawer } from '../components/SideDrawer'
import { DeleteAllCompletedTasksConfirmDialog } from '../components/DeleteAllCompletedTasksConfirmDialog'

export default function TopPage() {
  const classes = useStyles()

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={console.error}
    >
      <SideDrawer />
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
