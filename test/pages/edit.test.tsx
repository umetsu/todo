import React from 'react'
import { render, screen, waitForLoadingToFinish } from '../testUtils'
import EditPage from '../../src/pages/edit/[taskId]'
import { mocked } from 'ts-jest/utils'
import { fetchTask } from '../../src/firebase/database'
import { Task } from '../../src/features/tasks/models'
import firebase from 'firebase'
import { subscribeUser } from '../../src/firebase/auth'
import { useRouter } from 'next/router'

jest.mock('../../src/firebase/auth')
const mockedSubscribeUser = mocked(subscribeUser)

jest.mock('../../src/firebase/database')
const mockedFetchTask = mocked(fetchTask)

jest.mock('next/router')
const mockedUseRouter = mocked(useRouter)

beforeEach(() => {
  jest.clearAllMocks()
})

interface RenderOptions {
  uid?: string
  task?: Task
}

const defaultOptions: Required<RenderOptions> = {
  uid: '123',
  task: { id: '1', name: 'task1', completed: false },
}

async function renderEditPage(options: RenderOptions = defaultOptions) {
  // undefを許容しないように型変換
  const { uid = defaultOptions.uid, task = defaultOptions.task } = options

  mockedUseRouter.mockReturnValue({
    route: '',
    pathname: '',
    query: { taskId: task.id },
    asPath: '',
  } as any)

  mockedSubscribeUser.mockImplementation(
    (onUserChange: (user: firebase.User | null) => void) => {
      onUserChange({ uid } as any) // ひとまずuidだけがほしい
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return function unsubscribe() {}
    }
  )

  mockedFetchTask.mockReturnValue(Promise.resolve(task))

  render(<EditPage />)

  await waitForLoadingToFinish()
}

test('編集ページの描画', async () => {
  const task = { id: '1', name: 'task1', completed: false }
  await renderEditPage({ task })

  expect(await screen.findByRole('checkbox')).not.toBeChecked()
  expect(await screen.findByText('完了にする')).toBeInTheDocument()
  expect(await screen.findByDisplayValue('task1')).toBeInTheDocument()
})
