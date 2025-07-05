import { render } from 'preact'
import { AuroraProvider } from 'preact-aurora-ui'
import { App } from './app.tsx'

render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')!
)
