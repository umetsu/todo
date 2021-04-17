import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '../testUtils'
import TopPage from '../../src/pages'
import { mocked } from 'ts-jest/utils'
import {
  updateTask,
  createTask,
  fetchAllTasks,
} from '../../src/firebase/database'
import userEvent from '@testing-library/user-event'
import { Task } from '../../src/model'
import firebase from 'firebase'
import { subscribeUser } from '../../src/firebase/auth'

jest.mock('../../src/firebase/auth')
const mockedSubscribeUser = mocked(subscribeUser)

jest.mock('../../src/firebase/database')
const mockedFetchAllTasks = mocked(fetchAllTasks)
const mockedCreateTask = mocked(createTask)
const mockedUpdateTask = mocked(updateTask)

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

function renderTopPage(options: RenderOptions = defaultOptions) {
  // undefを許容しないように型変換
  const { uid = defaultOptions.uid, tasks = defaultOptions.tasks } = options

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
}

test('トップページの描画', async () => {
  renderTopPage()

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

  renderTopPage({ uid })

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

  userEvent.click(await screen.findByLabelText('create-task'))
  userEvent.type(await screen.findByRole('textbox'), newTaskName)
  userEvent.click(await screen.findByRole('button', { name: '追加' }))

  expect(mockedCreateTask).toBeCalledTimes(1)
  expect(mockedCreateTask).toHaveBeenCalledWith(uid, newTaskName)

  await waitForElementToBeRemoved(() => screen.queryByRole('textbox'))
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

  renderTopPage({ uid, tasks: [task] })

  expect(await screen.findByRole('checkbox')).not.toBeChecked()

  userEvent.click(await screen.findByRole('checkbox'))

  expect(mockedUpdateTask).toBeCalledTimes(1)
  expect(mockedUpdateTask).toBeCalledWith(uid, { ...task, completed: true })

  expect(await screen.findByRole('checkbox')).toBeChecked()
})
