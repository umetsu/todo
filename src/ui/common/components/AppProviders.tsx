import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from '../../theme'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthCheck } from './AuthCheck'

interface Props {
  children: React.ReactNode
  queryClient: QueryClient
}

export function AppProviders({ children, queryClient }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
      )}
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <AuthCheck>{children}</AuthCheck>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
