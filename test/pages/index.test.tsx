import React from 'react'
import { render, screen } from '../testUtils'
import TopPage from '../../src/pages'

test('トップページのレンダリング', () => {
  render(<TopPage />)

  expect(screen.getByText(/hello next.js/i)).toBeInTheDocument()
})
