import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../theme'

export function AppProviders({ children }: { children: React.ReactElement }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
