import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../theme'
import { Provider as JotaiProvider } from 'jotai'

export function AppProviders({ children }: { children: React.ReactElement }) {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </JotaiProvider>
  )
}
