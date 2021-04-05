import firebase from 'firebase'

export function subscribeUser(
  onUserChange: (user: firebase.User | null) => void
) {
  return firebase.auth().onAuthStateChanged((user) => {
    onUserChange(user)
  })
}
