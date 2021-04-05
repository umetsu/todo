import firebase from '../firebase'

export function useFirebase() {
  return {
    database: firebase.database(),
    auth: firebase.auth(),
  }
}
