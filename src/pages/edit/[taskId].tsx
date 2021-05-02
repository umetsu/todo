import React from 'react'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'
import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { FullPageSpinner } from '../../components/common/FullPageSpinner'
import { TaskEditForm } from '../../components/edit/TaskEditForm'
import { ApplicationBar } from '../../components/common/ApplicationBar'
import { DeleteTaskConfirmDialog } from '../../components/edit/DeleteTaskConfirmDialog'
import { ErrorFallback } from '../../components/common/ErrorFallback'

export default function EditPage() {
  const classes = useStyles()
  const router = useRouter()
  const { taskId: taskIdQuery } = router.query

  if (!taskIdQuery) {
    void router.replace('/')
    return <></>
  }

  const taskId = taskIdQuery as string

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <ErrorFallback message={error.message} />}
      onError={console.error}
    >
      <React.Suspense fallback={<FullPageSpinner />}>
        <Box display={'flex'} flexDirection={'column'}>
          <ApplicationBar />
          <Container maxWidth={'md'} className={classes.container}>
            <TaskEditForm taskId={taskId} />
          </Container>
        </Box>
        <DeleteTaskConfirmDialog taskId={taskId} />
      </React.Suspense>
    </ErrorBoundary>
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
