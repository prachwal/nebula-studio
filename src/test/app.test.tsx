import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { App } from '../app'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Vite + Preact')).toBeInTheDocument()
  })

  it('displays count button', () => {
    render(<App />)
    expect(screen.getByText(/count is/i)).toBeInTheDocument()
  })

  it('displays Preact logo', () => {
    render(<App />)
    expect(screen.getByAltText('Preact logo')).toBeInTheDocument()
  })
})
