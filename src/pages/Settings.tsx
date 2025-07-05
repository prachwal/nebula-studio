import { Container, Text, Card, Button, Switch, useTheme, Grid } from 'preact-aurora-ui'
import { useState } from 'preact/hooks'

export function Settings() {
  const { toggleMode, isDark } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)

  return (
    <Container padding="lg" maxWidth="md">
      <Text variant="headline-large" style={{ marginBottom: '2rem' }}>
        Settings
      </Text>
      
      <Card style={{ marginBottom: '2rem' }}>
        <Text variant="headline-medium" style={{ marginBottom: '1.5rem' }}>
          Appearance
        </Text>
        
        <Grid columns="1fr auto" align="center" style={{ marginBottom: '1rem' }}>
          <div>
            <Text variant="body-large" style={{ marginBottom: '0.25rem' }}>
              Dark Mode
            </Text>
            <Text variant="body-small" color="on-surface-variant">
              Switch between light and dark themes
            </Text>
          </div>
          <Switch 
            checked={isDark} 
            onChange={() => toggleMode()}
            aria-label="Toggle dark mode"
          />
        </Grid>
      </Card>
      
      <Card style={{ marginBottom: '2rem' }}>
        <Text variant="headline-medium" style={{ marginBottom: '1.5rem' }}>
          Preferences
        </Text>
        
        <Grid columns="1fr auto" align="center" style={{ marginBottom: '1rem' }}>
          <div>
            <Text variant="body-large" style={{ marginBottom: '0.25rem' }}>
              Enable Notifications
            </Text>
            <Text variant="body-small" color="on-surface-variant">
              Receive updates and alerts
            </Text>
          </div>
          <Switch 
            checked={notifications} 
            onChange={(e) => setNotifications(e.currentTarget.checked)}
            aria-label="Toggle notifications"
          />
        </Grid>
        
        <Grid columns="1fr auto" align="center">
          <div>
            <Text variant="body-large" style={{ marginBottom: '0.25rem' }}>
              Auto Save
            </Text>
            <Text variant="body-small" color="on-surface-variant">
              Automatically save your work
            </Text>
          </div>
          <Switch 
            checked={autoSave} 
            onChange={(e) => setAutoSave(e.currentTarget.checked)}
            aria-label="Toggle auto save"
          />
        </Grid>
      </Card>
      
      <Card>
        <Text variant="headline-medium" style={{ marginBottom: '1.5rem' }}>
          Actions
        </Text>
        
        <Grid columns="1fr 1fr" style={{ gap: '1rem' }}>
          <Button variant="outlined">
            Export Data
          </Button>
          <Button variant="outlined">
            Reset Settings
          </Button>
        </Grid>
      </Card>
    </Container>
  )
}
