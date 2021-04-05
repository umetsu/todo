import firebase from 'firebase'

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.PROJECT_ID}-default-rtdb.firebaseio.com/`,
  projectId: process.env.PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

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
