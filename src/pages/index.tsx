import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthorizedContent } from '../components/AuthorizedContent'
import { FullPageSpinner } from '../components/FullPageSpinner'
import { useRouter } from 'next/router'

export default function TopPage() {
  const { loading, loggedIn, logout } = useAuth()
  const router = useRouter()

  if (!loading && !loggedIn) {
    void router.push('/login')
    return <></>
  }

  if (loading) {
    return <FullPageSpinner />
  }

  return (
    <div>
      <AuthorizedContent logout={logout} />
    </div>
  )
}
