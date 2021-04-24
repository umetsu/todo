import {
  render as rtlRender,
  RenderOptions as RtlRenderOptions,
} from '@testing-library/react'
import React from 'react'
import { AppProviders } from '../src/common/AppProviders'

type RenderOptions = RtlRenderOptions

function customRender(ui: React.ReactElement, options: RenderOptions = {}) {
  return {
    ...rtlRender(ui, {
      wrapper: AppProviders,
      ...options,
    } as RenderOptions),
  }
}

export * from '@testing-library/react'
export { customRender as render }
