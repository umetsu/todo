import firebase from 'firebase'

interface Task {
  name: string
  completed: boolean
  createdAt: number
}

export function subscribeAllTasks(
  onTasksChange: (tasks: { [key: string]: Task }) => void
) {
  firebase
    .database()
    // TODO: pathにuid追加
    .ref('tasks/')
    .orderByChild('createdAt')
    .on('value', (snapshot) => {
      onTasksChange(snapshot.val() ?? {})
    })
}

export function unsubscribeAllTasks() {
  firebase
    .database()
    // TODO: pathにuid追加
    .ref('tasks/')
    .off()
}

export async function createTask(taskName: string) {
  await firebase.database().ref('tasks/').push({
    name: taskName,
    completed: false,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  })
}
