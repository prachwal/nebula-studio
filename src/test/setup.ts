import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/preact'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Extend Vitest's expect with jest-dom matchers
expect.extend({})
