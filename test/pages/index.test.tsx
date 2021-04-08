import React from 'react'
import { render, screen } from '../testUtils'
import TopPage from '../../src/pages'
import { subscribeUser } from '../../src/firebase/auth'
import { mocked } from 'ts-jest/utils'
import firebase from 'firebase'

jest.mock('../../src/firebase/auth')
const mockedSubscribeUser = mocked(subscribeUser)

beforeEach(() => {
  jest.clearAllMocks()
})

test('トップページのレンダリング', () => {
  const uid = '123'
  mockedSubscribeUser.mockImplementation(
    (onUserChange: (user: firebase.User | null) => void) => {
      onUserChange({ uid } as any) // ひとまずuidだけがほしい
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return function unsubscribe() {}
    }
  )

  render(<TopPage uid={uid} />)

  expect(mockedSubscribeUser).toBeCalledTimes(1)

  expect(screen.getByText(/hello next.js/i)).toBeInTheDocument()
})
