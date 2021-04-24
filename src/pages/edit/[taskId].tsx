import React from 'react'
import { useRequireAuth } from '../../features/auth/useRequireAuth'
import { FullPageSpinner } from '../../common/FullPageSpinner'
import { useRouter } from 'next/router'
import { TaskEditContent } from '../../features/edit/TaskEditContent'

export default function EditPage() {
  const { loading } = useRequireAuth()
  const router = useRouter()
  const { taskId } = router.query

  if (loading) {
    return <FullPageSpinner />
  }

  return <TaskEditContent taskId={taskId} />
}
