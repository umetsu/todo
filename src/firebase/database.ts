import firebase from 'firebase'

interface Task {
  name: string
  completed: boolean
  createdAt: number
}

export function subscribeAllTasks(
  uid: string,
  onTasksChange: (tasks: { [key: string]: Task }) => void
) {
  firebase
    .database()
    .ref(`tasks/${uid}`)
    .orderByChild('createdAt')
    .on('value', (snapshot) => {
      onTasksChange(snapshot.val() ?? {})
    })
}

export function unsubscribeAllTasks(uid: string) {
  firebase.database().ref(`tasks/${uid}`).off()
}

export async function createTask(uid: string, taskName: string) {
  await firebase.database().ref(`tasks/${uid}`).push({
    name: taskName,
    completed: false,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  })
}
