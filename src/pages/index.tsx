import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { UnauthorizedContent } from '../components/UnauthorizedContent'
import { AuthorizedContent } from '../components/AuthorizedContent'
import { FullPageSpinner } from '../components/FullPageSpinner'

export default function TopPage() {
  const classes = useStyles()

  const { loading, loggedIn, logout } = useAuth()

  return (
    <div className={classes.root}>
      <Header loggedIn={loggedIn} onLogoutClick={logout} />
      {loading ? (
        <FullPageSpinner />
      ) : loggedIn ? (
        <AuthorizedContent />
      ) : (
        <UnauthorizedContent />
      )}
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // eslint-disable-next-line @typescript-eslint/prefer-as-const
      position: 'relative' as 'relative',
      height: '100vh',
    },
  })
)
