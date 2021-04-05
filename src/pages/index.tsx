import React from 'react'
import { Container } from '@material-ui/core'
import { Header } from '../components/Header'

export default function TopPage() {
  return (
    <>
      <Header />
      <Container maxWidth={'md'} style={{ padding: '16px' }}>
        <>Hello Next.js</>
      </Container>
    </>
  )
}
