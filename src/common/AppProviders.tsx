import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../theme'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

interface AppProviderProps {
  children: React.ReactNode
  queryClient: QueryClient
}

export function AppProviders({ children, queryClient }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <RecoilRoot>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
