import firebase from 'firebase'
import { Task } from '../model'

export async function fetchAllTasks(uid: string): Promise<Task[]> {
  // https://firebase.google.com/docs/database/web/read-and-write?hl=ja#read_data_once
  // 場合によってはget関数は効率が悪いようだが、今回はリクエスト数も多くなく、何よりこの関数自体をasync関数として定義できる方が色々とやりやすいので使うことにした
  const snapshot = await firebase
    .database()
    .ref(`tasks/${uid}`)
    .orderByKey()
    .get()
  const val = (snapshot.val() ?? {}) as {
    [key: string]: { name: string; completed: boolean }
  }
  return Object.entries(val).flatMap(([k, v]) => ({ id: k, ...v } as Task))
}

export async function createTask(uid: string, taskName: string): Promise<Task> {
  const newTask = {
    name: taskName,
    completed: false,
  }

  const newTaskRef = await firebase.database().ref(`tasks/${uid}`).push(newTask)

  return {
    id: newTaskRef.key ?? '',
    ...newTask,
  }
}
