import { QueryClient } from 'react-query'
import { QueryCache } from 'react-query/types/core/queryCache'
import { MutationCache } from 'react-query/types/core/mutationCache'
import { DefaultOptions } from 'react-query/types/core/types'

export function createQueryClient(config?: {
  queryCache?: QueryCache
  mutationCache?: MutationCache
  defaultOptions?: DefaultOptions
}): QueryClient {
  return new QueryClient({
    ...config,
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
      },
      mutations: {
        useErrorBoundary: true,
      },
    },
  })
}
