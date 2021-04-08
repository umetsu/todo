import firebase from 'firebase'

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.NEXT_PUBLIC_PROJECT_ID}-default-rtdb.firebaseio.com/`,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
