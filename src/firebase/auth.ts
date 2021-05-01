import firebase from './'

export function subscribeUser(
  onUserChange: (user: firebase.UserInfo | null) => void,
  onError?: (error: firebase.auth.Error) => void
) {
  return firebase.auth().onAuthStateChanged((user) => {
    onUserChange(user)
  }, onError)
}

export async function logout() {
  await firebase.auth().signOut()
}
