import React from 'react'
import { useRequireAuth } from '../features/auth/useRequireAuth'
import { TaskListContent } from '../features/tasks/TaskListContent'
import { FullPageSpinner } from '../common/FullPageSpinner'
import { ErrorBoundary } from 'react-error-boundary'

export default function TopPage() {
  const { loading, logout } = useRequireAuth()

  if (loading) {
    return <FullPageSpinner />
  }

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={(error, info) => console.error(error, info)}
    >
      <TaskListContent logout={logout} />
    </ErrorBoundary>
  )
}
