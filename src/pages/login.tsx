import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebaseui from 'firebaseui'
import firebase from '../firebase'
import { Cat } from 'react-kawaii'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

export default function LoginPage() {
  const classes = useStyles()
  const auth = firebase.auth()
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      className={classes.box}
    >
      <Cat size={140} mood={'lovestruck'} />
      <Typography>ログインをお願いします！</Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    height: '100%',
    padding: theme.spacing(2),
  },
}))
