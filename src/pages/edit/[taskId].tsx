import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'
import {
  Box,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { FullPageSpinner } from '../../components/common/FullPageSpinner'
import { TaskEditForm } from '../../components/edit/TaskEditForm'
import { ApplicationBar } from '../../components/common/ApplicationBar'
import { DeleteTaskConfirmDialog } from '../../components/edit/DeleteTaskConfirmDialog'
import { ErrorFallback } from '../../components/common/ErrorFallback'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { useDeleteTaskConfirmDialog } from '../../hooks/useDeleteTaskConfirmDialog'
import { useTask } from '../../hooks/useTask'
import { useDeleteTask } from '../../hooks/useDeleteTask'
import { useUpdateTask } from '../../hooks/useUpdateTask'

export default function EditPageWithProviders() {
  const router = useRouter()
  const { taskId } = router.query

  if (!taskId) {
    void router.replace('/')
    return <></>
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <ErrorFallback message={error.message} />}
      onError={console.error}
    >
      <React.Suspense fallback={<FullPageSpinner />}>
        <EditPage taskId={taskId as string} />
      </React.Suspense>
    </ErrorBoundary>
  )
}

interface Props {
  taskId: string
}

function EditPage({ taskId }: Props) {
  const classes = useStyles()
  const router = useRouter()
  const { task } = useTask(taskId)
  const { changeCompleted, changeTaskName } = useUpdateTask(task)
  const { deleteTask } = useDeleteTask()
  const {
    opened,
    openConfirmDialog,
    closeConfirmDialog,
  } = useDeleteTaskConfirmDialog()

  const handleDeleteTask = useCallback(() => {
    deleteTask(task)
    closeConfirmDialog()
    void router.replace('/')
  }, [closeConfirmDialog, deleteTask, router, task])

  return (
    <>
      <Box display={'flex'} flexDirection={'column'}>
        <ApplicationBar
          showBackButton
          renderAction={() => (
            <IconButton
              edge="end"
              color="inherit"
              aria-label={'delete-task'}
              onClick={openConfirmDialog}
            >
              <DeleteIcon />
            </IconButton>
          )}
        />
        <Container maxWidth={'md'} className={classes.container}>
          <TaskEditForm
            task={task}
            onCompletedChange={changeCompleted}
            onTaskNameChange={changeTaskName}
          />
        </Container>
      </Box>
      <DeleteTaskConfirmDialog
        open={opened}
        onClose={closeConfirmDialog}
        onDeleteTask={handleDeleteTask}
      />
    </>
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
