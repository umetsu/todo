import firebase from 'firebase'
import { mocked } from 'ts-jest/utils'
import { subscribeUser } from '../../src/firebase/auth'
import { useRouter } from 'next/router'

const defaultUser: firebase.UserInfo = {
  uid: '123',
  displayName: 'Tanaka Taro',
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: 'google.com',
}

const mockedSubscribeUser = mocked(subscribeUser)

export function mockSubscribeUser(userOption?: Partial<firebase.UserInfo>) {
  const user = {
    ...defaultUser,
    ...userOption,
  }
  mockedSubscribeUser.mockImplementation(
    (onUserChange: (user: firebase.UserInfo | null) => void) => {
      onUserChange(user)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return function unsubscribe() {}
    }
  )
}

const mockedUseRouter = mocked(useRouter)

export function mockUseRouter({
  pathname,
  query,
}: { pathname?: string; query?: Record<string, unknown> } = {}) {
  mockedUseRouter.mockReturnValue({
    route: '',
    pathname: pathname ?? '',
    query: query ?? {},
    asPath: '',
  } as any)
}
