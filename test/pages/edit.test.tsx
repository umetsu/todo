import React from 'react'
import { render, screen, waitForLoadingToFinish } from '../utils/ui'
import EditPage from '../../src/pages/edit/[taskId]'
import { mocked } from 'ts-jest/utils'
import { fetchTask } from '../../src/firebase/database'
import { mockSubscribeUser, mockUseRouter } from '../utils/mocks'

jest.mock('next/router')
jest.mock('../../src/firebase/auth')
jest.mock('../../src/firebase/database')

beforeEach(() => {
  jest.clearAllMocks()
})

interface RenderOptions {
  uid?: string
  taskId: string
}

async function renderEditPage({ uid, taskId }: RenderOptions) {
  mockUseRouter({ query: { taskId } })

  mockSubscribeUser({ uid })

  render(<EditPage />)

  await waitForLoadingToFinish()
}

test('編集ページの描画', async () => {
  const task = { id: '1', name: 'task1', completed: false }

  const mockedFetchTask = mocked(fetchTask)
  mockedFetchTask.mockResolvedValue(task)

  await renderEditPage({ taskId: task.id })

  expect(await screen.findByRole('checkbox')).not.toBeChecked()
  expect(await screen.findByText('完了にする')).toBeInTheDocument()
  expect(await screen.findByDisplayValue('task1')).toBeInTheDocument()
})
