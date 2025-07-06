import { Container, Grid, Button, Text } from 'preact-aurora-ui'
import { useLocation } from 'preact-iso'

interface LayoutProps {
  children: preact.ComponentChildren
}

export function Layout({ children }: LayoutProps) {
  const { route, url } = useLocation()

  const navigate = (path: string) => {
    route(path)
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return url === '/' || url === ''
    }
    return url.startsWith(path)
  }

  return (
    <div 
      data-component="Layout" 
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Navigation Header */}
      <Container 
        surface="surface-container" 
        padding="md" 
        style={{ borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}
        data-component="Layout-Header"
      >
        <Grid columns="auto 1fr auto" align="center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Text variant="headline-small" weight="bold">
            Nebula Studio
          </Text>
          
          <div />
          
          <Grid columns="auto auto auto auto" style={{ gap: '0.5rem' }}>
            <Button 
              variant="text"
              onClick={() => navigate('/')}
              style={{
                backgroundColor: isActive('/') ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: isActive('/') ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'
              }}
            >
              Home
            </Button>
            <Button 
              variant="text"
              onClick={() => navigate('/about')}
              style={{
                backgroundColor: isActive('/about') ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: isActive('/about') ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'
              }}
            >
              About
            </Button>
            <Button 
              variant="text"
              onClick={() => navigate('/status')}
              style={{
                backgroundColor: isActive('/status') ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: isActive('/status') ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'
              }}
            >
              Status
            </Button>
            <Button 
              variant="text"
              onClick={() => navigate('/settings')}
              style={{
                backgroundColor: isActive('/settings') ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: isActive('/settings') ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)'
              }}
            >
              Settings
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Main Content */}
      <main 
        data-component="Layout-Main" 
        style={{ flex: '1 1 auto', paddingBottom: '2rem' }}
      >
        {children}
      </main>

      {/* Footer */}
      <Container 
        surface="surface-variant" 
        padding="md" 
        style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', flexShrink: 0 }}
        data-component="Layout-Footer"
      >
        <Container maxWidth="lg">
          <Text variant="body-small" color="on-surface-variant" align="center">
            © 2025 Nebula Studio. Built with Preact & Aurora UI.
          </Text>
        </Container>
      </Container>
    </div>
  )
}
