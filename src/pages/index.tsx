import React from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { TaskListContent } from '../components/tasks/TaskListContent'
import { FullPageSpinner } from '../components/FullPageSpinner'

export default function TopPage() {
  const { loading, logout } = useRequireAuth()

  if (loading) {
    return <FullPageSpinner />
  }

  return <TaskListContent logout={logout} />
}
