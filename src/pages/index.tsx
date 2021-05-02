import React, { useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Box, Container, createStyles, makeStyles } from '@material-ui/core'
import { FullPageSpinner } from '../components/common/FullPageSpinner'
import { TaskList } from '../components/tasks/TaskList'
import { TaskCreateForm } from '../components/tasks/TaskCreateForm'
import { BottomAppBar } from '../components/tasks/BottomAppBar'
import { SideDrawer } from '../components/tasks/SideDrawer'
import { DeleteAllCompletedTasksConfirmDialog } from '../components/tasks/DeleteAllCompletedTasksConfirmDialog'
import { ErrorFallback } from '../components/common/ErrorFallback'
import { ApplicationBar } from '../components/common/ApplicationBar'
import { useTasks } from '../hooks/useTasks'
import { useSideDrawer } from '../hooks/useSideDrawer'
import { useDeleteAllCompletedTasksConfirmDialog } from '../hooks/useDeleteAllCompletedTasksConfirmDialog'
import { useUser } from '../hooks/auth/useUser'
import { useCreateTask } from '../hooks/useCreateTask'
import { useTaskCreateForm } from '../hooks/useTaskCreateForm'
import { useDeleteAllCompletedTasks } from '../hooks/useDeleteAllCompletedTasks'

export default function TopPageWithProviders() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <ErrorFallback message={error.message} />}
      onError={console.error}
    >
      <React.Suspense fallback={<FullPageSpinner />}>
        <TopPage />
      </React.Suspense>
    </ErrorBoundary>
  )
}

function TopPage() {
  const classes = useStyles()
  const { user, logout } = useUser()
  const { uncompletedTasks, completedTasks } = useTasks()
  const { createTask } = useCreateTask()
  const { deleteAllCompletedTasks } = useDeleteAllCompletedTasks()
  const {
    taskCreateFormOpened,
    openCreateTaskForm,
    closeCreateTaskForm,
  } = useTaskCreateForm()
  const {
    opened: deleteConfirmDialogOpened,
    openConfirmDialog,
    closeConfirmDialog,
  } = useDeleteAllCompletedTasksConfirmDialog()
  const {
    opened: sideDrawerOpened,
    openSideDrawer,
    closeSideDrawer,
  } = useSideDrawer()

  const handleCreateTask = useCallback(
    (taskName: string) => {
      createTask(taskName)
      closeCreateTaskForm()
    },
    [closeCreateTaskForm, createTask]
  )

  const handleDeleteTasks = useCallback(() => {
    deleteAllCompletedTasks(completedTasks)
    closeConfirmDialog()
  }, [closeConfirmDialog, completedTasks, deleteAllCompletedTasks])

  const handleLogoutClick = useCallback(() => {
    void logout()
    closeSideDrawer()
  }, [closeSideDrawer, logout])

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} className={classes.box}>
        <ApplicationBar title={'Todo'} />
        <Container maxWidth={'md'} className={classes.container}>
          <TaskList
            uncompletedTasks={uncompletedTasks}
            completedTasks={completedTasks}
          />
        </Container>
        <BottomAppBar
          disabledTasksDeleteButton={completedTasks.length === 0}
          onCreateButtonClick={openCreateTaskForm}
          onMenuClick={openSideDrawer}
          onDeleteTasksClick={openConfirmDialog}
        />
      </Box>
      <SideDrawer
        open={sideDrawerOpened}
        user={user}
        onClose={closeSideDrawer}
        onLogoutClick={handleLogoutClick}
      />
      <TaskCreateForm
        open={taskCreateFormOpened}
        onClose={closeCreateTaskForm}
        onCreateTask={handleCreateTask}
      />
      <DeleteAllCompletedTasksConfirmDialog
        open={deleteConfirmDialogOpened}
        numOfCompletedTasks={completedTasks.length}
        onClose={closeConfirmDialog}
        onDeleteTasksClick={handleDeleteTasks}
      />
    </>
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
