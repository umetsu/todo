import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import { AppProviders } from '../../src/ui/common/components/AppProviders'
import { createQueryClient } from '../../src/utils/createQueryClient'

// RenderOptionsでもらうようにするか悩んだが、今の所テスト側でreact-queryのことを意識する必要無いのでここで定義することにした
const queryClient = createQueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

beforeEach(() => {
  queryClient.clear()
})

type RenderOptions = RtlRenderOptions

export function render(ui: React.ReactElement, options: RenderOptions = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AppProviders queryClient={queryClient}>{children}</AppProviders>
  }

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...options,
    } as RenderOptions),
  }
}

export function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  )
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
