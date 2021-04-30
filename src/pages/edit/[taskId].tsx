import React from 'react'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'
import {
  AppBar,
  Box,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core'
import Link from 'next/link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { FullPageSpinner } from '../../common/FullPageSpinner'
import { TaskEditForm } from '../../features/tasks/TaskEditForm'

export default function EditPage() {
  const classes = useStyles()
  const router = useRouter()
  const { taskId } = router.query

  if (!taskId) {
    void router.replace('/')
    return <></>
  }

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={(error, info) => console.error(error, info)}
    >
      <Box display={'flex'} flexDirection={'column'}>
        <AppBar position="static" color={'transparent'} elevation={0}>
          <Toolbar>
            <Link href={'/'}>
              <IconButton edge="start" color="inherit">
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'md'} className={classes.container}>
          <React.Suspense fallback={<FullPageSpinner />}>
            <TaskEditForm taskId={taskId as string} />
          </React.Suspense>
        </Container>
      </Box>
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
