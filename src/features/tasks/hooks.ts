import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { useUid } from '../auth/useUid'
import { Task } from './models'
import {
  createTask as requestCreateTask,
  fetchAllTasks,
  fetchTask,
  updateTask as requestUpdateTask,
  deleteTasks as requestDeleteTasks,
} from '../../firebase/database'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

type TasksById = { [id: string]: Task }

export function useTasks() {
  const queryClient = useQueryClient()
  const { uid } = useUid()

  const { data } = useQuery<
    TasksById,
    Error,
    {
      uncompletedTasks: ReadonlyArray<Task>
      completedTasks: ReadonlyArray<Task>
    }
  >(['tasks'], () => fetchAllTasks(uid), {
    select: (data) => {
      const tasks = Object.values(data).reverse()
      return {
        uncompletedTasks: tasks.filter((t) => !t.completed),
        completedTasks: tasks.filter((t) => t.completed),
      }
    },
    onSuccess: ({ uncompletedTasks, completedTasks }) => {
      setQueryDataForTask(queryClient, [...uncompletedTasks, ...completedTasks])
    },
  })

  return {
    uncompletedTasks: data?.uncompletedTasks ?? [],
    completedTasks: data?.completedTasks ?? [],
  }
}

function setQueryDataForTask(
  queryClient: QueryClient,
  tasks: ReadonlyArray<Task>
) {
  tasks.forEach((task) =>
    queryClient.setQueryData(['task', { taskId: task.id }], task)
  )
}

const loadingTask: Task = {
  id: '',
  name: '読込中...',
  completed: false,
}

export function useTask(taskId: string) {
  const { uid } = useUid()
  const { data } = useQuery<Task, Error, Task>(['task', { taskId }], () =>
    fetchTask(uid, taskId)
  )

  return {
    task: data ?? loadingTask,
  }
}

export function useCreateTask() {
  const { uid } = useUid()
  const queryClient = useQueryClient()

  const { mutate: createTaskMutation } = useMutation<Task, Error, string>(
    (taskName) => requestCreateTask(uid, taskName),
    {
      onSuccess: (task) => updateCache(queryClient, task),
    }
  )

  const createTask = useCallback(
    (inputTaskName) => {
      if (!inputTaskName) return
      createTaskMutation(inputTaskName)
    },
    [createTaskMutation]
  )

  return {
    createTask,
  }
}

export function useUpdateTask(task: Task) {
  const { uid } = useUid()
  const queryClient = useQueryClient()

  const { mutate: updateTaskMutation } = useMutation<
    Task,
    Error,
    Task,
    { previousTask: Task | undefined }
  >((task) => requestUpdateTask(uid, task), {
    onMutate: async (newTask) => {
      const taskQueryKey = ['task', { taskId: task.id }]
      await queryClient.cancelQueries(taskQueryKey)
      const previousTask = queryClient.getQueryData<Task>(taskQueryKey)
      updateCache(queryClient, newTask)
      return { previousTask }
    },
    onError: (error, variables, context) => {
      if (!context?.previousTask) return
      updateCache(queryClient, context.previousTask)
    },
  })

  const changeCompleted = useCallback(
    (checked: boolean) => {
      updateTaskMutation({ ...task, completed: checked })
    },
    [updateTaskMutation, task]
  )

  const changeTaskName = useCallback(
    (taskName: string) => {
      updateTaskMutation({ ...task, name: taskName })
    },
    [updateTaskMutation, task]
  )

  return {
    changeCompleted,
    changeTaskName,
  }
}

function updateCache(queryClient: QueryClient, task: Task) {
  queryClient.setQueryData<TasksById>('tasks', (tasks) => ({
    ...tasks,
    [task.id]: task,
  }))
  queryClient.setQueryData(['task', { taskId: task.id }], task)
}

export function useDeleteAllCompletedTasks() {
  const { uid } = useUid()
  const queryClient = useQueryClient()

  const completedTasks = Object.values(
    queryClient.getQueryData<TasksById>('tasks') ?? {}
  ).filter((task) => task.completed)

  const { mutate: deleteTasksMutation } = useMutation<
    void,
    Error,
    ReadonlyArray<Task>
  >((tasks: ReadonlyArray<Task>) => requestDeleteTasks(uid, tasks), {
    onSuccess: (_, deleteTasks) => {
      queryClient.setQueryData<TasksById>('tasks', (tasks) => {
        return deleteTasks.reduce((tasks, task) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [task.id]: _, ...rest } = tasks
          return rest
        }, tasks ?? {})
      })
      deleteTasks.forEach((task) => {
        queryClient.removeQueries(['task', { taskId: task.id }], {
          exact: true,
        })
      })
    },
  })

  const deleteAllCompletedTasks = useCallback(() => {
    deleteTasksMutation(completedTasks)
  }, [completedTasks, deleteTasksMutation])

  return {
    numOfCompletedTasks: completedTasks.length,
    deleteAllCompletedTasks,
  }
}

const formAtom = atom({
  key: 'formAtom',
  default: {
    createTaskFormOpened: false,
    inputTaskName: '',
  },
})

export function useCreateTaskForm() {
  const [state, setState] = useRecoilState(formAtom)

  const openCreateTaskForm = useCallback(() => {
    setState((state) => ({ ...state, createTaskFormOpened: true }))
  }, [setState])

  const closeCreateTaskForm = useCallback(() => {
    setState((state) => ({
      ...state,
      createTaskFormOpened: false,
      inputTaskName: '',
    }))
  }, [setState])

  const changeInputTaskName = useCallback(
    (input: string) => {
      setState((state) => ({ ...state, inputTaskName: input }))
    },
    [setState]
  )

  return {
    createTaskFormOpened: state.createTaskFormOpened,
    inputTaskName: state.inputTaskName,
    openCreateTaskForm,
    closeCreateTaskForm,
    changeInputTaskName,
  }
}
