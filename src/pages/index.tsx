import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { Header } from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { UnauthorizedContent } from '../components/UnauthorizedContent'
import { AuthorizedContent } from '../components/AuthorizedContent'

export default function TopPage() {
  const { uid } = useAuth()

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      {uid ? <AuthorizedContent uid={uid} /> : <UnauthorizedContent />}
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
