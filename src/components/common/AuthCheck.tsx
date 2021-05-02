import React, { ReactNode, useEffect } from 'react'
import { FullPageSpinner } from './FullPageSpinner'
import { useRouter } from 'next/router'
import { useAuthCheck } from '../../hooks/auth/useAuthCheck'
import { useUser } from '../../hooks/auth/useUser'

interface Props {
  children: ReactNode
}

export function AuthCheck({ children }: Props) {
  useAuthCheck()
  const router = useRouter()
  const { authChecking, user } = useUser()

  useEffect(() => {
    if (router.pathname === '/login') return
    if (authChecking) return
    if (!user) {
      void router.push('/login')
    }
  }, [authChecking, router, user])

  if (authChecking) {
    return <FullPageSpinner />
  }

  return <>{children}</>
}
