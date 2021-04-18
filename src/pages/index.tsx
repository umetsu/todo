import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { UnauthorizedContent } from '../components/UnauthorizedContent'
import { AuthorizedContent } from '../components/AuthorizedContent'
import { FullPageSpinner } from '../components/FullPageSpinner'

export default function TopPage() {
  const { loading, loggedIn, logout } = useAuth()

  return (
    <div>
      {loading ? (
        <FullPageSpinner />
      ) : loggedIn ? (
        <AuthorizedContent logout={logout} />
      ) : (
        <UnauthorizedContent />
      )}
    </div>
  )
}
