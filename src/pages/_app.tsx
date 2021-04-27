import { AppProps } from 'next/app'
import React from 'react'
import '../common/global.css'
import { AppProviders } from '../common/AppProviders'
import Head from 'next/head'
import { createQueryClient } from '../common/createQueryClient'

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <AppProviders queryClient={createQueryClient()}>
      <Head>
        <title>Todo</title>
      </Head>
      <Component {...pageProps} />
    </AppProviders>
  )
}
