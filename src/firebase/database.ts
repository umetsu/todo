import firebase from './'

interface Task {
  id: string
  name: string
  completed: boolean
}

export async function fetchAllTasks(
  uid: string
): Promise<{ [key: string]: Task }> {
  // https://firebase.google.com/docs/database/web/read-and-write?hl=ja#read_data_once
  // 場合によってはget関数は効率が悪いようだが、今回はリクエスト数も多くなく、何よりこの関数自体をasync関数として定義できる方が色々とやりやすいので使うことにした
  const snapshot = await firebase
    .database()
    .ref(tasksPath(uid))
    .orderByKey()
    .get()
  const v = (snapshot.val() ?? {}) as {
    [key: string]: { name: string; completed: boolean }
  }
  return Object.fromEntries(
    Object.entries(v).map(([k, v]) => [k, { id: k, ...v }])
  )
}

export async function fetchTask(uid: string, taskId: string): Promise<Task> {
  const snapshot = await firebase.database().ref(taskPath(uid, taskId)).get()
  const v = (snapshot.val() ?? {}) as { name: string; completed: boolean }
  return {
    ...v,
    id: taskId,
  }
}

export async function createTask(uid: string, taskName: string): Promise<Task> {
  const newTask = {
    name: taskName,
    completed: false,
  }

  const newTaskRef = await firebase.database().ref(tasksPath(uid)).push(newTask)

  return {
    id: newTaskRef.key ?? '',
    ...newTask,
  }
}

export async function updateTask(uid: string, task: Task): Promise<Task> {
  await firebase.database().ref(taskPath(uid, task.id)).update({
    name: task.name,
    completed: task.completed,
  })

  return task
}

function tasksPath(uid: string) {
  return `${uid}/tasks`
}

function taskPath(uid: string, taskId: string) {
  return `${tasksPath(uid)}/${taskId}`
}
