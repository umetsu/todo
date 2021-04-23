import React from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { AuthorizedContent } from '../components/AuthorizedContent'
import { FullPageSpinner } from '../components/FullPageSpinner'

export default function TopPage() {
  const { loading, logout } = useRequireAuth()

  if (loading) {
    return <FullPageSpinner />
  }

  return (
    <div>
      <AuthorizedContent logout={logout} />
    </div>
  )
}
