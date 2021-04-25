import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../theme'
import { RecoilRoot } from 'recoil'

export function AppProviders({ children }: { children: React.ReactElement }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </RecoilRoot>
  )
}
