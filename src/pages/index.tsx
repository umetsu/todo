import React from 'react'
import { useRequireAuth } from '../features/auth/useRequireAuth'
import { TaskListContent } from '../features/tasks/TaskListContent'
import { FullPageSpinner } from '../common/FullPageSpinner'

export default function TopPage() {
  const { loading, logout } = useRequireAuth()

  if (loading) {
    return <FullPageSpinner />
  }

  return <TaskListContent logout={logout} />
}
