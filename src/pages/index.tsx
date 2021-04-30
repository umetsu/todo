import React from 'react'
import { useRequireAuth } from '../features/auth/useRequireAuth'
import { TaskListContent } from '../features/tasks/TaskListContent'
import { FullPageSpinner } from '../common/FullPageSpinner'
import { ErrorBoundary } from 'react-error-boundary'
import { useDeleteAllCompletedTasks } from '../features/tasks/hooks'

export default function TopPage() {
  const { loading, logout } = useRequireAuth()
  const { deleteAllCompletedTasks } = useDeleteAllCompletedTasks()

  if (loading) {
    return <FullPageSpinner />
  }

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={(error, info) => console.error(error, info)}
    >
      <TaskListContent
        deleteAllCompletedTasks={deleteAllCompletedTasks}
        logout={logout}
      />
    </ErrorBoundary>
  )
}
