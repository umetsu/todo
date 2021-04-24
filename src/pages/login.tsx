import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebaseui from 'firebaseui'
import firebase from '../firebase'

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export default function LoginPage() {
  const auth = firebase.auth()
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}
