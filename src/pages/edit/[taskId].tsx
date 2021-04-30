import React from 'react'
import { useRouter } from 'next/router'
import { TaskEditContent } from '../../features/tasks/TaskEditContent'
import { ErrorBoundary } from 'react-error-boundary'

export default function EditPage() {
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
      <TaskEditContent taskId={taskId as string} />
    </ErrorBoundary>
  )
}
