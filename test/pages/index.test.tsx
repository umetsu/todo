import React from 'react'
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForLoadingToFinish,
  waitForElementToBeRemoved,
} from '../utils/ui'
import TopPage from '../../src/pages'
import { mocked } from 'ts-jest/utils'
import {
  createTask,
  fetchAllTasks,
  updateTask,
} from '../../src/firebase/database'
import { Task } from '../../src/models/tasks'
import { mockSubscribeUser, mockUseRouter } from '../utils/mocks'

jest.mock('next/router')
jest.mock('../../src/firebase/auth')
jest.mock('../../src/firebase/database')

beforeEach(() => {
  jest.clearAllMocks()
})

interface RenderOptions {
  uid?: string
}

async function renderTopPage({ uid }: RenderOptions = {}) {
  mockUseRouter()

  mockSubscribeUser({ uid })

  render(<TopPage />)

  await waitForLoadingToFinish()
}

test('トップページの描画', async () => {
  const tasks = [
    { id: '1', name: 'task1', completed: false },
    { id: '2', name: 'task2', completed: false },
    { id: '3', name: 'task3', completed: true },
  ]
  const mockedFetchAllTasks = mocked(fetchAllTasks)
  mockedFetchAllTasks.mockResolvedValue(
    Object.fromEntries(
      tasks.map<[string, Task]>((t) => [t.id, t])
    )
  )

  await renderTopPage()

  expect(mockedFetchAllTasks).toBeCalledTimes(1)

  // ヘッダー
  expect(await screen.findByText(/todo/i)).toBeInTheDocument()

  // タスクの一覧
  expect(
    await screen.findAllByRole('checkbox', { checked: false })
  ).toHaveLength(2)
  expect(await screen.findByText('task1')).toBeInTheDocument()
  expect(await screen.findByText('task2')).toBeInTheDocument()

  userEvent.click(await screen.findByText('完了したタスク (1件)'))
  expect(
    await screen.findByRole('checkbox', { checked: true })
  ).toBeInTheDocument()
  expect(await screen.findByText('task2')).toBeInTheDocument()

  // 削除ボタン
  expect(await screen.findByLabelText('delete-tasks')).not.toBeDisabled()

  // サイドバー表示・非表示
  expect(screen.queryByLabelText('avatar')).not.toBeInTheDocument()

  userEvent.click(await screen.findByLabelText('menu'))
  expect(await screen.findByLabelText('avatar')).toBeInTheDocument()
  expect(await screen.findByText('Tanaka Taro')).toBeInTheDocument()
  expect(await screen.findByText('ログアウト')).toBeInTheDocument()

  userEvent.click(await screen.findByLabelText('backdrop'))
  await waitForElementToBeRemoved(screen.queryByLabelText('avatar'))
})

test('タスクの追加', async () => {
  const uid = '123'
  const newTask: Task = { id: 'test-id', name: 'new task', completed: false }

  const mockedFetchAllTasks = mocked(fetchAllTasks)
  mockedFetchAllTasks
    .mockResolvedValue({ 'test-id': newTask })
    .mockResolvedValueOnce({})

  const mockedCreateTask = mocked(createTask)
  mockedCreateTask.mockResolvedValue(newTask)

  await renderTopPage({ uid })

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

  userEvent.click(await screen.findByLabelText('create-task'))
  userEvent.type(await screen.findByRole('textbox'), newTask.name)
  userEvent.click(await screen.findByRole('button', { name: '追加' }))

  await waitFor(() => {
    expect(mockedCreateTask).toBeCalledTimes(1)
  })
  expect(mockedCreateTask).toHaveBeenCalledWith(uid, newTask.name)

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

  expect(await screen.findByText(newTask.name)).toBeInTheDocument()
  expect(await screen.findByRole('checkbox')).not.toBeChecked()
})

test('完了状態の切り替え', async () => {
  const uid = '456'
  const task = { id: '1', name: 'task1', completed: false }

  const mockedFetchAllTasks = mocked(fetchAllTasks)
  mockedFetchAllTasks
    .mockResolvedValue({
      [task.id]: { ...task, completed: true },
    })
    .mockResolvedValueOnce({ [task.id]: task })

  const mockedUpdateTask = mocked(updateTask)
  mockedUpdateTask.mockResolvedValue({
    ...task,
    completed: true,
  })

  await renderTopPage({ uid })

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
