import firebase from 'firebase'

export function subscribeUser(
  onUserChange: (user: firebase.User | null) => void,
  onError?: (error: firebase.auth.Error) => void
) {
  return firebase.auth().onAuthStateChanged((user) => {
    onUserChange(user)
  }, onError)
}

export async function logout() {
  await firebase.auth().signOut()
}
