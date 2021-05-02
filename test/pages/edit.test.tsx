import React from 'react'
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForLoadingToFinish,
} from '../utils/ui'
import EditPage from '../../src/pages/edit/[taskId]'
import { mocked } from 'ts-jest/utils'
import { deleteTasks, fetchTask, updateTask } from '../../src/firebase/database'
import { mockSubscribeUser, mockUseRouter } from '../utils/mocks'

jest.mock('next/router')
jest.mock('../../src/firebase/auth')
jest.mock('../../src/firebase/database')

beforeEach(() => {
  jest.clearAllMocks()
})

interface RenderOptions {
  uid: string
  taskId: string
}

async function renderEditPage({ uid, taskId }: RenderOptions) {
  mockUseRouter({ query: { taskId } })

  mockSubscribeUser({ uid })

  render(<EditPage />)

  await waitForLoadingToFinish()
}

test('編集ページの描画とタスクの編集', async () => {
  const uid = '1234'
  const task = { id: '1', name: 'task1', completed: false }
  const completedTask = { ...task, completed: true }

  mocked(fetchTask)
    .mockResolvedValueOnce(task)
    .mockResolvedValueOnce(completedTask)
    .mockResolvedValueOnce(task)

  const mockedUpdateTask = mocked(updateTask)
  mockedUpdateTask
    .mockResolvedValueOnce(completedTask)
    .mockResolvedValueOnce(task)

  await renderEditPage({ uid, taskId: task.id })

  // バックボタンの表示
  expect(await screen.findByLabelText('back-button')).toBeInTheDocument()

  // 完了状態の切り替え
  userEvent.click(
    await screen.findByRole('checkbox', { name: '完了にする', checked: false })
  )
  await waitFor(() => {
    expect(mockedUpdateTask).toBeCalledWith(uid, completedTask)
  })

  userEvent.click(
    await screen.findByRole('checkbox', { name: '未完了に戻す', checked: true })
  )
  await waitFor(() => {
    expect(mockedUpdateTask).toBeCalledWith(uid, task)
  })
  expect(
    await screen.findByRole('checkbox', { name: '完了にする', checked: false })
  ).toBeInTheDocument()

  // タスク名の編集
  userEvent.type(await screen.findByDisplayValue('task1'), 'edit')
  await waitFor(() => {
    expect(mockedUpdateTask).toBeCalledWith(uid, { ...task, name: 'task1edit' })
  })
  expect(await screen.findByDisplayValue('task1edit')).toBeInTheDocument()
})

test('タスクの削除', async () => {
  const uid = '1234'
  const task = { id: '1', name: 'task1', completed: false }

  mocked(fetchTask).mockResolvedValueOnce(task)

  const mockedDeleteTasks = mocked(deleteTasks)

  await renderEditPage({ uid, taskId: task.id })

  userEvent.click(await screen.findByRole('button', { name: 'delete-task' }))
  expect(await screen.findByText('タスクの削除'))
  userEvent.click(await screen.findByRole('button', { name: '削除' }))

  await waitFor(() => {
    expect(mockedDeleteTasks).toBeCalledTimes(1)
  })
  expect(mockedDeleteTasks).toBeCalledWith(uid, [task])
})
