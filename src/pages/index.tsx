import React from 'react'
import { TaskListContent } from '../features/tasks/TaskListContent'
import { useDeleteAllCompletedTasks } from '../features/tasks/hooks'
import { useUser } from '../features/auth/hooks'
import { ErrorBoundary } from 'react-error-boundary'

export default function TopPage() {
  const { logout } = useUser()
  const { deleteAllCompletedTasks } = useDeleteAllCompletedTasks()

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました</div>}
      onError={console.error}
    >
      <TaskListContent
        deleteAllCompletedTasks={deleteAllCompletedTasks}
        logout={logout}
      />
    </ErrorBoundary>
  )
}
