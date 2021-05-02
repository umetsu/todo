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
import { FullPageSpinner } from '../../components/FullPageSpinner'
import { TaskEditForm } from '../../components/TaskEditForm'
import { ApplicationBar } from '../../components/ApplicationBar'
import { DeleteTaskConfirmDialog } from '../../components/DeleteTaskConfirmDialog'

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
      fallback={<div>エラーが発生しました</div>}
      onError={(error, info) => console.error(error, info)}
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
