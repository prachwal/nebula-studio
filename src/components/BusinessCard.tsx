import { Card, Button, IconButton, useTheme, Text, Container, Grid, Chip } from 'preact-aurora-ui'

export function BusinessCard() {
  const { toggleMode, isDark } = useTheme()

  return (
    <Container padding="lg" maxWidth="sm">
      <Card elevation={2}>
        {/* Header with avatar and theme toggle */}
        <Grid columns="auto 1fr auto" align="center" style={{ marginBottom: '1.5rem' }}>
          <Container 
            surface="primary-container"
            radius="full"
            padding="lg"
            style={{ 
              width: '80px', 
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text variant="headline-small" color="auto" weight="bold">
              NS
            </Text>
          </Container>
          
          <div />
          
          <IconButton onClick={toggleMode} aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </IconButton>
        </Grid>

        {/* Personal Info */}
        <Text variant="headline-medium" style={{ marginBottom: '0.5rem' }}>
          Nebula Studio
        </Text>
        
        <Text variant="body-large" color="on-surface-variant" style={{ marginBottom: '0.5rem' }}>
          Full Stack Developer
        </Text>
        
        <Text variant="body-medium" color="on-surface-variant" style={{ marginBottom: '1.5rem' }}>
          Building beautiful web experiences with modern technologies
        </Text>

        {/* Contact Info */}
        <Container padding="none" style={{ marginBottom: '1.5rem' }}>
          <Grid columns="auto 1fr" align="center" style={{ marginBottom: '0.5rem', gap: '0.5rem' }}>
            <Text>📧</Text>
            <Text variant="body-small">hello@nebula-studio.dev</Text>
          </Grid>
          <Grid columns="auto 1fr" align="center" style={{ marginBottom: '0.5rem', gap: '0.5rem' }}>
            <Text>🌐</Text>
            <Text variant="body-small">nebula-studio.dev</Text>
          </Grid>
          <Grid columns="auto 1fr" align="center" style={{ gap: '0.5rem' }}>
            <Text>📍</Text>
            <Text variant="body-small">Remote • EU</Text>
          </Grid>
        </Container>

        {/* Action Buttons */}
        <Grid columns="1fr 1fr" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Button 
            variant="filled" 
            onClick={() => window.open('mailto:hello@nebula-studio.dev')}
          >
            Contact
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => window.open('https://github.com/prachwal', '_blank')}
          >
            Portfolio
          </Button>
        </Grid>

        {/* Skills/Tech Stack */}
        <Container padding="none">
          <Text variant="title-medium" style={{ marginBottom: '0.5rem' }}>
            Tech Stack
          </Text>
          <Grid columns="repeat(auto-fit, minmax(80px, 1fr))" style={{ gap: '0.5rem' }}>
            {[
              { tech: 'Preact', color: '#673ab7' },
              { tech: 'TypeScript', color: '#3178c6' },
              { tech: 'Vite', color: '#646cff' },
              { tech: 'Netlify', color: '#00c7b7' },
              { tech: 'Node.js', color: '#339933' }
            ].map(({ tech, color }) => (
              <Chip 
                key={tech} 
                type="suggestion"
                style={{
                  backgroundColor: `${color}20`,
                  borderColor: color,
                  color: color,
                  fontWeight: '500'
                }}
              >
                {tech}
              </Chip>
            ))}
          </Grid>
        </Container>
      </Card>
    </Container>
  )
}
