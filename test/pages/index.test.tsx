import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '../testUtils'
import TopPage from '../../src/pages'
import { mocked } from 'ts-jest/utils'
import { createTask, subscribeAllTasks } from '../../src/firebase/database'
import userEvent from '@testing-library/user-event'
import { useAuth } from '../../src/hooks/useAuth'

jest.mock('../../src/firebase/auth')
jest.mock('../../src/firebase/database')
const mockedSubscribeAllTasks = mocked(subscribeAllTasks)
const mockedCreateTask = mocked(createTask)

jest.mock('../../src/hooks/useAuth')
const mockedUseAuth = mocked(useAuth)

beforeEach(() => {
  jest.clearAllMocks()
})

function renderTopPage(uid = '123') {
  mockedUseAuth.mockReturnValue({
    uid,
  })

  mockedSubscribeAllTasks.mockImplementation((_, onTasksChange) => {
    onTasksChange({
      0: { name: 'task1', completed: false, createdAt: 1 },
      1: { name: 'task2', completed: false, createdAt: 2 },
      2: { name: 'task3', completed: false, createdAt: 3 },
    })
  })

  render(<TopPage />)
}

test('トップページの描画', async () => {
  renderTopPage()

  expect(mockedSubscribeAllTasks).toBeCalledTimes(1)

  expect(await screen.findByText(/todo/i)).toBeInTheDocument()
  expect(await screen.findAllByLabelText(/task-item/i)).toHaveLength(3)
})

test('タスクの追加', async () => {
  const uid = '123'
  const newTaskName = 'new task'

  mockedCreateTask.mockReturnValue(Promise.resolve())

  renderTopPage(uid)

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

  userEvent.click(await screen.findByLabelText('create-task'))
  userEvent.type(await screen.findByRole('textbox'), newTaskName)
  userEvent.click(await screen.findByRole('button', { name: '追加' }))

  expect(mockedCreateTask).toBeCalledTimes(1)
  expect(mockedCreateTask).toHaveBeenCalledWith(uid, newTaskName)

  await waitForElementToBeRemoved(() => screen.queryByRole('textbox'))
})
