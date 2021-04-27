import React from 'react'
import { useRequireAuth } from '../../features/auth/useRequireAuth'
import { FullPageSpinner } from '../../common/FullPageSpinner'
import { useRouter } from 'next/router'
import { TaskEditContent } from '../../features/tasks/TaskEditContent'
import { ErrorBoundary } from 'react-error-boundary'

export default function EditPage() {
  const { loading } = useRequireAuth()
  const router = useRouter()
  const { taskId } = router.query

  if (loading) {
    return <FullPageSpinner />
  }

  if (!taskId) {
    void router.replace('/')
    return <></>
  }

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={(error, info) => console.error(error, info)}
    >
      <TaskEditContent taskId={taskId as string} />
    </ErrorBoundary>
  )
}
