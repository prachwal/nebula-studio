import { LocationProvider, Router, ErrorBoundary, Route } from 'preact-iso'
import { Layout } from './components/Layout'

// Synchronous imports
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Settings } from './pages/Settings'
import { Status } from './pages/Status'

export function App() {
  // Scroll debugging disabled - issue resolved
  // useScrollDebug(true)

  return (
    <LocationProvider>
      <ErrorBoundary>
        <Layout>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/status" component={Status} />
            <Route path="/settings" component={Settings} />
          </Router>
        </Layout>
      </ErrorBoundary>
    </LocationProvider>
  )
}
