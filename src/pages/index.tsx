import React from 'react'
import { Container } from '@material-ui/core'
import { Header } from '../components/Header'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { useAuth } from '../hooks/useAuth'
import * as firebaseui from 'firebaseui'

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

interface TopPageProps {
  uid?: string
}

export default function TopPage({ uid }: TopPageProps) {
  const { loggedIn, auth } = useAuth(uid)

  return (
    <div>
      <Header />
      {loggedIn ? (
        <Container maxWidth={'md'} style={{ padding: '16px' }}>
          <>Hello Next.js</>
        </Container>
      ) : (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      )}
    </div>
  )
}
