import { Container, Text, Card, Button, Grid } from 'preact-aurora-ui'
import { useState, useEffect } from 'preact/hooks'
import { StatusBadge } from '../components/StatusBadge'
import { Stack } from '../components/Stack'
import { List, ListItem } from '../components/List'

interface HealthData {
  status: string
  timestamp: string
  version: string
  uptime?: string
  responseTime?: string
  issues?: string[]
}

export function Status() {
  /*
    COMPONENT STRUCTURE ANALYSIS - AFTER IMPROVEMENTS:
    This component now uses improved Aurora UI components and custom reusable components.
    
    AURORA UI COMPONENTS USED:
    - Container: Main page wrapper with consistent padding and max-width
    - Card: Content sections with Material Design elevation and spacing
    - Text: Typography with consistent variants and styling
    - Button: Interactive elements with Material Design states
    - Grid: Layout system replacing flexbox divs for better consistency
    
    CUSTOM REUSABLE COMPONENTS:
    - StatusBadge: Reusable status indicator using Aurora UI Badge
    - Stack: Vertical/horizontal spacing component for better layout control
    - List/ListItem: Consistent list styling components
    
    IMPROVEMENTS IMPLEMENTED:
    ✅ Replaced div layouts with Grid component where possible
    ✅ Created reusable StatusBadge component for status indicators
    ✅ Used List/ListItem components instead of ul/li for design consistency
    ✅ Added Stack component for vertical spacing instead of manual div containers
    
    NATIVE HTML ELEMENTS REMAINING:
    - code: Inline code styling (no direct Aurora UI replacement)
  */
  
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/health')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setHealthData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch health data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
  }, [])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Container padding="lg" maxWidth="lg" style={{ minHeight: 'auto' }}>
      <Text variant="headline-large" style={{ marginBottom: '2rem' }}>
        System Status
      </Text>
      
      <Card style={{ marginBottom: '2rem' }}>
        {/* Header container - using Grid component instead of flexbox div */}
        <Grid columns="1fr auto" align="center" style={{ marginBottom: '1rem' }}>
          <Text variant="headline-medium">
            API Health Check
          </Text>
          <Button 
            variant="outlined" 
            onClick={fetchHealthData} 
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Grid>
        
        {error && (
          <Card 
            variant="outlined" 
            style={{ 
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--md-sys-color-error-container)',
              color: 'var(--md-sys-color-on-error-container)'
            }}
          >
            <Text variant="body-large" weight="bold">
              Error
            </Text>
            <Text variant="body-medium" style={{ marginTop: '0.5rem' }}>
              {error}
            </Text>
          </Card>
        )}
        
        {loading && !healthData && (
          <Card variant="outlined" style={{ padding: '2rem', textAlign: 'center' }}>
            <Text variant="body-large">
              Loading health data...
            </Text>
          </Card>
        )}
        
        {healthData && (
          /* Data display using Stack component for better vertical spacing */
          <Stack spacing="1rem">
            {/* Status indicator row - using flexbox for reliable horizontal alignment */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Text variant="headline-small">
                Status:
              </Text>
              {/* Using StatusBadge component with inline variant for stable positioning */}
              <StatusBadge status={healthData.status} variant="inline" />
            </div>
            
            {/* Version info using Stack for vertical spacing */}
            <Stack spacing="0.25rem">
              <Text variant="body-large" weight="bold">
                Version:
              </Text>
              <Text variant="body-medium">
                {healthData.version}
              </Text>
            </Stack>
            
            {/* Timestamp info using Stack for vertical spacing */}
            <Stack spacing="0.25rem">
              <Text variant="body-large" weight="bold">
                Last Updated:
              </Text>
              <Text variant="body-medium">
                {formatTimestamp(healthData.timestamp)}
              </Text>
            </Stack>
            
            {/* Uptime info if available */}
            {healthData.uptime && (
              <Stack spacing="0.25rem">
                <Text variant="body-large" weight="bold">
                  Uptime:
                </Text>
                <Text variant="body-medium">
                  {healthData.uptime}
                </Text>
              </Stack>
            )}
            
            {/* Response time info if available */}
            {healthData.responseTime && (
              <Stack spacing="0.25rem">
                <Text variant="body-large" weight="bold">
                  Response Time:
                </Text>
                <Text variant="body-medium">
                  {healthData.responseTime}
                </Text>
              </Stack>
            )}
            
            {/* Issues list if available */}
            {healthData.issues && healthData.issues.length > 0 && (
              <Stack spacing="0.5rem">
                <Text variant="body-large" weight="bold">
                  Current Issues:
                </Text>
                <List>
                  {healthData.issues.map((issue, index) => (
                    <ListItem key={index}>{issue}</ListItem>
                  ))}
                </List>
              </Stack>
            )}
          </Stack>
        )}
      </Card>
      
      {/* Documentation/Info card - separate Card component for additional information */}
      <Card>
        <Text variant="headline-small" style={{ marginBottom: '1rem' }}>
          About Health Monitoring
        </Text>
        
        <Text variant="body-medium" style={{ marginBottom: '1rem' }}>
          This page displays real-time status information from the API health endpoint. 
          The health check provides essential information about the system's operational status.
        </Text>
        
        <Text variant="body-medium">
          The API endpoint <code>/api/health</code> returns status information including:
        </Text>
        
        {/* Using List and ListItem components instead of native ul/li for design consistency */}
        <List>
          <ListItem>Current system status (healthy, warning, degraded, unhealthy, error)</ListItem>
          <ListItem>Service version information</ListItem>
          <ListItem>Timestamp of the last health check</ListItem>
          <ListItem>System uptime percentage</ListItem>
          <ListItem>Average response time</ListItem>
          <ListItem>Current issues (if any)</ListItem>
        </List>
        
        <Text variant="body-medium" style={{ marginTop: '1rem' }}>
          <strong>Status Legend:</strong>
        </Text>
        
        <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="healthy" />
            <Text variant="body-small">All systems operational</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="warning" />
            <Text variant="body-small">Minor issues detected</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="degraded" />
            <Text variant="body-small">Performance degraded</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="unhealthy" />
            <Text variant="body-small">Multiple service issues</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StatusBadge status="error" />
            <Text variant="body-small">Critical system failure</Text>
          </div>
        </div>
      </Card>
    </Container>
  )
}
