import React from 'react'
import { render, screen, waitFor, waitForLoadingToFinish } from '../testUtils'
import TopPage from '../../src/pages'
import { mocked } from 'ts-jest/utils'
import {
  createTask,
  fetchAllTasks,
  updateTask,
} from '../../src/firebase/database'
import userEvent from '@testing-library/user-event'
import { Task } from '../../src/models/tasks'
import firebase from 'firebase'
import { subscribeUser } from '../../src/firebase/auth'
import { useRouter } from 'next/router'

jest.mock('../../src/firebase/auth')
const mockedSubscribeUser = mocked(subscribeUser)

jest.mock('../../src/firebase/database')
const mockedFetchAllTasks = mocked(fetchAllTasks)
const mockedCreateTask = mocked(createTask)
const mockedUpdateTask = mocked(updateTask)

jest.mock('next/router')
const mockedUseRouter = mocked(useRouter)

beforeEach(() => {
  jest.clearAllMocks()
})

interface RenderOptions {
  uid?: string
  tasks?: ReadonlyArray<Task>
}

const defaultOptions: Required<RenderOptions> = {
  uid: '123',
  tasks: [
    { id: '1', name: 'task1', completed: false },
    { id: '2', name: 'task2', completed: false },
    { id: '3', name: 'task3', completed: false },
  ],
}

async function renderTopPage(options: RenderOptions = defaultOptions) {
  // undefを許容しないように型変換
  const { uid = defaultOptions.uid, tasks = defaultOptions.tasks } = options

  mockedUseRouter.mockReturnValue({
    route: '',
    pathname: '',
    query: {},
    asPath: '',
  } as any)

  mockedSubscribeUser.mockImplementation(
    (onUserChange: (user: firebase.User | null) => void) => {
      onUserChange({ uid } as any) // ひとまずuidだけがほしい
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return function unsubscribe() {}
    }
  )

  mockedFetchAllTasks.mockReturnValue(
    Promise.resolve(
      Object.fromEntries(
        tasks.map<[string, Task]>((t) => [t.id, t])
      )
    )
  )

  render(<TopPage />)

  await waitForLoadingToFinish()
}

test('トップページの描画', async () => {
  await renderTopPage()

  expect(mockedFetchAllTasks).toBeCalledTimes(1)

  expect(await screen.findByText(/todo/i)).toBeInTheDocument()
  expect(await screen.findAllByLabelText(/task-item/i)).toHaveLength(3)
})

test('タスクの追加', async () => {
  const uid = '123'
  const newTaskName = 'new task'

  mockedCreateTask.mockReturnValue(
    Promise.resolve({ id: 'test-id', name: newTaskName, completed: false })
  )

  await renderTopPage({ uid, tasks: [] })

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

  userEvent.click(await screen.findByLabelText('create-task'))
  userEvent.type(await screen.findByRole('textbox'), newTaskName)
  userEvent.click(await screen.findByRole('button', { name: '追加' }))

  await waitFor(() => {
    expect(mockedCreateTask).toBeCalledTimes(1)
  })
  expect(mockedCreateTask).toHaveBeenCalledWith(uid, newTaskName)

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

  expect(await screen.findByText(newTaskName)).toBeInTheDocument()
  expect(await screen.findByRole('checkbox')).not.toBeChecked()
})

test('完了状態の切り替え', async () => {
  const uid = '456'
  const task = { id: '1', name: 'task1', completed: false }

  mockedUpdateTask.mockReturnValue(
    Promise.resolve({
      ...task,
      completed: true,
    })
  )

  await renderTopPage({ uid, tasks: [task] })

  // 初期状態の確認
  expect(screen.queryByText('完了したタスク (0件)')).not.toBeInTheDocument()
  expect(await screen.findByRole('checkbox')).not.toBeChecked()

  userEvent.click(await screen.findByRole('checkbox'))

  // APIが呼ばれているか
  await waitFor(() => {
    expect(mockedUpdateTask).toBeCalledTimes(1)
  })
  expect(mockedUpdateTask).toBeCalledWith(uid, { ...task, completed: true })

  // 完了タスク一覧を見えるようにする
  userEvent.click(await screen.findByText('完了したタスク (1件)'))

  // チェックが入っているか
  expect(await screen.findByRole('checkbox')).toBeChecked()
})
