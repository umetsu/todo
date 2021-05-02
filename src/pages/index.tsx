import React, { useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Box, Container, createStyles, makeStyles } from '@material-ui/core'
import { FullPageSpinner } from '../ui/common/components/FullPageSpinner'
import { TaskList } from '../ui/tasks/components/TaskList'
import { TaskCreateForm } from '../ui/tasks/components/TaskCreateForm'
import { BottomAppBar } from '../ui/tasks/components/BottomAppBar'
import { SideDrawer } from '../ui/tasks/components/SideDrawer'
import { DeleteAllCompletedTasksConfirmDialog } from '../ui/tasks/components/DeleteAllCompletedTasksConfirmDialog'
import { ErrorFallback } from '../ui/common/components/ErrorFallback'
import { ApplicationBar } from '../ui/common/components/ApplicationBar'
import { useTasks } from '../ui/tasks/hooks/useTasks'
import { useSideDrawer } from '../ui/tasks/hooks/useSideDrawer'
import { useDeleteAllCompletedTasksConfirmDialog } from '../ui/tasks/hooks/useDeleteAllCompletedTasksConfirmDialog'
import { useUser } from '../ui/auth/hooks/useUser'
import { useCreateTask } from '../ui/tasks/hooks/useCreateTask'
import { useTaskCreateForm } from '../ui/tasks/hooks/useTaskCreateForm'
import { useDeleteAllCompletedTasks } from '../ui/tasks/hooks/useDeleteAllCompletedTasks'

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
