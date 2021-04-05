import { AppProps } from 'next/app'
import React from 'react'
import '../styles/global.css'
import { AppProviders } from '../components/AppProviders'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <AppProviders>
      <>
        <Head>
          <title>Todo</title>
        </Head>
        <Component {...pageProps} />
      </>
    </AppProviders>
  )
}
